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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const HTML = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const CSS = readdirSync(ROOT).filter((f) => f.endsWith('.css'));
const JS = ['cloud.js', 'content.js', 'theme.js', 'voice.js', 'sw.js'];
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
const must = ['index.html', 'tokens.css', 'common.css', 'wabi.css', 'content.js', 'theme.js', 'sw.js'];
const missing = must.filter((f) => !existsSync(join(DIST, f)));
if (missing.length) {
  console.error('✗ dist 缺少：' + missing.join(', '));
  process.exit(1);
}
const size = readdirSync(DIST).length;
console.log(`✓ dist/ 已重建（${size} 个顶层条目）`);
console.log('\n下一步：调用部署工具发布 dist/，发布后用线上链接回给用户。');
