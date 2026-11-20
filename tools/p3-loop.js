/*
 * P3（2026-11-20）：让学习闭环合上
 *   A. 目录已读状态：实心编号＝读过，空心＝没读（本机记录，不进云端）
 *   B. 复习结果回流文章：错词逐条可点回原句；按篇练的结果页给「回到这篇」
 *   C. 文章页支持 ?s=N 深链接：滚到第 N 句并高亮 2.6 秒
 * 每处替换都断言命中，改不到就报错退出（避免"改了个寂寞"）。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function edit(file, pairs) {
  const p = path.join(ROOT, file);
  let t = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  let n = 0;
  for (const [name, from, to] of pairs) {
    if (t.includes(to)) { console.log('  · 已是目标状态：' + file + ' / ' + name); continue; }
    if (!t.includes(from)) { console.error('✗ 锚点未命中：' + file + ' / ' + name); process.exit(1); }
    t = t.replace(from, to);
    n++;
  }
  fs.writeFileSync(p, t, 'utf8');
  console.log('  ' + file + '：' + n + ' 处');
}

/* ================= A. 目录已读状态 ================= */
edit('reading.html', [
  ['未读样式', `.stamp{
  flex:none;display:flex;align-items:center;justify-content:center;
  width:28px;height:28px;border-radius:var(--r-tag);
  background:var(--piece);color:var(--on-fill);
  font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.02em;
}`,
`.stamp{
  flex:none;display:flex;align-items:center;justify-content:center;
  width:28px;height:28px;border-radius:var(--r-tag);
  background:var(--piece);color:var(--on-fill);
  font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:.02em;
}
/* 未读：篇色描边 + 篇色字（实心＝读过）。同一套篇色表达两种状态，不引入新颜色 */
.stamp.is-unread{background:transparent;color:var(--piece);border:1px solid var(--piece);}`],

  ['渲染逻辑', `  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  document.getElementById('cards').innerHTML = A.map(function(a){
    return '<a class="card" href="'+esc(a.file)+'" data-piece="'+esc(a.id)+'">'+
      '<div class="stamp-row"><span class="stamp">'+esc(a.no)+'</span><span class="cat">'+esc(a.cat)+'</span></div>'+`,
`  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

  /* 已读状态：由 article.js 在打开课文时写入本机。不做云端同步——它说明的是「这台设备读过」，
     不是学习成果，跟着账号跑没有意义，还会让"换手机后进度倒退"变成误解。 */
  const READ_KEY = 'jp_read_v1';
  let READ = {};
  try { READ = JSON.parse(localStorage.getItem(READ_KEY) || '{}') || {}; } catch(e){ READ = {}; }
  const readN = A.filter(function(a){ return READ[a.id]; }).length;
  const hint = document.querySelector('.hint');
  if (hint && readN) {
    hint.textContent = '已读 ' + readN + ' / ' + A.length + ' 篇 · 实心编号＝读过，空心＝还没读';
  }

  document.getElementById('cards').innerHTML = A.map(function(a){
    return '<a class="card" href="'+esc(a.file)+'" data-piece="'+esc(a.id)+'">'+
      '<div class="stamp-row"><span class="stamp'+(READ[a.id]?'':' is-unread')+'">'+esc(a.no)+'</span><span class="cat">'+esc(a.cat)+'</span></div>'+`]
]);

/* ================= B. 文章页：记录已读 + ?s=N 深链接 ================= */
edit('article.js', [
  ['已读记录 + 跳句', `  /* ================= 启动 ================= */
  function init() {`,
`  /* ================= 已读记录 / 深链接 =================
     目录页读同一个键画实心/空心编号。只记本机，不进云端。 */
  const READ_KEY = 'jp_read_v1';

  function markRead() {
    let all = {};
    try { all = JSON.parse(localStorage.getItem(READ_KEY) || '{}') || {}; } catch (e) { all = {}; }
    const prev = all[ART.id] || {};
    all[ART.id] = { at: Date.now(), n: (prev.n || 0) + 1 };
    try { localStorage.setItem(READ_KEY, JSON.stringify(all)); } catch (e) {}
  }

  /* 复习结果的错词点回来时带 ?s=N：直接滚到那一句并高亮一会儿 */
  function jumpToSentence() {
    let n = 0;
    try { n = parseInt(new URLSearchParams(location.search).get('s'), 10) || 0; } catch (e) { n = 0; }
    if (n <= 0) return;
    const el = doc.querySelector('#article .sent:nth-child(' + n + ')');
    if (!el) return;
    activate('text', true);
    el.scrollIntoView({ block: 'center' });
    el.classList.add('hl');
    setTimeout(function () { el.classList.remove('hl'); }, 2600);
  }

  /* ================= 启动 ================= */
  function init() {`],

  ['init 调用', `    bindLookup();
    maybeHint();
  }`,
`    bindLookup();
    maybeHint();
    markRead();
    jumpToSentence();
  }`]
]);

