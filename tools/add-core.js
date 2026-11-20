/*
 * add-core.js —— 加文章的唯一入口（取代已删除的 gen_content.js）
 *
 * 旧 gen_content.js 是从 5 个 HTML 里「抽取」内容生成 content.js，句子搬到 content.js 之后
 * 它既抽不到东西、又会把后 5 篇覆盖掉，已删除。现在方向反过来：
 *   **数据是源，页面是产物**。
 *
 * addArticles(list) 做三件事：
 *   1. 校验（id/文件不能重名、每篇 15 词、ja 全站唯一）
 *   2. 追加到 content.js（articles + words）
 *   3. 用 page-template.js 生成课文页 HTML
 * 已存在的 id 会被跳过（幂等），所以脚本可以反复跑。
 */
const fs = require('fs');
const path = require('path');
const { pageHTML } = require('./page-template');
const { wordInText } = require('./word-match');

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content.js');

function readContent() {
  const src = fs.readFileSync(CONTENT, 'utf8');
  const i = src.indexOf('window.APP_DATA=');
  const header = src.slice(0, i);
  const data = JSON.parse(src.slice(i + 'window.APP_DATA='.length).replace(/;\s*$/, ''));
  return { header, data, src };
}

function writeContent(header, data) {
  fs.writeFileSync(CONTENT,
    header + 'window.APP_DATA=' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
}

function addArticles(list) {
  const { header, data } = readContent();

  /* ---------- 校验 ---------- */
  const ids = new Set(data.articles.map((a) => a.id));
  const files = new Set(data.articles.map((a) => a.file));
  const lemmas = new Set(data.words.map((w) => w.ja));
  const problems = [];

  for (const a of list) {
    if (ids.has(a.id)) continue;                       // 已存在，稍后跳过
    if (files.has(a.file)) problems.push(`${a.id} 的文件名 ${a.file} 已被占用`);
    if ((a.words || []).length !== 15) problems.push(`${a.id} 词数 ${(a.words || []).length} ≠ 15`);
    if (!(a.sentences || []).length) problems.push(`${a.id} 没有 sentences`);
    if ((a.quiz || []).length !== 2) problems.push(`${a.id} 题目数 ${(a.quiz || []).length} ≠ 2`);
    for (const w of a.words || []) {
      if (lemmas.has(w.ja)) problems.push(`${a.id} 的词「${w.ja}」全站已存在（SRS 以 ja 作键，不能重复）`);
      lemmas.add(w.ja);
    }
    /* 词条必须在本文句子里出现（辞書形 / て形 / た形 的差异由 wordInText 处理） */
    const plain = (a.sentences || []).map((s) => s.plain || '').join('');
    for (const w of a.words || []) {
      if (!wordInText(w.ja, plain)) problems.push(`${a.id} 的词「${w.ja}」在本文课文中找不到`);
    }
    for (const q of a.quiz || []) {
      if (!Array.isArray(q.opts) || q.opts.length !== 4) problems.push(`${a.id} 有一题不是 4 个选项`);
      if (typeof q.ans !== 'number' || !q.opts || q.ans < 0 || q.ans > 3) problems.push(`${a.id} 有一题答案下标非法`);
      if (!q.ref) problems.push(`${a.id} 有一题缺句子出处`);
    }
  }
  if (problems.length) {
    console.error('✗ 数据校验不通过：\n  - ' + problems.join('\n  - '));
    return false;
  }

  /* ---------- 写入 ---------- */
  let added = 0, skipped = 0;
  for (const a of list) {
    if (ids.has(a.id)) { skipped++; continue; }

    const art = {
      id: a.id, no: a.no, cat: a.cat,
      ja: a.ja, short: a.short, zh: a.zh, file: a.file,
      sentCount: a.sentences.length,
      grammarTag: a.grammarTag,
      desc: a.desc,   // lead 只写进页面 HTML，不进 content.js（否则两份会漂移）
      sentences: a.sentences.map((s) => ({ jp: s.jp, ro: s.ro, zh: s.zh, plain: s.plain })),
      quiz: a.quiz,
      verbs: a.verbs || []
    };
    data.articles.push(art);
    for (const w of a.words) {
      data.words.push({ ja: w.ja, kana: w.kana || '', zh: w.zh, r: w.r || '', m: w.m || '', a: a.id });
    }

    const p = path.join(ROOT, a.file);
    if (fs.existsSync(p)) {
      console.warn(`  ! ${a.file} 已存在，未覆盖（只写了数据）`);
    } else {
      fs.writeFileSync(p, pageHTML(a), 'utf8');
    }
    added++;
    console.log(`  + ${a.id} ${a.no} ${a.ja}（${art.sentCount} 句 / ${a.words.length} 词）→ ${a.file}`);
  }

  data.articles.sort((x, y) => String(x.id).localeCompare(String(y.id), 'en', { numeric: true }));

  writeContent(header, data);
  console.log(`\ncontent.js 已更新：新增 ${added} 篇，跳过 ${skipped} 篇；现有 ${data.articles.length} 篇 / ${data.words.length} 词`);

  /* ---------- sw.js 预缓存：新页面必须进清单 ---------- */
  const swPath = path.join(ROOT, 'sw.js');
  let sw = fs.readFileSync(swPath, 'utf8');
  const missing = list
    .filter((a) => fs.existsSync(path.join(ROOT, a.file)))
    .map((a) => './' + a.file)
    .filter((f) => !sw.includes(`'${f}'`));
  if (missing.length) {
    sw = sw.replace("  './tokens.css',",
      missing.map((f) => `  '${f}',`).join('\n') + "\n  './tokens.css',");
    fs.writeFileSync(swPath, sw, 'utf8');
    console.log('sw.js 预缓存已补：' + missing.join(', '));
  }
  return true;
}

module.exports = { addArticles, readContent, writeContent };
