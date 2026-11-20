/*
 * article-extras.js —— 课文页的三个附加能力（2026-11-20 P1）
 *   ① 注音三档：全 / 常用汉字不注 / 无（点字可临时显音）
 *   ② 理解检测：每篇 2 题四选一，即时判分，不进 SRS
 *   ③ 动词活用表：辞書形 / ます形 / て形 / た形 + 自他对应
 *
 * 数据全部来自 content.js（quiz / verbs 字段）。本文件不写任何字面色值，
 * 样式在 common.css，颜色 / 圆角 / 间距一律取自 tokens.css。
 * 加载顺序：必须在课文页内联脚本之后（#article 已生成）。
 */
(function () {
  'use strict';

  /* ================= 通用 ================= */
  const doc = document;
  const root = doc.documentElement;

  function findArticle() {
    const A = (window.APP_DATA && window.APP_DATA.articles) || [];
    let file = location.pathname.split('/').pop() || '';
    if (!file || file === '') file = 'index.html';
    let a = A.filter(function (x) { return x.file === file; })[0];
    if (!a) {                                   // 本地用别的名字打开时，退回页内印章编号
      const stamp = doc.querySelector('.tabbar .stamp');
      if (stamp) {
        const no = (stamp.textContent || '').trim();
        a = A.filter(function (x) { return x.no === no; })[0];
      }
    }
    return a || null;
  }

  /* ================= ① 注音三档 =================
     判定依据：学年別漢字配当表 小学 1–2 年（约 240 字）。ruby 的底字全部落在这个集合里，
     说明学习者早该认得，就属于"常用汉字不注"一档要隐藏的对象。
     只影响显示，不改 DOM 结构，所以切档不触发重排抖动。 */
  const KANJI_1 = '一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六';
  const KANJI_2 = '引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話';
  const BASIC = Object.create(null);
  (KANJI_1 + KANJI_2).split('').forEach(function (c) { BASIC[c] = 1; });

  const RUBY_KEY = 'jr_ruby';
  const MODES = ['all', 'common', 'none'];
  const MODE_LABEL = { all: '注音 全', common: '注音 常用', none: '注音 无' };
  const MODE_HINT = {
    all: '当前全部汉字带假名。点按切换为「常用汉字不注」',
    common: '当前小学一二年汉字不注音。点按切换为「无注音」',
    none: '当前无注音，点汉字可临时显示读音。点按恢复全注音'
  };

  let rubyMode = 'all';
  try {
    const saved = localStorage.getItem(RUBY_KEY);
    if (MODES.indexOf(saved) >= 0) rubyMode = saved;
  } catch (e) { /* 隐私模式取不到就按默认 */ }

  function rubyBase(r) {
    let s = '';
    for (let i = 0; i < r.childNodes.length; i++) {
      const n = r.childNodes[i];
      if (n.nodeName === 'RT') break;
      s += n.textContent;
    }
    return s.replace(/\s+/g, '');
  }

  function markCommon() {
    const list = doc.querySelectorAll('#article ruby, h1.ja ruby');
    for (let i = 0; i < list.length; i++) {
      const base = rubyBase(list[i]);
      if (!base) continue;
      let allBasic = true;
      for (let k = 0; k < base.length; k++) {
        if (!BASIC[base[k]]) { allBasic = false; break; }
      }
      if (allBasic) list[i].classList.add('rt-off');
      else list[i].classList.remove('rt-off');
    }
  }

  function applyRuby() {
    root.setAttribute('data-ruby', rubyMode);
    if (rubyMode === 'common') markCommon();
    const btn = doc.getElementById('btnRuby');
    if (btn) {
      btn.textContent = MODE_LABEL[rubyMode];
      btn.setAttribute('aria-label', MODE_HINT[rubyMode]);
      btn.classList.toggle('on', rubyMode !== 'all');
    }
  }

  function cycleRuby() {
    rubyMode = MODES[(MODES.indexOf(rubyMode) + 1) % MODES.length];
    try { localStorage.setItem(RUBY_KEY, rubyMode); } catch (e) {}
    applyRuby();
  }

  function mountRubyButton() {
    const bar = doc.querySelector('.toolbar');
    if (!bar || doc.getElementById('btnRuby')) return;
    const btn = doc.createElement('button');
    btn.type = 'button';
    btn.id = 'btnRuby';
    btn.className = 'tbtn';
    btn.addEventListener('click', cycleRuby);
    const voiceSlot = bar.querySelector('[data-voice-slot]');
    bar.insertBefore(btn, voiceSlot || null);
    applyRuby();
  }

  /* 无注音档：点一下汉字临时显示读音（.peek），再点收回。
     只在这一档绑定，其它两档点击不做事，避免误触。 */
  function bindPeek() {
    const art = doc.getElementById('article');
    if (!art) return;
    art.addEventListener('click', function (e) {
      if (rubyMode !== 'none') return;
      let el = e.target;
      while (el && el !== art && el.nodeName !== 'RUBY') el = el.parentElement;
      if (!el || el === art || el.nodeName !== 'RUBY') return;
      el.classList.toggle('peek');
    });
  }

  /* ================= ④ 词汇表发音 =================
     句子本来就有 🔊，词汇表反而没有——而词汇表才是最需要听的地方。
     列表由各页内联脚本生成，这里只往上挂按钮并做一次事件委托，不改 10 个页面。
     读音优先取假名字段（漢字词的读音才是要学的），没有就退回词形。 */
  const SND_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';

  function say(text) {
    if (!text) return;
    if (window.JPVoice) { window.JPVoice.speak(text); return; }
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    speechSynthesis.speak(u);
  }

  function readOf(row) {
    const k = row.querySelector('.v-k');
    const w = row.querySelector('.v-w');
    let s = (k && k.textContent) || (w && w.textContent) || '';
    return s.replace(/[〜~]/g, '').replace(/（[^）]*）/g, '').trim();
  }

  function mountVocabSound() {
    const list = doc.getElementById('vocabList');
    if (!list || list.getAttribute('data-snd') === 'on') return;
    list.setAttribute('data-snd', 'on');

    Array.prototype.forEach.call(list.querySelectorAll('.v-row'), function (row) {
      if (row.querySelector('.v-snd')) return;
      const btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'v-snd';
      btn.innerHTML = SND_SVG;
      const word = readOf(row);
      btn.setAttribute('aria-label', '朗读 ' + word);
      btn.title = '朗读';
      btn.dataset.say = word;
      const anchor = row.querySelector('.v-k') || row.querySelector('.v-w');
      if (anchor) anchor.insertAdjacentElement('afterend', btn);
      else row.appendChild(btn);
    });

    list.addEventListener('click', function (e) {
      const b = e.target.closest ? e.target.closest('.v-snd') : null;
      if (!b) return;
      e.preventDefault();
      try { speechSynthesis.cancel(); } catch (err) {}
      say(b.dataset.say);
    });
  }

  /* ================= ⑤ 縦書き / 横書き =================
     原先挂在 theme.js 里（随主题开关一起注入），双主题下线后搬到这里。
     竖排的版式全在 layout.css 的 #text[data-writing="v"] 段，这里只切状态。 */
  function mountVertical() {
    const bar = doc.querySelector('.toolbar');
    const panel = doc.getElementById('text');
    if (!bar || !panel || doc.getElementById('btnVertical')) return;

    const b = doc.createElement('button');
    b.id = 'btnVertical';
    b.type = 'button';
    b.className = 'tbtn';
    b.textContent = '縦書き';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('title', '竖排阅读');

    b.addEventListener('click', function () {
      const on = panel.getAttribute('data-writing') === 'v';
      if (on) {
        panel.removeAttribute('data-writing');
        b.classList.remove('on');
        b.textContent = '縦書き';
        b.setAttribute('aria-pressed', 'false');
        document.body.classList.remove('writing-v');
      } else {
        panel.setAttribute('data-writing', 'v');
        b.classList.add('on');
        b.textContent = '横書き';
        b.setAttribute('aria-pressed', 'true');
        document.body.classList.add('writing-v');
      }
    });

    const voiceSlot = bar.querySelector('[data-voice-slot]');
    bar.insertBefore(b, voiceSlot || null);
  }

  /* ================= ② 理解检测 ================= */
  const QUIZ_KEY = 'jp_quiz_v1';
  const KANA = ['A', 'B', 'C', 'D'];

  function storeScore(id, score, total) {
    let all = {};
    try { all = JSON.parse(localStorage.getItem(QUIZ_KEY) || '{}') || {}; } catch (e) { all = {}; }
    all[id] = { score: score, total: total, at: Date.now() };
    try { localStorage.setItem(QUIZ_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function renderQuiz(art) {
    const box = doc.getElementById('quiz');
    if (!box || !art || !art.quiz || !art.quiz.length) return;

    const total = art.quiz.length;
    const answered = new Array(total).fill(false);
    let ok = 0;

    box.className = 'quiz';
    box.innerHTML = '';

    const h = doc.createElement('h2');
    h.textContent = '读懂了吗';
    box.appendChild(h);

    const lead = doc.createElement('p');
    lead.className = 'quiz-lead';
    lead.textContent = total + ' 道题，答案都在这一篇里。不计入复习进度。';
    box.appendChild(lead);

    art.quiz.forEach(function (item, qi) {
      const wrap = doc.createElement('div');
      wrap.className = 'q';

      const head = doc.createElement('div');
      head.className = 'q-head';
      const no = doc.createElement('span');
      no.className = 'q-no';
      no.textContent = '問' + (qi + 1);
      const qt = doc.createElement('p');
      qt.className = 'q-text';
      qt.lang = 'ja';
      qt.textContent = item.q;
      head.appendChild(no);
      head.appendChild(qt);
      wrap.appendChild(head);

      const opts = doc.createElement('div');
      opts.className = 'q-opts';
      opts.setAttribute('role', 'radiogroup');
      opts.setAttribute('aria-label', '第 ' + (qi + 1) + ' 题选项');
      const kids = [];

      item.opts.forEach(function (txt, ki) {
        const b = doc.createElement('button');
        b.type = 'button';
        b.className = 'q-opt';
        b.setAttribute('role', 'radio');
        b.setAttribute('aria-checked', 'false');
        b.dataset.k = String(ki);

        const k = doc.createElement('span');
        k.className = 'q-k';
        k.setAttribute('aria-hidden', 'true');
        k.textContent = KANA[ki];
        const o = doc.createElement('span');
        o.className = 'q-o';
        o.lang = 'ja';
        o.textContent = txt;

        b.appendChild(k);
        b.appendChild(o);
        opts.appendChild(b);
        kids.push(b);
      });
      wrap.appendChild(opts);

      const fb = doc.createElement('div');
      fb.className = 'q-fb';
      fb.hidden = true;
      fb.setAttribute('aria-live', 'polite');
      wrap.appendChild(fb);

      opts.addEventListener('click', function (e) {
        let b = e.target;
        while (b && b !== opts && !b.classList.contains('q-opt')) b = b.parentElement;
        if (!b || b === opts || answered[qi]) return;
        answered[qi] = true;

        const pick = Number(b.dataset.k);
        const right = item.ans;
        const hit = pick === right;

        kids.forEach(function (el) {
          const ki = Number(el.dataset.k);
          el.setAttribute('aria-checked', el === b ? 'true' : 'false');
          el.disabled = true;
          if (ki === right) el.classList.add('ok');
          else if (el === b) el.classList.add('no');
        });

        if (hit) ok++;

        fb.innerHTML = '';
        const tag = doc.createElement('b');
        tag.className = hit ? 'fb-ok' : 'fb-no';
        tag.textContent = hit ? '正确' : '正确答案 ' + KANA[right];
        const txt = doc.createElement('span');
        txt.textContent = '　' + item.exp;
        fb.appendChild(tag);
        fb.appendChild(txt);
        fb.hidden = false;

        if (answered.every(Boolean)) {
          showScore();
        }
      });

      wrap.appendChild(fb);
      box.appendChild(wrap);
    });

    /* 成绩行：只在 2 题都答完后出现，不做即时压力 */
    const scoreBox = doc.createElement('div');
    scoreBox.className = 'quiz-score';
    scoreBox.hidden = true;
    scoreBox.setAttribute('aria-live', 'polite');
    box.appendChild(scoreBox);

    function showScore() {
      const pct = ok / total;
      const verdict = pct === 1 ? '全对。这一篇读透了。'
        : pct >= 0.5 ? '读懂了大部分，错的那句回头看一眼。'
        : '先回课文再读一遍，比硬猜快。';
      scoreBox.innerHTML = '';
      const line = doc.createElement('div');
      line.className = 'qs-line';
      const n = doc.createElement('b');
      n.textContent = ok + ' / ' + total;
      line.appendChild(n);
      line.appendChild(doc.createTextNode('　' + verdict));
      scoreBox.appendChild(line);

      const act = doc.createElement('div');
      act.className = 'qs-act';
      const again = doc.createElement('button');
      again.type = 'button';
      again.className = 'tbtn';
      again.textContent = '重做这两题';
      again.addEventListener('click', function () {
        answered.fill(false);
        ok = 0;
        box.querySelectorAll('.q').forEach(function (q) {
          q.querySelectorAll('.q-opt').forEach(function (b) {
            b.disabled = false;
            b.setAttribute('aria-checked', 'false');
            b.classList.remove('ok', 'no');
          });
          const f = q.querySelector('.q-fb');
          if (f) { f.hidden = true; f.innerHTML = ''; }
        });
        scoreBox.hidden = true;
        box.scrollIntoView({ block: 'nearest' });
      });
      act.appendChild(again);
      scoreBox.appendChild(act);
      scoreBox.hidden = false;

      storeScore(art.id, ok, total);
    }
  }

  /* ================= ③ 动词活用表 ================= */
  function renderVerbs(art) {
    const box = doc.getElementById('verbTable');
    if (!box || !art || !art.verbs || !art.verbs.length) return;

    box.innerHTML = '';

    const h = doc.createElement('h3');
    h.className = 'vh';
    h.textContent = '本篇文章的动词';
    box.appendChild(h);

    const list = doc.createElement('div');
    list.className = 'vj-list';

    art.verbs.forEach(function (v) {
      const row = doc.createElement('div');
      row.className = 'vj';

      const top = doc.createElement('div');
      top.className = 'vj-top';
      const lab = doc.createElement('i');
      lab.className = 'vj-lab';
      lab.textContent = '辞書';
      const dict = doc.createElement('b');
      dict.className = 'vj-dict';
      dict.lang = 'ja';
      dict.textContent = v.dict;
      const type = doc.createElement('span');
      type.className = 'vj-type';
      type.textContent = v.type;
      const zh = doc.createElement('span');
      zh.className = 'vj-zh';
      zh.textContent = v.zh;
      top.appendChild(lab);
      top.appendChild(dict);
      top.appendChild(type);
      top.appendChild(zh);
      row.appendChild(top);

      const forms = doc.createElement('div');
      forms.className = 'vj-forms';
      [['ます', v.masu], ['て', v.te], ['た', v.ta]].forEach(function (pair) {
        const cell = doc.createElement('span');
        const lab = doc.createElement('i');
        lab.textContent = pair[0];
        const val = doc.createElement('b');
        val.lang = 'ja';
        val.textContent = pair[1];
        cell.appendChild(lab);
        cell.appendChild(val);
        forms.appendChild(cell);
      });
      row.appendChild(forms);

      if (v.pair || v.note) {
        const note = doc.createElement('p');
        note.className = 'vj-note';
        note.textContent = v.pair || v.note;
        row.appendChild(note);
      }
      if (v.pair && v.note) {
        const n2 = doc.createElement('p');
        n2.className = 'vj-note';
        n2.textContent = v.note;
        row.appendChild(n2);
      }

      list.appendChild(row);
    });

    box.appendChild(list);
  }

  /* ================= 启动 ================= */
  function init() {
    const art = findArticle();
    mountRubyButton();
    if (rubyMode === 'common') markCommon();
    bindPeek();
    mountVocabSound();
    mountVertical();
    renderQuiz(art);
    renderVerbs(art);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
