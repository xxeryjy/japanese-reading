/*
 * word-match.js —— 判断「词表里的词」是否真的出现在课文中
 *
 * 难点：词表用辞書形 / ます形，课文里可能是て形、た形、否定形。
 *   曲がります → 文中「曲がって」（ます→て，词干 曲が 还在）
 *   聞きます   → 文中「聞いて」（く→いて，词干 聞き 变成 聞い，连 曲がり 都没有）
 *   折ります   → 文中「折って」
 * 所以按「从严到宽」依次试，任一命中即算出现：
 *   ① 整词      ② 去掉末 2 字    ③ 去掉 ます/ました/ません    ④ 词首连续漢字
 * ④ 最宽（只取"聞""折"一个字），会有极少量误判，但它只用于**告警**，不阻断发版。
 */

function candidates(ja) {
  const key = String(ja || '').replace(/（.*?）/g, '').replace(/[〜~]/g, '').trim();
  const out = [];
  if (!key) return out;

  out.push(key);
  if (key.length > 2) out.push(key.slice(0, key.length - 2));

  const noMasu = key.replace(/(ます|ました|ません|ませんでした)$/, '');
  if (noMasu && noMasu !== key) out.push(noMasu);

  const kanji = (key.match(/^[\u4e00-\u9fff々]+/) || [''])[0];
  if (kanji && kanji !== key) out.push(kanji);

  return out;
}

function wordInText(ja, plain) {
  const text = String(plain || '');
  if (!text) return false;
  return candidates(ja).some((c) => c && text.indexOf(c) >= 0);
}

module.exports = { wordInText, candidates };
