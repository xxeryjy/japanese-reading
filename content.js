/* content.js —— 全站唯一内容真源（由 gen_content.js 生成，勿手改结构）
 * 加一篇文章的步骤：① 复制任一课文页 HTML，改内容 ② 在 articles 加 1 条 + words 加 15 条
 * 首页计数、阅读目录、复习词表、篇色映射全部从这里派生，不再需要改其它文件。
 * 生成时间：2026-11-19  句=148  词=150  篇=10 */
window.APP_DATA={
  "articles": [
    {
      "id": "a1",
      "no": "01",
      "cat": "生活",
      "ja": "日本の自動販売機",
      "short": "自動販売機",
      "zh": "日本的自动售货机",
      "file": "vending-machines.html",
      "sentCount": 13,
      "grammarTag": "数量词・あります",
      "desc": "四百万台、每 31 人一台。冬天卖热饮，红按钮是热的、蓝按钮是冷的——为什么日本到处都是售货机？",
      "quiz": [
        {
          "q": "あたたかい飲み物は、どうやってわかりますか。",
          "opts": [
            "赤いラベルです",
            "青いラベルです",
            "店の人に聞きます",
            "値段を見ます"
          ],
          "ans": 0,
          "ref": 7,
          "exp": "第7句「あたたかい飲み物は、赤いラベルでわかります」。青いラベル是冷饮（第8句），最容易看反。"
        },
        {
          "q": "この文章の内容と合っているものはどれですか。",
          "opts": [
            "自動販売機は飲み物だけを売っています。",
            "日本には約四百万台の自動販売機があります。",
            "自動販売機は駅にだけあります。",
            "外の自動販売機は危ないです。"
          ],
          "ans": 1,
          "ref": 2,
          "exp": "第2句。第4句明说「飲み物だけではありません」，第9句说「駅や店の前や山の上にも」，第10–11句说安全——三个干扰项都被原文否掉。"
        }
      ],
      "verbs": [
        {
          "dict": "売る",
          "masu": "売ります",
          "te": "売って",
          "ta": "売った",
          "type": "五段",
          "zh": "卖",
          "pair": "自动词对应：売れる（能卖 / 卖得掉）"
        },
        {
          "dict": "飲む",
          "masu": "飲みます",
          "te": "飲んで",
          "ta": "飲んだ",
          "type": "五段",
          "zh": "喝"
        },
        {
          "dict": "ある",
          "masu": "あります",
          "te": "あって",
          "ta": "あった",
          "type": "五段（特殊）",
          "zh": "有、在（无生命）",
          "note": "主题用 が：自動販売機が あります。人不可以用 ある。"
        },
        {
          "dict": "わかる",
          "masu": "わかります",
          "te": "わかって",
          "ta": "わかった",
          "type": "五段",
          "zh": "明白、知道",
          "note": "对象用 が：意味が わかります。不用 を。"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>には、<ruby>自動販売機<rt>じどうはんばいき</rt></ruby>がたくさんあります。",
          "ro": "Nihon niwa, jidōhanbaiki ga takusan arimasu.",
          "zh": "日本有很多自动售货机。",
          "plain": "日本には、自動販売機がたくさんあります。"
        },
        {
          "jp": "<ruby>約<rt>やく</rt></ruby><ruby>四百万台<rt>よんひゃくまんだい</rt></ruby>あります。",
          "ro": "Yaku yonhyakuman-dai arimasu.",
          "zh": "约有四百万台。",
          "plain": "約四百万台あります。"
        },
        {
          "jp": "<ruby>世界<rt>せかい</rt></ruby>でも、<ruby>特<rt>とく</rt></ruby>に<ruby>多<rt>おお</rt></ruby>い<ruby>国<rt>くに</rt></ruby>です。",
          "ro": "Sekai demo, toku ni ōi kuni desu.",
          "zh": "在世界上也是特别多的国家（按人口比例，密度数一数二）。",
          "plain": "世界でも、特に多い国です。"
        },
        {
          "jp": "<ruby>自動販売機<rt>じどうはんばいき</rt></ruby>は、<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>だけではありません。",
          "ro": "Jidōhanbaiki wa, nomimono dake dewa arimasen.",
          "zh": "自动售货机不只卖饮料。",
          "plain": "自動販売機は、飲み物だけではありません。"
        },
        {
          "jp": "おにぎりや、アイスクリームや、<ruby>花<rt>はな</rt></ruby>も<ruby>売<rt>う</rt></ruby>っています。",
          "ro": "Onigiri ya, aisu-kurīmu ya, hana mo utte imasu.",
          "zh": "还卖饭团、冰淇淋，还有花等等。",
          "plain": "おにぎりや、アイスクリームや、花も売っています。"
        },
        {
          "jp": "<ruby>冬<rt>ふゆ</rt></ruby>は、あたたかい<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>もあります。",
          "ro": "Fuyu wa, atatakai nomimono mo arimasu.",
          "zh": "冬天也有热饮。",
          "plain": "冬は、あたたかい飲み物もあります。"
        },
        {
          "jp": "あたたかい<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>は、<ruby>赤<rt>あか</rt></ruby>いラベルでわかります。",
          "ro": "Atatakai nomimono wa, akai raberu de wakarimasu.",
          "zh": "热饮看红色的标签就知道。",
          "plain": "あたたかい飲み物は、赤いラベルでわかります。"
        },
        {
          "jp": "つめたい<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>は、<ruby>青<rt>あお</rt></ruby>いラベルです。",
          "ro": "Tsumetai nomimono wa, aoi raberu desu.",
          "zh": "冷饮是蓝色的标签。",
          "plain": "つめたい飲み物は、青いラベルです。"
        },
        {
          "jp": "<ruby>駅<rt>えき</rt></ruby>や、<ruby>店<rt>みせ</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>や、<ruby>山<rt>やま</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>にも、<ruby>自動販売機<rt>じどうはんばいき</rt></ruby>があります。",
          "ro": "Eki ya, mise no mae ya, yama no ue nimo, jidōhanbaiki ga arimasu.",
          "zh": "车站、商店前面、山上，都有自动售货机。",
          "plain": "駅や、店の前や、山の上にも、自動販売機があります。"
        },
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>は<ruby>安全<rt>あんぜん</rt></ruby>な<ruby>国<rt>くに</rt></ruby>です。",
          "ro": "Nihon wa anzen na kuni desu.",
          "zh": "日本是安全的国家。",
          "plain": "日本は安全な国です。"
        },
        {
          "jp": "ですから、<ruby>外<rt>そと</rt></ruby>の<ruby>自動販売機<rt>じどうはんばいき</rt></ruby>も<ruby>安心<rt>あんしん</rt></ruby>です。",
          "ro": "Desukara, soto no jidōhanbaiki mo anshin desu.",
          "zh": "所以，户外的售货机也很安心（不容易被破坏）。",
          "plain": "ですから、外の自動販売機も安心です。"
        },
        {
          "jp": "<ruby>寒<rt>さむ</rt></ruby>い<ruby>日<rt>ひ</rt></ruby>に、あたたかいコーヒーが<ruby>飲<rt>の</rt></ruby>みたいです。",
          "ro": "Samui hi ni, atatakai kōhī ga nomitai desu.",
          "zh": "寒冷的日子，想喝热咖啡。",
          "plain": "寒い日に、あたたかいコーヒーが飲みたいです。"
        },
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>の<ruby>自動販売機<rt>じどうはんばいき</rt></ruby>は、とても<ruby>便利<rt>べんり</rt></ruby>です。",
          "ro": "Nihon no jidōhanbaiki wa, totemo benri desu.",
          "zh": "日本的自动售货机非常方便。",
          "plain": "日本の自動販売機は、とても便利です。"
        }
      ]
    },
    {
      "id": "a2",
      "no": "02",
      "cat": "文化",
      "ja": "日本のお正月",
      "short": "お正月",
      "zh": "日本的新年",
      "file": "new-year.html",
      "sentCount": 15,
      "grammarTag": "から〜まで・も〜も",
      "desc": "1 月 1 日到 3 日，整个国家停下来。年菜每道都有寓意，明治神宫三天涌进三百万人。",
      "quiz": [
        {
          "q": "一月一日から三日まで、何が休みですか。",
          "opts": [
            "学校だけです",
            "会社だけです",
            "学校も会社も休みです",
            "神社だけです"
          ],
          "ans": 2,
          "ref": 2,
          "exp": "第2句「学校も会社も休みです」。も〜も 是本篇语法点：两个都包括，不是只挑一个。"
        },
        {
          "q": "黒豆は、どんな意味ですか。",
          "opts": [
            "子どもがたくさん",
            "まめに働く",
            "健康",
            "幸せ"
          ],
          "ans": 1,
          "ref": 7,
          "exp": "第7句「黒豆は、まめに働くという意味です」。「子どもがたくさん」是数の子（第8句），别串。"
        }
      ],
      "verbs": [
        {
          "dict": "送る",
          "masu": "送ります",
          "te": "送って",
          "ta": "送った",
          "type": "五段",
          "zh": "寄、送"
        },
        {
          "dict": "食べる",
          "masu": "食べます",
          "te": "食べて",
          "ta": "食べた",
          "type": "一段",
          "zh": "吃"
        },
        {
          "dict": "行く",
          "masu": "行きます",
          "te": "行って",
          "ta": "行った",
          "type": "五段",
          "zh": "去",
          "note": "唯一 て形变 って 的 く 结尾动词（不是 いて）。"
        },
        {
          "dict": "もらう",
          "masu": "もらいます",
          "te": "もらって",
          "ta": "もらった",
          "type": "五段",
          "zh": "得到（从别人那里）",
          "pair": "给的一方用 に / から：お年玉を もらいます"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>一月一日<rt>いちがつついたち</rt></ruby>は、<ruby>日本<rt>にほん</rt></ruby>でとても<ruby>大切<rt>たいせつ</rt></ruby>な<ruby>日<rt>ひ</rt></ruby>です。",
          "ro": "Ichigatsu tsuitachi wa, Nihon de totemo taisetsu na hi desu.",
          "zh": "1 月 1 日，在日本是非常重要的日子。",
          "plain": "一月一日は、日本でとても大切な日です。"
        },
        {
          "jp": "<ruby>一月一日<rt>いちがつついたち</rt></ruby>から<ruby>三日<rt>みっか</rt></ruby>まで、<ruby>学校<rt>がっこう</rt></ruby>も<ruby>会社<rt>かいしゃ</rt></ruby>も<ruby>休<rt>やす</rt></ruby>みです。",
          "ro": "Ichigatsu tsuitachi kara mikka made, gakkō mo kaisha mo yasumi desu.",
          "zh": "从 1 月 1 日到 3 日，学校和公司都放假。",
          "plain": "一月一日から三日まで、学校も会社も休みです。"
        },
        {
          "jp": "<ruby>十二月<rt>じゅうにがつ</rt></ruby>に、<ruby>家族<rt>かぞく</rt></ruby>や<ruby>友<rt>とも</rt></ruby>だちに<ruby>年賀状<rt>ねんがじょう</rt></ruby>を<ruby>送<rt>おく</rt></ruby>ります。",
          "ro": "Jūnigatsu ni, kazoku ya tomodachi ni nengajō o okurimasu.",
          "zh": "12 月，给家人和朋友寄贺年卡。",
          "plain": "十二月に、家族や友だちに年賀状を送ります。"
        },
        {
          "jp": "<ruby>一月一日<rt>いちがつついたち</rt></ruby>に、<ruby>家族<rt>かぞく</rt></ruby>と<ruby>一緒<rt>いっしょ</rt></ruby>にご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べます。",
          "ro": "Ichigatsu tsuitachi ni, kazoku to issho ni gohan o tabemasu.",
          "zh": "1 月 1 日，和家人一起吃饭。",
          "plain": "一月一日に、家族と一緒にご飯を食べます。"
        },
        {
          "jp": "この<ruby>日<rt>ひ</rt></ruby>の<ruby>料理<rt>りょうり</rt></ruby>は「おせち<ruby>料理<rt>りょうり</rt></ruby>」です。",
          "ro": "Kono hi no ryōri wa \"osechi-ryōri\" desu.",
          "zh": "这一天的饭菜叫「御节料理」（年菜）。",
          "plain": "この日の料理は「おせち料理」です。"
        },
        {
          "jp": "おせち<ruby>料理<rt>りょうり</rt></ruby>の<ruby>一<rt>ひと</rt></ruby>つ<ruby>一<rt>ひと</rt></ruby>つに、<ruby>意味<rt>いみ</rt></ruby>があります。",
          "ro": "Osechi-ryōri no hitotsu hitotsu ni, imi ga arimasu.",
          "zh": "御节料理的每一样菜都有含义。",
          "plain": "おせち料理の一つ一つに、意味があります。"
        },
        {
          "jp": "<ruby>黒豆<rt>くろまめ</rt></ruby>は、まめに<ruby>働<rt>はたら</rt></ruby>くという<ruby>意味<rt>いみ</rt></ruby>です。",
          "ro": "Kuromame wa, mame ni hataraku to iu imi desu.",
          "zh": "黑豆是「勤快工作」的意思。",
          "plain": "黒豆は、まめに働くという意味です。"
        },
        {
          "jp": "<ruby>数<rt>かず</rt></ruby>の<ruby>子<rt>こ</rt></ruby>は、<ruby>子<rt>こ</rt></ruby>どもがたくさんという<ruby>意味<rt>いみ</rt></ruby>です。",
          "ro": "Kazunoko wa, kodomo ga takusan to iu imi desu.",
          "zh": "鲱鱼籽是「多子多孙」的意思。",
          "plain": "数の子は、子どもがたくさんという意味です。"
        },
        {
          "jp": "<ruby>一月<rt>いちがつ</rt></ruby>に、たくさんの<ruby>人<rt>ひと</rt></ruby>が<ruby>神社<rt>じんじゃ</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。",
          "ro": "Ichigatsu ni, takusan no hito ga jinja e ikimasu.",
          "zh": "1 月，很多人去神社。",
          "plain": "一月に、たくさんの人が神社へ行きます。"
        },
        {
          "jp": "それは「<ruby>初詣<rt>はつもうで</rt></ruby>」です。",
          "ro": "Sore wa \"hatsumōde\" desu.",
          "zh": "这就是「初诣」（新年的第一次参拜）。",
          "plain": "それは「初詣」です。"
        },
        {
          "jp": "<ruby>神社<rt>じんじゃ</rt></ruby>で、<ruby>今年<rt>ことし</rt></ruby>の<ruby>健康<rt>けんこう</rt></ruby>と<ruby>幸<rt>しあわ</rt></ruby>せをお<ruby>願<rt>ねが</rt></ruby>いします。",
          "ro": "Jinja de, kotoshi no kenkō to shiawase o onegai shimasu.",
          "zh": "在神社祈愿今年的健康与幸福。",
          "plain": "神社で、今年の健康と幸せをお願いします。"
        },
        {
          "jp": "<ruby>子<rt>こ</rt></ruby>どもたちは、お<ruby>年玉<rt>としだま</rt></ruby>をもらいます。",
          "ro": "Kodomo-tachi wa, otoshidama o moraimasu.",
          "zh": "孩子们会收到压岁钱。",
          "plain": "子どもたちは、お年玉をもらいます。"
        },
        {
          "jp": "お<ruby>年玉<rt>としだま</rt></ruby>で、お<ruby>菓子<rt>かし</rt></ruby>やゲームを<ruby>買<rt>か</rt></ruby>います。",
          "ro": "Otoshidama de, okashi ya gēmu o kaimasu.",
          "zh": "用压岁钱买点心或游戏。",
          "plain": "お年玉で、お菓子やゲームを買います。"
        },
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>の<ruby>文化<rt>ぶんか</rt></ruby>は、とても<ruby>面白<rt>おもしろ</rt></ruby>いです。",
          "ro": "Nihon no bunka wa, totemo omoshiroi desu.",
          "zh": "日本的文化非常有趣。",
          "plain": "日本の文化は、とても面白いです。"
        },
        {
          "jp": "<ruby>来年<rt>らいねん</rt></ruby>、<ruby>私<rt>わたし</rt></ruby>はお<ruby>正月<rt>しょうがつ</rt></ruby>の<ruby>料理<rt>りょうり</rt></ruby>を<ruby>作<rt>つく</rt></ruby>りたいです。",
          "ro": "Rainen, watashi wa o-shōgatsu no ryōri o tsukuritai desu.",
          "zh": "明年，我想做一次御节料理。",
          "plain": "来年、私はお正月の料理を作りたいです。"
        }
      ]
    },
    {
      "id": "a3",
      "no": "03",
      "cat": "文化",
      "ja": "日本の温泉",
      "short": "温泉",
      "zh": "日本的温泉",
      "file": "onsen.html",
      "sentCount": 15,
      "grammarTag": "〜てはいけません",
      "desc": "先洗身、毛巾不能进水、不穿泳衣。冬天最实用的一套温泉礼仪，用初级语法讲清楚。",
      "quiz": [
        {
          "q": "温泉に入る前に、何をしますか。",
          "opts": [
            "水を飲みます",
            "体を洗います",
            "タオルを頭に置きます",
            "髪を上げます"
          ],
          "ans": 1,
          "ref": 6,
          "exp": "第6句「まず、体を洗います。それから、温泉に入ります」。水是泡完才喝（第14句），毛巾和头发是入水时的事，不是\"之前\"。"
        },
        {
          "q": "温泉でしてはいけないことはどれですか。",
          "opts": [
            "露天風呂に入ること",
            "旅館で夜、温泉に入ること",
            "水着を着て入ること",
            "温泉の後で水を飲むこと"
          ],
          "ans": 2,
          "ref": 9,
          "exp": "第9句「水着を着て、入ってはいけません」。另外三件原文都说是可以/应该做的。"
        }
      ],
      "verbs": [
        {
          "dict": "洗う",
          "masu": "洗います",
          "te": "洗って",
          "ta": "洗った",
          "type": "五段",
          "zh": "洗"
        },
        {
          "dict": "入る",
          "masu": "入ります",
          "te": "入って",
          "ta": "入った",
          "type": "五段",
          "zh": "进入（自）",
          "pair": "他动词对应：入れる（把东西放进去）"
        },
        {
          "dict": "着る",
          "masu": "着ます",
          "te": "着て",
          "ta": "着た",
          "type": "一段",
          "zh": "穿（上身 / 全身）",
          "note": "鞋、裤子、帽子不用 着る：靴を はく、ズボンを はく、帽子を かぶる。"
        },
        {
          "dict": "置く",
          "masu": "置きます",
          "te": "置いて",
          "ta": "置いた",
          "type": "五段",
          "zh": "放、搁"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>には、<ruby>温泉<rt>おんせん</rt></ruby>がたくさんあります。",
          "ro": "Nihon niwa, onsen ga takusan arimasu.",
          "zh": "日本有很多温泉。",
          "plain": "日本には、温泉がたくさんあります。"
        },
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>は<ruby>火山<rt>かざん</rt></ruby>が<ruby>多<rt>おお</rt></ruby>い<ruby>国<rt>くに</rt></ruby>です。だから、<ruby>温泉<rt>おんせん</rt></ruby>も<ruby>多<rt>おお</rt></ruby>いです。",
          "ro": "Nihon wa kazan ga ōi kuni desu. Dakara, onsen mo ōi desu.",
          "zh": "日本是火山多的国家。所以温泉也很多。",
          "plain": "日本は火山が多い国です。だから、温泉も多いです。"
        },
        {
          "jp": "<ruby>温泉<rt>おんせん</rt></ruby>は<ruby>熱<rt>あつ</rt></ruby>いお<ruby>湯<rt>ゆ</rt></ruby>です。とても<ruby>気持<rt>きも</rt></ruby>ちがいいです。",
          "ro": "Onsen wa atsui o-yu desu. Totemo kimochi ga ii desu.",
          "zh": "温泉是热的水。非常舒服。",
          "plain": "温泉は熱いお湯です。とても気持ちがいいです。"
        },
        {
          "jp": "<ruby>日本人<rt>にほんじん</rt></ruby>は、<ruby>温泉<rt>おんせん</rt></ruby>が<ruby>大好<rt>だいす</rt></ruby>きです。",
          "ro": "Nihonjin wa, onsen ga daisuki desu.",
          "zh": "日本人非常喜欢温泉。",
          "plain": "日本人は、温泉が大好きです。"
        },
        {
          "jp": "でも、<ruby>温泉<rt>おんせん</rt></ruby>にはルールがあります。",
          "ro": "Demo, onsen niwa rūru ga arimasu.",
          "zh": "但是，温泉有规矩。",
          "plain": "でも、温泉にはルールがあります。"
        },
        {
          "jp": "まず、<ruby>体<rt>からだ</rt></ruby>を<ruby>洗<rt>あら</rt></ruby>います。それから、<ruby>温泉<rt>おんせん</rt></ruby>に<ruby>入<rt>はい</rt></ruby>ります。",
          "ro": "Mazu, karada o araimasu. Sorekara, onsen ni hairimasu.",
          "zh": "首先洗身体。然后进温泉。",
          "plain": "まず、体を洗います。それから、温泉に入ります。"
        },
        {
          "jp": "<ruby>体<rt>からだ</rt></ruby>は、お<ruby>湯<rt>ゆ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<ruby>洗<rt>あら</rt></ruby>ってはいけません。",
          "ro": "Karada wa, o-yu no naka de aratte wa ikemasen.",
          "zh": "不可以在水里洗身体。",
          "plain": "体は、お湯の中で洗ってはいけません。"
        },
        {
          "jp": "タオルは、お<ruby>湯<rt>ゆ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>に<ruby>入<rt>い</rt></ruby>れてはいけません。<ruby>頭<rt>あたま</rt></ruby>や、お<ruby>湯<rt>ゆ</rt></ruby>の<ruby>外<rt>そと</rt></ruby>に<ruby>置<rt>お</rt></ruby>きます。",
          "ro": "Taoru wa, o-yu no naka ni irete wa ikemasen. Atama ya, o-yu no soto ni okimasu.",
          "zh": "毛巾不可以放进水里。放在头上，或者水外面。",
          "plain": "タオルは、お湯の中に入れてはいけません。頭や、お湯の外に置きます。"
        },
        {
          "jp": "<ruby>水着<rt>みずぎ</rt></ruby>を<ruby>着<rt>き</rt></ruby>て、<ruby>入<rt>はい</rt></ruby>ってはいけません。",
          "ro": "Mizugi o kite, haitte wa ikemasen.",
          "zh": "不可以穿泳衣进去。",
          "plain": "水着を着て、入ってはいけません。"
        },
        {
          "jp": "<ruby>長<rt>なが</rt></ruby>い<ruby>髪<rt>かみ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は、<ruby>髪<rt>かみ</rt></ruby>を<ruby>上<rt>あ</rt></ruby>げます。",
          "ro": "Nagai kami no hito wa, kami o agemasu.",
          "zh": "头发长的人要把头发扎起来。",
          "plain": "長い髪の人は、髪を上げます。"
        },
        {
          "jp": "<ruby>露天風呂<rt>ろてんぶろ</rt></ruby>は、<ruby>外<rt>そと</rt></ruby>にあります。<ruby>空<rt>そら</rt></ruby>がきれいです。",
          "ro": "Rotenburo wa, soto ni arimasu. Sora ga kirei desu.",
          "zh": "露天温泉在外面。天空很美。",
          "plain": "露天風呂は、外にあります。空がきれいです。"
        },
        {
          "jp": "<ruby>旅館<rt>りょかん</rt></ruby>では、<ruby>夜<rt>よる</rt></ruby>も<ruby>朝<rt>あさ</rt></ruby>も<ruby>温泉<rt>おんせん</rt></ruby>に<ruby>入<rt>はい</rt></ruby>ります。",
          "ro": "Ryokan dewa, yoru mo asa mo onsen ni hairimasu.",
          "zh": "在旅馆，晚上和早上都可以泡温泉。",
          "plain": "旅館では、夜も朝も温泉に入ります。"
        },
        {
          "jp": "<ruby>温泉<rt>おんせん</rt></ruby>は<ruby>体<rt>からだ</rt></ruby>にいいですが、<ruby>長<rt>なが</rt></ruby>い<ruby>時間<rt>じかん</rt></ruby><ruby>入<rt>はい</rt></ruby>ってはいけません。",
          "ro": "Onsen wa karada ni ii desu ga, nagai jikan haitte wa ikemasen.",
          "zh": "温泉对身体好，但不可以泡很长时间。",
          "plain": "温泉は体にいいですが、長い時間入ってはいけません。"
        },
        {
          "jp": "<ruby>温泉<rt>おんせん</rt></ruby>の<ruby>後<rt>あと</rt></ruby>で、<ruby>水<rt>みず</rt></ruby>を<ruby>飲<rt>の</rt></ruby>みます。",
          "ro": "Onsen no ato de, mizu o nomimasu.",
          "zh": "泡完温泉后要喝水。",
          "plain": "温泉の後で、水を飲みます。"
        },
        {
          "jp": "<ruby>冬<rt>ふゆ</rt></ruby>の<ruby>温泉<rt>おんせん</rt></ruby>は、<ruby>特<rt>とく</rt></ruby>に<ruby>気持<rt>きも</rt></ruby>ちがいいです。いつか、<ruby>私<rt>わたし</rt></ruby>も<ruby>温泉<rt>おんせん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きたいです。",
          "ro": "Fuyu no onsen wa, toku ni kimochi ga ii desu. Itsuka, watashi mo onsen ni ikitai desu.",
          "zh": "冬天的温泉特别舒服。总有一天，我也想去泡温泉。",
          "plain": "冬の温泉は、特に気持ちがいいです。いつか、私も温泉に行きたいです。"
        }
      ]
    },
    {
      "id": "a4",
      "no": "04",
      "cat": "生活",
      "ja": "日本のコンビニ",
      "short": "コンビニ",
      "zh": "日本的便利店",
      "file": "konbini.html",
      "sentCount": 15,
      "grammarTag": "あります・も・や",
      "desc": "全国约 5 万 6 千家。能取钱、复印、寄快递、买票——深夜也开着，是日本生活的万能插座。",
      "quiz": [
        {
          "q": "コンビニで、自分でするのはどれですか。",
          "opts": [
            "お弁当を温めること",
            "コーヒーを入れること",
            "宅配便を送ること",
            "チケットを買うこと"
          ],
          "ans": 1,
          "ref": 7,
          "exp": "第7句「コーヒーは、自分で入れます」。第6句明说お弁当是店员（店の人）加热的。"
        },
        {
          "q": "コンビニで出たごみは、どうしますか。",
          "opts": [
            "店のごみ箱に捨てます",
            "家に持って帰ります",
            "店の人に渡します",
            "買いません"
          ],
          "ans": 1,
          "ref": 14,
          "exp": "第14句「ごみは、家に持って帰ります」。这是日本便利店和国内最大的习惯差，值得记。"
        }
      ],
      "verbs": [
        {
          "dict": "温める",
          "masu": "温めます",
          "te": "温めて",
          "ta": "温めた",
          "type": "一段",
          "zh": "加热"
        },
        {
          "dict": "入れる",
          "masu": "入れます",
          "te": "入れて",
          "ta": "入れた",
          "type": "一段",
          "zh": "放入、倒（咖啡）（他）",
          "pair": "自动词对应：入る（进入）——a3 那篇出现过"
        },
        {
          "dict": "持って帰る",
          "masu": "持って帰ります",
          "te": "持って帰って",
          "ta": "持って帰った",
          "type": "五段",
          "zh": "带走、拿回去"
        },
        {
          "dict": "買う",
          "masu": "買います",
          "te": "買って",
          "ta": "買った",
          "type": "五段",
          "zh": "买"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>には、コンビニがたくさんあります。",
          "ro": "Nihon niwa, konbini ga takusan arimasu.",
          "zh": "日本有很多便利店。",
          "plain": "日本には、コンビニがたくさんあります。"
        },
        {
          "jp": "ぜんぶで、<ruby>五万六千店<rt>ごまんろくせんてん</rt></ruby>ぐらいあります。",
          "ro": "Zenbu de, goman rokusen-ten gurai arimasu.",
          "zh": "一共大约五万六千家。",
          "plain": "ぜんぶで、五万六千店ぐらいあります。"
        },
        {
          "jp": "コンビニは、<ruby>夜<rt>よる</rt></ruby>もあいています。",
          "ro": "Konbini wa, yoru mo aite imasu.",
          "zh": "便利店夜里也开着。",
          "plain": "コンビニは、夜もあいています。"
        },
        {
          "jp": "<ruby>中<rt>なか</rt></ruby>には、<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>や<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>があります。",
          "ro": "Naka niwa, tabemono ya nomimono ga arimasu.",
          "zh": "店里有食物和饮料。",
          "plain": "中には、食べ物や飲み物があります。"
        },
        {
          "jp": "お<ruby>弁当<rt>べんとう</rt></ruby>や、おにぎりや、おでんも<ruby>売<rt>う</rt></ruby>っています。",
          "ro": "Obentō ya, onigiri ya, oden mo utte imasu.",
          "zh": "卖便当、饭团，还有关东煮。",
          "plain": "お弁当や、おにぎりや、おでんも売っています。"
        },
        {
          "jp": "<ruby>店<rt>みせ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は、レジでお<ruby>弁当<rt>べんとう</rt></ruby>を<ruby>温<rt>あたた</rt></ruby>めます。",
          "ro": "Mise no hito wa, reji de obentō o atatamemasu.",
          "zh": "店员会在收银台把便当加热。",
          "plain": "店の人は、レジでお弁当を温めます。"
        },
        {
          "jp": "コーヒーは、<ruby>自分<rt>じぶん</rt></ruby>で<ruby>入<rt>い</rt></ruby>れます。",
          "ro": "Kōhī wa, jibun de iremasu.",
          "zh": "咖啡要自己倒。",
          "plain": "コーヒーは、自分で入れます。"
        },
        {
          "jp": "コンビニには、ATMがあります。",
          "ro": "Konbini niwa, ATM ga arimasu.",
          "zh": "便利店里有 ATM。",
          "plain": "コンビニには、ATMがあります。"
        },
        {
          "jp": "コピー<ruby>機<rt>き</rt></ruby>もあります。",
          "ro": "Kopī-ki mo arimasu.",
          "zh": "也有复印机。",
          "plain": "コピー機もあります。"
        },
        {
          "jp": "<ruby>宅配便<rt>たくはいびん</rt></ruby>のサービスもあります。",
          "ro": "Takuhaibin no sābisu mo arimasu.",
          "zh": "还有快递服务。",
          "plain": "宅配便のサービスもあります。"
        },
        {
          "jp": "チケットも<ruby>売<rt>う</rt></ruby>っています。",
          "ro": "Chiketto mo utte imasu.",
          "zh": "也卖票。",
          "plain": "チケットも売っています。"
        },
        {
          "jp": "<ruby>雨<rt>あめ</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>は、<ruby>傘<rt>かさ</rt></ruby>も<ruby>売<rt>う</rt></ruby>っています。",
          "ro": "Ame no hi wa, kasa mo utte imasu.",
          "zh": "下雨天还卖伞。",
          "plain": "雨の日は、傘も売っています。"
        },
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>のコンビニは、とても<ruby>便利<rt>べんり</rt></ruby>です。",
          "ro": "Nihon no konbini wa, totemo benri desu.",
          "zh": "日本的便利店非常方便。",
          "plain": "日本のコンビニは、とても便利です。"
        },
        {
          "jp": "ごみは、<ruby>家<rt>いえ</rt></ruby>に<ruby>持<rt>も</rt></ruby>って<ruby>帰<rt>かえ</rt></ruby>ります。",
          "ro": "Gomi wa, ie ni motte kaerimasu.",
          "zh": "垃圾要自己带回家。",
          "plain": "ごみは、家に持って帰ります。"
        },
        {
          "jp": "<ruby>私<rt>わたし</rt></ruby>も、コンビニでお<ruby>弁当<rt>べんとう</rt></ruby>を<ruby>買<rt>か</rt></ruby>いたいです。",
          "ro": "Watashi mo, konbini de obentō o kaitai desu.",
          "zh": "我也想在便利店买便当。",
          "plain": "私も、コンビニでお弁当を買いたいです。"
        }
      ]
    },
    {
      "id": "a5",
      "no": "05",
      "cat": "生活",
      "ja": "電車のマナー",
      "short": "電車のマナー",
      "zh": "电车的礼仪",
      "file": "train.html",
      "sentCount": 15,
      "grammarTag": "〜てはいけません",
      "desc": "手机静音、不大声说话、优先席让座、行李不堵门——把官方礼仪写成 15 句初级日语。",
      "quiz": [
        {
          "q": "電車の中では、携帯電話をどうしますか。",
          "opts": [
            "小さい声で話します",
            "マナーモードにします",
            "電源を切ります",
            "外で話します"
          ],
          "ans": 1,
          "ref": 5,
          "exp": "第4句说不可以打电话，第5句说「マナーモードにします」。选「小声说」是最常见的误解——原文是根本不许打。"
        },
        {
          "q": "「降りる人が先です」は、どういう意味ですか。",
          "opts": [
            "先に乗る人がえらいです",
            "降りる人が先に降りて、それから乗ります",
            "優先席の人が先です",
            "女性が先です"
          ],
          "ans": 1,
          "ref": 13,
          "exp": "第13句，先下后上。不是\"谁优先\"，是\"顺序\"。"
        }
      ],
      "verbs": [
        {
          "dict": "並ぶ",
          "masu": "並びます",
          "te": "並んで",
          "ta": "並んだ",
          "type": "五段",
          "zh": "排队（自）",
          "pair": "他动词对应：並べる（把东西排好）"
        },
        {
          "dict": "話す",
          "masu": "話します",
          "te": "話して",
          "ta": "話した",
          "type": "五段",
          "zh": "说、讲"
        },
        {
          "dict": "ゆずる",
          "masu": "ゆずります",
          "te": "ゆずって",
          "ta": "ゆずった",
          "type": "五段",
          "zh": "让（座）",
          "note": "席を ゆずる。固定搭配，不用 あげる。"
        },
        {
          "dict": "降りる",
          "masu": "降ります",
          "te": "降りて",
          "ta": "降りた",
          "type": "一段",
          "zh": "下（车 / 楼）",
          "pair": "他动词对应：降ろす（把人或东西放下来）"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>では、<ruby>電車<rt>でんしゃ</rt></ruby>がとても<ruby>便利<rt>べんり</rt></ruby>です。",
          "ro": "Nihon dewa, densha ga totemo benri desu.",
          "zh": "在日本，电车非常方便。",
          "plain": "日本では、電車がとても便利です。"
        },
        {
          "jp": "<ruby>朝<rt>あさ</rt></ruby>と<ruby>夕方<rt>ゆうがた</rt></ruby>は、<ruby>電車<rt>でんしゃ</rt></ruby>がとてもこみます。",
          "ro": "Asa to yūgata wa, densha ga totemo komimasu.",
          "zh": "早上和傍晚，电车非常拥挤。",
          "plain": "朝と夕方は、電車がとてもこみます。"
        },
        {
          "jp": "ホームでは、<ruby>順番<rt>じゅんばん</rt></ruby>に<ruby>並<rt>なら</rt></ruby>びます。",
          "ro": "Hōmu dewa, junban ni narabimasu.",
          "zh": "在站台上按顺序排队。",
          "plain": "ホームでは、順番に並びます。"
        },
        {
          "jp": "<ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>では、<ruby>携帯電話<rt>けいたいでんわ</rt></ruby>で<ruby>話<rt>はな</rt></ruby>してはいけません。",
          "ro": "Densha no naka dewa, keitaidenwa de hanashite wa ikemasen.",
          "zh": "在电车里不可以打手机。",
          "plain": "電車の中では、携帯電話で話してはいけません。"
        },
        {
          "jp": "<ruby>電話<rt>でんわ</rt></ruby>は、マナーモードにします。",
          "ro": "Denwa wa, manā-mōdo ni shimasu.",
          "zh": "手机要调成静音模式。",
          "plain": "電話は、マナーモードにします。"
        },
        {
          "jp": "<ruby>車内<rt>しゃない</rt></ruby>では、<ruby>大<rt>おお</rt></ruby>きい<ruby>声<rt>こえ</rt></ruby>で<ruby>話<rt>はな</rt></ruby>しません。",
          "ro": "Shanai dewa, ōkii koe de hanashimasen.",
          "zh": "车厢里不大声说话。",
          "plain": "車内では、大きい声で話しません。"
        },
        {
          "jp": "<ruby>優先席<rt>ゆうせんせき</rt></ruby>には、お<ruby>年寄<rt>としよ</rt></ruby>りが<ruby>座<rt>すわ</rt></ruby>ります。",
          "ro": "Yūsenseki niwa, otoshiyori ga suwarimasu.",
          "zh": "优先席给老年人坐。",
          "plain": "優先席には、お年寄りが座ります。"
        },
        {
          "jp": "<ruby>若<rt>わか</rt></ruby>い<ruby>人<rt>ひと</rt></ruby>も、<ruby>席<rt>せき</rt></ruby>をゆずります。",
          "ro": "Wakai hito mo, seki o yuzurimasu.",
          "zh": "年轻人也会让座。",
          "plain": "若い人も、席をゆずります。"
        },
        {
          "jp": "<ruby>女性専用車<rt>じょせいせんようしゃ</rt></ruby>は、<ruby>女性<rt>じょせい</rt></ruby>だけの<ruby>車両<rt>しゃりょう</rt></ruby>です。",
          "ro": "Josei senyōsha wa, josei dake no sharyō desu.",
          "zh": "女性专用车厢是只有女性的车厢。",
          "plain": "女性専用車は、女性だけの車両です。"
        },
        {
          "jp": "かけ<ruby>込<rt>こ</rt></ruby>み<ruby>乗車<rt>じょうしゃ</rt></ruby>は、<ruby>危<rt>あぶ</rt></ruby>ないです。",
          "ro": "Kakekomi jōsha wa, abunai desu.",
          "zh": "赶着冲上车很危险。",
          "plain": "かけ込み乗車は、危ないです。"
        },
        {
          "jp": "<ruby>大<rt>おお</rt></ruby>きい<ruby>荷物<rt>にもつ</rt></ruby>は、ドアの<ruby>近<rt>ちか</rt></ruby>くに<ruby>置<rt>お</rt></ruby>きません。",
          "ro": "Ōkii nimotsu wa, doa no chikaku ni okimasen.",
          "zh": "大件行李不放在车门附近。",
          "plain": "大きい荷物は、ドアの近くに置きません。"
        },
        {
          "jp": "ごみは、ごみ<ruby>箱<rt>ばこ</rt></ruby>に<ruby>捨<rt>す</rt></ruby>てます。",
          "ro": "Gomi wa, gomibako ni sutemasu.",
          "zh": "垃圾扔进垃圾箱。",
          "plain": "ごみは、ごみ箱に捨てます。"
        },
        {
          "jp": "<ruby>降<rt>お</rt></ruby>りる<ruby>人<rt>ひと</rt></ruby>が<ruby>先<rt>さき</rt></ruby>です。",
          "ro": "Oriru hito ga saki desu.",
          "zh": "先下后上（下车的人优先）。",
          "plain": "降りる人が先です。"
        },
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>は、<ruby>時間<rt>じかん</rt></ruby>に<ruby>正確<rt>せいかく</rt></ruby>です。",
          "ro": "Nihon no densha wa, jikan ni seikaku desu.",
          "zh": "日本的电车很准时。",
          "plain": "日本の電車は、時間に正確です。"
        },
        {
          "jp": "<ruby>私<rt>わたし</rt></ruby>も、<ruby>電車<rt>でんしゃ</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>みたいです。",
          "ro": "Watashi mo, densha de hon o yomitai desu.",
          "zh": "我也想（像日本人那样）在电车上看书。",
          "plain": "私も、電車で本を読みたいです。"
        }
      ]
    },
    {
      "id": "a6",
      "no": "06",
      "cat": "文化",
      "ja": "桜と花見",
      "short": "桜と花見",
      "zh": "樱花与花见",
      "file": "sakura.html",
      "sentCount": 15,
      "grammarTag": "〜ています・より",
      "desc": "从奈良的梅花到平安的樱花，从三色团子到夜樱——日本人为什么每年春天都要坐到树下？",
      "quiz": [
        {
          "q": "花見団子の三色は、何を表していますか。",
          "opts": [
            "春・夏・秋",
            "春の桜・冬の雪・夏の新緑",
            "桜・梅・菊",
            "赤・青・黄"
          ],
          "ans": 1,
          "ref": 11,
          "exp": "第11句。注意顺序是 春→冬→夏，不是春夏秋冬——故意缺秋，因为「秋がない」和「飽きない」同音（见文化页）。"
        },
        {
          "q": "この文章の内容と合っているものはどれですか。",
          "opts": [
            "桜は一か月ぐらい咲いています。",
            "昔、日本人は桜より梅が好きでした。",
            "花見は江戸時代に始まりました。",
            "桜の枝を折ってもいいです。"
          ],
          "ans": 1,
          "ref": 12,
          "exp": "第12句。第6句是「一週間」不是一个月；第13句是平安時代不是江戸時代；第15句明令禁止折枝。"
        }
      ],
      "verbs": [
        {
          "dict": "咲く",
          "masu": "咲きます",
          "te": "咲いて",
          "ta": "咲いた",
          "type": "五段",
          "zh": "开（花）（自）",
          "pair": "他动词对应：咲かせる（让花开放）"
        },
        {
          "dict": "散る",
          "masu": "散ります",
          "te": "散って",
          "ta": "散った",
          "type": "五段",
          "zh": "谢、落（花）（自）",
          "pair": "他动词对应：散らす（把东西弄散）"
        },
        {
          "dict": "折る",
          "masu": "折ります",
          "te": "折って",
          "ta": "折った",
          "type": "五段",
          "zh": "折、折断（他）",
          "pair": "自动词对应：折れる（断掉）"
        },
        {
          "dict": "始まる",
          "masu": "始まります",
          "te": "始まって",
          "ta": "始まった",
          "type": "五段",
          "zh": "开始（自）",
          "pair": "他动词对应：始める（开始做某事）"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>の<ruby>春<rt>はる</rt></ruby>は、<ruby>桜<rt>さくら</rt></ruby>の<ruby>季節<rt>きせつ</rt></ruby>です。",
          "ro": "Nihon no haru wa, sakura no kisetsu desu.",
          "zh": "日本的春天，是樱花的季节。",
          "plain": "日本の春は、桜の季節です。"
        },
        {
          "jp": "<ruby>桜<rt>さくら</rt></ruby>は、<ruby>三月<rt>さんがつ</rt></ruby>の<ruby>終<rt>お</rt></ruby>わりから<ruby>四月<rt>しがつ</rt></ruby>の<ruby>初<rt>はじ</rt></ruby>めに<ruby>咲<rt>さ</rt></ruby>きます。",
          "ro": "Sakura wa, sangatsu no owari kara shigatsu no hajime ni sakimasu.",
          "zh": "樱花从三月底开到四月初。",
          "plain": "桜は、三月の終わりから四月の初めに咲きます。"
        },
        {
          "jp": "<ruby>日本人<rt>にほんじん</rt></ruby>は、<ruby>桜<rt>さくら</rt></ruby>が<ruby>大好<rt>だいす</rt></ruby>きです。",
          "ro": "Nihonjin wa, sakura ga daisuki desu.",
          "zh": "日本人非常喜欢樱花。",
          "plain": "日本人は、桜が大好きです。"
        },
        {
          "jp": "<ruby>春<rt>はる</rt></ruby>は、<ruby>家族<rt>かぞく</rt></ruby>や<ruby>友<rt>とも</rt></ruby>だちと<ruby>花見<rt>はなみ</rt></ruby>に<ruby>行<rt>い</rt></ruby>きます。",
          "ro": "Haru wa, kazoku ya tomodachi to hanami ni ikimasu.",
          "zh": "春天，人们和家人、朋友一起去赏花。",
          "plain": "春は、家族や友だちと花見に行きます。"
        },
        {
          "jp": "<ruby>花見<rt>はなみ</rt></ruby>は、<ruby>桜<rt>さくら</rt></ruby>の<ruby>木<rt>き</rt></ruby>の<ruby>下<rt>した</rt></ruby>で、みんなでお<ruby>弁当<rt>べんとう</rt></ruby>を<ruby>食<rt>た</rt></ruby>べます。",
          "ro": "Hanami wa, sakura no ki no shita de, minna de obentō o tabemasu.",
          "zh": "赏花，就是在樱花树下和大家一起吃便当。",
          "plain": "花見は、桜の木の下で、みんなでお弁当を食べます。"
        },
        {
          "jp": "<ruby>桜<rt>さくら</rt></ruby>の<ruby>花<rt>はな</rt></ruby>は、<ruby>一週間<rt>いっしゅうかん</rt></ruby>ぐらいで<ruby>散<rt>ち</rt></ruby>ります。",
          "ro": "Sakura no hana wa, isshūkan gurai de chirimasu.",
          "zh": "樱花大约一周就谢了。",
          "plain": "桜の花は、一週間ぐらいで散ります。"
        },
        {
          "jp": "<ruby>咲<rt>さ</rt></ruby>いている<ruby>時間<rt>じかん</rt></ruby>は<ruby>短<rt>みじか</rt></ruby>いですが、とてもきれいです。",
          "ro": "Saite iru jikan wa mijikai desu ga, totemo kirei desu.",
          "zh": "开花的时间很短，但非常美。",
          "plain": "咲いている時間は短いですが、とてもきれいです。"
        },
        {
          "jp": "<ruby>夜<rt>よる</rt></ruby>の<ruby>桜<rt>さくら</rt></ruby>は「<ruby>夜桜<rt>よざくら</rt></ruby>」です。これもきれいです。",
          "ro": "Yoru no sakura wa yozakura desu. Kore mo kirei desu.",
          "zh": "夜晚的樱花叫「夜樱」。这个也很美。",
          "plain": "夜の桜は「夜桜」です。これもきれいです。"
        },
        {
          "jp": "<ruby>花見<rt>はなみ</rt></ruby>のとき、<ruby>花見団子<rt>はなみだんご</rt></ruby>を<ruby>食<rt>た</rt></ruby>べます。",
          "ro": "Hanami no toki, hanami-dango o tabemasu.",
          "zh": "赏花的时候吃花见团子。",
          "plain": "花見のとき、花見団子を食べます。"
        },
        {
          "jp": "<ruby>花見団子<rt>はなみだんご</rt></ruby>は、ピンクと<ruby>白<rt>しろ</rt></ruby>と<ruby>緑<rt>みどり</rt></ruby>の<ruby>三色<rt>さんしょく</rt></ruby>です。",
          "ro": "Hanami-dango wa, pinku to shiro to midori no sanshoku desu.",
          "zh": "花见团子是粉、白、绿三色。",
          "plain": "花見団子は、ピンクと白と緑の三色です。"
        },
        {
          "jp": "ピンクは<ruby>春<rt>はる</rt></ruby>の<ruby>桜<rt>さくら</rt></ruby>、<ruby>白<rt>しろ</rt></ruby>は<ruby>冬<rt>ふゆ</rt></ruby>の<ruby>雪<rt>ゆき</rt></ruby>、<ruby>緑<rt>みどり</rt></ruby>は<ruby>夏<rt>なつ</rt></ruby>の<ruby>新緑<rt>しんりょく</rt></ruby>です。",
          "ro": "Pinku wa haru no sakura, shiro wa fuyu no yuki, midori wa natsu no shinryoku desu.",
          "zh": "粉色是春天的樱花，白色是冬天的雪，绿色是夏天的新绿。",
          "plain": "ピンクは春の桜、白は冬の雪、緑は夏の新緑です。"
        },
        {
          "jp": "<ruby>昔<rt>むかし</rt></ruby>、<ruby>日本人<rt>にほんじん</rt></ruby>は<ruby>桜<rt>さくら</rt></ruby>より<ruby>梅<rt>うめ</rt></ruby>が<ruby>好<rt>す</rt></ruby>きでした。",
          "ro": "Mukashi, Nihonjin wa sakura yori ume ga suki deshita.",
          "zh": "从前，日本人喜欢梅花胜过樱花。",
          "plain": "昔、日本人は桜より梅が好きでした。"
        },
        {
          "jp": "<ruby>平安時代<rt>へいあんじだい</rt></ruby>に、<ruby>桜<rt>さくら</rt></ruby>の<ruby>花見<rt>はなみ</rt></ruby>が<ruby>始<rt>はじ</rt></ruby>まりました。",
          "ro": "Heian jidai ni, sakura no hanami ga hajimarimashita.",
          "zh": "赏樱在平安时代开始了。",
          "plain": "平安時代に、桜の花見が始まりました。"
        },
        {
          "jp": "<ruby>今<rt>いま</rt></ruby>も、<ruby>春<rt>はる</rt></ruby>には<ruby>日本中<rt>にほんじゅう</rt></ruby>で<ruby>花見<rt>はなみ</rt></ruby>をします。",
          "ro": "Ima mo, haru niwa nihonjū de hanami o shimasu.",
          "zh": "现在，春天全日本都在赏花。",
          "plain": "今も、春には日本中で花見をします。"
        },
        {
          "jp": "でも、<ruby>桜<rt>さくら</rt></ruby>の<ruby>枝<rt>えだ</rt></ruby>を<ruby>折<rt>お</rt></ruby>ってはいけません。<ruby>木<rt>き</rt></ruby>を<ruby>大切<rt>たいせつ</rt></ruby>にします。",
          "ro": "Demo, sakura no eda o otte wa ikemasen. Ki o taisetsu ni shimasu.",
          "zh": "但是，不可以折樱花枝。要爱惜树木。",
          "plain": "でも、桜の枝を折ってはいけません。木を大切にします。"
        }
      ]
    },
    {
      "id": "a7",
      "no": "07",
      "cat": "文化",
      "ja": "日本の学校",
      "short": "日本の学校",
      "zh": "日本的学校",
      "file": "school.html",
      "sentCount": 15,
      "grammarTag": "〜てから・〜年間",
      "desc": "四月开学、六年小学三年初中、学生自己分餐和扫除——日本学校的一天和一年。",
      "quiz": [
        {
          "q": "日本の小学校は、何年間ですか。",
          "opts": [
            "三年間",
            "六年間",
            "九年間",
            "十二年間"
          ],
          "ans": 1,
          "ref": 2,
          "exp": "第2句「小学校は六年」。九年是小学＋初中的義務教育合计（第3句），最容易被这个数字骗到。"
        },
        {
          "q": "給食は、だれが教室まで運びますか。",
          "opts": [
            "先生",
            "生徒",
            "給食の会社の人",
            "保護者"
          ],
          "ans": 1,
          "ref": 9,
          "exp": "第9句「給食は、生徒が自分で教室まで運びます」。给食当番是日本学校的一个特点。"
        }
      ],
      "verbs": [
        {
          "dict": "運ぶ",
          "masu": "運びます",
          "te": "運んで",
          "ta": "運んだ",
          "type": "五段",
          "zh": "搬运"
        },
        {
          "dict": "掃除する",
          "masu": "掃除します",
          "te": "掃除して",
          "ta": "掃除した",
          "type": "サ変",
          "zh": "打扫",
          "note": "汉字名词＋する，一整类：勉強する・予約する・練習する。"
        },
        {
          "dict": "終わる",
          "masu": "終わります",
          "te": "終わって",
          "ta": "終わった",
          "type": "五段",
          "zh": "结束（自）",
          "pair": "他动词对应：終える（把某事做完）"
        },
        {
          "dict": "使う",
          "masu": "使います",
          "te": "使って",
          "ta": "使った",
          "type": "五段",
          "zh": "使用"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>の<ruby>学校<rt>がっこう</rt></ruby>は、<ruby>四月<rt>しがつ</rt></ruby>に<ruby>始<rt>はじ</rt></ruby>まります。",
          "ro": "Nihon no gakkō wa, shigatsu ni hajimarimasu.",
          "zh": "日本的学校从四月开始。",
          "plain": "日本の学校は、四月に始まります。"
        },
        {
          "jp": "<ruby>小学校<rt>しょうがっこう</rt></ruby>は<ruby>六年<rt>ろくねん</rt></ruby>、<ruby>中学校<rt>ちゅうがっこう</rt></ruby>は<ruby>三年<rt>さんねん</rt></ruby>、<ruby>高校<rt>こうこう</rt></ruby>は<ruby>三年<rt>さんねん</rt></ruby>です。",
          "ro": "Shōgakkō wa rokunen, chūgakkō wa sannen, kōkō wa sannen desu.",
          "zh": "小学六年、初中三年、高中三年。",
          "plain": "小学校は六年、中学校は三年、高校は三年です。"
        },
        {
          "jp": "<ruby>小学校<rt>しょうがっこう</rt></ruby>と<ruby>中学校<rt>ちゅうがっこう</rt></ruby>の<ruby>九年間<rt>きゅうねんかん</rt></ruby>は、<ruby>義務教育<rt>ぎむきょういく</rt></ruby>です。",
          "ro": "Shōgakkō to chūgakkō no kyūnenkan wa, gimu kyōiku desu.",
          "zh": "小学加初中的九年是义务教育。",
          "plain": "小学校と中学校の九年間は、義務教育です。"
        },
        {
          "jp": "<ruby>四月<rt>しがつ</rt></ruby>に<ruby>入学式<rt>にゅうがくしき</rt></ruby>があります。",
          "ro": "Shigatsu ni nyūgakushiki ga arimasu.",
          "zh": "四月有入学典礼。",
          "plain": "四月に入学式があります。"
        },
        {
          "jp": "<ruby>新<rt>あたら</rt></ruby>しい<ruby>制服<rt>せいふく</rt></ruby>を<ruby>着<rt>き</rt></ruby>て、<ruby>学校<rt>がっこう</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きます。",
          "ro": "Atarashii seifuku o kite, gakkō e ikimasu.",
          "zh": "穿上新校服去学校。",
          "plain": "新しい制服を着て、学校へ行きます。"
        },
        {
          "jp": "<ruby>小学校<rt>しょうがっこう</rt></ruby>では、ランドセルを<ruby>使<rt>つか</rt></ruby>います。",
          "ro": "Shōgakkō dewa, randoseru o tsukaimasu.",
          "zh": "小学用双肩书包「ランドセル」。",
          "plain": "小学校では、ランドセルを使います。"
        },
        {
          "jp": "<ruby>昼<rt>ひる</rt></ruby>ご<ruby>飯<rt>はん</rt></ruby>は、<ruby>教室<rt>きょうしつ</rt></ruby>でみんなと<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>食<rt>た</rt></ruby>べます。",
          "ro": "Hirugohan wa, kyōshitsu de minna to issho ni tabemasu.",
          "zh": "午饭在教室里和大家一起吃。",
          "plain": "昼ご飯は、教室でみんなと一緒に食べます。"
        },
        {
          "jp": "<ruby>学校<rt>がっこう</rt></ruby>の<ruby>昼<rt>ひる</rt></ruby>ご<ruby>飯<rt>はん</rt></ruby>は「<ruby>給食<rt>きゅうしょく</rt></ruby>」です。",
          "ro": "Gakkō no hirugohan wa kyūshoku desu.",
          "zh": "学校的午饭叫「给食」。",
          "plain": "学校の昼ご飯は「給食」です。"
        },
        {
          "jp": "<ruby>給食<rt>きゅうしょく</rt></ruby>は、<ruby>生徒<rt>せいと</rt></ruby>が<ruby>自分<rt>じぶん</rt></ruby>で<ruby>教室<rt>きょうしつ</rt></ruby>まで<ruby>運<rt>はこ</rt></ruby>びます。",
          "ro": "Kyūshoku wa, seito ga jibun de kyōshitsu made hakobimasu.",
          "zh": "午餐由学生自己搬到教室。",
          "plain": "給食は、生徒が自分で教室まで運びます。"
        },
        {
          "jp": "<ruby>昼休<rt>ひるやす</rt></ruby>みの<ruby>後<rt>あと</rt></ruby>で、<ruby>教室<rt>きょうしつ</rt></ruby>を<ruby>掃除<rt>そうじ</rt></ruby>します。",
          "ro": "Hiruyasumi no ato de, kyōshitsu o sōji shimasu.",
          "zh": "午休之后打扫教室。",
          "plain": "昼休みの後で、教室を掃除します。"
        },
        {
          "jp": "<ruby>授業<rt>じゅぎょう</rt></ruby>が<ruby>終<rt>お</rt></ruby>わってから、<ruby>部活動<rt>ぶかつどう</rt></ruby>をします。",
          "ro": "Jugyō ga owatte kara, bukatsudō o shimasu.",
          "zh": "下课以后参加社团活动。",
          "plain": "授業が終わってから、部活動をします。"
        },
        {
          "jp": "<ruby>部活動<rt>ぶかつどう</rt></ruby>は<ruby>毎日<rt>まいにち</rt></ruby>あって、とても<ruby>大変<rt>たいへん</rt></ruby>ですが、<ruby>楽<rt>たの</rt></ruby>しいです。",
          "ro": "Bukatsudō wa mainichi atte, totemo taihen desu ga, tanoshii desu.",
          "zh": "社团活动每天都有，很辛苦但很开心。",
          "plain": "部活動は毎日あって、とても大変ですが、楽しいです。"
        },
        {
          "jp": "<ruby>七月<rt>しちがつ</rt></ruby>から<ruby>八月<rt>はちがつ</rt></ruby>まで、<ruby>長<rt>なが</rt></ruby>い<ruby>夏休<rt>なつやす</rt></ruby>みがあります。",
          "ro": "Shichigatsu kara hachigatsu made, nagai natsuyasumi ga arimasu.",
          "zh": "七月到八月有很长的暑假。",
          "plain": "七月から八月まで、長い夏休みがあります。"
        },
        {
          "jp": "<ruby>夏休<rt>なつやす</rt></ruby>みの<ruby>宿題<rt>しゅくだい</rt></ruby>も、たくさんあります。",
          "ro": "Natsuyasumi no shukudai mo, takusan arimasu.",
          "zh": "暑假作业也很多。",
          "plain": "夏休みの宿題も、たくさんあります。"
        },
        {
          "jp": "<ruby>三月<rt>さんがつ</rt></ruby>に<ruby>卒業式<rt>そつぎょうしき</rt></ruby>があって、<ruby>四月<rt>しがつ</rt></ruby>から<ruby>新<rt>あたら</rt></ruby>しい<ruby>生活<rt>せいかつ</rt></ruby>が<ruby>始<rt>はじ</rt></ruby>まります。",
          "ro": "Sangatsu ni sotsugyōshiki ga atte, shigatsu kara atarashii seikatsu ga hajimarimasu.",
          "zh": "三月有毕业典礼，四月开始新的生活。",
          "plain": "三月に卒業式があって、四月から新しい生活が始まります。"
        }
      ]
    },
    {
      "id": "a8",
      "no": "08",
      "cat": "生活",
      "ja": "ごみの分別",
      "short": "ごみの分別",
      "zh": "垃圾分类",
      "file": "gomi.html",
      "sentCount": 15,
      "grammarTag": "〜なければなりません",
      "desc": "哪天扔什么、瓶子要不要洗、粗大垃圾为什么要预约——日本生活的第一课。",
      "quiz": [
        {
          "q": "ペットボトルを出す前に、何をしなければなりませんか。",
          "opts": [
            "キャップとラベルを取って、水で洗います",
            "小さく切ります",
            "袋に入れません",
            "電話で予約します"
          ],
          "ans": 0,
          "ref": 6,
          "exp": "第6句。電話予約是粗大ごみ（第11句），范围不同，别混。"
        },
        {
          "q": "粗大ごみは、どうやって出しますか。",
          "opts": [
            "決まった日の朝、袋に入れて出します",
            "電話かインターネットで予約して、お金を払います",
            "ごみ箱に捨てます",
            "電池と一緒に出します"
          ],
          "ans": 1,
          "ref": 11,
          "exp": "第11–12句：要预约，而且要花钱。电池和荧光灯是「別の箱」（第13句）。"
        }
      ],
      "verbs": [
        {
          "dict": "出す",
          "masu": "出します",
          "te": "出して",
          "ta": "出した",
          "type": "五段",
          "zh": "拿出、交出；扔（垃圾）",
          "note": "ごみを 出す 是固定说法，不是 捨てる。"
        },
        {
          "dict": "分ける",
          "masu": "分けます",
          "te": "分けて",
          "ta": "分けた",
          "type": "一段",
          "zh": "分、分类（他）",
          "pair": "自动词对应：分かれる（分开）"
        },
        {
          "dict": "取る",
          "masu": "取ります",
          "te": "取って",
          "ta": "取った",
          "type": "五段",
          "zh": "取下、拿"
        },
        {
          "dict": "慣れる",
          "masu": "慣れます",
          "te": "慣れて",
          "ta": "慣れた",
          "type": "一段",
          "zh": "习惯",
          "note": "对象用 に：生活に 慣れる。"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>では、ごみを<ruby>出<rt>だ</rt></ruby>す<ruby>前<rt>まえ</rt></ruby>に、<ruby>分別<rt>ぶんべつ</rt></ruby>しなければなりません。",
          "ro": "Nihon dewa, gomi o dasu mae ni, bunbetsu shinakereba narimasen.",
          "zh": "在日本，扔垃圾之前必须分类。",
          "plain": "日本では、ごみを出す前に、分別しなければなりません。"
        },
        {
          "jp": "ごみは、<ruby>住<rt>す</rt></ruby>んでいる<ruby>町<rt>まち</rt></ruby>のルールで<ruby>分<rt>わ</rt></ruby>けます。",
          "ro": "Gomi wa, sunde iru machi no rūru de wakemasu.",
          "zh": "垃圾按所住城市的规则来分。",
          "plain": "ごみは、住んでいる町のルールで分けます。"
        },
        {
          "jp": "ごみは、<ruby>大<rt>おお</rt></ruby>きく<ruby>四<rt>よっ</rt></ruby>つに<ruby>分<rt>わ</rt></ruby>かれます。<ruby>燃<rt>も</rt></ruby>えるごみ、<ruby>燃<rt>も</rt></ruby>えないごみ、<ruby>資源<rt>しげん</rt></ruby>ごみ、<ruby>粗大<rt>そだい</rt></ruby>ごみです。",
          "ro": "Gomi wa, ōkiku yottsu ni wakaremasu. Moeru gomi, moenai gomi, shigen gomi, sodai gomi desu.",
          "zh": "垃圾大致分四类：可燃垃圾、不可燃垃圾、资源垃圾、大件垃圾。",
          "plain": "ごみは、大きく四つに分かれます。燃えるごみ、燃えないごみ、資源ごみ、粗大ごみです。"
        },
        {
          "jp": "<ruby>燃<rt>も</rt></ruby>えるごみは、<ruby>台所<rt>だいどころ</rt></ruby>のごみや<ruby>紙<rt>かみ</rt></ruby>くずです。",
          "ro": "Moeru gomi wa, daidokoro no gomi ya kamikuzu desu.",
          "zh": "可燃垃圾是厨余垃圾和碎纸。",
          "plain": "燃えるごみは、台所のごみや紙くずです。"
        },
        {
          "jp": "<ruby>資源<rt>しげん</rt></ruby>ごみは、びん、かん、ペットボトルなどです。",
          "ro": "Shigen gomi wa, bin, kan, petto botoru nado desu.",
          "zh": "资源垃圾是玻璃瓶、易拉罐、塑料瓶等。",
          "plain": "資源ごみは、びん、かん、ペットボトルなどです。"
        },
        {
          "jp": "ペットボトルは、キャップとラベルを<ruby>取<rt>と</rt></ruby>ってから、<ruby>水<rt>みず</rt></ruby>で<ruby>洗<rt>あら</rt></ruby>います。",
          "ro": "Petto botoru wa, kyappu to raberu o totte kara, mizu de araimasu.",
          "zh": "塑料瓶要先取下瓶盖和标签，再用水冲一下。",
          "plain": "ペットボトルは、キャップとラベルを取ってから、水で洗います。"
        },
        {
          "jp": "<ruby>汚<rt>よご</rt></ruby>れたペットボトルは、<ruby>出<rt>だ</rt></ruby>さないでください。",
          "ro": "Yogoreta petto botoru wa, dasanai de kudasai.",
          "zh": "脏的塑料瓶请不要扔。",
          "plain": "汚れたペットボトルは、出さないでください。"
        },
        {
          "jp": "ごみは、<ruby>決<rt>き</rt></ruby>まった<ruby>日<rt>ひ</rt></ruby>の<ruby>朝<rt>あさ</rt></ruby>に<ruby>出<rt>だ</rt></ruby>します。",
          "ro": "Gomi wa, kimatta hi no asa ni dashimasu.",
          "zh": "垃圾在规定日期的早上扔。",
          "plain": "ごみは、決まった日の朝に出します。"
        },
        {
          "jp": "<ruby>町<rt>まち</rt></ruby>によって、<ruby>袋<rt>ふくろ</rt></ruby>の<ruby>色<rt>いろ</rt></ruby>や<ruby>形<rt>かたち</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>います。",
          "ro": "Machi ni yotte, fukuro no iro ya katachi ga chigaimasu.",
          "zh": "不同城市，袋子的颜色和形状不一样。",
          "plain": "町によって、袋の色や形が違います。"
        },
        {
          "jp": "<ruby>指定<rt>してい</rt></ruby>の<ruby>袋<rt>ふくろ</rt></ruby>を<ruby>買<rt>か</rt></ruby>わなければなりません。",
          "ro": "Shitei no fukuro o kawanakereba narimasen.",
          "zh": "必须买指定的袋子。",
          "plain": "指定の袋を買わなければなりません。"
        },
        {
          "jp": "<ruby>粗大<rt>そだい</rt></ruby>ごみは、<ruby>電話<rt>でんわ</rt></ruby>かインターネットで<ruby>予約<rt>よやく</rt></ruby>します。",
          "ro": "Sodai gomi wa, denwa ka intānetto de yoyaku shimasu.",
          "zh": "大件垃圾要打电话或在网上预约。",
          "plain": "粗大ごみは、電話かインターネットで予約します。"
        },
        {
          "jp": "<ruby>粗大<rt>そだい</rt></ruby>ごみは、お<ruby>金<rt>かね</rt></ruby>がかかります。",
          "ro": "Sodai gomi wa, okane ga kakarimasu.",
          "zh": "大件垃圾要花钱。",
          "plain": "粗大ごみは、お金がかかります。"
        },
        {
          "jp": "<ruby>電池<rt>でんち</rt></ruby>や<ruby>蛍光灯<rt>けいこうとう</rt></ruby>は、<ruby>別<rt>べつ</rt></ruby>の<ruby>箱<rt>はこ</rt></ruby>に<ruby>入<rt>い</rt></ruby>れます。",
          "ro": "Denchi ya keikōtō wa, betsu no hako ni iremasu.",
          "zh": "电池和荧光灯放进另外的箱子。",
          "plain": "電池や蛍光灯は、別の箱に入れます。"
        },
        {
          "jp": "ルールと<ruby>違<rt>ちが</rt></ruby>うごみは、<ruby>出<rt>だ</rt></ruby>せません。",
          "ro": "Rūru to chigau gomi wa, dasemasen.",
          "zh": "不合规则的垃圾不能扔。",
          "plain": "ルールと違うごみは、出せません。"
        },
        {
          "jp": "<ruby>新<rt>あたら</rt></ruby>しい<ruby>町<rt>まち</rt></ruby>では、まず「ごみカレンダー」を<ruby>読<rt>よ</rt></ruby>みます。<ruby>最初<rt>さいしょ</rt></ruby>は<ruby>大変<rt>たいへん</rt></ruby>ですが、すぐに<ruby>慣<rt>な</rt></ruby>れます。",
          "ro": "Atarashii machi dewa, mazu gomi karendā o yomimasu. Saisho wa taihen desu ga, sugu ni naremasu.",
          "zh": "在新城市，先读「垃圾日历」。一开始很麻烦，但很快就会习惯。",
          "plain": "新しい町では、まず「ごみカレンダー」を読みます。最初は大変ですが、すぐに慣れます。"
        }
      ]
    },
    {
      "id": "a9",
      "no": "09",
      "cat": "文化",
      "ja": "夏祭りと花火",
      "short": "夏祭り",
      "zh": "夏日祭与花火",
      "file": "matsuri.html",
      "sentCount": 15,
      "grammarTag": "〜たり〜たり・〜たことがあります",
      "desc": "浴衣、屋台、盆踊り、两万发花火——日本夏天最热闹的十五句话。",
      "quiz": [
        {
          "q": "「私」は去年、何ができませんでしたか。",
          "opts": [
            "浴衣を着ること",
            "帯を結ぶこと",
            "盆踊りをすること",
            "花火を見ること"
          ],
          "ans": 1,
          "ref": 6,
          "exp": "第6句「自分で帯を結ぶことができませんでした」。第5句说浴衣は着ました——穿了，只是系不好带子。"
        },
        {
          "q": "隅田川花火大会について、正しいものはどれですか。",
          "opts": [
            "去年始まりました",
            "江戸時代から続いています",
            "一晩で二千発上がります",
            "冬にあります"
          ],
          "ans": 1,
          "ref": 13,
          "exp": "第13句。第14句是「二万発」，不是二千発。"
        }
      ],
      "verbs": [
        {
          "dict": "結ぶ",
          "masu": "結びます",
          "te": "結んで",
          "ta": "結んだ",
          "type": "五段",
          "zh": "系、打（结）"
        },
        {
          "dict": "踊る",
          "masu": "踊ります",
          "te": "踊って",
          "ta": "踊った",
          "type": "五段",
          "zh": "跳舞"
        },
        {
          "dict": "続く",
          "masu": "続きます",
          "te": "続いて",
          "ta": "続いた",
          "type": "五段",
          "zh": "持续（自）",
          "pair": "他动词对应：続ける（继续做）"
        },
        {
          "dict": "聞こえる",
          "masu": "聞こえます",
          "te": "聞こえて",
          "ta": "聞こえた",
          "type": "一段",
          "zh": "听得见（自）",
          "note": "不是\"听\"而是\"听得见\"：音が 聞こえる。主动去听用 聞く。"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>日本<rt>にほん</rt></ruby>の<ruby>夏<rt>なつ</rt></ruby>は、<ruby>祭<rt>まつ</rt></ruby>りの<ruby>季節<rt>きせつ</rt></ruby>です。",
          "ro": "Nihon no natsu wa, matsuri no kisetsu desu.",
          "zh": "日本的夏天，是祭典的季节。",
          "plain": "日本の夏は、祭りの季節です。"
        },
        {
          "jp": "<ruby>七月<rt>しちがつ</rt></ruby>から<ruby>八月<rt>はちがつ</rt></ruby>まで、<ruby>町<rt>まち</rt></ruby>のあちこちで<ruby>祭<rt>まつ</rt></ruby>りがあります。",
          "ro": "Shichigatsu kara hachigatsu made, machi no achikochi de matsuri ga arimasu.",
          "zh": "从七月到八月，城市各处都有祭典。",
          "plain": "七月から八月まで、町のあちこちで祭りがあります。"
        },
        {
          "jp": "<ruby>祭<rt>まつ</rt></ruby>りでは、<ruby>浴衣<rt>ゆかた</rt></ruby>を<ruby>着<rt>き</rt></ruby>ます。",
          "ro": "Matsuri dewa, yukata o kimasu.",
          "zh": "祭典上穿浴衣。",
          "plain": "祭りでは、浴衣を着ます。"
        },
        {
          "jp": "<ruby>浴衣<rt>ゆかた</rt></ruby>は、<ruby>夏<rt>なつ</rt></ruby>の<ruby>着物<rt>きもの</rt></ruby>です。とても<ruby>涼<rt>すず</rt></ruby>しいです。",
          "ro": "Yukata wa, natsu no kimono desu. Totemo suzushii desu.",
          "zh": "浴衣是夏天的和服。非常凉快。",
          "plain": "浴衣は、夏の着物です。とても涼しいです。"
        },
        {
          "jp": "<ruby>私<rt>わたし</rt></ruby>は<ruby>去年<rt>きょねん</rt></ruby>、<ruby>初<rt>はじ</rt></ruby>めて<ruby>浴衣<rt>ゆかた</rt></ruby>を<ruby>着<rt>き</rt></ruby>ました。",
          "ro": "Watashi wa kyonen, hajimete yukata o kimashita.",
          "zh": "我去年第一次穿了浴衣。",
          "plain": "私は去年、初めて浴衣を着ました。"
        },
        {
          "jp": "<ruby>自分<rt>じぶん</rt></ruby>で<ruby>帯<rt>おび</rt></ruby>を<ruby>結<rt>むす</rt></ruby>ぶことができませんでした。",
          "ro": "Jibun de obi o musubu koto ga dekimasen deshita.",
          "zh": "我自己系不好腰带。",
          "plain": "自分で帯を結ぶことができませんでした。"
        },
        {
          "jp": "<ruby>祭<rt>まつ</rt></ruby>りには、たくさんの<ruby>屋台<rt>やたい</rt></ruby>があります。",
          "ro": "Matsuri niwa, takusan no yatai ga arimasu.",
          "zh": "祭典上有很多摊位。",
          "plain": "祭りには、たくさんの屋台があります。"
        },
        {
          "jp": "たこ<ruby>焼<rt>や</rt></ruby>きや<ruby>焼<rt>や</rt></ruby>きそばを<ruby>食<rt>た</rt></ruby>べたり、<ruby>金魚<rt>きんぎょ</rt></ruby>すくいをしたりします。",
          "ro": "Takoyaki ya yakisoba o tabetari, kingyo-sukui o shitari shimasu.",
          "zh": "吃章鱼烧、炒面，捞金鱼。",
          "plain": "たこ焼きや焼きそばを食べたり、金魚すくいをしたりします。"
        },
        {
          "jp": "かき<ruby>氷<rt>ごおり</rt></ruby>も<ruby>人気<rt>にんき</rt></ruby>があります。",
          "ro": "Kaki-gōri mo ninki ga arimasu.",
          "zh": "刨冰也很受欢迎。",
          "plain": "かき氷も人気があります。"
        },
        {
          "jp": "<ruby>広場<rt>ひろば</rt></ruby>では、<ruby>盆踊<rt>ぼんおど</rt></ruby>りをします。",
          "ro": "Hiroba dewa, bon-odori o shimasu.",
          "zh": "广场上跳盂兰盆舞。",
          "plain": "広場では、盆踊りをします。"
        },
        {
          "jp": "みんなで<ruby>輪<rt>わ</rt></ruby>になって<ruby>踊<rt>おど</rt></ruby>ります。<ruby>太鼓<rt>たいこ</rt></ruby>の<ruby>音<rt>おと</rt></ruby>が<ruby>聞<rt>き</rt></ruby>こえます。",
          "ro": "Minna de wa ni natte odorimasu. Taiko no oto ga kikoemasu.",
          "zh": "大家围成圈跳舞。能听到太鼓的声音。",
          "plain": "みんなで輪になって踊ります。太鼓の音が聞こえます。"
        },
        {
          "jp": "<ruby>花火大会<rt>はなびたいかい</rt></ruby>も、<ruby>夏<rt>なつ</rt></ruby>の<ruby>楽<rt>たの</rt></ruby>しみです。",
          "ro": "Hanabi taikai mo, natsu no tanoshimi desu.",
          "zh": "烟花大会也是夏天的乐趣。",
          "plain": "花火大会も、夏の楽しみです。"
        },
        {
          "jp": "<ruby>東京<rt>とうきょう</rt></ruby>の<ruby>隅田川<rt>すみだがわ</rt></ruby><ruby>花火大会<rt>はなびたいかい</rt></ruby>は、<ruby>江戸時代<rt>えどじだい</rt></ruby>から<ruby>続<rt>つづ</rt></ruby>いています。",
          "ro": "Tōkyō no Sumidagawa hanabi taikai wa, Edo jidai kara tsuzuite imasu.",
          "zh": "东京的隅田川烟花大会从江户时代延续至今。",
          "plain": "東京の隅田川花火大会は、江戸時代から続いています。"
        },
        {
          "jp": "<ruby>一晩<rt>ひとばん</rt></ruby>で、<ruby>二万発<rt>にまんはつ</rt></ruby>の<ruby>花火<rt>はなび</rt></ruby>が<ruby>上<rt>あ</rt></ruby>がります。",
          "ro": "Hitoban de, niman-hatsu no hanabi ga agarimasu.",
          "zh": "一晚上会放两万发烟花。",
          "plain": "一晩で、二万発の花火が上がります。"
        },
        {
          "jp": "<ruby>花火<rt>はなび</rt></ruby>を<ruby>見<rt>み</rt></ruby>たことがありますか。",
          "ro": "Hanabi o mita koto ga arimasu ka.",
          "zh": "你看过烟花吗？",
          "plain": "花火を見たことがありますか。"
        }
      ]
    },
    {
      "id": "a10",
      "no": "10",
      "cat": "文化",
      "ja": "富士山",
      "short": "富士山",
      "zh": "富士山",
      "file": "fuji.html",
      "sentCount": 15,
      "grammarTag": "〜と思います・〜かもしれません",
      "desc": "3776 米、世界文化遗产、只在夏天开放——关于富士山最常被问到的几件事。",
      "quiz": [
        {
          "q": "五合目から頂上まで、歩いてどのくらいかかりますか。",
          "opts": [
            "一時間ぐらい",
            "三時間ぐらい",
            "六時間ぐらい",
            "一晩"
          ],
          "ans": 2,
          "ref": 9,
          "exp": "第9句「歩いて六時間ぐらいかかります」。「一晩」是夜里上山看日出（第11句），不是步行时间。"
        },
        {
          "q": "富士山に登ることができるのは、いつですか。",
          "opts": [
            "一年中",
            "七月一日から九月十日まで",
            "夏と冬",
            "五月から八月まで"
          ],
          "ans": 1,
          "ref": 7,
          "exp": "第6–7句：只有夏天，具体是 7/1–9/10。第6句的「夏だけ」和第7句的具体日期要一起读。"
        }
      ],
      "verbs": [
        {
          "dict": "登る",
          "masu": "登ります",
          "te": "登って",
          "ta": "登った",
          "type": "五段",
          "zh": "登（山 / 台阶）"
        },
        {
          "dict": "かかる",
          "masu": "かかります",
          "te": "かかって",
          "ta": "かかった",
          "type": "五段",
          "zh": "花费（时间 / 钱）",
          "note": "时间用 に：六時間 かかります。"
        },
        {
          "dict": "呼ぶ",
          "masu": "呼びます",
          "te": "呼んで",
          "ta": "呼んだ",
          "type": "五段",
          "zh": "称、叫；呼唤"
        },
        {
          "dict": "降る",
          "masu": "降ります",
          "te": "降って",
          "ta": "降った",
          "type": "五段",
          "zh": "下（雨 / 雪）",
          "note": "雨が 降る。和「降りる（下车）」是两个词，容易混。"
        }
      ],
      "sentences": [
        {
          "jp": "<ruby>富士山<rt>ふじさん</rt></ruby>は、<ruby>日本<rt>にほん</rt></ruby>で<ruby>一番<rt>いちばん</rt></ruby><ruby>高<rt>たか</rt></ruby>い<ruby>山<rt>やま</rt></ruby>です。",
          "ro": "Fujisan wa, Nihon de ichiban takai yama desu.",
          "zh": "富士山是日本最高的山。",
          "plain": "富士山は、日本で一番高い山です。"
        },
        {
          "jp": "<ruby>高<rt>たか</rt></ruby>さは、<ruby>三千七百七十六<rt>さんぜんななひゃくななじゅうろく</rt></ruby>メートルです。",
          "ro": "Takasa wa, sanzen nanahyaku nanajūroku mētoru desu.",
          "zh": "高度是 3776 米。",
          "plain": "高さは、三千七百七十六メートルです。"
        },
        {
          "jp": "<ruby>山梨県<rt>やまなしけん</rt></ruby>と<ruby>静岡県<rt>しずおかけん</rt></ruby>の<ruby>間<rt>あいだ</rt></ruby>にあります。",
          "ro": "Yamanashi-ken to Shizuoka-ken no aida ni arimasu.",
          "zh": "位于山梨县和静冈县之间。",
          "plain": "山梨県と静岡県の間にあります。"
        },
        {
          "jp": "<ruby>富士山<rt>ふじさん</rt></ruby>は、<ruby>昔<rt>むかし</rt></ruby>から<ruby>日本<rt>にほん</rt></ruby>の<ruby>象徴<rt>しょうちょう</rt></ruby>です。",
          "ro": "Fujisan wa, mukashi kara Nihon no shōchō desu.",
          "zh": "富士山自古以来就是日本的象征。",
          "plain": "富士山は、昔から日本の象徴です。"
        },
        {
          "jp": "2013<ruby>年<rt>ねん</rt></ruby>に、<ruby>世界文化遺産<rt>せかいぶんかいさん</rt></ruby>になりました。",
          "ro": "Nisen-jūsan-nen ni, sekai bunka isan ni narimashita.",
          "zh": "2013 年成为世界文化遗产。",
          "plain": "2013年に、世界文化遺産になりました。"
        },
        {
          "jp": "<ruby>夏<rt>なつ</rt></ruby>だけ、<ruby>山<rt>やま</rt></ruby>の<ruby>頂上<rt>ちょうじょう</rt></ruby>まで<ruby>登<rt>のぼ</rt></ruby>ることができます。",
          "ro": "Natsu dake, yama no chōjō made noboru koto ga dekimasu.",
          "zh": "只有夏天能登上山顶。",
          "plain": "夏だけ、山の頂上まで登ることができます。"
        },
        {
          "jp": "<ruby>七月一日<rt>しちがつついたち</rt></ruby>から<ruby>九月十日<rt>くがつとおか</rt></ruby>まで、<ruby>登山<rt>とざん</rt></ruby>ができます。",
          "ro": "Shichigatsu tsuitachi kara kugatsu tōka made, tozan ga dekimasu.",
          "zh": "七月一日到九月十日可以登山。",
          "plain": "七月一日から九月十日まで、登山ができます。"
        },
        {
          "jp": "<ruby>五合目<rt>ごごうめ</rt></ruby>まで、バスで<ruby>行<rt>い</rt></ruby>くことができます。",
          "ro": "Gogōme made, basu de iku koto ga dekimasu.",
          "zh": "可以坐巴士到五合目。",
          "plain": "五合目まで、バスで行くことができます。"
        },
        {
          "jp": "<ruby>五合目<rt>ごごうめ</rt></ruby>から<ruby>頂上<rt>ちょうじょう</rt></ruby>まで、<ruby>歩<rt>ある</rt></ruby>いて<ruby>六時間<rt>ろくじかん</rt></ruby>ぐらいかかります。",
          "ro": "Gogōme kara chōjō made, aruite rokujikan gurai kakarimasu.",
          "zh": "从五合目到山顶，走路大约六小时。",
          "plain": "五合目から頂上まで、歩いて六時間ぐらいかかります。"
        },
        {
          "jp": "<ruby>山<rt>やま</rt></ruby>の<ruby>上<rt>うえ</rt></ruby>は、<ruby>夏<rt>なつ</rt></ruby>でも<ruby>寒<rt>さむ</rt></ruby>いです。",
          "ro": "Yama no ue wa, natsu demo samui desu.",
          "zh": "山上即使是夏天也很冷。",
          "plain": "山の上は、夏でも寒いです。"
        },
        {
          "jp": "<ruby>夜<rt>よる</rt></ruby>に<ruby>登<rt>のぼ</rt></ruby>って、<ruby>朝<rt>あさ</rt></ruby>の<ruby>太陽<rt>たいよう</rt></ruby>を<ruby>見<rt>み</rt></ruby>る<ruby>人<rt>ひと</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いです。",
          "ro": "Yoru ni nobotte, asa no taiyō o miru hito ga ōi desu.",
          "zh": "很多人夜里上山，看早晨的太阳。",
          "plain": "夜に登って、朝の太陽を見る人が多いです。"
        },
        {
          "jp": "この<ruby>日<rt>ひ</rt></ruby>の<ruby>出<rt>で</rt></ruby>を「ご<ruby>来光<rt>らいこう</rt></ruby>」と<ruby>呼<rt>よ</rt></ruby>びます。",
          "ro": "Kono hinode o goraikō to yobimasu.",
          "zh": "这个日出叫「御来光」。",
          "plain": "この日の出を「ご来光」と呼びます。"
        },
        {
          "jp": "ご<ruby>来光<rt>らいこう</rt></ruby>は、とてもきれいだと<ruby>思<rt>おも</rt></ruby>います。",
          "ro": "Goraikō wa, totemo kirei da to omoimasu.",
          "zh": "我觉得御来光非常美。",
          "plain": "ご来光は、とてもきれいだと思います。"
        },
        {
          "jp": "でも、<ruby>山<rt>やま</rt></ruby>の<ruby>天気<rt>てんき</rt></ruby>は<ruby>変<rt>か</rt></ruby>わりやすいです。<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るかもしれません。",
          "ro": "Demo, yama no tenki wa kawari-yasui desu. Ame ga furu kamoshiremasen.",
          "zh": "但是山上的天气很容易变。可能会下雨。",
          "plain": "でも、山の天気は変わりやすいです。雨が降るかもしれません。"
        },
        {
          "jp": "いつか、<ruby>私<rt>わたし</rt></ruby>も<ruby>富士山<rt>ふじさん</rt></ruby>に<ruby>登<rt>のぼ</rt></ruby>りたいと<ruby>思<rt>おも</rt></ruby>います。",
          "ro": "Itsuka, watashi mo Fujisan ni noboritai to omoimasu.",
          "zh": "总有一天，我也想去登富士山。",
          "plain": "いつか、私も富士山に登りたいと思います。"
        }
      ]
    },
    {
      "id": "a11",
      "no": "11",
      "cat": "会話",
      "ja": "道を聞く",
      "short": "道を聞く",
      "zh": "问路",
      "file": "michi.html",
      "sentCount": 15,
      "grammarTag": "〜てもいいですか・〜てください",
      "desc": "街上真实发生的问路对话。15 句里有一半是方向词：まっすぐ、角を右、二つ目。",
      "sentences": [
        {
          "jp": "すみません。ちょっと<ruby>聞<rt>き</rt></ruby>いてもいいですか。",
          "ro": "Sumimasen. Chotto kiite mo ii desu ka.",
          "zh": "不好意思，可以问一下吗？",
          "plain": "すみません。ちょっと聞いてもいいですか。",
          "sp": "A"
        },
        {
          "jp": "はい、どうぞ。",
          "ro": "Hai, dōzo.",
          "zh": "好，请说。",
          "plain": "はい、どうぞ。",
          "sp": "B"
        },
        {
          "jp": "<ruby>駅<rt>えき</rt></ruby>はどこですか。",
          "ro": "Eki wa doko desu ka.",
          "zh": "车站在哪里？",
          "plain": "駅はどこですか。",
          "sp": "A"
        },
        {
          "jp": "<ruby>駅<rt>えき</rt></ruby>ですね。この<ruby>道<rt>みち</rt></ruby>をまっすぐ<ruby>行<rt>い</rt></ruby>ってください。",
          "ro": "Eki desu ne. Kono michi o massugu itte kudasai.",
          "zh": "车站啊。请沿这条路直走。",
          "plain": "駅ですね。この道をまっすぐ行ってください。",
          "sp": "B"
        },
        {
          "jp": "まっすぐですね。",
          "ro": "Massugu desu ne.",
          "zh": "直走是吧。",
          "plain": "まっすぐですね。",
          "sp": "A"
        },
        {
          "jp": "ええ。<ruby>二<rt>ふた</rt></ruby>つ<ruby>目<rt>め</rt></ruby>の<ruby>角<rt>かど</rt></ruby>を<ruby>右<rt>みぎ</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>がってください。",
          "ro": "Ee. Futatsume no kado o migi ni magatte kudasai.",
          "zh": "嗯。请在第二个路口向右拐。",
          "plain": "ええ。二つ目の角を右に曲がってください。",
          "sp": "B"
        },
        {
          "jp": "<ruby>右<rt>みぎ</rt></ruby>ですね。<ruby>信号<rt>しんごう</rt></ruby>はありますか。",
          "ro": "Migi desu ne. Shingō wa arimasu ka.",
          "zh": "右是吧。有红绿灯吗？",
          "plain": "右ですね。信号はありますか。",
          "sp": "A"
        },
        {
          "jp": "はい。<ruby>曲<rt>ま</rt></ruby>がると、すぐ<ruby>信号<rt>しんごう</rt></ruby>があります。",
          "ro": "Hai. Magaru to, sugu shingō ga arimasu.",
          "zh": "有。拐过去马上就是红绿灯。",
          "plain": "はい。曲がると、すぐ信号があります。",
          "sp": "B"
        },
        {
          "jp": "<ruby>歩<rt>ある</rt></ruby>いて、どのくらいかかりますか。",
          "ro": "Aruite, dono kurai kakarimasu ka.",
          "zh": "走路要多久？",
          "plain": "歩いて、どのくらいかかりますか。",
          "sp": "A"
        },
        {
          "jp": "<ruby>五<rt>ご</rt></ruby><ruby>分<rt>ふん</rt></ruby>ぐらいです。",
          "ro": "Gofun gurai desu.",
          "zh": "大概五分钟。",
          "plain": "五分ぐらいです。",
          "sp": "B"
        },
        {
          "jp": "ありがとうございます。<ruby>近<rt>ちか</rt></ruby>いですね。",
          "ro": "Arigatō gozaimasu. Chikai desu ne.",
          "zh": "谢谢。挺近的呢。",
          "plain": "ありがとうございます。近いですね。",
          "sp": "A"
        },
        {
          "jp": "でも、この<ruby>時間<rt>じかん</rt></ruby>は<ruby>道<rt>みち</rt></ruby>が<ruby>混<rt>こ</rt></ruby>みますよ。",
          "ro": "Demo, kono jikan wa michi ga komimasu yo.",
          "zh": "不过这个时间路上会堵。",
          "plain": "でも、この時間は道が混みますよ。",
          "sp": "B"
        },
        {
          "jp": "そうですか。<ruby>気<rt>き</rt></ruby>をつけます。",
          "ro": "Sō desu ka. Ki o tsukemasu.",
          "zh": "是吗。我会注意的。",
          "plain": "そうですか。気をつけます。",
          "sp": "A"
        },
        {
          "jp": "<ruby>地図<rt>ちず</rt></ruby>はありますか。",
          "ro": "Chizu wa arimasu ka.",
          "zh": "你有地图吗？",
          "plain": "地図はありますか。",
          "sp": "B"
        },
        {
          "jp": "はい、スマホにあります。どうもありがとうございました。",
          "ro": "Hai, sumaho ni arimasu. Dōmo arigatō gozaimashita.",
          "zh": "有，在手机里。非常感谢。",
          "plain": "はい、スマホにあります。どうもありがとうございました。",
          "sp": "A"
        }
      ],
      "quiz": [
        {
          "q": "駅まで、どう行きますか。",
          "opts": [
            "まっすぐ行って、二つ目の角を右に曲がります。",
            "まっすぐ行って、二つ目の角を左に曲がります。",
            "右に曲がると、すぐ駅があります。",
            "バスで行きます。"
          ],
          "ans": 0,
          "ref": 6,
          "exp": "第6句「二つ目の角を右に曲がってください」。左 是最容易听反的地方——日语里 右/左 跟在 に 前面，位置在句尾，要听到最后。"
        },
        {
          "q": "駅まで、歩いてどのくらいかかりますか。",
          "opts": [
            "十分ぐらいです。",
            "十五分ぐらいです。",
            "五分ぐらいです。",
            "一時間ぐらいです。"
          ],
          "ans": 2,
          "ref": 10,
          "exp": "第10句「五分ぐらいです」。注意「ぐらい」表示大约，不是精确值。"
        }
      ],
      "verbs": [
        {
          "dict": "行く",
          "masu": "行きます",
          "te": "行って",
          "ta": "行った",
          "type": "五段",
          "zh": "去",
          "note": "唯一 て形变 って 的 く 结尾动词（不是「行いて」）。"
        },
        {
          "dict": "曲がる",
          "masu": "曲がります",
          "te": "曲がって",
          "ta": "曲がった",
          "type": "五段",
          "zh": "拐弯"
        },
        {
          "dict": "歩く",
          "masu": "歩きます",
          "te": "歩いて",
          "ta": "歩いた",
          "type": "五段",
          "zh": "走、步行"
        },
        {
          "dict": "聞く",
          "masu": "聞きます",
          "te": "聞いて",
          "ta": "聞いた",
          "type": "五段",
          "zh": "问、听",
          "note": "「聞く」既指\"听\"也指\"问\"，靠上下文区分。"
        }
      ]
    },
    {
      "id": "a12",
      "no": "12",
      "cat": "日記",
      "ja": "昨日の日曜日",
      "short": "昨日の日曜日",
      "zh": "昨天的星期天",
      "file": "nikki.html",
      "sentCount": 15,
      "grammarTag": "〜ました・〜かったです",
      "desc": "只用过去时的一篇日记。从八点起床到晚上做作业，第一人称把 N5 过去时走一遍。",
      "sentences": [
        {
          "jp": "<ruby>昨日<rt>きのう</rt></ruby>は<ruby>日曜日<rt>にちようび</rt></ruby>でした。",
          "ro": "Kinō wa nichiyōbi deshita.",
          "zh": "昨天是星期天。",
          "plain": "昨日は日曜日でした。"
        },
        {
          "jp": "<ruby>朝<rt>あさ</rt></ruby>、<ruby>八時<rt>はちじ</rt></ruby>に<ruby>起<rt>お</rt></ruby>きました。",
          "ro": "Asa, hachiji ni okimashita.",
          "zh": "早上八点起床。",
          "plain": "朝、八時に起きました。"
        },
        {
          "jp": "<ruby>天気<rt>てんき</rt></ruby>がとてもよかったです。",
          "ro": "Tenki ga totemo yokatta desu.",
          "zh": "天气非常好。",
          "plain": "天気がとてもよかったです。"
        },
        {
          "jp": "それから、<ruby>公園<rt>こうえん</rt></ruby>を<ruby>散歩<rt>さんぽ</rt></ruby>しました。",
          "ro": "Sorekara, kōen o sanpo shimashita.",
          "zh": "然后去公园散了步。",
          "plain": "それから、公園を散歩しました。"
        },
        {
          "jp": "<ruby>公園<rt>こうえん</rt></ruby>には、<ruby>木<rt>き</rt></ruby>がたくさんありました。",
          "ro": "Kōen ni wa, ki ga takusan arimashita.",
          "zh": "公园里有很多树。",
          "plain": "公園には、木がたくさんありました。"
        },
        {
          "jp": "<ruby>家族<rt>かぞく</rt></ruby>も<ruby>一緒<rt>いっしょ</rt></ruby>でした。",
          "ro": "Kazoku mo issho deshita.",
          "zh": "家人也一起。",
          "plain": "家族も一緒でした。"
        },
        {
          "jp": "<ruby>昼<rt>ひる</rt></ruby>ご<ruby>飯<rt>はん</rt></ruby>は、<ruby>駅<rt>えき</rt></ruby>の<ruby>近<rt>ちか</rt></ruby>くの<ruby>店<rt>みせ</rt></ruby>で<ruby>食<rt>た</rt></ruby>べました。",
          "ro": "Hirugohan wa, eki no chikaku no mise de tabemashita.",
          "zh": "午饭在车站附近的店里吃。",
          "plain": "昼ご飯は、駅の近くの店で食べました。"
        },
        {
          "jp": "<ruby>私<rt>わたし</rt></ruby>は<ruby>天<rt>てん</rt></ruby>ぷらを<ruby>食<rt>た</rt></ruby>べました。",
          "ro": "Watashi wa tenpura o tabemashita.",
          "zh": "我吃了天妇罗。",
          "plain": "私は天ぷらを食べました。"
        },
        {
          "jp": "<ruby>妹<rt>いもうと</rt></ruby>はそばを<ruby>食<rt>た</rt></ruby>べました。",
          "ro": "Imōto wa soba o tabemashita.",
          "zh": "妹妹吃了荞麦面。",
          "plain": "妹はそばを食べました。"
        },
        {
          "jp": "<ruby>午後<rt>ごご</rt></ruby>、<ruby>友<rt>とも</rt></ruby>だちと<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>ました。",
          "ro": "Gogo, tomodachi to eiga o mimashita.",
          "zh": "下午和朋友看了电影。",
          "plain": "午後、友だちと映画を見ました。"
        },
        {
          "jp": "<ruby>映画<rt>えいが</rt></ruby>は<ruby>長<rt>なが</rt></ruby>かったですが、とても<ruby>面白<rt>おもしろ</rt></ruby>かったです。",
          "ro": "Eiga wa nagakatta desu ga, totemo omoshirokatta desu.",
          "zh": "电影很长，但非常有意思。",
          "plain": "映画は長かったですが、とても面白かったです。"
        },
        {
          "jp": "<ruby>六時<rt>ろくじ</rt></ruby>に<ruby>家<rt>いえ</rt></ruby>に<ruby>帰<rt>かえ</rt></ruby>りました。",
          "ro": "Rokuji ni ie ni kaerimashita.",
          "zh": "六点回到家。",
          "plain": "六時に家に帰りました。"
        },
        {
          "jp": "<ruby>夜<rt>よる</rt></ruby>、<ruby>宿題<rt>しゅくだい</rt></ruby>をしました。",
          "ro": "Yoru, shukudai o shimashita.",
          "zh": "晚上做了作业。",
          "plain": "夜、宿題をしました。"
        },
        {
          "jp": "<ruby>少<rt>すこ</rt></ruby>し<ruby>疲<rt>つか</rt></ruby>れましたが、<ruby>楽<rt>たの</rt></ruby>しい<ruby>一日<rt>いちにち</rt></ruby>でした。",
          "ro": "Sukoshi tsukaremashita ga, tanoshii ichinichi deshita.",
          "zh": "有点累，但是快乐的一天。",
          "plain": "少し疲れましたが、楽しい一日でした。"
        },
        {
          "jp": "<ruby>来週<rt>らいしゅう</rt></ruby>も、どこかへ<ruby>行<rt>い</rt></ruby>きたいです。",
          "ro": "Raishū mo, dokoka e ikitai desu.",
          "zh": "下周也想去哪里走走。",
          "plain": "来週も、どこかへ行きたいです。"
        }
      ],
      "quiz": [
        {
          "q": "「私」は午後、何をしましたか。",
          "opts": [
            "公園を散歩しました。",
            "友だちと映画を見ました。",
            "宿題をしました。",
            "天ぷらを食べました。"
          ],
          "ans": 1,
          "ref": 10,
          "exp": "第10句「午後、友だちと映画を見ました」。散步是上午（第4句），天妇罗是午饭（第8句），作业是晚上（第13句）——三个干扰项都在文中，只是时间段不同。"
        },
        {
          "q": "この日の天気は、どうでしたか。",
          "opts": [
            "雨でした。",
            "寒かったです。",
            "とてもよかったです。",
            "分かりません。"
          ],
          "ans": 2,
          "ref": 3,
          "exp": "第3句「天気がとてもよかったです」。注意「よかった」是「いい」的过去式，不是「よくない」。"
        }
      ],
      "verbs": [
        {
          "dict": "起きる",
          "masu": "起きます",
          "te": "起きて",
          "ta": "起きた",
          "type": "一段",
          "zh": "起床"
        },
        {
          "dict": "帰る",
          "masu": "帰ります",
          "te": "帰って",
          "ta": "帰った",
          "type": "五段",
          "zh": "回去",
          "note": "虽然以 る 结尾，但它是五段动词（不是一段）。同类还有 入る、走る、知る、切る。"
        },
        {
          "dict": "疲れる",
          "masu": "疲れます",
          "te": "疲れて",
          "ta": "疲れた",
          "type": "一段",
          "zh": "累"
        },
        {
          "dict": "食べる",
          "masu": "食べます",
          "te": "食べて",
          "ta": "食べた",
          "type": "一段",
          "zh": "吃"
        }
      ]
    },
    {
      "id": "a13",
      "no": "13",
      "cat": "実用",
      "ja": "スーパーのチラシ",
      "short": "チラシ",
      "zh": "超市促销单",
      "file": "chirashi.html",
      "sentCount": 15,
      "grammarTag": "〜は〜です・〜から〜まで",
      "desc": "一张超市促销单。价格、限定、营业时间——真实生活里最常读的非连续文本。",
      "sentences": [
        {
          "jp": "<ruby>本日<rt>ほんじつ</rt></ruby><ruby>限<rt>かぎ</rt></ruby>りの<ruby>特売<rt>とくばい</rt></ruby>です。",
          "ro": "Honjitsu kagiri no tokubai desu.",
          "zh": "仅限今天的特价。",
          "plain": "本日限りの特売です。"
        },
        {
          "jp": "トマトは、<ruby>一袋<rt>ひとふくろ</rt></ruby> <ruby>百九十八円<rt>ひゃくきゅうじゅうはちえん</rt></ruby>です。",
          "ro": "Tomato wa, hitofukuro hyaku kyūjū hachi en desu.",
          "zh": "西红柿一袋 198 日元。",
          "plain": "トマトは、一袋 百九十八円です。"
        },
        {
          "jp": "<ruby>卵<rt>たまご</rt></ruby>は、<ruby>十個<rt>じゅっこ</rt></ruby>で <ruby>二百五十円<rt>にひゃくごじゅうえん</rt></ruby>です。",
          "ro": "Tamago wa, jukko de nihyaku gojū en desu.",
          "zh": "鸡蛋十个 250 日元。",
          "plain": "卵は、十個で 二百五十円です。"
        },
        {
          "jp": "<ruby>国産<rt>こくさん</rt></ruby>の<ruby>牛肉<rt>ぎゅうにく</rt></ruby>は、<ruby>半額<rt>はんがく</rt></ruby>です。",
          "ro": "Kokusan no gyūniku wa, hangaku desu.",
          "zh": "国产牛肉半价。",
          "plain": "国産の牛肉は、半額です。"
        },
        {
          "jp": "<ruby>魚<rt>さかな</rt></ruby>も、<ruby>新鮮<rt>しんせん</rt></ruby>なものが あります。",
          "ro": "Sakana mo, shinsen na mono ga arimasu.",
          "zh": "鱼也有新鲜的。",
          "plain": "魚も、新鮮なものが あります。"
        },
        {
          "jp": "<ruby>朝<rt>あさ</rt></ruby><ruby>九時<rt>くじ</rt></ruby>から、<ruby>夜<rt>よる</rt></ruby><ruby>八時<rt>はちじ</rt></ruby>までです。",
          "ro": "Asa kuji kara, yoru hachiji made desu.",
          "zh": "早上九点到晚上八点。",
          "plain": "朝九時から、夜八時までです。"
        },
        {
          "jp": "<ruby>数量限定<rt>すうりょうげんてい</rt></ruby>です。お<ruby>一人様<rt>ひとりさま</rt></ruby> <ruby>二点<rt>にてん</rt></ruby>まで。",
          "ro": "Sūryō gentei desu. Ohitorisama niten made.",
          "zh": "数量有限。每位顾客限购两件。",
          "plain": "数量限定です。お一人様 二点まで。"
        },
        {
          "jp": "レジで、このチラシを <ruby>見<rt>み</rt></ruby>せてください。",
          "ro": "Reji de, kono chirashi o misete kudasai.",
          "zh": "结账时请出示这张传单。",
          "plain": "レジで、このチラシを 見せてください。"
        },
        {
          "jp": "<ruby>袋<rt>ふくろ</rt></ruby>は、<ruby>一枚<rt>いちまい</rt></ruby> <ruby>五円<rt>ごえん</rt></ruby>です。",
          "ro": "Fukuro wa, ichimai goen desu.",
          "zh": "袋子一个 5 日元。",
          "plain": "袋は、一枚 五円です。"
        },
        {
          "jp": "マイバッグを <ruby>持<rt>も</rt></ruby>ってきてください。",
          "ro": "Maibaggu o motte kite kudasai.",
          "zh": "请自带购物袋。",
          "plain": "マイバッグを 持ってきてください。"
        },
        {
          "jp": "<ruby>駐車場<rt>ちゅうしゃじょう</rt></ruby>は、<ruby>店<rt>みせ</rt></ruby>の<ruby>裏<rt>うら</rt></ruby>に あります。",
          "ro": "Chūshajō wa, mise no ura ni arimasu.",
          "zh": "停车场在店后面。",
          "plain": "駐車場は、店の裏に あります。"
        },
        {
          "jp": "<ruby>雨<rt>あめ</rt></ruby>の<ruby>日<rt>ひ</rt></ruby>は、<ruby>傘<rt>かさ</rt></ruby>を <ruby>貸<rt>か</rt></ruby>します。",
          "ro": "Ame no hi wa, kasa o kashimasu.",
          "zh": "下雨天可以借伞。",
          "plain": "雨の日は、傘を 貸します。"
        },
        {
          "jp": "<ruby>毎週<rt>まいしゅう</rt></ruby> <ruby>水曜日<rt>すいようび</rt></ruby>は、ポイントが <ruby>二倍<rt>にばい</rt></ruby>です。",
          "ro": "Maishū suiyōbi wa, pointo ga nibai desu.",
          "zh": "每周三积分双倍。",
          "plain": "毎週 水曜日は、ポイントが 二倍です。"
        },
        {
          "jp": "<ruby>分<rt>わ</rt></ruby>からないことは、<ruby>店<rt>みせ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に <ruby>聞<rt>き</rt></ruby>いてください。",
          "ro": "Wakaranai koto wa, mise no hito ni kiite kudasai.",
          "zh": "有不明白的事，请询问店员。",
          "plain": "分からないことは、店の人に 聞いてください。"
        },
        {
          "jp": "<ruby>皆様<rt>みなさま</rt></ruby>の ご<ruby>来店<rt>らいてん</rt></ruby>を お<ruby>待<rt>ま</rt></ruby>ちしております。",
          "ro": "Minasama no goraiten o omachi shite orimasu.",
          "zh": "期待各位光临。",
          "plain": "皆様の ご来店を お待ちしております。"
        }
      ],
      "quiz": [
        {
          "q": "卵は、いくらですか。",
          "opts": [
            "百九十八円です。",
            "二百五十円です。",
            "五円です。",
            "半額です。"
          ],
          "ans": 1,
          "ref": 3,
          "exp": "第3句「十個で 二百五十円」。198 円 是西红柿（第2句），5 円 是袋子（第9句）——三个数字都在文中，考的是有没有读准\"哪个价钱对哪个商品\"。"
        },
        {
          "q": "この店について、正しいものはどれですか。",
          "opts": [
            "夜十時まで 営業しています。",
            "一人で 何点でも 買えます。",
            "袋は ただです。",
            "水曜日は ポイントが 二倍です。"
          ],
          "ans": 3,
          "ref": 13,
          "exp": "第13句。营业到八点不是十点（第6句）；每人限两点不是随便买（第7句）；袋要 5 円不是免费（第9句）。"
        }
      ],
      "verbs": [
        {
          "dict": "見せる",
          "masu": "見せます",
          "te": "見せて",
          "ta": "見せた",
          "type": "一段",
          "zh": "出示、给人看"
        },
        {
          "dict": "持ってくる",
          "masu": "持ってきます",
          "te": "持ってきて",
          "ta": "持ってきた",
          "type": "五段＋来る",
          "zh": "带来",
          "note": "复合动词，「来る」那一半按カ变变化：きて／きた。"
        },
        {
          "dict": "貸す",
          "masu": "貸します",
          "te": "貸して",
          "ta": "貸した",
          "type": "五段",
          "zh": "借出（给别人）",
          "note": "「借りる」是借进来，方向相反，最容易混的一对。"
        },
        {
          "dict": "待つ",
          "masu": "待ちます",
          "te": "待って",
          "ta": "待った",
          "type": "五段",
          "zh": "等"
        }
      ]
    }
  ],
  "words": [
    {
      "ja": "自動販売機",
      "kana": "じどうはんばいき",
      "zh": "自动售货机",
      "r": "jidōhanbaiki",
      "m": "自动售货机。口语也说「自販機（じはんき）」。",
      "a": "a1"
    },
    {
      "ja": "約",
      "kana": "やく",
      "zh": "大约、约",
      "r": "yaku",
      "m": "大约、约。放在数量词前面：約四百万台。",
      "a": "a1"
    },
    {
      "ja": "〜台",
      "kana": "だい",
      "zh": "台（数机器的量词）",
      "r": "-dai",
      "m": "数机器、车辆的量词：一台、百万台。",
      "a": "a1"
    },
    {
      "ja": "世界",
      "kana": "せかい",
      "zh": "世界",
      "r": "sekai",
      "m": "世界。世界でも = 在世界上也。",
      "a": "a1"
    },
    {
      "ja": "多い",
      "kana": "おおい",
      "zh": "多的",
      "r": "ōi",
      "m": "多的（い形容词）。反义词：少ない（すくない）。",
      "a": "a1"
    },
    {
      "ja": "赤い",
      "kana": "あかい",
      "zh": "红的（い形容词）",
      "r": "akai",
      "m": "い形容词，直接接名词：赤いラベル。反义「青い」。本文用它区分热饮冷饮。",
      "a": "a1"
    },
    {
      "ja": "青い",
      "kana": "あおい",
      "zh": "蓝的（い形容词）",
      "r": "aoi",
      "m": "い形容词。日语的「青」常指蓝，也用于绿灯（青信号）。和「赤い」成对记。",
      "a": "a1"
    },
    {
      "ja": "売っています",
      "kana": "うっています",
      "zh": "有在卖、正在卖",
      "r": "utte imasu",
      "m": "有在卖、正在卖（売る 的 〜ています 形）。",
      "a": "a1"
    },
    {
      "ja": "あたたかい",
      "kana": "",
      "zh": "温暖的、热的",
      "r": "atatakai",
      "m": "温暖的、热的（い形容词）。反义词：つめたい（冷的）。",
      "a": "a1"
    },
    {
      "ja": "ラベル",
      "kana": "",
      "zh": "标签（红＝热饮，蓝＝冷饮）",
      "r": "raberu",
      "m": "标签。自贩机上红＝热饮、蓝＝冷饮，看标签最快。来自英语 label。",
      "a": "a1"
    },
    {
      "ja": "安全（な）",
      "kana": "あんぜん",
      "zh": "安全的",
      "r": "anzen",
      "m": "安全的（な形容词）：安全な国。",
      "a": "a1"
    },
    {
      "ja": "安心（な）",
      "kana": "あんしん",
      "zh": "安心的、放心的",
      "r": "anshin",
      "m": "安心的、放心的（な形容词）。",
      "a": "a1"
    },
    {
      "ja": "便利（な）",
      "kana": "べんり",
      "zh": "方便的",
      "r": "benri",
      "m": "方便的（な形容词）。",
      "a": "a1"
    },
    {
      "ja": "寒い",
      "kana": "さむい",
      "zh": "寒冷的（天气）",
      "r": "samui",
      "m": "寒冷的（い形容词）。指天气冷；物体\"冰\"用 つめたい。",
      "a": "a1"
    },
    {
      "ja": "駅",
      "kana": "えき",
      "zh": "车站",
      "r": "eki",
      "m": "车站。本文第 9 句「駅や、店の前や、山の上にも」——三个地点一起记。",
      "a": "a1"
    },
    {
      "ja": "お正月",
      "kana": "おしょうがつ",
      "zh": "新年、正月（1/1–1/3）",
      "r": "o-shōgatsu",
      "m": "新年、正月。特指 1 月 1–3 日（三が日），全年最重要的节日。",
      "a": "a2"
    },
    {
      "ja": "大切（な）",
      "kana": "たいせつ",
      "zh": "重要的",
      "r": "taisetsu",
      "m": "重要的（な形容词）：大切な日。比「大事」更书面、更带感情。",
      "a": "a2"
    },
    {
      "ja": "休み",
      "kana": "やすみ",
      "zh": "休息、假期",
      "r": "yasumi",
      "m": "休息、假期。动词形：休みます。",
      "a": "a2"
    },
    {
      "ja": "年賀状",
      "kana": "ねんがじょう",
      "zh": "贺年卡",
      "r": "nengajō",
      "m": "贺年卡。12 月寄出，1 月 1 日集中送达，是日本新年的固定仪式。",
      "a": "a2"
    },
    {
      "ja": "送ります",
      "kana": "おくります",
      "zh": "寄、送",
      "r": "okurimasu",
      "m": "寄、送（东西或人）。寄信：手紙を送ります。",
      "a": "a2"
    },
    {
      "ja": "一緒に",
      "kana": "いっしょに",
      "zh": "一起",
      "r": "issho ni",
      "m": "一起。前面用「と」表示和谁：家族と一緒に。",
      "a": "a2"
    },
    {
      "ja": "おせち料理",
      "kana": "おせちりょうり",
      "zh": "御节料理（年菜）",
      "r": "osechi-ryōri",
      "m": "御节料理，正月吃的年菜，装在多层漆盒里，每道菜都有寓意。",
      "a": "a2"
    },
    {
      "ja": "意味",
      "kana": "いみ",
      "zh": "意思、含义",
      "r": "imi",
      "m": "意思、含义。「〜の意味です」＝是……的意思。",
      "a": "a2"
    },
    {
      "ja": "黒豆",
      "kana": "くろまめ",
      "zh": "黑豆（寓意健康勤劳）",
      "r": "kuromame",
      "m": "黑豆。寓意「まめに働く」——健康、勤勉。「まめ」本身就有勤快之意。",
      "a": "a2"
    },
    {
      "ja": "数の子",
      "kana": "かずのこ",
      "zh": "鲱鱼籽（寓意多子多孙）",
      "r": "kazunoko",
      "m": "鲱鱼籽。因为卵多，寓意子孙繁荣。",
      "a": "a2"
    },
    {
      "ja": "神社",
      "kana": "じんじゃ",
      "zh": "神社",
      "r": "jinja",
      "m": "神社。参拜用「お参りします」，祈愿用「お願いします」。",
      "a": "a2"
    },
    {
      "ja": "初詣",
      "kana": "はつもうで",
      "zh": "新年初次参拜",
      "r": "hatsumōde",
      "m": "新年的第一次神社/寺院参拜，通常 1 月 1–3 日。",
      "a": "a2"
    },
    {
      "ja": "健康",
      "kana": "けんこう",
      "zh": "健康",
      "r": "kenkō",
      "m": "健康。「健康と幸せ」是初诣时最常说的一句祈愿。",
      "a": "a2"
    },
    {
      "ja": "お願いします",
      "kana": "おねがいします",
      "zh": "拜托、祈愿",
      "r": "onegai shimasu",
      "m": "拜托、请求；在神社里就是\"祈愿\"。这是初级阶段最高频的实用句。",
      "a": "a2"
    },
    {
      "ja": "お年玉",
      "kana": "としだま",
      "zh": "压岁钱",
      "r": "otoshidama",
      "m": "压岁钱。长辈给孩子，装在「ポチ袋」小信封里。",
      "a": "a2"
    },
    {
      "ja": "温泉",
      "kana": "おんせん",
      "zh": "温泉",
      "r": "onsen",
      "m": "温泉。日本位于火山带，温泉遍布全国；「銭湯（せんとう）」则是城市里的公共澡堂，不是温泉。",
      "a": "a3"
    },
    {
      "ja": "火山",
      "kana": "かざん",
      "zh": "火山",
      "r": "kazan",
      "m": "火山。日本有大量活火山，这是温泉多的原因。",
      "a": "a3"
    },
    {
      "ja": "お湯",
      "kana": "おゆ",
      "zh": "热水",
      "r": "o-yu",
      "m": "热水。日语里「湯」特指热水，冷水是「水（みず）」。",
      "a": "a3"
    },
    {
      "ja": "気持ちがいい",
      "kana": "きもちがいい",
      "zh": "舒服、心情好",
      "r": "kimochi ga ii",
      "m": "舒服、心情好。固定搭配，反义：気持ちが悪い（不舒服/恶心）。",
      "a": "a3"
    },
    {
      "ja": "ルール",
      "kana": "",
      "zh": "规则",
      "r": "rūru",
      "m": "规则。来自英语 rule；日语里也常说「マナー（礼仪）」。",
      "a": "a3"
    },
    {
      "ja": "体を洗う",
      "kana": "からだをあらう",
      "zh": "洗身体",
      "r": "karada o arau",
      "m": "洗身体。温泉礼仪的第一步，要坐在小凳子上洗。",
      "a": "a3"
    },
    {
      "ja": "タオル",
      "kana": "",
      "zh": "毛巾",
      "r": "taoru",
      "m": "毛巾。小毛巾可以带去池边或放头上，但绝不能泡进水里。",
      "a": "a3"
    },
    {
      "ja": "水着",
      "kana": "みずぎ",
      "zh": "泳衣",
      "r": "mizugi",
      "m": "泳衣。温泉禁止穿泳衣入池，这一点和很多国家不同。",
      "a": "a3"
    },
    {
      "ja": "髪を上げる",
      "kana": "かみをあげる",
      "zh": "把头发扎起来",
      "r": "kami o ageru",
      "m": "把头发扎起来/盘起来，避免浸到池水里。",
      "a": "a3"
    },
    {
      "ja": "露天風呂",
      "kana": "ろてんぶろ",
      "zh": "露天温泉",
      "r": "rotenburo",
      "m": "露天温泉。常在室外，可以边泡边看天空或雪景。",
      "a": "a3"
    },
    {
      "ja": "旅館",
      "kana": "りょかん",
      "zh": "日式旅馆",
      "r": "ryokan",
      "m": "日式旅馆。多数带温泉，早晚都能泡。",
      "a": "a3"
    },
    {
      "ja": "体にいい",
      "kana": "からだにいい",
      "zh": "对身体好",
      "r": "karada ni ii",
      "m": "对身体好。同类：体に悪い（对身体不好）。",
      "a": "a3"
    },
    {
      "ja": "特に",
      "kana": "とくに",
      "zh": "特别是、尤其",
      "r": "toku ni",
      "m": "特别是、尤其。用来强调某一个。",
      "a": "a3"
    },
    {
      "ja": "いつか",
      "kana": "",
      "zh": "总有一天",
      "r": "itsuka",
      "m": "总有一天、将来某时。常和「〜たいです」搭配表达愿望。",
      "a": "a3"
    },
    {
      "ja": "熱い",
      "kana": "あつい",
      "zh": "烫的、热的（物体温度）",
      "r": "atsui",
      "m": "指物体烫。天气热要用「暑い」，读音同样是 あつい，只差汉字——这是 N5 最常错的一对。",
      "a": "a3"
    },
    {
      "ja": "コンビニ",
      "kana": "",
      "zh": "便利店",
      "r": "konbini",
      "m": "便利店。「コンビニエンスストア」的省略，日常只说 コンビニ。",
      "a": "a4"
    },
    {
      "ja": "〜店",
      "kana": "てん",
      "zh": "……家（店铺量词）",
      "r": "-ten",
      "m": "店铺的量词/结尾词：五万六千店。注意和「店（みせ）」读音不同。",
      "a": "a4"
    },
    {
      "ja": "夜",
      "kana": "よる",
      "zh": "夜晚",
      "r": "yoru",
      "m": "夜晚。反义：朝（あさ）。「夜も」＝夜里也（开着）。",
      "a": "a4"
    },
    {
      "ja": "食べ物",
      "kana": "たべもの",
      "zh": "食物",
      "r": "tabemono",
      "m": "食物。构词：食べる＋物；同类还有 飲み物、買い物。",
      "a": "a4"
    },
    {
      "ja": "飲み物",
      "kana": "のみもの",
      "zh": "饮料",
      "r": "nomimono",
      "m": "饮料。",
      "a": "a4"
    },
    {
      "ja": "お弁当",
      "kana": "おべんとう",
      "zh": "便当",
      "r": "obentō",
      "m": "便当。便利店最常见的一餐，加热免费。",
      "a": "a4"
    },
    {
      "ja": "おにぎり",
      "kana": "",
      "zh": "饭团",
      "r": "onigiri",
      "m": "饭团。三角形，海苔包着，是最便宜的填肚子选择。",
      "a": "a4"
    },
    {
      "ja": "おでん",
      "kana": "",
      "zh": "关东煮",
      "r": "oden",
      "m": "关东煮。冬天柜台上的一锅，萝卜、鸡蛋、鱼豆腐等。",
      "a": "a4"
    },
    {
      "ja": "温めます",
      "kana": "あたためます",
      "zh": "加热",
      "r": "atatamemasu",
      "m": "加热。收银台高频句「温めますか」＝要加热吗？",
      "a": "a4"
    },
    {
      "ja": "レジ",
      "kana": "",
      "zh": "收银台",
      "r": "reji",
      "m": "收银台。来自英语 register；「レジ袋」＝塑料袋。",
      "a": "a4"
    },
    {
      "ja": "自分で",
      "kana": "じぶんで",
      "zh": "自己（做）",
      "r": "jibun de",
      "m": "自己（做）。便利店咖啡要自己在机器上操作。",
      "a": "a4"
    },
    {
      "ja": "コピー機",
      "kana": "コピーき",
      "zh": "复印机",
      "r": "kopī-ki",
      "m": "复印机。多数便利店都有，可复印、打印。",
      "a": "a4"
    },
    {
      "ja": "宅配便",
      "kana": "たくはいびん",
      "zh": "快递服务",
      "r": "takuhaibin",
      "m": "快递、包裹寄送服务。柜台可直接下单。",
      "a": "a4"
    },
    {
      "ja": "傘",
      "kana": "かさ",
      "zh": "伞",
      "r": "kasa",
      "m": "伞。下雨天便利店门口会摆透明伞，约 500–650 日元。",
      "a": "a4"
    },
    {
      "ja": "持って帰ります",
      "kana": "もってかえります",
      "zh": "带回去、拿回家",
      "r": "motte kaerimasu",
      "m": "带回去、拿回家。便利店的垃圾箱只放店里买的东西，其他垃圾要自己带走。",
      "a": "a4"
    },
    {
      "ja": "電車",
      "kana": "でんしゃ",
      "zh": "电车",
      "r": "densha",
      "m": "电车。注意和「汽車（きしゃ）」区分，后者指蒸汽火车。",
      "a": "a5"
    },
    {
      "ja": "ホーム",
      "kana": "",
      "zh": "站台",
      "r": "hōmu",
      "m": "站台。来自英语 platform，日语只说 ホーム。",
      "a": "a5"
    },
    {
      "ja": "順番に",
      "kana": "じゅんばんに",
      "zh": "按顺序",
      "r": "junban ni",
      "m": "按顺序。ホームでは、順番に並びます＝站台上按顺序排队。",
      "a": "a5"
    },
    {
      "ja": "並びます",
      "kana": "ならびます",
      "zh": "排队、排列",
      "r": "narabimasu",
      "m": "排队、排列。",
      "a": "a5"
    },
    {
      "ja": "携帯電話",
      "kana": "けいたいでんわ",
      "zh": "手机",
      "r": "keitaidenwa",
      "m": "手机。口语常说「携帯（けいたい）」或「スマホ」。",
      "a": "a5"
    },
    {
      "ja": "マナーモード",
      "kana": "",
      "zh": "静音模式",
      "r": "manā-mōdo",
      "m": "静音模式。日本车厢广播的高频词。",
      "a": "a5"
    },
    {
      "ja": "車内",
      "kana": "しゃない",
      "zh": "车厢内",
      "r": "shanai",
      "m": "车厢内。告示里常见「車内では…」。",
      "a": "a5"
    },
    {
      "ja": "優先席",
      "kana": "ゆうせんせき",
      "zh": "优先席（爱心专座）",
      "r": "yūsenseki",
      "m": "优先席（爱心专座）。孕妇、残障、高龄者等优先。",
      "a": "a5"
    },
    {
      "ja": "お年寄り",
      "kana": "おとしより",
      "zh": "老年人",
      "r": "otoshiyori",
      "m": "老年人。比「老人」更礼貌的日常说法。",
      "a": "a5"
    },
    {
      "ja": "ゆずります",
      "kana": "",
      "zh": "让（座位）",
      "r": "yuzurimasu",
      "m": "让（座位）。席をゆずる＝让座。",
      "a": "a5"
    },
    {
      "ja": "女性専用車",
      "kana": "じょせいせんようしゃ",
      "zh": "女性专用车厢",
      "r": "josei senyōsha",
      "m": "女性专用车厢。多为通勤时段限定。",
      "a": "a5"
    },
    {
      "ja": "かけ込み乗車",
      "kana": "かけこみじょうしゃ",
      "zh": "赶着冲上车",
      "r": "kakekomi jōsha",
      "m": "赶在关门时冲上车。日本明确提示危险、请勿为之。",
      "a": "a5"
    },
    {
      "ja": "荷物",
      "kana": "にもつ",
      "zh": "行李",
      "r": "nimotsu",
      "m": "行李、货物。",
      "a": "a5"
    },
    {
      "ja": "ごみ箱",
      "kana": "ごみばこ",
      "zh": "垃圾箱",
      "r": "gomibako",
      "m": "垃圾箱。站内和车厢内都设有。",
      "a": "a5"
    },
    {
      "ja": "正確（な）",
      "kana": "せいかく",
      "zh": "准确的、准时的",
      "r": "seikaku",
      "m": "准确的、准时的。時間に正確＝守时。",
      "a": "a5"
    },
    {
      "ja": "桜",
      "kana": "さくら",
      "zh": "樱花",
      "r": "sakura",
      "m": "樱花。日本春天的象征；花期只有一周左右，所以特别受珍惜。",
      "a": "a6"
    },
    {
      "ja": "春",
      "kana": "はる",
      "zh": "春天",
      "r": "haru",
      "m": "春天。日本的新年度、新学年都从四月开始。",
      "a": "a6"
    },
    {
      "ja": "季節",
      "kana": "きせつ",
      "zh": "季节",
      "r": "kisetsu",
      "m": "季节。桜の季節＝樱花季。",
      "a": "a6"
    },
    {
      "ja": "花見",
      "kana": "はなみ",
      "zh": "赏花",
      "r": "hanami",
      "m": "赏花。在樱花树下吃饭、喝酒的春季活动。",
      "a": "a6"
    },
    {
      "ja": "咲きます",
      "kana": "さきます",
      "zh": "开花",
      "r": "sakimasu",
      "m": "开花（咲く 的ます形）：花が咲きます。",
      "a": "a6"
    },
    {
      "ja": "散ります",
      "kana": "ちります",
      "zh": "凋谢、散落",
      "r": "chirimasu",
      "m": "凋谢、飘落。樱花「散る」是日本美学里的重要意象。",
      "a": "a6"
    },
    {
      "ja": "一週間",
      "kana": "いっしゅうかん",
      "zh": "一周",
      "r": "isshūkan",
      "m": "一周。〜ぐらい＝大约……。",
      "a": "a6"
    },
    {
      "ja": "夜桜",
      "kana": "よざくら",
      "zh": "夜樱",
      "r": "yozakura",
      "m": "夜晚灯光下的樱花。赏花名所会挂纸灯笼。",
      "a": "a6"
    },
    {
      "ja": "花見団子",
      "kana": "はなみだんご",
      "zh": "花见团子",
      "r": "hanami-dango",
      "m": "赏花时吃的三色团子：粉、白、绿。",
      "a": "a6"
    },
    {
      "ja": "三色",
      "kana": "さんしょく",
      "zh": "三色",
      "r": "sanshoku",
      "m": "三种颜色。",
      "a": "a6"
    },
    {
      "ja": "新緑",
      "kana": "しんりょく",
      "zh": "新绿",
      "r": "shinryoku",
      "m": "初夏嫩叶的绿色。花见团子的绿色代表它。",
      "a": "a6"
    },
    {
      "ja": "梅",
      "kana": "うめ",
      "zh": "梅花",
      "r": "ume",
      "m": "梅花。奈良时代赏的是梅，平安时代才改成樱。",
      "a": "a6"
    },
    {
      "ja": "平安時代",
      "kana": "へいあんじだい",
      "zh": "平安时代",
      "r": "Heian jidai",
      "m": "794–1185 年。赏樱被认为从这时开始。",
      "a": "a6"
    },
    {
      "ja": "枝",
      "kana": "えだ",
      "zh": "树枝",
      "r": "eda",
      "m": "树枝。折樱花枝是明确禁止的。",
      "a": "a6"
    },
    {
      "ja": "折ります",
      "kana": "おります",
      "zh": "折断",
      "r": "orimasu",
      "m": "折断、弄折。桜の枝を折ってはいけません。",
      "a": "a6"
    },
    {
      "ja": "小学校",
      "kana": "しょうがっこう",
      "zh": "小学",
      "r": "shōgakkō",
      "m": "小学，六年制，属于义务教育。",
      "a": "a7"
    },
    {
      "ja": "中学校",
      "kana": "ちゅうがっこう",
      "zh": "初中",
      "r": "chūgakkō",
      "m": "初中，三年制，属于义务教育。",
      "a": "a7"
    },
    {
      "ja": "高校",
      "kana": "こうこう",
      "zh": "高中",
      "r": "kōkō",
      "m": "高中，三年制；法律上不算义务教育，但升学率很高。",
      "a": "a7"
    },
    {
      "ja": "義務教育",
      "kana": "ぎむきょういく",
      "zh": "义务教育",
      "r": "gimu kyōiku",
      "m": "小学加初中共九年，必须接受。",
      "a": "a7"
    },
    {
      "ja": "入学式",
      "kana": "にゅうがくしき",
      "zh": "入学典礼",
      "r": "nyūgakushiki",
      "m": "四月举行的入学仪式，家长也会参加。",
      "a": "a7"
    },
    {
      "ja": "卒業式",
      "kana": "そつぎょうしき",
      "zh": "毕业典礼",
      "r": "sotsugyōshiki",
      "m": "三月举行，比入学式更感伤。",
      "a": "a7"
    },
    {
      "ja": "制服",
      "kana": "せいふく",
      "zh": "校服",
      "r": "seifuku",
      "m": "校服。多数中学、高中都有，公立小学一般没有。",
      "a": "a7"
    },
    {
      "ja": "ランドセル",
      "kana": "",
      "zh": "小学生书包",
      "r": "randoseru",
      "m": "日本小学生的硬式双肩书包，一般用六年。",
      "a": "a7"
    },
    {
      "ja": "給食",
      "kana": "きゅうしょく",
      "zh": "学校供餐",
      "r": "kyūshoku",
      "m": "学校午餐。学生在教室一起吃，由值日生分餐。",
      "a": "a7"
    },
    {
      "ja": "生徒",
      "kana": "せいと",
      "zh": "学生",
      "r": "seito",
      "m": "学生（多指中学、高中）。小学多用「児童」。",
      "a": "a7"
    },
    {
      "ja": "運びます",
      "kana": "はこびます",
      "zh": "搬运",
      "r": "hakobimasu",
      "m": "搬运。給食を教室まで運びます。",
      "a": "a7"
    },
    {
      "ja": "掃除",
      "kana": "そうじ",
      "zh": "打扫",
      "r": "sōji",
      "m": "打扫。日本学校由学生自己扫教室和走廊。",
      "a": "a7"
    },
    {
      "ja": "授業",
      "kana": "じゅぎょう",
      "zh": "上课",
      "r": "jugyō",
      "m": "课、授课。",
      "a": "a7"
    },
    {
      "ja": "部活動",
      "kana": "ぶかつどう",
      "zh": "社团活动",
      "r": "bukatsudō",
      "m": "课后社团。运动部、文化部，几乎人人参加。",
      "a": "a7"
    },
    {
      "ja": "宿題",
      "kana": "しゅくだい",
      "zh": "作业",
      "r": "shukudai",
      "m": "作业。暑假也有大量「夏休みの宿題」。",
      "a": "a7"
    },
    {
      "ja": "分別",
      "kana": "ぶんべつ",
      "zh": "分类",
      "r": "bunbetsu",
      "m": "分类。日本扔垃圾前必须做的第一件事。",
      "a": "a8"
    },
    {
      "ja": "燃える",
      "kana": "もえる",
      "zh": "可燃烧",
      "r": "moeru",
      "m": "燃烧。燃えるごみ＝可燃垃圾。",
      "a": "a8"
    },
    {
      "ja": "燃えない",
      "kana": "もえない",
      "zh": "不可燃",
      "r": "moenai",
      "m": "不燃烧。燃えないごみ＝不可燃垃圾。",
      "a": "a8"
    },
    {
      "ja": "資源",
      "kana": "しげん",
      "zh": "资源",
      "r": "shigen",
      "m": "资源。瓶、罐、塑料瓶等可回收物。",
      "a": "a8"
    },
    {
      "ja": "粗大ごみ",
      "kana": "そだいごみ",
      "zh": "大件垃圾",
      "r": "sodai gomi",
      "m": "家具、自行车等大件垃圾，要预约并付费。",
      "a": "a8"
    },
    {
      "ja": "台所",
      "kana": "だいどころ",
      "zh": "厨房",
      "r": "daidokoro",
      "m": "厨房。台所のごみ＝厨余垃圾。",
      "a": "a8"
    },
    {
      "ja": "ペットボトル",
      "kana": "",
      "zh": "塑料瓶",
      "r": "petto botoru",
      "m": "PET 塑料瓶。要取下瓶盖和标签、洗净后扔。",
      "a": "a8"
    },
    {
      "ja": "キャップ",
      "kana": "",
      "zh": "瓶盖",
      "r": "kyappu",
      "m": "瓶盖。和瓶身分开扔。",
      "a": "a8"
    },
    {
      "ja": "びん",
      "kana": "びん",
      "zh": "瓶子（玻璃瓶）",
      "r": "bin",
      "m": "玻璃瓶。易拉罐是「かん」，塑料瓶是「ペットボトル」——三个一起记，本文正好并列出现。",
      "a": "a8"
    },
    {
      "ja": "袋",
      "kana": "ふくろ",
      "zh": "袋子",
      "r": "fukuro",
      "m": "袋子。有些城市必须用指定的收费垃圾袋。",
      "a": "a8"
    },
    {
      "ja": "予約",
      "kana": "よやく",
      "zh": "预约",
      "r": "yoyaku",
      "m": "预约。粗大垃圾要打电话或在网上预约回收。",
      "a": "a8"
    },
    {
      "ja": "電池",
      "kana": "でんち",
      "zh": "电池",
      "r": "denchi",
      "m": "电池。属于有害垃圾，要单独放。",
      "a": "a8"
    },
    {
      "ja": "蛍光灯",
      "kana": "けいこうとう",
      "zh": "荧光灯",
      "r": "keikōtō",
      "m": "荧光灯管。易碎，要单独处理。",
      "a": "a8"
    },
    {
      "ja": "慣れます",
      "kana": "なれます",
      "zh": "习惯",
      "r": "naremasu",
      "m": "习惯、适应。最初は大変ですが、すぐに慣れます。",
      "a": "a8"
    },
    {
      "ja": "ごみカレンダー",
      "kana": "",
      "zh": "垃圾日历",
      "r": "gomi karendā",
      "m": "垃圾收集日历。写着哪天收哪类垃圾，搬家先读它。",
      "a": "a8"
    },
    {
      "ja": "祭り",
      "kana": "まつり",
      "zh": "祭典、庙会",
      "r": "matsuri",
      "m": "祭典。夏天的町内会祭、神社祭都很热闹。",
      "a": "a9"
    },
    {
      "ja": "浴衣",
      "kana": "ゆかた",
      "zh": "浴衣",
      "r": "yukata",
      "m": "夏季和服，木棉制、没有里衬，比着物凉快。",
      "a": "a9"
    },
    {
      "ja": "着物",
      "kana": "きもの",
      "zh": "和服",
      "r": "kimono",
      "m": "和服的总称。浴衣是其中夏天的简化版。",
      "a": "a9"
    },
    {
      "ja": "帯",
      "kana": "おび",
      "zh": "腰带",
      "r": "obi",
      "m": "和服的腰带。浴衣用较窄的「半幅帯」。",
      "a": "a9"
    },
    {
      "ja": "屋台",
      "kana": "やたい",
      "zh": "摊位",
      "r": "yatai",
      "m": "祭典上的小吃摊：章鱼烧、炒面、刨冰。",
      "a": "a9"
    },
    {
      "ja": "たこ焼き",
      "kana": "",
      "zh": "章鱼烧",
      "r": "takoyaki",
      "m": "章鱼烧。关西起源的祭典定番。",
      "a": "a9"
    },
    {
      "ja": "焼きそば",
      "kana": "やきそば",
      "zh": "炒面",
      "r": "yakisoba",
      "m": "日式炒面。屋台最常见的一份。",
      "a": "a9"
    },
    {
      "ja": "かき氷",
      "kana": "かきごおり",
      "zh": "刨冰",
      "r": "kaki-gōri",
      "m": "刨冰。祭典上淋各种糖浆。",
      "a": "a9"
    },
    {
      "ja": "金魚すくい",
      "kana": "きんぎょすくい",
      "zh": "捞金鱼",
      "r": "kingyo-sukui",
      "m": "捞金鱼。用纸网捞，网破得很快。",
      "a": "a9"
    },
    {
      "ja": "盆踊り",
      "kana": "ぼんおどり",
      "zh": "盂兰盆舞",
      "r": "bon-odori",
      "m": "夏天在广场围圈跳的舞，源自盂兰盆供养。",
      "a": "a9"
    },
    {
      "ja": "輪",
      "kana": "わ",
      "zh": "圆圈",
      "r": "wa",
      "m": "圆圈。輪になって踊ります＝围成圈跳。",
      "a": "a9"
    },
    {
      "ja": "花火",
      "kana": "はなび",
      "zh": "烟花",
      "r": "hanabi",
      "m": "烟花。夏天花火大会是固定的季节风景。",
      "a": "a9"
    },
    {
      "ja": "花火大会",
      "kana": "はなびたいかい",
      "zh": "烟花大会",
      "r": "hanabi taikai",
      "m": "烟花大会。隅田川最有名，约两万发。",
      "a": "a9"
    },
    {
      "ja": "江戸時代",
      "kana": "えどじだい",
      "zh": "江户时代",
      "r": "Edo jidai",
      "m": "1603–1867。隅田川花火始于 1733 年。",
      "a": "a9"
    },
    {
      "ja": "一晩",
      "kana": "ひとばん",
      "zh": "一晚",
      "r": "hitoban",
      "m": "一个晚上。一晩で二万発が上がります。",
      "a": "a9"
    },
    {
      "ja": "富士山",
      "kana": "ふじさん",
      "zh": "富士山",
      "r": "Fujisan",
      "m": "日本最高峰，3776 米，横跨山梨、静冈两县。",
      "a": "a10"
    },
    {
      "ja": "一番",
      "kana": "いちばん",
      "zh": "最",
      "r": "ichiban",
      "m": "最……。日本で一番高い山。",
      "a": "a10"
    },
    {
      "ja": "山梨県",
      "kana": "やまなしけん",
      "zh": "山梨县",
      "r": "Yamanashi-ken",
      "m": "富士山北侧，吉田路线在这边。",
      "a": "a10"
    },
    {
      "ja": "静岡県",
      "kana": "しずおかけん",
      "zh": "静冈县",
      "r": "Shizuoka-ken",
      "m": "富士山南侧，有三条登山路线。",
      "a": "a10"
    },
    {
      "ja": "間",
      "kana": "あいだ",
      "zh": "之间",
      "r": "aida",
      "m": "之间。A と B の間にあります。",
      "a": "a10"
    },
    {
      "ja": "象徴",
      "kana": "しょうちょう",
      "zh": "象征",
      "r": "shōchō",
      "m": "象征。富士山是日本精神的象征。",
      "a": "a10"
    },
    {
      "ja": "世界文化遺産",
      "kana": "せかいぶんかいさん",
      "zh": "世界文化遗产",
      "r": "sekai bunka isan",
      "m": "2013 年登录，是文化遗产而不是自然遗产。",
      "a": "a10"
    },
    {
      "ja": "登山",
      "kana": "とざん",
      "zh": "登山",
      "r": "tozan",
      "m": "登山。富士山只在夏天开放登山。",
      "a": "a10"
    },
    {
      "ja": "五合目",
      "kana": "ごごうめ",
      "zh": "五合目",
      "r": "gogōme",
      "m": "山腰的第五站，巴士能到，多数人从这里开始爬。",
      "a": "a10"
    },
    {
      "ja": "頂上",
      "kana": "ちょうじょう",
      "zh": "山顶",
      "r": "chōjō",
      "m": "山顶。从五合目走上去约六小时。",
      "a": "a10"
    },
    {
      "ja": "日の出",
      "kana": "ひので",
      "zh": "日出",
      "r": "hinode",
      "m": "日出。山顶看的日出叫「ご来光」。",
      "a": "a10"
    },
    {
      "ja": "ご来光",
      "kana": "ごらいこう",
      "zh": "山顶日出",
      "r": "goraikō",
      "m": "富士山山顶的日出，被视为吉兆。",
      "a": "a10"
    },
    {
      "ja": "変わりやすい",
      "kana": "かわりやすい",
      "zh": "容易变化",
      "r": "kawari-yasui",
      "m": "容易变。山の天気は変わりやすい。",
      "a": "a10"
    },
    {
      "ja": "雨",
      "kana": "あめ",
      "zh": "雨",
      "r": "ame",
      "m": "雨。山顶天气突变时可能下雨。",
      "a": "a10"
    },
    {
      "ja": "登ります",
      "kana": "のぼります",
      "zh": "攀登",
      "r": "noborimasu",
      "m": "登、爬。富士山に登ります。",
      "a": "a10"
    },
    {
      "ja": "道",
      "kana": "みち",
      "zh": "路、道路",
      "r": "michi",
      "m": "「道を聞く」是问路的固定说法，不用「道を質問する」。",
      "a": "a11"
    },
    {
      "ja": "まっすぐ",
      "kana": "",
      "zh": "直、一直",
      "r": "massugu",
      "m": "「まっすぐ行ってください」直走。汉字写成「真っ直ぐ」。",
      "a": "a11"
    },
    {
      "ja": "角",
      "kana": "かど",
      "zh": "路口、拐角",
      "r": "kado",
      "m": "「二つ目の角」第二个路口。日本的「角」指路口的转角。",
      "a": "a11"
    },
    {
      "ja": "曲がります",
      "kana": "まがります",
      "zh": "拐弯",
      "r": "magarimasu",
      "m": "五段动词。右に曲がる／左に曲がる。",
      "a": "a11"
    },
    {
      "ja": "信号",
      "kana": "しんごう",
      "zh": "红绿灯",
      "r": "shingō",
      "m": "完整说法是「信号機」。问路时日本人就用这个指位置。",
      "a": "a11"
    },
    {
      "ja": "右",
      "kana": "みぎ",
      "zh": "右边",
      "r": "migi",
      "m": "反义是「左（ひだり）」。",
      "a": "a11"
    },
    {
      "ja": "二つ目",
      "kana": "ふたつめ",
      "zh": "第二个",
      "r": "futatsume",
      "m": "「〜目」是序数后缀：一つ目、二つ目、三つ目。",
      "a": "a11"
    },
    {
      "ja": "歩いて",
      "kana": "あるいて",
      "zh": "走路",
      "r": "aruite",
      "m": "「歩く」的て形。「歩いて五分」＝走路五分钟。",
      "a": "a11"
    },
    {
      "ja": "〜分",
      "kana": "ふん",
      "zh": "分钟",
      "r": "fun",
      "m": "读法随数字变：一分（いっぷん）、三分（さんぷん）、五分（ごふん）。",
      "a": "a11"
    },
    {
      "ja": "近い",
      "kana": "ちかい",
      "zh": "近的",
      "r": "chikai",
      "m": "い形容词。反义「遠い（とおい）」。",
      "a": "a11"
    },
    {
      "ja": "時間",
      "kana": "じかん",
      "zh": "时间",
      "r": "jikan",
      "m": "「この時間」＝现在这个时段，指上下班人多的时候。",
      "a": "a11"
    },
    {
      "ja": "混みます",
      "kana": "こみます",
      "zh": "拥挤",
      "r": "komimasu",
      "m": "五段。「電車が混みます」「道が混みます」都常用。",
      "a": "a11"
    },
    {
      "ja": "気をつけます",
      "kana": "きをつけます",
      "zh": "小心、注意",
      "r": "ki o tsukemasu",
      "m": "「気をつけて」是分别时最常说的叮嘱。",
      "a": "a11"
    },
    {
      "ja": "地図",
      "kana": "ちず",
      "zh": "地图",
      "r": "chizu",
      "m": "手机上的是「地図アプリ」。",
      "a": "a11"
    },
    {
      "ja": "聞きます",
      "kana": "ききます",
      "zh": "问、听",
      "r": "kikimasu",
      "m": "一个词两个意思：道を聞く（问路）、音楽を聞く（听音乐）。",
      "a": "a11"
    },
    {
      "ja": "昨日",
      "kana": "きのう",
      "zh": "昨天",
      "r": "kinō",
      "m": "相对说法。还有「一昨日（おととい）」前天、「明日（あした）」明天。",
      "a": "a12"
    },
    {
      "ja": "日曜日",
      "kana": "にちようび",
      "zh": "星期天",
      "r": "nichiyōbi",
      "m": "日语星期用「七曜」＋日：月火水木金土日。",
      "a": "a12"
    },
    {
      "ja": "起きます",
      "kana": "おきます",
      "zh": "起床",
      "r": "okimasu",
      "m": "一段动词。反义「寝ます（ねます）」睡觉。",
      "a": "a12"
    },
    {
      "ja": "天気",
      "kana": "てんき",
      "zh": "天气",
      "r": "tenki",
      "m": "「天気がいい」天气好／「天気が悪い」天气差。",
      "a": "a12"
    },
    {
      "ja": "散歩します",
      "kana": "さんぽします",
      "zh": "散步",
      "r": "sanpo shimasu",
      "m": "名词＋する。地点用 を：公園を散歩します。",
      "a": "a12"
    },
    {
      "ja": "公園",
      "kana": "こうえん",
      "zh": "公园",
      "r": "kōen",
      "m": "和「公演（こうえん）」同音，靠上下文和汉字区分。",
      "a": "a12"
    },
    {
      "ja": "昼ご飯",
      "kana": "ひるごはん",
      "zh": "午饭",
      "r": "hirugohan",
      "m": "对应「朝ご飯」（早饭）「晩ご飯」（晚饭）。",
      "a": "a12"
    },
    {
      "ja": "天ぷら",
      "kana": "てんぷら",
      "zh": "天妇罗",
      "r": "tenpura",
      "m": "汉字只写「天」，后面「ぷら」是假名——这类词最容易读错。",
      "a": "a12"
    },
    {
      "ja": "妹",
      "kana": "いもうと",
      "zh": "妹妹",
      "r": "imōto",
      "m": "「弟（おとうと）」是弟弟。家外的\"妹妹\"用「妹さん」。",
      "a": "a12"
    },
    {
      "ja": "午後",
      "kana": "ごご",
      "zh": "下午",
      "r": "gogo",
      "m": "反义「午前（ごぜん）」上午。",
      "a": "a12"
    },
    {
      "ja": "映画",
      "kana": "えいが",
      "zh": "电影",
      "r": "eiga",
      "m": "看电影是「映画を見る」，不是「見ます」。",
      "a": "a12"
    },
    {
      "ja": "面白い",
      "kana": "おもしろい",
      "zh": "有趣的",
      "r": "omoshiroi",
      "m": "い形容词。过去式是「面白かったです」。",
      "a": "a12"
    },
    {
      "ja": "帰ります",
      "kana": "かえります",
      "zh": "回去",
      "r": "kaerimasu",
      "m": "回到某处用 に：家に帰ります。",
      "a": "a12"
    },
    {
      "ja": "疲れます",
      "kana": "つかれます",
      "zh": "累",
      "r": "tsukaremasu",
      "m": "「疲れました」＝累了。",
      "a": "a12"
    },
    {
      "ja": "楽しい",
      "kana": "たのしい",
      "zh": "快乐的",
      "r": "tanoshii",
      "m": "い形容词。和「嬉しい」（高兴）不同，楽しい 指事情本身愉快。",
      "a": "a12"
    },
    {
      "ja": "本日",
      "kana": "ほんじつ",
      "zh": "今天（正式）",
      "r": "honjitsu",
      "m": "书面/播音用的「今天」。日常说话用「今日（きょう）」。",
      "a": "a13"
    },
    {
      "ja": "限り",
      "kana": "かぎり",
      "zh": "只限、仅限",
      "r": "kagiri",
      "m": "「本日限り」只限今天。促销单上最常见的两个字。",
      "a": "a13"
    },
    {
      "ja": "特売",
      "kana": "とくばい",
      "zh": "特价销售",
      "r": "tokubai",
      "m": "超市专用的词，比「安売り」正式。",
      "a": "a13"
    },
    {
      "ja": "チラシ",
      "kana": "",
      "zh": "传单、促销单",
      "r": "chirashi",
      "m": "原意是\"散开\"，指夹在报纸里的广告单。",
      "a": "a13"
    },
    {
      "ja": "卵",
      "kana": "たまご",
      "zh": "鸡蛋",
      "r": "tamago",
      "m": "单个说法。也常写「玉子」指做菜用的蛋。",
      "a": "a13"
    },
    {
      "ja": "〜個",
      "kana": "こ",
      "zh": "个（数小物件）",
      "r": "ko",
      "m": "数小东西：一個、三個。数人数用「人」，数机器用「台」。",
      "a": "a13"
    },
    {
      "ja": "国産",
      "kana": "こくさん",
      "zh": "国产",
      "r": "kokusan",
      "m": "超市标价签上的常见字，对应「輸入（ゆにゅう）」进口。",
      "a": "a13"
    },
    {
      "ja": "牛肉",
      "kana": "ぎゅうにく",
      "zh": "牛肉",
      "r": "gyūniku",
      "m": "猪肉「豚肉（ぶたにく）」、鸡肉「鶏肉（とりにく）」，三个一起记。",
      "a": "a13"
    },
    {
      "ja": "半額",
      "kana": "はんがく",
      "zh": "半价",
      "r": "hangaku",
      "m": "「半額」＝一半的价钱。七折是「三割引」。",
      "a": "a13"
    },
    {
      "ja": "魚",
      "kana": "さかな",
      "zh": "鱼",
      "r": "sakana",
      "m": "注意不是「うお」——单说\"鱼\"就是 さかな。",
      "a": "a13"
    },
    {
      "ja": "新鮮（な）",
      "kana": "しんせん",
      "zh": "新鲜的",
      "r": "shinsen",
      "m": "な形容词：新鮮な魚。",
      "a": "a13"
    },
    {
      "ja": "数量限定",
      "kana": "すうりょうげんてい",
      "zh": "数量有限",
      "r": "sūryō gentei",
      "m": "促销单四大固定词之一：本日限り／数量限定／お一人様／半額。",
      "a": "a13"
    },
    {
      "ja": "駐車場",
      "kana": "ちゅうしゃじょう",
      "zh": "停车场",
      "r": "chūshajō",
      "m": "「駐車」＝停车，「場」＝场地。",
      "a": "a13"
    },
    {
      "ja": "裏",
      "kana": "うら",
      "zh": "后面、背面",
      "r": "ura",
      "m": "「店の裏」＝店后面。反义「表（おもて）」正面。",
      "a": "a13"
    },
    {
      "ja": "来店",
      "kana": "らいてん",
      "zh": "光顾、来店",
      "r": "raiten",
      "m": "「ご来店」是店员对顾客的敬语，认得即可。",
      "a": "a13"
    }
  ]
};
