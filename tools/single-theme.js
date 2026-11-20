/*
 * P2-a 一次性迁移（2026-11-20）：双主题 → 单一侘寂
 *   1) wabi.css → layout.css：剥掉 html[data-theme="wabi"] 前缀，规则变成常驻
 *   2) 13 个 HTML：删主题恢复脚本、删 theme.js、wabi.css 换 layout.css、meta theme-color 换纸色
 *   3) index.html：删「和風 / 侘寂」切换控件（CSS + 标记）
 *   4) sw.js / publish.mjs / manifest：跟着换文件名与版本
 *
 * 换行：仓库 .gitattributes 是 `* text=auto eol=lf`，但工作区里的 HTML 是 CRLF。
 * 本脚本统一按 LF 读写（先归一化再匹配），否则跨行的正则一条都命中不了。
 * 幂等：已迁移过的文件不会二次改动。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s, 'utf8');

/* ---------- 1. wabi.css → layout.css ---------- */
let css = read('wabi.css');

/* 只吃掉文件开头这一段说明，不能贪婪到中间的 *​/ */
css = css.replace(/^\/\*[\s\S]*?\*\/\n/, '');
css = css.split('html[data-theme="wabi"] ').join('');

const header = `/* layout.css —— 侘寂版式层（2026-11-20 起为全站唯一版式，不再有主题开关）
   配色 / 圆角 / 字体由 tokens.css 的 :root 负责，这里只管版式：
     ① 首页：竖排标题 + 巨数字 + 无框
     ② 目录 / 复习 / 课文：去边框、去白卡，靠发丝线与留白分层
     ③ 课文：可切「縦書き」竖排阅读
   所有色值都用 var()，不写字面色值（P6 grep 保持基线）。
   ⚠️ 本文件由 wabi.css 改名而来：原选择器带 html[data-theme="wabi"] 前缀，
   改单一主题后前缀已全部剥掉，因此下面每条规则都常驻生效，不要再加主题限定。
*/

`;

/* 原先给浮动切换按钮留的位，按钮已删，留白也撤掉 */
css = css.replace(/\.wrap\{position:relative;padding-left:12px;\}\n\n?/, '');

/* 原 wabi.css 的 bug：写成 .entry .t / .entry .s，index.html 实际是 .e-t / .e-s，
   这条规则从来没生效过。单一主题后必须修，否则首页阅读入口还是卡片样式。 */
css = css.replace(/\.pg-home \.entry \.t\{/, '.pg-home .entry .e-t{');
css = css.replace(/\.pg-home \.entry \.s\{/, '.pg-home .entry .e-s{');

/* 竖排按钮：原先靠 data-theme 显隐，现在常显 */
css = css.replace(/#btnVertical\{display:none;\}\n/, '');

write('layout.css', header + css.trim() + '\n');
console.log('layout.css: ' + fs.statSync(path.join(ROOT, 'layout.css')).size + ' bytes（wabi.css 原 ' +
  fs.statSync(path.join(ROOT, 'wabi.css')).size + ' bytes）');

/* ---------- 2. 13 个 HTML ---------- */
const htmls = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let touched = 0;

htmls.forEach(f => {
  let t = read(f);
  const before = t;

  t = t.replace(/<script>try\{var t=localStorage\.getItem\("jr_theme"\);[\s\S]*?<\/script>\n/, '');
  t = t.replace(/<script src="theme\.js"><\/script>\n/g, '');
  t = t.replace(/<link rel="stylesheet" href="wabi\.css">/g, '<link rel="stylesheet" href="layout.css">');
  t = t.replace(/<meta name="theme-color" content="#1e3a5f">/g, '<meta name="theme-color" content="#E8E2D6">');

  /* index.html：删「风格 和風 / 侘寂」这组文字控件 */
  t = t.replace(/\n  <div class="style-switch"[\s\S]*?\n  <\/div>\n/, '\n');
  t = t.replace(/\.style-switch\{[\s\S]*?\.ss-sep\{[^}]*\}\n/, '');

  if (t !== before) { write(f, t); touched++; }
});
console.log('HTML 已迁移：' + touched + ' / ' + htmls.length + ' 个页面');

/* ---------- 3. sw.js ---------- */
let sw = read('sw.js');
sw = sw
  .replace("  './wabi.css',", "  './layout.css',")
  .replace("  './theme.js',\n", '');
write('sw.js', sw);
console.log('sw.js: wabi.css → layout.css，theme.js 出列');

/* ---------- 4. publish.mjs ---------- */
let pub = read('tools/publish.mjs');
pub = pub
  .replace("const JS = ['cloud.js', 'content.js', 'theme.js', 'voice.js', 'sw.js'];",
           "const JS = ['cloud.js', 'content.js', 'voice.js', 'article-extras.js', 'sw.js'];")
  .replace("const must = ['index.html', 'tokens.css', 'common.css', 'wabi.css', 'content.js', 'theme.js', 'sw.js'];",
           "const must = ['index.html', 'tokens.css', 'common.css', 'layout.css', 'content.js', 'article-extras.js', 'sw.js'];");
write('tools/publish.mjs', pub);
console.log('publish.mjs: 文件清单已更新');

/* ---------- 5. manifest ---------- */
let man = read('manifest.webmanifest');
man = man
  .replace(/"background_color":\s*"[^"]*"/, '"background_color": "#E8E2D6"')
  .replace(/"theme_color":\s*"[^"]*"/, '"theme_color": "#E8E2D6"');
write('manifest.webmanifest', man);
console.log('manifest: background/theme → 纸色');
