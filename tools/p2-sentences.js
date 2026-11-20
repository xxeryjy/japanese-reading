/*
 * P2-a 一次性迁移（2026-11-20）：句子上移 + 抽公共脚本
 *   1) 10 个课文页的 SENTS 数组 → content.js 的 articles[].sentences
 *   2) 页面里那段 6600 字的公共逻辑 → 删掉，改引 article.js（已手写，含点词查义）
 *   3) sw.js 预缓存补 article.js
 * 幂等：已经迁移过的页面找不到 SENTS 块，会跳过。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const FILES = ['vending-machines', 'new-year', 'onsen', 'konbini', 'train',
               'sakura', 'school', 'gomi', 'matsuri', 'fuji'];

/* ---------- 1. 抽句子到 content.js ---------- */
const contentPath = path.join(ROOT, 'content.js');
const src = fs.readFileSync(contentPath, 'utf8');
global.window = {};
require(contentPath);
const data = global.window.APP_DATA;

let total = 0;
FILES.forEach((f, idx) => {
  const p = path.join(ROOT, f + '.html');
  let t = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

  const m = t.match(/<script>\nconst SENTS\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) { console.log('  跳过（已迁移）: ' + f); return; }

  const sents = eval(m[1]);
  const art = data.articles.filter((a) => a.file === f + '.html')[0];
  if (!art) { console.error('✗ content.js 里找不到 ' + f); process.exit(1); }

  /* 只留渲染要用的四个字段，顺序固定，避免 diff 噪音 */
  art.sentences = sents.map((s) => ({
    jp: s.jp, ro: s.ro, zh: s.zh, plain: s.plain
  }));
  art.sentCount = sents.length;
  total += sents.length;

  /* ---------- 2. 换掉整段内联脚本 ---------- */
  t = t.replace(/<script>\nconst SENTS[\s\S]*?\n<\/script>\n/,
                '<script src="article.js"></script>\n');
  fs.writeFileSync(p, t, 'utf8');
  console.log('  ' + f.padEnd(18) + ' ' + sents.length + ' 句 → content.js，页面改引 article.js');
});

/* 校验：句子数必须和 sentCount 一致 */
const bad = data.articles.filter((a) => !a.sentences || a.sentences.length !== a.sentCount);
if (bad.length) { console.error('✗ 句数不符：' + bad.map((a) => a.id).join(',')); process.exit(1); }

const header = src.slice(0, src.indexOf('window.APP_DATA='));
fs.writeFileSync(contentPath,
  header + 'window.APP_DATA=' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
console.log('content.js：' + total + ' 句已入库，文件 ' +
  Math.round(fs.statSync(contentPath).size / 1024) + ' KB');

/* ---------- 3. sw.js ---------- */
let sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8').replace(/\r\n/g, '\n');
if (!sw.includes("'./article.js'")) {
  sw = sw.replace("  './article-extras.js',", "  './article.js',\n  './article-extras.js',");
  fs.writeFileSync(path.join(ROOT, 'sw.js'), sw, 'utf8');
  console.log('sw.js：预缓存已补 article.js');
}

/* ---------- 4. publish.mjs 的 JS 清单 ---------- */
let pub = fs.readFileSync(path.join(ROOT, 'tools', 'publish.mjs'), 'utf8');
if (!pub.includes("'article.js'")) {
  pub = pub.replace("const JS = ['cloud.js', 'content.js', 'voice.js', 'article-extras.js', 'sw.js'];",
                    "const JS = ['cloud.js', 'content.js', 'article.js', 'voice.js', 'article-extras.js', 'sw.js'];");
  fs.writeFileSync(path.join(ROOT, 'tools', 'publish.mjs'), pub, 'utf8');
  console.log('publish.mjs：JS 清单已补 article.js');
}
