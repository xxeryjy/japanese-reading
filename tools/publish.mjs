#!/usr/bin/env node
/* publish.mjs —— 发版前处理（改完代码就跑它，然后调用部署工具）
 *
 * 做两件事，防止"改了但用户看到的还是旧版"：
 *   1. 把 sw.js 的 VERSION 自动加一（不改版本号 = 老客户端永远拿旧缓存）
 *   2. 重建 dist/，只放应用文件（不含 design/、_shots/、测试脚本）
 *
 * 用法：node tools/publish.mjs
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import wordMatch from './word-match.js';

const { wordInText } = wordMatch;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const HTML = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const CSS = readdirSync(ROOT).filter((f) => f.endsWith('.css'));
const JS = ['cloud.js', 'content.js', 'article.js', 'voice.js', 'article-extras.js', 'sw.js'];
const ASSETS = ['icon-180.png', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest'];

/* 1. bump VERSION */
const swPath = join(ROOT, 'sw.js');
let sw = readFileSync(swPath, 'utf8');
const m = sw.match(/const VERSION = 'v(\d+)';/);
if (!m) {
  console.error('✗ 找不到 VERSION，请检查 sw.js');
  process.exit(1);
}
const next = Number(m[1]) + 1;
sw = sw.replace(`const VERSION = 'v${m[1]}';`, `const VERSION = 'v${next}';`);
writeFileSync(swPath, sw, 'utf8');
console.log(`✓ sw.js 缓存版本 v${m[1]} → v${next}`);

/* 1.5 校验 content.js（SRS 以 ja 作键：词条重复会共用同一条复习记录，属静默故障） */
{
  const src = readFileSync(join(ROOT, 'content.js'), 'utf8');
  const i = src.indexOf('window.APP_DATA=');
  const data = JSON.parse(src.slice(i + 'window.APP_DATA='.length).replace(/;\s*$/, ''));
  const seen = new Set();
  const dup = [];
  data.words.forEach((w) => { if (seen.has(w.ja)) dup.push(`${w.ja}(a${w.a || '?'})`); seen.add(w.ja); });
  if (dup.length) {
    console.error('✗ 词条 ja 重复，SRS 记录会互相覆盖：' + dup.join('、'));
    console.error('  修法：换掉其中一条（同一句里找另一个词），或确认是否真的该教两遍。');
    process.exit(1);
  }
  const bad = data.articles.filter((a) => {
    const n = data.words.filter((w) => w.a === a.id).length;
    return n !== 15;
  });
  if (bad.length) {
    console.error('✗ 每篇必须 15 词，不符合：' + bad.map((a) => `${a.id}=${data.words.filter((w) => w.a === a.id).length}`).join('、'));
    process.exit(1);
  }
  console.log(`✓ content.js：${data.articles.length} 篇 / ${data.words.length} 词，全站唯一，每篇 15 词`);

  /* 词条是否真的出现在本文（只告警不阻断）。辞書形 / て形 / た形 的差异交给 word-match.js，
     和 add-core.js 用同一个匹配器——两处规则不一致的话，加文章时通过、发版时又报，最折腾人。 */
  const ghosts = [];
  for (const a of data.articles) {
    const plain = (a.sentences || []).map((s) => s.plain || '').join('');
    for (const w of data.words.filter((x) => x.a === a.id)) {
      if (!wordInText(w.ja, plain)) ghosts.push(`${a.id} ${w.ja}`);
    }
  }
  if (ghosts.length) {
    console.warn('⚠ 以下词条在本篇课文中找不到，请人工确认：' + ghosts.join('、'));
  } else {
    console.log('✓ 词条与课文逐条对得上');
  }
}

/* 2. 重建 dist */
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
for (const f of [...HTML, ...CSS, ...JS]) {
  if (existsSync(join(ROOT, f))) cpSync(join(ROOT, f), join(DIST, f));
}
for (const f of ASSETS) {
  if (existsSync(join(ROOT, f))) cpSync(join(ROOT, f), join(DIST, f));
}
if (existsSync(join(ROOT, 'vendor'))) cpSync(join(ROOT, 'vendor'), join(DIST, 'vendor'), { recursive: true });

/* 3. 校验关键文件 */
const must = ['index.html', 'tokens.css', 'common.css', 'layout.css', 'content.js', 'article.js', 'article-extras.js', 'sw.js'];
const missing = must.filter((f) => !existsSync(join(DIST, f)));
if (missing.length) {
  console.error('✗ dist 缺少：' + missing.join(', '));
  process.exit(1);
}
const size = readdirSync(DIST).length;
console.log(`✓ dist/ 已重建（${size} 个顶层条目）`);
console.log('\n下一步：调用部署工具发布 dist/，发布后用线上链接回给用户。');
