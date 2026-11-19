/*
 * 一次性代码生成脚本：从现有 5 篇课文页 + reading.html + review.html 抽取内容，
 * 生成 content.js（全站唯一内容真源）。生成后本脚本可保留，供加文章时复用。
 */
const fs=require("fs");
function grab(t,n){const m=t.match(new RegExp("const "+n+"\\s*=\\s*(\\[[\\s\\S]*?\\]);"));return m?eval(m[1]):null;}
function clean(s){return (s||'').replace(/<rt>[^<]*<\/rt>/g,'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();}
const ORDER=['a1','a2','a3','a4','a5'];
const FILE={a1:'vending-machines',a2:'new-year',a3:'onsen',a4:'konbini',a5:'train'};
const SHORT={a1:'自動販売機',a2:'お正月',a3:'温泉',a4:'コンビニ',a5:'電車のマナー'};
const rev=grab(fs.readFileSync("review.html","utf8"),"WORDS");
const reading=fs.readFileSync("reading.html","utf8");
// reading cards
const cardRe=/<a class="card" href="([^"]+)" data-piece="(a\d)">([\s\S]*?)<\/a>/g;
const cards={}; let m;
while((m=cardRe.exec(reading))){
  const b=m[3];
  const tagSpans=[...(b.match(/<div class="tags">([\s\S]*?)<\/div>/)||[])[1].matchAll(/<span>([^<]+)<\/span>/g)].map(x=>x[1]);
  cards[m[2]]={
    no:(b.match(/<span class="stamp">([^<]+)<\/span>/)||[])[1],
    cat:(b.match(/<span class="cat">([^<]+)<\/span>/)||[])[1],
    ja:clean((b.match(/<div class="t-ja"[^>]*>([\s\S]*?)<\/div>/)||[])[1]),
    zh:clean((b.match(/<div class="t-zh"[^>]*>([\s\S]*?)<\/div>/)||[])[1]),
    desc:clean((b.match(/<p class="desc">([^<]*)<\/p>/)||[])[1]),
    grammarTag:tagSpans[1]||''
  };
}
const articles=[],words=[];
for(const a of ORDER){
  const t=fs.readFileSync(FILE[a]+".html","utf8");
  const sents=grab(t,"SENTS"),voc=grab(t,"VOCAB");
  const lead=clean((t.match(/<p class="lead">([\s\S]*?)<\/p>/)||[])[1]);
  articles.push({
    id:a,no:cards[a].no,cat:cards[a].cat,
    ja:cards[a].ja,short:SHORT[a],zh:cards[a].zh,file:FILE[a]+".html",
    sentCount:sents.length,grammarTag:cards[a].grammarTag,
    desc:cards[a].desc,lead:lead
  });
  rev.filter(w=>w.a===a).forEach((rw,i)=>{
    const v=voc[i];
    words.push({ja:rw.ja,kana:rw.kana,zh:rw.zh,r:v.r,m:v.m,a:a});
  });
}
const totalSent=articles.reduce((s,x)=>s+x.sentCount,0);
const body='/* content.js —— 全站唯一内容真源（由 gen_content.js 生成，勿手改结构）\n'+
  ' * 加一篇文章的步骤：① 复制任一课文页 HTML，改内容 ② 在 articles 加 1 条 + words 加 15 条\n'+
  ' * 首页计数、阅读目录、复习词表、篇色映射全部从这里派生，不再需要改其它文件。\n'+
  ' * 生成时间：2026-11-19  句='+totalSent+'  词='+words.length+'  篇='+articles.length+' */\n'+
  'window.APP_DATA='+JSON.stringify({articles,words},null,2)+';\n';
fs.writeFileSync("content.js",body,'utf8');
fs.unlinkSync("_content_data.json");
console.log("wrote content.js",body.length,"bytes");
console.log("articles:",articles.length,"words:",words.length,"sentences:",totalSent);
console.log("article[0]:",JSON.stringify(articles[0]));
