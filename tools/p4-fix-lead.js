/*
 * P4 修正（2026-11-20）两件事：
 *
 * ① lead 是死字段。课文页的导语在生成 HTML 时就写进了 <p class="lead">，
 *    content.js 里那份**没有任何 JS 读取**——于是两边会漂移（改了数据页面不变，改页面数据不变）。
 *    处理：从 content.js 删掉 lead，让它只存在于 HTML（生成时写入）。
 *
 * ② .lead 的 -webkit-line-clamp:2 把所有 13 篇导语都截成半句（实测每篇都 scrollHeight > clientHeight）。
 *    半句话挂在封面上比封面高一点更难看，去掉 clamp。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------- ① content.js 删 lead ---------- */
{
  const p = path.join(ROOT, 'content.js');
  const src = fs.readFileSync(p, 'utf8');
  const i = src.indexOf('window.APP_DATA=');
  const header = src.slice(0, i);
  const data = JSON.parse(src.slice(i + 'window.APP_DATA='.length).replace(/;\s*$/, ''));

  let n = 0;
  data.articles.forEach((a) => { if ('lead' in a) { delete a.lead; n++; } });
  fs.writeFileSync(p, header + 'window.APP_DATA=' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
  console.log('content.js：已删除 ' + n + ' 篇的 lead 字段（死数据）');
}

/* ---------- ② 三篇新文章的导语换成短版 ---------- */
const NEW_LEAD = {
  'michi.html': '问路最好用：一句话问出去，对方回你三句。这 15 句全是街上真会发生的对话。',
  'nikki.html': '整篇只用过去时。从起床、吃饭到看电影，把 N5 过去时走一遍。',
  'chirashi.html': '促销单没有段落，全是短句、价格和限制条件——最真实的那种阅读。'
};
for (const [file, lead] of Object.entries(NEW_LEAD)) {
  const p = path.join(ROOT, file);
  let t = fs.readFileSync(p, 'utf8');
  const next = t.replace(/<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${lead}</p>`);
  if (next === t) { console.warn('  ! 未命中导语：' + file); continue; }
  fs.writeFileSync(p, next, 'utf8');
  console.log('  ' + file + '：导语 ' + lead.length + ' 字');
}

/* ---------- ③ 去掉两行截断 ---------- */
{
  const p = path.join(ROOT, 'common.css');
  let t = fs.readFileSync(p, 'utf8');
  const from = `.lead{
  margin:var(--s3) 0 0;font-size:15px;line-height:1.7;color:var(--text-soft);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}`;
  const to = `/* 不再两行截断：13 篇导语全都会超，截出来的半句比封面高一点更难看 */
.lead{
  margin:var(--s3) 0 0;font-size:15px;line-height:1.7;color:var(--text-soft);
}`;
  if (t.includes(from)) {
    fs.writeFileSync(p, t.replace(from, to), 'utf8');
    console.log('common.css：.lead 去掉 line-clamp');
  } else {
    console.warn('  ! .lead 规则未命中（可能已改过）');
  }
}

/* ---------- ④ add-core 不再把 lead 存进 content.js ---------- */
{
  const p = path.join(ROOT, 'tools', 'add-core.js');
  let t = fs.readFileSync(p, 'utf8');
  if (t.includes('desc: a.desc, lead: a.lead,')) {
    t = t.replace('desc: a.desc, lead: a.lead,', 'desc: a.desc,   // lead 只写进页面 HTML，不进 content.js（否则两份会漂移）');
    fs.writeFileSync(p, t, 'utf8');
    console.log('add-core.js：不再存 lead');
  }
}
