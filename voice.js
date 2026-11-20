/* 日语朗读设置：选择设备语音 + 语速，设置保存在本机
 * 用法：JPVoice.speak(text, rate) —— 返回 Promise，语音结束后 resolve
 *        JPVoice.open()           —— 打开设置面板（前提：页面里有 [data-voice-slot]）
 *
 * 皮肤：本文件不写任何字面色值 / 圆角 / 间距，全部引用 tokens.css 的变量，
 * 因此它不再是"第 8 套皮肤"（旧版自注入的旧灰线色、低对比灰字、混合字体栈、
 * 16px/8px 两个越界圆角、两处手调 box-shadow，已全部删除）。
 * 入口：不再 fixed 浮动，改为挂进页面的 [data-voice-slot]；页面没有这个槽位就
 *       什么都不渲染（刻意不回退到浮动按钮 —— 否则又会被"顺手"留在页面上）。
 */
(function () {
  var LS_KEY = 'jp_voice_pref_v1';
  var pref = { voiceURI: '', rate: 0.9, pitch: 1 };
  try { pref = Object.assign(pref, JSON.parse(localStorage.getItem(LS_KEY) || '{}')); } catch (e) {}
  var save = function () { try { localStorage.setItem(LS_KEY, JSON.stringify(pref)); } catch (e) {} };

  function jaVoices() {
    return (window.speechSynthesis ? speechSynthesis.getVoices() : [])
      .filter(function (v) { return v.lang && /^ja/i.test(v.lang); });
  }

  function pick() {
    var list = jaVoices();
    if (!list.length) return null;
    if (pref.voiceURI) {
      for (var i = 0; i < list.length; i++) if (list[i].voiceURI === pref.voiceURI) return list[i];
    }
    // 常见高质量日语语音优先
    var prefer = ['Kyoko', 'O-ren', 'Otoya', 'Nanami', 'Haruka', 'Ayumi', 'Ichiro'];
    for (var p = 0; p < prefer.length; p++) {
      for (var j = 0; j < list.length; j++) {
        if ((list[j].name || '').indexOf(prefer[p]) >= 0) return list[j];
      }
    }
    return list[0];
  }

  function speak(text, rate) {
    return new Promise(function (resolve) {
      if (!window.speechSynthesis) { resolve(); return; }
      try { speechSynthesis.cancel(); } catch (e) {}
      var u = new SpeechSynthesisUtterance(String(text || ''));
      u.lang = 'ja-JP';
      u.rate = Math.max(0.5, Math.min(1.4, rate || pref.rate || 0.9));
      u.pitch = pref.pitch || 1;
      var v = pick();
      if (v) { u.voice = v; u.lang = v.lang; }
      u.onend = resolve;
      u.onerror = resolve;
      speechSynthesis.speak(u);
    });
  }

  window.JPVoice = { speak: speak, voices: jaVoices, pref: pref, open: open };

  // ---------- 样式：值全部来自 tokens.css ----------
  var CSS = [
    /* 槽位撑满一行：flex-basis 100% 让入口按钮的 width:100% 有确定的参照宽度 */
    '.jpv-slot{display:block;flex:1 1 100%;min-width:0;}',
    '.jpv-entry{width:100%;min-height:44px;padding:0 var(--s4);display:inline-flex;align-items:center;justify-content:center;',
    'border:1px solid var(--line-control);border-radius:var(--r-ctl);background:var(--card);color:var(--ink);',
    'font-family:var(--font-zh);font-size:13.5px;font-weight:600;cursor:pointer;}',
    '.jpv-entry:active{background:var(--inset);}',
    /* 透明捕获层：不加可见遮罩，层级只靠 --shadow-overlay；点它关闭 */
    '.jpv-catch{position:fixed;inset:0;z-index:9998;background:transparent;}',
    '.jpv-panel{position:fixed;left:var(--s4);right:var(--s4);bottom:calc(var(--s5) + env(safe-area-inset-bottom,0px));',
    'z-index:9999;max-width:420px;margin:0 auto;padding:var(--s2) var(--s4) var(--s4);',
    'background:var(--card);border:1px solid var(--line-control);border-radius:var(--r-card);',
    'box-shadow:var(--shadow-overlay);color:var(--ink);font-family:var(--font-zh);font-size:14px;line-height:1.6;}',
    '.jpv-head{display:flex;align-items:center;justify-content:space-between;gap:var(--s3);min-height:44px;}',
    '.jpv-head h4{margin:0;font-family:var(--font-zh);font-size:15px;font-weight:700;}',
    '.jpv-x{display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin-right:calc(var(--s2) * -1);',
    'border:0;border-radius:var(--r-pill);background:none;color:var(--text-muted);font-size:20px;line-height:1;cursor:pointer;}',
    '.jpv-x:active{background:var(--inset);}',
    '.jpv-panel label{display:block;margin:var(--s3) 0 var(--s1);font-size:12px;color:var(--text-soft);}',
    '.jpv-panel select,.jpv-panel input[type=range]{width:100%;}',
    '.jpv-panel select{min-height:44px;padding:0 var(--s2);border:1px solid var(--line-control);border-radius:var(--r-ctl);',
    'background:var(--card);color:var(--ink);font-family:var(--font-zh);font-size:13px;}',
    '.jpv-row{display:flex;gap:var(--s2);margin-top:var(--s4);}',
    '.jpv-row button{flex:1;min-height:44px;border:1px solid var(--line-control);border-radius:var(--r-ctl);',
    'background:var(--card);color:var(--ink);font-family:var(--font-zh);font-size:13.5px;font-weight:600;cursor:pointer;}',
    '.jpv-row button.jpv-p{border-color:var(--brand);color:var(--brand);}',
    '.jpv-tip{margin:var(--s3) 0 0;font-size:12px;line-height:1.65;color:var(--text-soft);}',
    '.jpv-entry:focus-visible,.jpv-x:focus-visible,.jpv-panel select:focus-visible,.jpv-panel input:focus-visible,',
    '.jpv-row button:focus-visible{outline:2px solid var(--brand);outline-offset:2px;}'
  ].join('');

  // ---------- 挂载：只在有 [data-voice-slot] 的页面渲染入口 ----------
  var panelEl = null, catchEl = null, lastFocus = null, mounted = false;

  function mount() {
    var slot = document.querySelector('[data-voice-slot]');
    if (!slot) return null;                       // 没有槽位 → 不渲染任何入口，也不回退到 fixed
    if (mounted) return slot;

    if (!document.getElementById('jpv-style')) {
      var style = document.createElement('style');
      style.id = 'jpv-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    slot.classList.add('jpv-slot');
    var entry = document.createElement('button');
    entry.type = 'button';
    entry.className = 'jpv-entry';
    entry.textContent = '语音';                    // 工具行只有 6 格，'语音设置' 在 iOS 放大字号时会挤换行
    entry.setAttribute('aria-label', '语音设置');
    entry.onclick = open;
    slot.appendChild(entry);

    mounted = true;
    return slot;
  }

  function build() {
    if (panelEl) return;

    catchEl = document.createElement('div');
    catchEl.className = 'jpv-catch';
    catchEl.setAttribute('aria-hidden', 'true');
    catchEl.addEventListener('click', close);
    catchEl.hidden = true;

    panelEl = document.createElement('div');
    panelEl.className = 'jpv-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-modal', 'true');
    panelEl.setAttribute('aria-labelledby', 'jpvTitle');
    panelEl.hidden = true;
    panelEl.innerHTML = [
      '<div class="jpv-head"><h4 id="jpvTitle">语音设置</h4>',
      '<button class="jpv-x" type="button" aria-label="关闭语音设置">×</button></div>',
      '<label for="jpvSel">设备上的日语语音</label>',
      '<select id="jpvSel"></select>',
      '<label for="jpvRate">语速 <span id="jpvRateTxt"></span></label>',
      '<input id="jpvRate" type="range" min="0.6" max="1.2" step="0.05">',
      '<div class="jpv-row"><button id="jpvTest" class="jpv-p" type="button">试听</button></div>',
      '<p class="jpv-tip" id="jpvTip"></p>'
    ].join('');

    document.body.appendChild(catchEl);
    document.body.appendChild(panelEl);

    panelEl.querySelector('.jpv-x').addEventListener('click', close);
    panelEl.querySelector('#jpvTest').addEventListener('click', function () {
      speak('おんせんは とても きもちがいいです。', pref.rate);
    });
    panelEl.querySelector('#jpvSel').addEventListener('change', function (e) {
      pref.voiceURI = e.target.value; save();
    });
    var rateEl = panelEl.querySelector('#jpvRate');
    rateEl.addEventListener('input', function () {
      pref.rate = parseFloat(rateEl.value);
      panelEl.querySelector('#jpvRateTxt').textContent = pref.rate.toFixed(2) + '×';
      save();
    });
    if (window.speechSynthesis) speechSynthesis.onvoiceschanged = fill;
  }

  function fill() {
    if (!panelEl) return;
    var sel = panelEl.querySelector('#jpvSel'),
        rateEl = panelEl.querySelector('#jpvRate'),
        rateTxt = panelEl.querySelector('#jpvRateTxt'),
        tip = panelEl.querySelector('#jpvTip');
    var list = jaVoices();

    rateEl.value = pref.rate;
    rateTxt.textContent = pref.rate.toFixed(2) + '×';

    sel.innerHTML = '';
    if (!list.length) {
      var o0 = document.createElement('option');
      o0.value = '';
      o0.textContent = '（本机没有日语语音）';
      sel.appendChild(o0);
      tip.textContent = '这台设备没检测到日语语音。iPhone/iPad 在「设置 → 辅助功能 → 朗读内容 → 声音 → 日语」里可以下载；Windows 在「设置 → 时间和语言 → 语音 → 添加语音 → 日语」；安卓在「设置 → 系统 → 语言与输入 → 文字转语音」里选日语引擎。';
      return;
    }
    list.forEach(function (v) {
      var o = document.createElement('option');
      o.value = v.voiceURI;
      o.textContent = v.name + '（' + v.lang + '）';
      if (pref.voiceURI && v.voiceURI === pref.voiceURI) o.selected = true;
      sel.appendChild(o);
    });
    if (!pref.voiceURI) { pref.voiceURI = list[0].voiceURI; save(); }
    tip.textContent = '换了没反应？刷新一次页面让语音列表重新加载。语速 0.85–0.95 通常更清楚。';
  }

  // 三条退出路径：点面板外（透明捕获层）/ Esc / 右上角关闭按钮
  function open() {
    if (!mount()) return;          // 没有槽位就不打开，避免"有面板没入口"
    build();
    lastFocus = document.activeElement;
    catchEl.hidden = false;
    panelEl.hidden = false;
    fill();
    var x = panelEl.querySelector('.jpv-x');
    if (x) x.focus();
  }

  function close() {
    if (!panelEl || panelEl.hidden) return;
    panelEl.hidden = true;
    catchEl.hidden = true;
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') close();
  });

  function boot() { mount(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
