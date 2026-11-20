/*
 * article.js —— 课文页的公共逻辑（2026-11-20 P2）
 *
 * 抽出来的原因：10 个课文页的内联脚本除 SENTS / VOCAB 两行外**逐字节相同**，
 * 复制了 10 份、约 6600 行。句子已上移到 content.js 的 articles[].sentences，
 * 所以页面里不再需要任何内容数据，只留骨架 HTML。
 *
 * 职责：切面（课文/词汇/语法/文化）、句子渲染、逐句中译与罗马音、朗读、词汇表渲染、点词查义。
 * 不负责：注音三档 / 理解检测 / 动词活用表 / 词汇发音 / 縦書き —— 那些在 article-extras.js。
 * 加载顺序：content.js → voice.js → article.js → article-extras.js
 */
(function () {
  'use strict';

  const doc = document;
  const $ = function (id) { return doc.getElementById(id); };

  /* ---------- 定位本篇 ----------
     单页之后主入口是 ?id=a11；保留按文件名兜底，方便旧链接与本地手动打开。 */
  function findArticle() {
    const A = (window.APP_DATA && window.APP_DATA.articles) || [];
    let want = '';
    try { want = new URLSearchParams(location.search).get('id') || ''; } catch (e) { want = ''; }
    if (want) {
      const hit = A.filter(function (x) { return x.id === want; })[0];
      if (hit) return hit;
    }
    return A[0] || null;   // 没带 ?id 就落到第一篇（也方便本地直接打开调试）
  }

  const ART = findArticle();
  if (!ART) { console.error('article.js: 找不到本篇数据（检查 URL 的 ?id= 是否存在于 content.js）'); return; }

  const SENTS = ART.sentences || [];
  /* 词汇表来自 content.js（全站唯一词表）：按本篇 id 过滤，字段映射到原渲染契约 */
  const VOCAB = ((window.APP_DATA && window.APP_DATA.words) || [])
    .filter(function (w) { return w.a === ART.id; })
    .map(function (w) { return { w: w.ja, k: w.kana, r: w.r, m: w.m }; });

  const TABS = ['text', 'vocab', 'grammar', 'culture'];
  const SND_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';

  /* ================= 切面 =================
     replaceState 而不是 pushState：4 个切面不是 4 个页面，不该产生 4 条历史 */
  function activate(id, silent) {
    if (TABS.indexOf(id) < 0) id = 'text';
    TABS.forEach(function (p) {
      const sec = $(p);
      const tab = $('tab-' + p);
      const on = (p === id);
      if (sec) sec.classList.toggle('active', on);
      if (tab) {
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
      }
    });
    if (!silent) {
      const url = (id === 'text') ? (location.pathname + location.search) : ('#' + id);
      try { history.replaceState(null, '', url); }
      catch (e) { /* file:// 直接打开时可能禁止改 URL；切面本身仍然生效 */ }
    }
    return id;
  }

  function currentTab() {
    for (let i = 0; i < TABS.length; i++) {
      const t = $('tab-' + TABS[i]);
      if (t && t.getAttribute('aria-selected') === 'true') return i;
    }
    return 0;
  }

  /* 已滚过目标 panel 顶部才滚，否则不动；scroll-margin-top 已扣掉吸顶条高度 */
  function revealPanel(sec) {
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.pageYOffset;
    if (window.pageYOffset > top - 8) sec.scrollIntoView({ block: 'start' });
  }

  function mountTabs() {
    const bar = doc.querySelector('.tabbar');
    TABS.forEach(function (p) {
      const tab = $('tab-' + p);
      if (!tab) return;
      tab.addEventListener('click', function () {
        activate(p);
        revealPanel($(p));
      });
    });
    if (bar) {
      bar.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const i = currentTab();
        const next = (i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
        const id = activate(TABS[next]);
        $('tab-' + id).focus();
        revealPanel($(id));
      });
    }
    window.addEventListener('hashchange', function () {
      const h = (location.hash || '').replace('#', '');
      if (TABS.indexOf(h) >= 0) activate(h, true);
    });
    const h = (location.hash || '').replace('#', '');
    activate(TABS.indexOf(h) >= 0 ? h : 'text');
  }

  /* ================= 点词查义 =================
     思路：不往句子里插 span（会切开 ruby，也会和注音三档打架），
     而是把「点到的字符位置」换算成 plain 里的偏移，再查词表在本文句中的出现区间。
     caretRangeFromPoint / caretPositionFromPoint 都能拿到精确的文本节点与偏移。 */

  const OCC = [];          // 每句：[{s,e,v}]，长词优先，已去重叠
  const SKIP_TAGS = { RT: 1, RP: 1 };

  function buildOccurrences() {
    SENTS.forEach(function (s) {
      const plain = s.plain || '';
      const list = [];
      VOCAB.forEach(function (v) {
        const key = v.w.replace(/（.*?）/g, '').replace(/[〜~]/g, '').trim();
        if (!key) return;
        let from = 0, i;
        while ((i = plain.indexOf(key, from)) >= 0) {
          list.push({ s: i, e: i + key.length, v: v });
          from = i + 1;
        }
      });
      list.sort(function (a, b) { return (b.e - b.s) - (a.e - a.s); });
      const used = Object.create(null);
      const keep = [];
      list.forEach(function (h) {
        for (let k = h.s; k < h.e; k++) if (used[k]) return;
        for (let k = h.s; k < h.e; k++) used[k] = 1;
        keep.push(h);
      });
      OCC.push(keep);
    });
  }

  function caretAt(x, y) {
    if (doc.caretRangeFromPoint) return doc.caretRangeFromPoint(x, y);
    if (doc.caretPositionFromPoint) {
      const p = doc.caretPositionFromPoint(x, y);
      if (p) return { startContainer: p.offsetNode, startOffset: p.offset };
    }
    return null;
  }

  /* 可见字符（不含 rt / 「译」按钮）累计到某个文本节点的偏移 */
  function walkerFor(jp) {
    return doc.createTreeWalker(jp, NodeFilter.SHOW_TEXT, {
      acceptNode: function (t) {
        const pe = t.parentElement;
        if (!pe) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS[pe.nodeName]) return NodeFilter.FILTER_REJECT;
        if (pe.closest && pe.closest('.zh-toggle')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
  }

  function offsetInText(jp, node, off) {
    let acc = 0;
    const w = walkerFor(jp);
    let n;
    while ((n = w.nextNode())) {
      if (n === node) return acc + off;
      acc += n.nodeValue.length;
    }
    return -1;
  }

  /* 落在注音（rt）上时，退回这颗 ruby 的底字起点 */
  function offsetOfRuby(jp, ruby) {
    let acc = 0;
    const w = walkerFor(jp);
    let n;
    while ((n = w.nextNode())) {
      if (ruby.contains(n)) return acc;
      acc += n.nodeValue.length;
    }
    return -1;
  }

  function locate(jp, node, off) {
    let o = offsetInText(jp, node, off);
    if (o >= 0) return o;
    let el = node && node.nodeType === 3 ? node.parentElement : node;
    while (el && el !== jp && el.nodeName !== 'RUBY') el = el.parentElement;
    if (el && el !== jp) return offsetOfRuby(jp, el);
    return -1;
  }

  let lk = null;           // 查词条 DOM（首次点击才建）

  function speak(text) {
    if (!text) return;
    if (window.JPVoice) { window.JPVoice.speak(text); return; }
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    speechSynthesis.speak(u);
  }

  function buildLookup() {
    const box = doc.createElement('div');
    box.className = 'lk';
    box.id = 'lookup';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', '词语释义');
    box.innerHTML =
      '<div class="lk-in">' +
        '<div class="lk-top">' +
          '<b class="lk-w" lang="ja"></b>' +
          '<span class="lk-k" lang="ja"></span>' +
          '<span class="lk-r" lang="ja-Latn"></span>' +
          '<button class="lk-snd" type="button" aria-label="朗读这个词">' + SND_SVG + '</button>' +
          '<button class="lk-x" type="button" aria-label="关闭释义">×</button>' +
        '</div>' +
        '<p class="lk-m"></p>' +
      '</div>';
    doc.body.appendChild(box);

    box.querySelector('.lk-x').addEventListener('click', function () { box.hidden = true; });
    box.querySelector('.lk-snd').addEventListener('click', function () {
      const k = box.dataset.say || '';
      try { speechSynthesis.cancel(); } catch (e) {}
      speak(k);
    });
    return box;
  }

  function showLookup(v) {
    if (!lk) lk = buildLookup();
    lk.querySelector('.lk-w').textContent = v.w;
    const k = lk.querySelector('.lk-k');
    k.textContent = v.k || '';
    k.hidden = !v.k;
    const r = lk.querySelector('.lk-r');
    r.textContent = v.r || '';
    r.hidden = !v.r;
    lk.querySelector('.lk-m').textContent = v.m || v.zh || '';
    /* 读假名；没有假名就读词形（ラベル 这类片假名词） */
    lk.dataset.say = (v.k || v.w).replace(/[〜~]/g, '');
    lk.hidden = false;
  }

  function bindLookup() {
    const art = $('article');
    if (!art) return;
    art.addEventListener('click', function (e) {
      if (vertical) return;                 // 竖排是自绘的格子，没有可换算的文本节点
      /* 「译」按钮和朗读键有自己的活，不抢 */
      if (e.target.closest && (e.target.closest('.zh-toggle') || e.target.closest('.snd'))) return;
      const jp = e.target.closest ? e.target.closest('.jp') : null;
      if (!jp) return;

      const r = caretAt(e.clientX, e.clientY);
      if (!r) return;
      if (!jp.contains(r.startContainer)) return;

      const off = locate(jp, r.startContainer, r.startOffset);
      if (off < 0) return;

      const i = Number(jp.dataset.i);
      const hits = OCC[i] || [];
      for (let k = 0; k < hits.length; k++) {
        if (off >= hits[k].s && off < hits[k].e) { showLookup(hits[k].v); return; }
      }
      /* 没命中就收起：不弹「未收录」，否则每点一个助词都报错 */
      if (lk) lk.hidden = true;
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lk) lk.hidden = true;
    });
  }

  /* 首次使用的轻提示：一次就够，之后不再挡版面 */
  function maybeHint() {
    const KEY = 'jp_lookup_tip';
    let seen = false;
    try { seen = localStorage.getItem(KEY) === '1'; } catch (e) {}
    if (seen) return;
    const bar = doc.querySelector('.toolbar');
    if (!bar || !bar.parentNode) return;
    const p = doc.createElement('p');
    p.className = 'lk-tip';
    p.textContent = '点句中的词可以查读音和释义';
    bar.parentNode.insertBefore(p, bar.nextSibling);
    const off = function () {
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
      if (p.parentNode) p.parentNode.removeChild(p);
      doc.removeEventListener('click', off);
    };
    setTimeout(function () { doc.addEventListener('click', off); }, 800);
  }

  /* ================= 课文渲染 ================= */
  /* ================= 縦書き（自绘，不用 writing-mode） =================
   *
   * 为什么不用 CSS writing-mode：iOS Safari 的 vertical-rl 列宽算不出来，
   * 字符互相压字、列与列叠在一起（纯假名的句子同样复现，所以不是注音的问题）。
   * 显式 width:max-content 也无效 → 不是布局参数能绕过的引擎缺陷。
   *
   * 所以这里把竖排「自己画」：每个字是一个普通块，靠 flex 纵向排列。
   * 完全不依赖竖排文字特性，任何引擎结果都一样，也就能在本机验完再发。
   *
   * 结构（一句可以有多个竖列，长句折列，从右往左）：
   *   .vrow  → 一句，row-reverse（第一个列在最右）
   *     .vcol → 一列
   *       .vr    → 一格：<b>字</b><i>假名</i>（i 在字右侧，小字）
   *       .vrg   → 多字词 + 整段读法（读法在组右侧均匀铺开）
   */
  const V_ROW = 27;                       // 每个字占的高度（px），也是节距
  let vertical = false;

  /* 把带 ruby 的句子拆成「格」：单字一格，ruby 词整组一格 */
  function atomsOf(jp) {
    const box = doc.createElement('div');
    box.innerHTML = jp;
    const out = [];
    Array.prototype.forEach.call(box.childNodes, function (n) {
      if (n.nodeType === 3) {
        Array.prototype.forEach.call(n.nodeValue, function (ch) { out.push({ ch: ch }); });
        return;
      }
      if (n.nodeName === 'RUBY') {
        let base = '', rt = '';
        Array.prototype.forEach.call(n.childNodes, function (c) {
          if (c.nodeName === 'RT') rt += c.textContent; else base += c.textContent;
        });
        Array.prototype.forEach.call(base, function (ch) { out.push({ ch: ch, rt: rt }); });
        /* 一个字一个 ruby 的常见情况：读法只该挂在第一个字上，其余字不再重复标 */
        return;
      }
      Array.prototype.forEach.call(n.textContent, function (ch) { out.push({ ch: ch }); });
    });
    return out;
  }

  const V_PUNCT = { '。': 1, '、': 1, '，': 1, '．': 1, '」': 1, '』': 1, '）': 1 };
  const BASIC = window.__JP_BASIC || null;

  function esc2(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* 生成一行「格」的 HTML。带 rt 的字把假名放在右侧；整词的 ruby 只挂一次。 */
  function cellsHTML(atoms) {
    let html = '';
    let i = 0;
    while (i < atoms.length) {
      const a = atoms[i];
      /* 收集连续、rt 相同的字，合成一个「组」（例如 象徴 / しょうちょう） */
      if (a.rt) {
        let j = i + 1;
        while (j < atoms.length && atoms[j].rt === a.rt) j++;
        const chars = atoms.slice(i, j).map(function (x) { return x.ch; });
        const rt = a.rt;
        const basic = BASIC && chars.every(function (c) { return BASIC[c]; });
        if (chars.length === 1) {
          html += '<div class="vr' + (basic ? ' k-basic' : '') + (V_PUNCT[chars[0]] ? ' p' : '') + '">' +
                    '<b>' + esc2(chars[0]) + '</b><i>' + esc2(rt) + '</i>' +
                  '</div>';
        } else {
          html += '<div class="vrg' + (basic ? ' k-basic' : '') + '" style="--n:' + chars.length + '">' +
                    '<span class="vg">' + chars.map(function (c) { return '<b>' + esc2(c) + '</b>'; }).join('') + '</span>' +
                    '<span class="vk">' + Array.prototype.map.call(rt, function (k) { return '<s>' + esc2(k) + '</s>'; }).join('') + '</span>' +
                  '</div>';
        }
        i = j;
        continue;
      }
      html += '<div class="vr' + (V_PUNCT[a.ch] ? ' p' : '') + '"><b>' + esc2(a.ch) + '</b></div>';
      i++;
    }
    return html;
  }

  /* 一句拆成若干列：每列最多 maxRows 格，列从右往左 */
  function columnsHTML(atoms, maxRows) {
    /* 先把 atoms 展开成「占位格数」，用于折列（多字 ruby 组占 chars.length 格） */
    const blocks = [];
    atoms.forEach(function (a) {
      if (blocks.length && a.rt && blocks[blocks.length - 1].rt === a.rt && blocks[blocks.length - 1].cells) {
        blocks[blocks.length - 1].cells.push(a.ch);
        return;
      }
      blocks.push(a.rt ? { rt: a.rt, cells: [a.ch] } : { ch: a.ch });
    });

    const cols = [];
    let cur = [], used = 0;
    blocks.forEach(function (b) {
      const need = b.cells ? b.cells.length : 1;
      if (used && used + need > maxRows) { cols.push(cur); cur = []; used = 0; }
      /* 单组超过一整列时不再拆——溢出可见总比丢字好 */
      const asAtoms = b.cells
        ? b.cells.map(function (c) { return { ch: c, rt: b.rt }; })
        : [{ ch: b.ch }];
      cur = cur.concat(asAtoms);
      used += need;
    });
    if (cur.length) cols.push(cur);

    return cols.map(function (c) {
      return '<div class="vcol">' + cellsHTML(c) + '</div>';
    }).join('');
  }

  function renderVertical() {
    const art = $('article');
    if (!art) return;
    const maxRows = Math.max(6, Math.floor((window.innerHeight - 300) / V_ROW));
    art.innerHTML = SENTS.map(function (s, i) {
      const n = i + 1;
      return '<div class="vrow" data-i="' + i + '">' +
        '<span class="vsn" aria-hidden="true">' + String(n).padStart(2, '0') + '</span>' +
        columnsHTML(atomsOf(s.jp), maxRows) +
      '</div>';
    }).join('');
  }

  function setVertical(on) {
    if (on === vertical) return;
    vertical = !!on;
    const text = $('text');
    const art = $('article');
    if (text) text.setAttribute('data-writing', vertical ? 'v' : 'h');
    doc.body.classList.toggle('writing-v', vertical);
    if (art) art.classList.toggle('is-vertical', vertical);
    if (vertical) renderVertical();
    else { renderSentences(); renderVocab(); }
    /* 切回横排后，中译/罗马音状态复位 */
    if (!vertical) { zhState.fill(false); syncMaster(); }
    if (lk) lk.hidden = true;
  }
  window.__setVertical = setVertical;
  window.__isVertical = function () { return vertical; };

  function renderSentences() {
    const art = $('article');
    if (!art) return;
    /* 必须清空：横竖切换会重复调用，只 append 会把竖排的格子留在页面上
       （表现为每个字占一行，像上面那张截图） */
    art.innerHTML = '';
    SENTS.forEach(function (s, i) {
      const n = i + 1;
      const div = doc.createElement('div');
      div.className = 'sent';
      div.innerHTML =
        '<span class="sn" aria-hidden="true">' + String(n).padStart(2, '0') + '</span>' +
        '<div class="s-body">' +
          '<p class="jp" lang="ja" data-i="' + i + '">' + s.jp +
            '<button class="zh-toggle" type="button" data-i="' + i + '" aria-expanded="false" aria-controls="zh-' + n + '">' +
              '<span class="chip" aria-hidden="true">译</span><span class="sr">第 ' + n + ' 句中译</span>' +
            '</button>' +
          '</p>' +
          '<p class="ro" id="ro-' + n + '" lang="ja-Latn" hidden>' + (s.ro || '') + '</p>' +
          '<p class="zh" id="zh-' + n + '" lang="zh-CN" hidden>' + (s.zh || '') + '</p>' +
        '</div>' +
        '<button class="snd" type="button" data-i="' + i + '" aria-label="朗读第 ' + n + ' 句" title="朗读本句">' + SND_SVG + '</button>';
      /* 会話体才有的说话人（A / B）。必须走 CSS 伪元素而不是插文本节点——
         点词查义是按「可见字符偏移」定位的，多一个文本节点就会整体错位。 */
      if (s.sp) div.querySelector('.jp').setAttribute('data-sp', s.sp);
      art.appendChild(div);
    });
  }

  /* ---------- 词汇（含"出现在第几句"反查号）---------- */
  function refSentence(w) {
    const key = String(w).replace(/（.*?）/g, '').replace(/[〜~]/g, '');
    if (!key) return 0;
    for (let i = 0; i < SENTS.length; i++) {
      if ((SENTS[i].plain || '').indexOf(key) >= 0) return i + 1;
    }
    return 0;
  }
  const circled = function (n) { return String.fromCharCode(0x2460 + n - 1); };   // ①…⑳

  function renderVocab() {
    const vlist = $('vocabList');
    if (!vlist) return;
    vlist.innerHTML = '';                    // 横竖切换会重复调用，先清空
    const esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
    VOCAB.forEach(function (v) {
      const ref = refSentence(v.w);
      const li = doc.createElement('li');
      li.className = 'v-row';
      li.innerHTML =
        '<div class="v-top">' +
          '<b class="v-w" lang="ja">' + esc(v.w) + '</b>' +
          (v.k ? '<span class="v-k" lang="ja">' + esc(v.k) + '</span>' : '') +
          '<span class="v-r" lang="ja-Latn">' + esc(v.r) + '</span>' +
          (ref ? '<span class="v-ref" title="出现在第 ' + ref + ' 句">' + circled(ref) + '</span>' : '') +
        '</div>' +
        '<div class="v-m">' + (v.m || '') + '</div>';
      vlist.appendChild(li);
    });
  }

  /* ================= 中译 / 罗马音 ================= */
  const zhState = SENTS.map(function () { return false; });

  function setZh(i, on) {
    zhState[i] = on;
    const box = $('zh-' + (i + 1));
    const btn = doc.querySelector('.zh-toggle[data-i="' + i + '"]');
    if (box) box.hidden = !on;
    if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
  }

  function syncMaster() {
    /* 标签恒为「中译」，状态由下划线（.on）与 aria-pressed 表达：
       有任意一句展开 → 按下即全部收起；一句都没开 → 按下即全部展开。 */
    const any = zhState.some(Boolean);
    const btnZh = $('btnZh');
    if (!btnZh) return;
    btnZh.classList.toggle('on', any);
    btnZh.setAttribute('aria-pressed', any ? 'true' : 'false');
  }

  function mountToggles() {
    const art = $('article');
    const btnZh = $('btnZh');
    const btnRo = $('btnRo');

    if (btnZh) {
      btnZh.onclick = function () {
        const target = !zhState.some(Boolean);   // 一个都没开 → 全开；有开着的 → 全关
        for (let i = 0; i < SENTS.length; i++) setZh(i, target);
        syncMaster();
      };
    }

    if (art) {
      art.addEventListener('click', function (e) {
        const zt = e.target.closest ? e.target.closest('.zh-toggle') : null;
        if (zt) {
          const i = +zt.dataset.i;
          setZh(i, !zhState[i]);
          syncMaster();
          return;
        }
        const snd = e.target.closest ? e.target.closest('.snd') : null;
        if (snd) {
          try { speechSynthesis.cancel(); } catch (err) {}
          speak(SENTS[+snd.dataset.i].plain);
        }
      });
    }

    let roOn = false;
    if (btnRo) {
      btnRo.onclick = function () {
        roOn = !roOn;
        art.querySelectorAll('.ro').forEach(function (el) { el.hidden = !roOn; });
        this.classList.toggle('on', roOn);
        this.setAttribute('aria-pressed', roOn ? 'true' : 'false');
      };
    }
  }

  /* ================= 全文朗读 ================= */
  function mountReadAll() {
    const btn = $('btnAll');
    if (!btn) return;
    let playing = false;
    btn.onclick = async function () {
      if (playing) {
        try { speechSynthesis.cancel(); } catch (e) {}
        playing = false; this.textContent = '▶ 朗读'; this.classList.remove('on');
        return;
      }
      playing = true; this.textContent = '⏸ 停止'; this.classList.add('on');
      if (!zhState.some(Boolean) && $('btnZh')) $('btnZh').click();   // 朗读时把中译展开
      for (const s of SENTS) {
        if (!playing) break;
        await speakPromise(s.plain, 0.85);
        await new Promise(function (r) { setTimeout(r, 500); });
      }
      playing = false; this.textContent = '▶ 朗读'; this.classList.remove('on');
    };
    function speakPromise(text, rate) {
      if (window.JPVoice) return window.JPVoice.speak(text, rate);
      return new Promise(function (resolve) {
        if (!window.speechSynthesis) return resolve();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ja-JP';
        u.onend = resolve;
        u.onerror = resolve;
        speechSynthesis.speak(u);
      });
    }
  }

  /* ================= 已读记录 / 深链接 =================
     目录页读同一个键画实心/空心编号。只记本机，不进云端。 */
  const READ_KEY = 'jp_read_v1';

  function markRead() {
    let all = {};
    try { all = JSON.parse(localStorage.getItem(READ_KEY) || '{}') || {}; } catch (e) { all = {}; }
    const prev = all[ART.id] || {};
    all[ART.id] = { at: Date.now(), n: (prev.n || 0) + 1 };
    try { localStorage.setItem(READ_KEY, JSON.stringify(all)); } catch (e) {}
  }

  /* 复习结果的错词点回来时带 ?s=N：直接滚到那一句并高亮一会儿 */
  function jumpToSentence() {
    let n = 0;
    try { n = parseInt(new URLSearchParams(location.search).get('s'), 10) || 0; } catch (e) { n = 0; }
    if (n <= 0) return;
    const el = doc.querySelector('#article .sent:nth-child(' + n + ')');
    if (!el) return;
    activate('text', true);
    el.scrollIntoView({ block: 'center' });
    el.classList.add('hl');
    setTimeout(function () { el.classList.remove('hl'); }, 2600);
  }

  /* ================= 壳渲染（单页之后，页面本身不含任何文章内容） ================= */
  function renderShell() {
    doc.title = ART.pageTitle || (ART.ja + '｜日语初级阅读');

    const cover = doc.querySelector('header.cover');
    if (cover) {
      const h1 = cover.querySelector('h1.ja');
      if (h1) h1.innerHTML = ART.titleRuby || ART.ja;
      const meta = cover.querySelector('.meta');
      if (meta) {
        meta.innerHTML = (ART.tags || []).map(function (t) {
          return '<span class="tag">' + t + '</span>';
        }).join('');
      }
      const lead = cover.querySelector('.lead');
      if (lead) lead.textContent = ART.lead || '';
    }

    const wrap = doc.querySelector('.wrap');
    if (wrap) wrap.setAttribute('data-piece', ART.id);

    const stamp = doc.querySelector('.tabbar .stamp');
    if (stamp) stamp.textContent = ART.no || '';

    const t = doc.querySelector('.cta-t');
    if (t) t.textContent = ART.ctaTitle || '读完测一下';
    const s = doc.querySelector('.cta-s');
    if (s) s.textContent = ART.ctaSub || '';
    const btn = doc.querySelector('.cta-btn');
    if (btn) {
      btn.setAttribute('href', 'review.html?set=' + ART.id);
      btn.textContent = '测这 ' + VOCAB.length + ' 个词 →';
    }
  }

  function renderGrammar() {
    const box = $('grammarList');
    if (!box) return;
    box.innerHTML = (ART.grammar || []).map(function (g) {
      /* 换行位置照抄旧页面（</span> 与 g-ex 之间有一个换行），
         否则 textContent 会少一个空格——内容一样，但对比脚本会当成差异。 */
      return '<div class="g-item">' +
        '<span class="g-form">' + g.form + '</span>' +
        '<span class="g-lesson">' + g.lesson + '</span>\n      ' +
        '<div class="g-ex">' + g.ex + '</div>' +
      '</div>';
    }).join('\n');
  }

  function renderCulture() {
    const h = $('cultureH');
    if (h) h.textContent = ART.cultureTitle || '文化小知识';
    const list = $('factList');
    /* facts 存的是每条事实的内部 HTML 原样：13 篇的格式并不统一
       （有的 </b> 后直接冒号，有的插了（出处），有的一整段没有小标题），
       结构化解析必然丢东西。 */
    if (list) {
      list.innerHTML = (ART.facts || []).map(function (f) {
        return '<div class="fact">' + f + '</div>';
      }).join('\n');
    }
    const src = $('sourceText');
    if (src) src.textContent = ART.source || '';
  }

  /* ================= 启动 ================= */
  function init() {
    if (!SENTS.length) { console.warn('article.js: 本篇没有 sentences 数据 — ' + ART.id); }
    renderShell();
    renderGrammar();
    renderCulture();
    buildOccurrences();
    renderSentences();
    renderVocab();
    mountTabs();
    mountToggles();
    mountReadAll();
    bindLookup();
    maybeHint();
    markRead();
    jumpToSentence();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
