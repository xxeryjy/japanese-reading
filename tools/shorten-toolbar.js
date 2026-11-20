/*
 * P2-b（2026-11-20）：课文工具行文案瘦身
 * 起因：单一主题后工具行是 6 个文字按钮（中译 / 罗马音 / 朗读 / 注音 / 縦書き / 语音设置），
 * 「显示全部中译」「显示罗马音」「▶ 全文朗读」三条太长，375 宽下「语音设置」被挤到第二行。
 * 做法：三条改短标签 + 状态交给下划线（.on）和 aria-pressed 表达，不靠文案切换。
 *   显示全部中译 / 隐藏全部中译 → 中译（恒定）
 *   显示罗马音 / 隐藏罗马音     → 罗马音（恒定）
 *   ▶ 全文朗读                 → ▶ 朗读
 * 幂等：已改过的文件不会二次改动。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const FILES = ['vending-machines', 'new-year', 'onsen', 'konbini', 'train',
               'sakura', 'school', 'gomi', 'matsuri', 'fuji'];

let n = 0;
FILES.forEach(f => {
  const p = path.join(ROOT, f + '.html');
  let t = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const before = t;

  t = t.replace(/id="btnZh" type="button">显示全部中译</,
                'id="btnZh" type="button" aria-pressed="false">中译<');
  t = t.replace(/id="btnRo" type="button">显示罗马音</,
                'id="btnRo" type="button" aria-pressed="false">罗马音<');
  t = t.replace(/id="btnAll" type="button">▶ 全文朗读</,
                'id="btnAll" type="button">▶ 朗读<');

  /* syncMaster：去掉随状态改文案的两行，注释同步改写 */
  t = t.replace(
    /  \/\/ 文案描述"这个按钮按下去会做什么"：[\s\S]*?const any = zhState\.some\(Boolean\);\n  btnZh\.textContent = any \? '隐藏全部中译' : '显示全部中译';\n  btnZh\.classList\.toggle\('on', any\);/,
    `  // 标签恒为「中译」，状态由下划线（.on）与 aria-pressed 表达：
  // 有任意一句展开 → 按下即全部收起；一句都没开 → 按下即全部展开。
  const any = zhState.some(Boolean);
  btnZh.classList.toggle('on', any);
  btnZh.setAttribute('aria-pressed', any ? 'true' : 'false');`);

  /* 罗马音：同理 */
  t = t.replace(
    /  this\.textContent = roOn \? '隐藏罗马音' : '显示罗马音';\n  this\.classList\.toggle\('on', roOn\);/,
    `  this.classList.toggle('on', roOn);
  this.setAttribute('aria-pressed', roOn ? 'true' : 'false');`);

  t = t.split("'▶ 全文朗读'").join("'▶ 朗读'");

  if (t !== before) { fs.writeFileSync(p, t, 'utf8'); n++; }
});
console.log('工具行文案已瘦身：' + n + ' / ' + FILES.length + ' 个课文页');
