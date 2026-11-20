/*
 * add-core.js —— 加文章的唯一入口（2026-11-20 单页化之后）
 *
 * 2026-11-20 之前这里还会「生成课文页 HTML」，那时一篇一个文件。
 * 现在是单页 article.html + ?id=，页面不含任何文章内容，所以加文章**只改数据**：
 *
 *   const { addArticles } = require('./add-core');
 *   addArticles([{ id:'a14', no:'14', cat:'生活', ja:'…', … }]);
 *
 * 校验（不通过就整体拒绝，不会写半个字）：
 *   · id 不重复
 *   · 每篇 15 词、2 题、句子非空、每题 4 个选项
 *   · words[].ja 全站唯一（SRS 以 ja 作键，重复会共用同一条复习记录）
 *   · 词条必须能在本文课文中找到（辞書形/て形 的差异由 word-match.js 处理）
 */
const fs = require('fs');
const path = require('path');
const { wordInText } = require('./word-match');

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content.js');

/* content.js 里 article 的字段顺序，固定下来避免 diff 噪音 */
const ORDER = ['id', 'no', 'cat', 'ja', 'short', 'zh', 'sentCount', 'grammarTag', 'desc',
  'pageTitle', 'titleRuby', 'tags', 'lead', 'cultureTitle', 'grammar', 'facts', 'source',
  'ctaTitle', 'ctaSub', 'sentences', 'quiz', 'verbs'];

function readContent() {
  const src = fs.readFileSync(CONTENT, 'utf8');
  const i = src.indexOf('window.APP_DATA=');
  const header = src.slice(0, i);
  const data = JSON.parse(src.slice(i + 'window.APP_DATA='.length).replace(/;\s*$/, ''));
  return { header, data };
}

function writeContent(header, data) {
  data.articles.sort((x, y) => String(x.id).localeCompare(String(y.id), 'en', { numeric: true }));
  fs.writeFileSync(CONTENT,
    header + 'window.APP_DATA=' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
}

function addArticles(list) {
  const { header, data } = readContent();
  const ids = new Set(data.articles.map((a) => a.id));
  const lemmas = new Set(data.words.map((w) => w.ja));
  const problems = [];

  for (const a of list) {
    if (ids.has(a.id)) continue;
    if ((a.words || []).length !== 15) problems.push(`${a.id} 词数 ${(a.words || []).length} ≠ 15`);
    if (!(a.sentences || []).length) problems.push(`${a.id} 没有 sentences`);
    if ((a.quiz || []).length !== 2) problems.push(`${a.id} 题目数 ${(a.quiz || []).length} ≠ 2`);
    if (!a.titleRuby) problems.push(`${a.id} 缺 titleRuby（封面的日文标题，含 ruby）`);
    if (!(a.facts || []).length) problems.push(`${a.id} 缺 facts（文化页条目）`);

    for (const w of a.words || []) {
      if (lemmas.has(w.ja)) problems.push(`${a.id} 的词「${w.ja}」全站已存在（SRS 以 ja 作键）`);
      lemmas.add(w.ja);
    }
    const plain = (a.sentences || []).map((s) => s.plain || '').join('');
    for (const w of a.words || []) {
      if (!wordInText(w.ja, plain)) problems.push(`${a.id} 的词「${w.ja}」在本文课文中找不到`);
    }
    for (const q of a.quiz || []) {
      if (!Array.isArray(q.opts) || q.opts.length !== 4) problems.push(`${a.id} 有一题不是 4 个选项`);
      if (typeof q.ans !== 'number' || q.ans < 0 || q.ans > 3) problems.push(`${a.id} 有一题答案下标非法`);
      if (!q.ref) problems.push(`${a.id} 有一题缺句子出处`);
    }
  }
  if (problems.length) {
    console.error('✗ 数据校验不通过：\n  - ' + problems.join('\n  - '));
    return false;
  }

  let added = 0, skipped = 0;
  for (const a of list) {
    if (ids.has(a.id)) { skipped++; continue; }
    const art = {
      id: a.id, no: a.no, cat: a.cat, ja: a.ja, short: a.short, zh: a.zh,
      sentCount: a.sentences.length, grammarTag: a.grammarTag, desc: a.desc,
      pageTitle: a.pageTitle, titleRuby: a.titleRuby, tags: a.tags, lead: a.lead,
      cultureTitle: a.cultureTitle || '文化小知识', grammar: a.grammar || [],
      facts: a.facts, source: a.source, ctaTitle: a.ctaTitle || '读完测一下', ctaSub: a.ctaSub,
      sentences: a.sentences.map((s) => {
        const o = { jp: s.jp, ro: s.ro, zh: s.zh, plain: s.plain };
        if (s.sp) o.sp = s.sp;
        return o;
      }),
      quiz: a.quiz, verbs: a.verbs || []
    };
    /* 只保留 ORDER 里的键，多余字段一律不落盘 */
    const clean = {};
    ORDER.forEach((k) => { if (k in art) clean[k] = art[k]; });
    data.articles.push(clean);

    for (const w of a.words) {
      data.words.push({ ja: w.ja, kana: w.kana || '', zh: w.zh, r: w.r || '', m: w.m || '', a: a.id });
    }
    added++;
    console.log(`  + ${a.id} ${a.no} ${a.ja}（${art.sentCount} 句 / ${a.words.length} 词）`);
  }

  writeContent(header, data);
  console.log(`content.js：新增 ${added} 篇，跳过 ${skipped} 篇；现 ${data.articles.length} 篇 / ${data.words.length} 词`);
  console.log('页面不用动：所有文章共用 article.html?id=<id>');
  return true;
}

module.exports = { addArticles, readContent, writeContent };