/* ================= B2. 高亮样式 ================= */
{
  const p = path.join(ROOT, 'common.css');
  let t = fs.readFileSync(p, 'utf8');
  if (!t.includes('.sent.hl')) {
    t += `
/* 深链接命中句：闪一下高亮再退回。用 --mark 而不是描边——描边会和 .sent 的
   border-bottom 发丝线混在一起，看不出来是哪一句。 */
.sent{transition:background-color .35s;}
.sent.hl{background:var(--mark);}
`;
    fs.writeFileSync(p, t, 'utf8');
    console.log('  common.css：深链接高亮样式');
  }
}

/* ================= C. 复习结果回流 ================= */
edit('review.html', [
  ['结果页多一个「回到这篇」', `      <button id="btnAgain" type="button">再练这些没记住的</button>`,
`      <button id="btnAgain" type="button">再练这些没记住的</button>
      <a class="rb" id="btnBackArt" hidden>回到这篇再读一遍</a>`],

  ['按钮样式', `.resultbtns .primary{background:var(--brand);border-color:var(--brand);color:var(--on-fill);}`,
`.resultbtns .primary{background:var(--brand);border-color:var(--brand);color:var(--on-fill);}
/* 「回到这篇」是链接不是按钮：同样 48px 高、同样描边，但是 a 标签（要带 href 才能新开/返回） */
.resultbtns a.rb{
  display:flex;align-items:center;justify-content:center;
  min-height:48px;padding:var(--s3);
  border:1px solid var(--line-control);border-radius:var(--r-ctl);
  background:transparent;color:var(--ink);
  font-size:14.5px;font-weight:600;text-decoration:none;
}
.resultbtns a.rb:active{background:var(--inset);}
/* 错词条目整条可点，右下角提示回到第几句 */
.wronglist a.wl{display:block;color:inherit;text-decoration:none;}
.wronglist a.wl:active{background:var(--inset);}
.wronglist .wl-go{display:inline-block;margin-top:2px;font-size:11.5px;letter-spacing:.04em;color:var(--brand);}`],

  ['记录本轮范围', `let queue = [], idx = 0, okCount = 0, wrongList = [], flipped = false;`,
`let queue = [], idx = 0, okCount = 0, wrongList = [], flipped = false;
let curScope = 'due';        // 本轮范围：'due' / 'weak' / 'all' / 篇 id —— 结算时用来给「回到这篇」`],

  ['startQueue 存范围', `  queue = (scope === 'all') ? shuffle(words.slice()) : words.slice();`,
`  curScope = scope || 'due';
  queue = (scope === 'all') ? shuffle(words.slice()) : words.slice();`],

  ['refOf', `function fmt(ts){`,
`/* 词 → 它第一次出现的句子（用于错词回流）。句子已上移到 content.js，这里直接读数据。 */
function refOf(w){
  const a = ARTICLE_BY_ID[w.a] || {};
  const sents = a.sentences || [];
  const key = String(w.ja).replace(/（.*?）/g,'').replace(/[〜~]/g,'').trim();
  for(let i = 0; i < sents.length; i++){
    if(key && (sents[i].plain || '').indexOf(key) >= 0) return { file: a.file, no: i + 1 };
  }
  return { file: a.file, no: 0 };
}

function fmt(ts){`],

  ['错词渲染成链接', `  wrongList.forEach(w=>{
    const d = document.createElement('div');
    d.innerHTML = \`<b lang="ja">\${w.ja}</b>\${w.kana?\` <span class="k" lang="ja">\${w.kana}</span>\`:''}<div class="k" lang="zh-CN">\${w.zh}</div>\`;
    wl.appendChild(d);
  });`,
`  wrongList.forEach(w=>{
    const ref = refOf(w);
    const href = ref.file ? ref.file + (ref.no ? '?s=' + ref.no : '') : '';
    const go = ref.no ? '回到第 ' + ref.no + ' 句 ›' : (href ? '回到这篇 ›' : '');
    const d = document.createElement('div');
    d.innerHTML =
      (href ? '<a class="wl" href="' + href + '">' : '') +
      \`<b lang="ja">\${w.ja}</b>\${w.kana?\` <span class="k" lang="ja">\${w.kana}</span>\`:''}\` +
      \`<div class="k" lang="zh-CN">\${w.zh}</div>\` +
      (go ? '<span class="wl-go">' + go + '</span>' : '') +
      (href ? '</a>' : '');
    wl.appendChild(d);
  });

  /* 按篇练的一轮结束后，给一条明确的回程路 */
  const back = $('btnBackArt');
  if(back){
    const a = ARTICLE_BY_ID[curScope];
    if(a && a.file){
      back.href = a.file;
      back.textContent = '回到第 ' + a.no + ' 篇「' + (a.short || a.ja) + '」再读一遍';
      back.hidden = false;
    }else{
      back.hidden = true;
    }
  }`]
]);
