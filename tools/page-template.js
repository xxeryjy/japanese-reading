/*
 * page-template.js —— 课文页模板（2026-11-20）
 *
 * 为什么需要它：原来 10 个课文页是手工复制的，加文章要改 50 处。
 * 句子与题目上移到 content.js 之后，页面只剩骨架，于是骨架可以完全由数据生成。
 *
 * pageHTML(a) 的入参是一个「文章对象」，字段见 tools/add-articles.js 顶部注释。
 * 输出的 HTML 与现有页面逐字同构（含 data-tabs 前置脚本、4 个空容器、脚本顺序）。
 */

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function grammarHTML(items) {
  return (items || []).map((g) => `    <div class="g-item">
      <span class="g-form">${g.form}</span><span class="g-lesson">${g.lesson}</span>
      <div class="g-ex">${g.ex}</div>
    </div>`).join('\n');
}

function factsHTML(facts) {
  return (facts || []).map((f) => `    <div class="fact">
      ${f.icon} <b>${f.title}</b>：${f.text}
    </div>`).join('\n');
}

function pageHTML(a) {
  const sentN = (a.sentences || []).length;
  const tags = (a.tags || [`${sentN} 句 · 全假名注音`, '大家的日本语 第1–15课语法'])
    .map((t) => `      <span class="tag">${t}</span>`).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#E8E2D6">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="日语阅读">
<link rel="apple-touch-icon" sizes="180x180" href="icon-180.png">
<title>${esc(a.pageTitle)}</title>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="common.css">
<link rel="stylesheet" href="layout.css">
</head>
<body class="pg-article">
<!-- data-tabs 必须在正文解析前挂上：否则 4 个 panel 会先全部可见再收起（闪一下） -->
<script>document.documentElement.setAttribute('data-tabs','on');</script>

<div class="wrap" data-piece="${esc(a.id)}">

  <header class="cover">
    <h1 class="ja" lang="ja">${a.titleRuby}</h1>
    <div class="meta">
${tags}
    </div>
    <p class="lead">${esc(a.lead)}</p>
  </header>

  <nav class="tabbar" role="tablist" aria-label="文章分区">
    <a class="back" href="reading.html" aria-label="返回阅读目录"><span aria-hidden="true">←</span></a>
    <span class="stamp" aria-hidden="true">${esc(a.no)}</span>
    <button role="tab" aria-selected="true" aria-controls="text" id="tab-text" tabindex="0">课文</button>
    <button role="tab" aria-selected="false" aria-controls="vocab" id="tab-vocab" tabindex="-1">词汇</button>
    <button role="tab" aria-selected="false" aria-controls="grammar" id="tab-grammar" tabindex="-1">语法</button>
    <button role="tab" aria-selected="false" aria-controls="culture" id="tab-culture" tabindex="-1">文化</button>
  </nav>

  <section class="panel active" id="text" role="tabpanel" aria-labelledby="tab-text">
    <h2>课文</h2>
    <div class="toolbar">
      <button class="tbtn" id="btnZh" type="button" aria-pressed="false">中译</button>
      <button class="tbtn" id="btnRo" type="button" aria-pressed="false">罗马音</button>
      <button class="tbtn" id="btnAll" type="button">▶ 朗读</button>
      <span data-voice-slot></span>
    </div>
    <div id="article"></div>
    <div id="quiz"></div>
  </section>

  <section class="panel" id="vocab" role="tabpanel" aria-labelledby="tab-vocab">
    <h2>词汇表</h2>
    <ul class="vocab" id="vocabList"></ul>
  </section>

  <section class="panel" id="grammar" role="tabpanel" aria-labelledby="tab-grammar">
    <h2>语法点（对标《大家的日本语》）</h2>
    <div id="verbTable"></div>
${grammarHTML(a.grammar)}
  </section>

  <section class="panel" id="culture" role="tabpanel" aria-labelledby="tab-culture">
    <h2>${a.cultureTitle || '文化小知识'}</h2>
${factsHTML(a.facts)}
    <details class="src">
      <summary>事实来源 <span class="chev" aria-hidden="true">›</span></summary>
      <p>${esc(a.source)}</p>
    </details>
  </section>

  <div class="cta">
    <div class="cta-body">
      <div class="cta-t">${a.ctaTitle || '读完测一下'}</div>
      <div class="cta-s">${esc(a.ctaSub)}</div>
    </div>
    <a class="cta-btn" href="review.html?set=${esc(a.id)}">测这 ${(a.words || []).length} 个词 →</a>
  </div>

</div>

<script src="content.js"></script>
<script src="voice.js"></script>
<script src="article.js"></script>
<script src="article-extras.js"></script>
</body>
</html>
`;
}

module.exports = { pageHTML };
