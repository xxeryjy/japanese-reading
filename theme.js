/* theme.js —— 双主题切换（和风 / 侘寂）
 * 主题由 <html data-theme="wabi"> 控制，色值全部来自 tokens.css，本文件不写任何字面色值（P6 grep 归零）。
 * 无 data-theme = 和风（默认）；data-theme="wabi" = 侘寂。
 * 切换按钮固定在屏幕右缘中部，显示的是「点了会变成什么」：和风时显示「侘」，侘寂时显示「和」。
 */
(function () {
  var KEY = 'jr_theme';
  var root = document.documentElement;

  function current() { return root.getAttribute('data-theme') === 'wabi' ? 'wabi' : 'washi'; }

  function syncUI(theme) {
    var isWabi = theme === 'wabi';
    var opts = document.querySelectorAll('[data-theme-opt]');
    Array.prototype.forEach.call(opts, function (o) {
      o.setAttribute('aria-pressed', o.getAttribute('data-theme-opt') === theme ? 'true' : 'false');
    });
    /* 状态栏 / 浏览器主题色跟随：和风用品牌色，侘寂用纸色 */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var v = getComputedStyle(root).getPropertyValue(isWabi ? '--paper' : '--brand').trim();
      if (v) meta.setAttribute('content', v);
    }
  }

  function apply(theme) {
    if (theme === 'wabi') root.setAttribute('data-theme', 'wabi');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem(KEY, theme); } catch (e) { /* 隐私模式忽略 */ }
    syncUI(theme);
  }

  function mount() {
    var opts = document.querySelectorAll('[data-theme-opt]');
    Array.prototype.forEach.call(opts, function (o) {
      o.addEventListener('click', function () { apply(o.getAttribute('data-theme-opt')); });
    });
    syncUI(current());
  }


  /* 课文页：注入「縦書き」切换（只在侘寂主题显示，见 wabi.css） */
  function mountVertical() {
    var bar = document.querySelector('.toolbar');
    var panel = document.getElementById('text');
    if (!bar || !panel || document.getElementById('btnVertical')) return;
    var b = document.createElement('button');
    b.id = 'btnVertical';
    b.type = 'button';
    b.className = 'tbtn';
    b.textContent = '縦書き';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('title', '竖排阅读');
    b.addEventListener('click', function () {
      var on = panel.getAttribute('data-writing') === 'v';
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
    bar.appendChild(b);
  }

  function boot(){ mount(); mountVertical(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
