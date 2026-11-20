/*
 * P0 一次性迁移（2026-11-20）
 *   ① SRS 键冲突：词汇表以「词条」为唯一单位，ラベル 曾在 a1 / a8 各一条 → 共享同一条 SRS 记录。
 *      修在数据层：a8 那条换成同一句里的另一个词（びん），150 条全部唯一，键不用改，老数据不动。
 *   ② 清走 4 条句型（不是词）：〜の一つ / だけではありません / 〜たいです / 入ってはいけません。
 *      同篇补 4 个真词，保持每篇 15 词。
 *   ③ a1 语法面板补一条「看懂即可」，收编被移出词表的两条句式。
 * 幂等：按 ja 匹配，已替换过的不会二次改动。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------- 1. 词表替换：旧 ja → 新词条 ---------- */
const REPLACE = {
  '〜の一つ': {
    ja: '赤い', kana: 'あかい', zh: '红的（い形容词）', r: 'akai',
    m: 'い形容词，直接接名词：赤いラベル。反义「青い」。本文用它区分热饮冷饮。'
  },
  'だけではありません': {
    ja: '青い', kana: 'あおい', zh: '蓝的（い形容词）', r: 'aoi',
    m: 'い形容词。日语的「青」常指蓝，也用于绿灯（青信号）。和「赤い」成对记。'
  },
  '〜たいです': {
    ja: '駅', kana: 'えき', zh: '车站', r: 'eki',
    m: '车站。本文第 9 句「駅や、店の前や、山の上にも」——三个地点一起记。'
  },
  '入ってはいけません': {
    ja: '熱い', kana: 'あつい', zh: '烫的、热的（物体温度）', r: 'atsui',
    m: '指物体烫。天气热要用「暑い」，读音同样是 あつい，只差汉字——这是 N5 最常错的一对。'
  },
  /* 冲突项：a8 的「ラベル」与 a1 同词不同语境，SRS 以 ja 作键会共用一条记录。
     拉ベル 已在 a1 讲过，a8 换成同一句里的另一个词。 */
  'ラベル': null
};

/* a8 的ラベル 单独处理：只替换 a8 那一条，a1 的保留 */
const A8_LABEL = {
  ja: 'びん', kana: 'びん', zh: '瓶子（玻璃瓶）', r: 'bin',
  m: '玻璃瓶。易拉罐是「かん」，塑料瓶是「ペットボトル」——三个一起记，本文正好并列出现。'
};

global.window = {};
const src0 = fs.readFileSync(path.join(ROOT, 'content.js'), 'utf8');
require(path.join(ROOT, 'content.js'));
const data = global.window.APP_DATA;

let changed = 0;
data.words = data.words.map(w => {
  if (w.a === 'a8' && w.ja === 'ラベル') { changed++; return Object.assign({ a: 'a8' }, A8_LABEL); }
  const rep = REPLACE[w.ja];
  if (!rep) return w;
  changed++;
  return Object.assign({ a: w.a }, rep);
});

/* 保持原字段顺序（ja / kana / zh / r / m / a），免得 diff 噪音 */
data.words = data.words.map(w => ({
  ja: w.ja, kana: w.kana, zh: w.zh, r: w.r, m: w.m, a: w.a
}));

/* 唯一性自检：SRS 以 ja 作键，重复就会共享记录 */
const seen = Object.create(null), dup = [];
data.words.forEach(w => { if (seen[w.ja]) dup.push(w.ja); seen[w.ja] = 1; });
if (dup.length) { console.error('✗ 仍有重复词条：' + dup.join(', ')); process.exit(1); }

const header = src0.slice(0, src0.indexOf('window.APP_DATA='));
fs.writeFileSync(path.join(ROOT, 'content.js'),
  header + 'window.APP_DATA=' + JSON.stringify(data, null, 2) + ';\n', 'utf8');

console.log('词表：替换 ' + changed + ' 条，共 ' + data.words.length + ' 条，唯一 ' +
  Object.keys(seen).length + ' 条');
data.articles.slice(0, 1).forEach(() => {});
['a1', 'a3', 'a8'].forEach(id => {
  const n = data.words.filter(w => w.a === id).length;
  console.log('  ' + id + ' 词数 ' + n);
});

/* ---------- 2. a1 语法面板：收编被移出词表的两条句式 ---------- */
const A1 = path.join(ROOT, 'vending-machines.html');
let t = fs.readFileSync(A1, 'utf8').replace(/\r\n/g, '\n');
if (!t.includes('g-extra')) {
  t = t.replace(
    /(\s*)<div class="g-item">\s*<span class="g-form">〜が　好きです \/ 〜たいです<\/span>/,
    `$1<div class="g-item g-extra">
      <span class="g-form">〜の一つ / 〜だけではありません</span><span class="g-lesson">看懂即可</span>
      <div class="g-ex">「多い国の<b>一つ</b>です」（是……之一）、「飲み物<b>だけではありません</b>」（不只是饮料）。这两句超出第 1–15 课范围，本文出现，认得即可，不必现在就会造。</div>
    </div>$1<div class="g-item">
      <span class="g-form">〜が　好きです / 〜たいです</span>`);
  fs.writeFileSync(A1, t, 'utf8');
  console.log('a1 语法面板：已补「〜の一つ / 〜だけではありません」');
} else {
  console.log('a1 语法面板：已是最新');
}
