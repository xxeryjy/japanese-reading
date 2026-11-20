/*
 * P2-c（2026-11-20）：复习评分从二值改三档 + 间隔延长
 *
 * 原来：记住了 / 没记住 二选一，间隔 1/3/7 天，答对 3 次（累计 11 天）就永久「掌握」。
 * 问题：① 把「想了 4 秒才想起」和「秒答」混为一谈；② 7 天远不到长期记忆。
 * 现在：忘了（s→0，当场重考） / 想起来了（s+1） / 很熟（s+2），间隔 1/3/7/16/35 天，
 *       35 天档通过才算掌握。
 *
 * 数据兼容：字段不变（s/due/n/bad），云端同步不用动。
 * 但 MASTER_AT 3→5 意味着老用户里 s=3 的词会重新进入复习队列 —— 这正是要修的（7 天 ≠ 掌握）。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const p = path.join(ROOT, 'review.html');
let t = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const before = t;
let n = 0;
const step = (name, fn) => {
  const out = fn(t);
  if (out !== t) { t = out; n++; }
  else console.warn('  ! 未命中：' + name);
};

/* ---------- 1. 间隔表 + 掌握线 ---------- */
step('STEP_MS', (s) => s.replace(
  "const STEP_MS = {1: 1*DAY, 2: 3*DAY, 3: 7*DAY};",
  "const STEP_MS = {1: 1*DAY, 2: 3*DAY, 3: 7*DAY, 4: 16*DAY, 5: 35*DAY};   // 35 天档通过才算掌握"));

step('MASTER_AT', (s) => s.replace(
  "const MASTER_AT = 3;",
  "const MASTER_AT = 5;   // 对应 35 天间隔：7 天就标「掌握」太早（2026-11-20 从 3 提到 5）"));

/* ---------- 2. 动作区：两个按钮 → 三个 ---------- */
step('actions', (s) => s.replace(
  `      <button class="no" id="btnNo" type="button">✗ 没记住</button>
      <button class="yes" id="btnYes" type="button">✓ 记住了</button>`,
  `      <button class="no" id="btnNo" type="button" aria-label="忘了，当场再考一次">忘了</button>
      <button class="mid" id="btnMid" type="button" aria-label="想了一会儿才想起来">想起来了</button>
      <button class="yes" id="btnYes" type="button" aria-label="秒答">很熟</button>`));

step('actions css', (s) => s.replace(
  `.actions .yes{border-color:var(--ok);color:var(--ok);background:var(--ok-tint);}`,
  `.actions .mid{border-color:var(--line-control);color:var(--ink);background:var(--card);}
.actions .yes{border-color:var(--ok);color:var(--ok);background:var(--ok-tint);}
/* 三档后每格只有 ~100px，字距收一点，「想起来了」才不会挤 */
.actions button{font-size:14px;letter-spacing:.02em;}`));

/* ---------- 3. 评分函数 ---------- */
step('review()', (s) => s.replace(
`function review(isOk){
  const w = queue[idx];
  const r = Object.assign({s:0, due:0, n:0, bad:0}, SRS[w.ja] || {});
  r.n += 1;
  if(isOk){
    r.s += 1;
    const step = Math.min(r.s, 3);
    r.due = Date.now() + STEP_MS[step];
    if(r.s > MASTER_AT) r.s = MASTER_AT;
    okCount++;
  }else{`,
`/* grade: 0 = 忘了 / 1 = 想起来了 / 2 = 很熟 */
function review(grade){
  const w = queue[idx];
  const r = Object.assign({s:0, due:0, n:0, bad:0}, SRS[w.ja] || {});
  r.n += 1;
  if(grade > 0){
    r.s += (grade === 2 ? 2 : 1);
    if(r.s > MASTER_AT) r.s = MASTER_AT;
    r.due = Date.now() + STEP_MS[Math.min(r.s, MASTER_AT)];
    okCount++;
  }else{`));

step('bind', (s) => s.replace(
`$('btnYes').onclick = ()=> review(true);
$('btnNo').onclick = ()=> review(false);`,
`$('btnYes').onclick = ()=> review(2);
$('btnMid').onclick = ()=> review(1);
$('btnNo').onclick = ()=> review(0);`));

/* ---------- 4. 连对点：3 个 → 5 个 ---------- */
step('dots', (s) => s.replace(
  "$('dots').innerHTML = [0,1,2].map(i=>`<i class=\"${i < Math.min(r.s,3) ? 'on':''}\"></i>`).join('');",
  "$('dots').innerHTML = [0,1,2,3,4].map(i=>`<i class=\"${i < Math.min(r.s,MASTER_AT) ? 'on':''}\"></i>`).join('');"));

step('streakTxt', (s) => s.replace(
  ": (r.s === 0 ? '这轮全对才算 1 次' : r.s + ' / 3，再对 ' + (MASTER_AT - r.s) + ' 次掌握');",
  ": (r.s === 0 ? '答对一次才开始记周期' : r.s + ' / ' + MASTER_AT + '，再对 ' + (MASTER_AT - r.s) + ' 次进 35 天档');"));

/* ---------- 5. 卡背提示 ---------- */
step('hint', (s) => s.replace(
  '<div class="hint">记不起来点左边，记得点右边</div>',
  '<div class="hint">忘了 / 想起来了 / 很熟，按真实感觉点</div>'));

if (t === before) { console.log('review.html：已是最新，未改动'); process.exit(0); }
fs.writeFileSync(p, t, 'utf8');
console.log('review.html：' + n + ' 处改动（三档评分 + 间隔 1/3/7/16/35）');

/* ---------- 6. index.html 的掌握线要跟着改 ---------- */
const ip = path.join(ROOT, 'index.html');
let it = fs.readFileSync(ip, 'utf8').replace(/\r\n/g, '\n');
if (it.includes('const MASTER_AT = 3;')) {
  it = it.replace('const MASTER_AT = 3;', 'const MASTER_AT = 5;   // 必须与 review.html 一致');
  fs.writeFileSync(ip, it, 'utf8');
  console.log('index.html：MASTER_AT 3 → 5（与复习页同口径）');
}
