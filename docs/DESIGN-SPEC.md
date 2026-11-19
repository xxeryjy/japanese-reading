# 日语初级阅读 · 界面重构规格（交付前端）

版本：**v1.5（最终冻结）**　｜　范围：**8 个 HTML + voice.js**（`cloud.js` 已核实无字面色值，无需改动）　｜　撰写：ux-reviewer（体验）＋ visual-architect（视觉）＋ team-lead（裁决）
本文所有对比度 / ΔE 数值均由双方独立复算并一致；引用时必带底名（纸底 / 卡面 / 弱底 / 填充面）。

**版本轨迹**
- **v1.5**：新增 **P7 布局改动必须附真实渲染截图**（来源：2026-11-19 单屏化连续两次渲染 bug，均在静态推算通过后暴露）。其余条款不变。
- **v1.4 修订**（发布前，team-lead 裁决）：课文页 `#text` 高度目标改**双档**——13 句篇 ≤1900、15 句篇 ≤2200（375）。两个方案经评估**否决**（🔊 移句末 / 375 压到 18px），否决理由见**附录 B**，勿再提。
- **v1.4**（最终）：封面装饰汉字改判为**整体删除**（原 W1 保留规则作废）；封面重量改由 3px 篇色顶线 + `h1.ja` 承担；词卡单词与封面标题改用 **rem 上下界 + vw 中间值** 的 clamp（纯 rem 在"320 + 用户 125% 字号"下会让 9 字词溢出）；`.snd` 圆环改回 `--line`（`--line-control` 只给"靠边框才能认出是控件"的位置）；课文页底部预留 96→56px；验收补封面裸卡判定。
- **v1.3**：新增 `--on-fill`（否则 P6 grep 归零数学上不可达）；`--scrim` 立项不渲染；新增 §7.1 语音面板 sheet 节；R5 附录补 tint 容差；课文页小计 134→133；新增附录 A 按文件索引。
- **v1.2**：`--line-strong`/`--line-control` 拆分；token 表补全 30 项；对比度表 5 格修正；字体栈恢复完整回退链；「译」展开态与焦点环改 ink；假名 17→15；补 `rt{line-height:1.1}`。
- **v1.1**：文件数 7→8；投影按 z 轴位移判定；首页图标删除；`--piece` 默认值取 `--text-muted`；补篇色×功能色 ΔE 矩阵。

---

## 0. 前置条件（不满足则不要开工）

| # | 要求 | 原因 |
|---|---|---|
| P1 | 新建 `tokens.css`（本地单文件），**8 个页面**各加一个 `<link>` | 复制到 8 个文件必然漂移——现在 5 套 `:root` 就是上次复制的产物 |
| P2 | `<link tokens.css>` 与「删除本页旧 `:root`」必须**同一次提交** | 旧 `:root` 与 tokens.css 特异性相同且文档顺序更靠后 → **旧值胜出**，现象是"token 加了但没生效"，不报错 |
| P3 | 迁移期禁用 `font:` 简写，一律长写 4 条 | 简写里任一 `var()` 缺失会导致**整条**失效，font-size/weight 一起丢，布局塌 |
| P4 | 迁移期所有 `var()` 带 fallback：`var(--s5, 20px)` | 未定义变量静默失效：`padding`→0、`background`→transparent |
| P5 | **10 个文件中需改的 9 个**同批完成：8 个 HTML + `voice.js` | `voice.js` 自注入 `<style>` 是全站第 8 套皮肤，不在任何 `.html` 里，按页面排的清单必然漏；`cloud.js` 无样式，不动 |
| P6 | grep 归零：**现状 215 处 → 8 个 html/js 文件中 0 处** | 215 这个数说明靠人眼 review 不可行，必须机器验 |

```bash
# P6 验收命令（排除 backups）
grep -rnE '#[0-9a-fA-F]{3,6}|rgba?\(|Hiragino|border-radius:[[:space:]]*[0-9]' \
  --include=*.html --include=*.js . | grep -v '^./backups'
```
**`tokens.css` 是全站唯一允许出现字面色值 / 字体栈 / 圆角字面量的文件。** 该命令只扫 `*.html` 与 `*.js`，天然不含它，因此 tokens.css 里的 `#ffffff`、`rgba()`（2 个投影 + scrim）不会被误判。
**不要给命令加 `--include=*.css`** —— 加了就永远不归零，且不是错误。

迁移单位（三件事一次提交，无捷径）：① 加 `<link tokens.css>` → ② 删本页 `:root` 里的基础色 → ③ 加 `data-piece`。
**禁止**在 `</head>` 前再插一次 `<link>` 让它"赢"——会留下两份定义，半年后又漂回多套 `:root`。

### P7｜布局改动必须附真实渲染截图（v1.5 新增，硬要求）

> **任何改动 `review.html` 或其它页面布局的提交，必须随提交附一张真实浏览器渲染截图；没有截图视为未完成。**

立这条的代价来源：2026-11-19 单屏化改造连续出两个 bug，**都只在真实渲染里暴露，静态推算全部通过**：

1. **卡片整片空白**：`.face` 用 `position:absolute;inset:0` 铺满 `.inner`，而 `.inner` 的高度依赖四层百分比链（`.cardwrap→.flip→.inner`）。链上任何一环拿不到确定高度，`.inner` 即为 0，两个面一起塌成 0 高、文字被裁掉——页面上只剩相对 `.cardwrap` 定位的 🔊 按钮。**动态推算时每一层都写了"期望值"，但没有一层被真正测量过。**
2. **`grid-area:1/1` 同格叠放不生效**：改成 grid 叠层后，headless Chrome 渲染正常，用户真机仍空白；最终由用户给出可用写法 `position:absolute; width:100%; height:100%`。**同一份 CSS 在不同渲染路径下行为不同，只有渲染出来才算数。**

配套两条：
- 截图请在**目标视口**下取：375×667（手机）/ 320×568（小屏）/ 632×748（用户桌面窗口）；单屏类改动三个都要。
- 同时给出可复核痕迹：`getBoundingClientRect().height` 或 `getComputedStyle` 的关键值，避免"截图看着对"掩盖数值错误。
- 无浏览器可用时，提交说明必须写**「未实测」**并列出关键 CSS 证据；**不得**以"静态确认"充当已验。

---

## 1. Token 表

### 1.1 完整 token（直接粘进 `tokens.css`）

```css
:root{
  /* 中性阶：四个面 */
  --card:#fffefb;   --fill:#faf8f2;   --paper:#f7f5ef;   --inset:#f2eee4;
  --line:#e6ded0;   --line-strong:#d5cbb9;   --line-control:#998762;
  /* 文字三级 + 实底反白 */
  --ink:#241f1a;    --text-soft:#5f594e;    --text-muted:#756d61;
  --on-fill:#ffffff;              /* 实底之上的文字/图标，全站唯一白 */
  /* 品牌 */
  --brand:#1f6b63;  --brand-hover:#1b6157;  --brand-press:#1a5a53;  --brand-tint:#e6f0ee;
  /* 状态 */
  --ok:#2f6b46;     --ok-tint:#eff6f1;      --ok-hover:#e5f1e8;
  --no:#9e2f1b;     --no-tint:#fbeeea;      --no-hover:#f7e2dc;
  --due:#8a6316;    --due-tint:#fbf3e0;
  --mark:#fbecc0;
  /* 篇色 + 默认值（fail-loud） */
  --piece-a1:#2d6459; --piece-a1-tint:#ecf9f6;
  --piece-a2:#89483d; --piece-a2-tint:#f9edec;
  --piece-a3:#6f5632; --piece-a3-tint:#f9f3ec;
  --piece-a4:#3a5d80; --piece-a4-tint:#ecf2f9;
  --piece-a5:#46622c; --piece-a5-tint:#f2f9ec;
  --piece:var(--text-muted); --piece-tint:var(--inset); --piece-kanji:"";
  /* 间距（顺序编号，4px 基数，9 档无跳号） */
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:20px; --s6:24px; --s7:32px; --s8:40px; --s9:56px;
  /* 圆角 */
  --r-pill:999px; --r-card:14px; --r-ctl:10px; --r-tag:6px;
  /* 投影：只给 z 轴有位移的元素，两个 */
  --shadow-overlay:0 10px 34px rgba(60,45,20,.16);
  --shadow-flip:0 6px 20px rgba(60,45,20,.08);
  /* 遮罩：仅登记备用，本轮不渲染（见 §7.1） */
  --scrim:rgba(36,31,26,.28);
  /* 字体 */
  --font-ja:"Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic","Yu Gothic UI",
            "Meiryo","Noto Sans JP","Noto Sans CJK JP",sans-serif;
  --font-zh:-apple-system,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",
            "Source Han Sans SC","Noto Sans CJK SC",sans-serif;
  --font-num:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
[data-piece="a1"]{--piece:var(--piece-a1);--piece-tint:var(--piece-a1-tint);}
/* a2…a5 同构 */
```

**三条脚注（必读）**
- `--line-control`（控件边界，需 ≥3:1）四表面全过：card 3.47 / fill 3.30 / paper 3.21 / inset 3.02。
  `--line-strong`（分隔线，纯装饰）最低 1.39，**不承担识别**。
- `--text-muted` **不得压 `--inset`**（4.40 < 4.5）；弱底里的文字一律 `--text-soft`（5.99）。
- **实底之上的白字一律 `--on-fill`，不得写 `--card` 或 `#fff`**。两者对比度差 0.06（6.82 vs 6.76），肉眼无感，但会让系统里出现两种"白"，且 `#fff` 会让 P6 的 grep 永远不归零。

**为什么字体栈不能砍短**：`Noto Sans CJK JP` 是 Android 上日文字族的真实家族名，只有 `Noto Sans JP` 可能不命中——而"加 lang 修 Android 字形"正是本次改造的目标之一，砍掉它等于把最需要修的设备排除在外。`Hiragino Kaku Gothic ProN`（老 iOS/macOS）、`Yu Gothic UI`（Win11 主名）、`Meiryo`（老 Windows）同理。

### 1.2 排版规则

| 项 | 规格 |
|---|---|
| 注音 `rt` | `font-size:.62em; color:var(--text-soft); line-height:1.1` |
| 　└ 为什么 | `line-height:1.1` 让 20px 字的注音行内容高 ≈33px < 38px 行框，**正文才敢用 1.9 而不跳行**；不写这条，ruby 会撑高所有句子行 |
| 日文正文 | `1.125rem`（=18px），`@media(min-width:375px)` → `1.25rem`（=20px） |
| 　└ 为什么不用 vw | `vw` 无视用户系统字号，与 R8 冲突；rem 两档同时满足"320→18 / 375→20"与"跟随用户字号" |
| **词卡单词** | **`clamp(1.5rem, 7.4vw, 2rem)`** |
| **封面标题 `h1.ja`** | **`clamp(1.5rem, 7.8vw, 2rem)`，`font-family:var(--font-ja); line-height:1.35; letter-spacing:.01em`** |
| 　└ 为什么是真假混写 | **rem 做上下界（跟随用户字号）、vw 做中间值（跟随视口）**。纯 rem 在"320px + 用户 125% 字号"下取到 30px，9 字词（入ってはいけません）需 270px 而卡内仅 244px，**必然换行**（不是横向溢出——`word-break` 会兜住），后果是卡片被撑高、重心偏离单词本身。故用 clamp 复合，让 320/16 回到 24px 单行、375/16 拿到 27.8px |
| 　└ 溢出验收口径 | **允许换行、禁止横向溢出与信息丢失**（WCAG 1.4.4 不要求单行）。因此 clamp 在这里是**工艺选择（稳定卡片高度），不是合规要求**——不要用"必须单行"去对抗用户字号 |
| 中译 | `1.1875rem`（19px）/ 600，`--ink` |
| 词卡假名 | `0.9375rem`（15px）/ 400，`--text-soft` |
| 　└ 为什么 15 不是 17 | 卡内层级 词 ＞ 中译 19 ＞ 假名；19 与 17 只差 2px 看不出层级，15 与中译差 4px 才成立 |
| 读音/注音统一 | `rt`、词汇表 `.kana`、词卡假名 **一律 `--text-soft`**（一条规则管三处） |
| 数字 | `.stamp`、进度、计数用 `font-variant-numeric:tabular-nums`；纯数字组件可加 `--font-num` |
| 缩放 | `html{-webkit-text-size-adjust:100%}` —— 只禁**横屏自动放大**，不影响手动缩放（写 `none` 会禁掉无障碍缩放） |

### 1.3 对比度基线（实测，验收用；**表内数字全部实算，禁止外推**）

| 前景 | 纸底 `--paper` | 卡面 `--card` | 弱底 `--inset` | 填充面 `--fill` |
|---|---|---|---|---|
| `--ink` | 14.98 | **16.19** | **14.10** | 15.38 |
| `--text-soft` | 6.37 | **6.88** | **5.99** | 6.54 |
| `--text-muted` | **4.68** | **5.06** | 4.40 ✗ | 4.80 |
| `--brand` | 5.76 | **6.23** | **5.42** | 5.92 |
| `--ok` | 5.82 | **6.29** | **5.47** | 5.97 |
| `--no` | 6.70 | **7.24** | **6.30** | 6.87 |
| `--line`（装饰） | **1.23** | 1.32 | 1.15 | 1.26 |
| `--line-strong`（装饰） | 1.47 | 1.59 | 1.39 | 1.51 |
| `--line-control`（边界） | **3.21** | **3.47** | **3.02** | 3.30 |
| `--on-fill` / 篇色实底 | — | 6.82–6.90（五色） | — | — |

配套（组合底）：`--brand`/`brand-tint` 5.41 · `--ok`/`ok-tint` 5.77 · `--no`/`no-tint` 6.44 · `--ink`/`mark` 13.89 · `--due`/card 5.37。

---

## 2. 全局硬规则（照抄进代码注释）

- **R1　每屏只有 1 个"实底主行动"，色取自该屏语义。**
  start / result / 课文页 = `--brand`；stage = `--ok`。
- **R2　实底只允许来自 `--brand` 或 `--ok`。** 禁止 `--no` / 篇色做实底（危险动作用 `--no` 文字，永不做实底）。
- **R3　同一屏不得同时出现 brand 实底与 ok 实底。**（这才是 stage 不放 brand 按钮的原因，不是"stage 不配有主行动"）
- **R4　状态类一律中性**：激活 tab、开关按下态、进度条、选中态、**焦点环** → `--ink` / 中性阶。
  一句话记法：**brand = 我能点哪，ink = 我在哪。** 焦点是状态不是行动，`:focus-visible` 全局 `2px solid var(--ink)`。
- **R5　篇色合法位置只有 4 处**：① 编号印章 28×28　② 封面 3px 顶线　③ 篇标签 pill（含答题卡上沿的篇名 pill）　④ fact 3px 左竖线。合计 <1.2% 屏面积。
  **不得用于正文文字、功能图标、语法式、底色块。** 篇色不得承担"局部强调"功能。
  **封面装饰汉字水印已整体删除**（5 篇 `header.cover::after` 全删，含 vending 原本没有的那处与 new-year 的「正月」）。理由：1.30:1 的纯装饰强光下不可见，而 R5 刚收紧到 4 处，为它开例外会给下一个块状元素留下先例。封面视觉重量改由 **3px 篇色顶线 + `h1.ja` 的 clamp 字号** 承担。删除后 `.cover` 不再需要 `overflow:hidden`。
- **R6　投影只允许出现在 z 轴上有位移的元素上**：① 覆盖层（voice sheet，`--shadow-overlay`）② 翻转词卡（`--shadow-flip`）。页面内普通卡片一律 1px `--line` + 留白分层，**无投影**。投影值不得手调。
- **R7　触控目标 ≥44×44；边框按"是否承担识别"分流**：
  - `--line-control`（≥3:1）用于**必须靠边界才能认出是控件**的位置：表单输入、行内「译」胶囊（与正文同字体同色，只能靠边框区分）、无遮罩的 sheet 边界。
  - **有高对比内部图标的按钮，环是装饰，用 `--line`**：如 15 个 `.snd`、sheet 关闭按钮。可点性由 44px 热区 + `--ink` 图标承担。
  - 依据：把 15 个 3.21:1 的深环铺在正文旁，会从"颜色吵"变成"密度吵"，比原来更抢眼。
- **R8　`lang`**：日文句/词 `lang="ja"`，中译 `lang="zh-CN"`。正文用 `rem`，`text-size-adjust:100%`。

### R5 附一：篇色 × 功能色 ΔE76 矩阵（勿再改）

| | ×brand | ×ok | ×no | ×ink |
|---|---|---|---|---|
| a1 `#2d6459` | **5.2 ✗** | 16.3 | 75.8 | 34.9 |
| a2 `#89483d` | 55.5 | 55.4 | 26.4 | 39.1 |
| a3 `#6f5632` | 40.6 | 35.7 | 41.5 | 33.5 |
| a4 `#3a5d80` | 31.4 | 47.0 | 77.0 | 38.3 |
| a5 `#46622c` | 29.8 | **14.8** | 66.5 | 41.1 |

全表只有 **a1×brand = 5.2** 低于"肉眼可分辨"阈值 10 —— 这是吸顶条激活态必须用 ink 而非 brand 的全部原因，也是唯一原因。
（附：brand×ok = 17.7，即 brand 焦点环压在 ok 按钮上也不算撞色；但按 R4 仍统一 ink，理由是"状态不抢行动"，不是"怕撞色"。）

### R5 附二：tint × tint 的 ΔE 容差（不是缺陷，别当 bug 报）

| | ×ok-tint | ×no-tint | ×brand-tint |
|---|---|---|---|
| a1 tint | **2.4** | 9.4 | 3.1 |
| a2 tint | 7.3 | **1.6** | 7.8 |
| a3 tint | 4.7 | 3.2 | 6.5 |
| a4 tint | 6.3 | 8.7 | 5.0 |
| a5 tint | 4.2 | 8.8 | 6.5 |

**tint 只做底，不承担识别。** 识别由 tint 上的文字色（篇色 / `--ok` / `--no`，彼此 ΔE ≥14.8）与边框承担，因此 **tint 之间 ΔE < 6 允许，不调整**。
典型场景：a2 篇词卡上「文化 02」pill 的粉底与「✗ 没记住」的粉底 ΔE 1.6 —— 同一色值，但一个字是篇色、一个是 `--no`，语义由文字与边框区分。

---

## 3. 首页 `index.html`

删除：3 个统计 pill、**2 个 52px 图标块（连同 SVG）**、全部 `--accent` 引用。
> 图标删除已定：首页改造后只剩「今日卡 + 阅读」两件事，图标是冗余装饰；删掉同时消掉 2 组未登记 tint（`#e7f1ee`、`#f7ecdf`）和一个体系外颜色 `#b8762a`，并省 52px 宽。

| 顺序 | 区块 | 规格 | 高度 |
|---|---|---|---|
| 1 | 页头 | kicker 12/600 `--text-muted`；h1 26/700 `--ink`；副行 13 `--text-soft`「73 句 · 75 个词 · 全假名注音」 | 92 |
| 2 | **今日卡** `.today` | `--card` + 1px `--line` + `r-card` + `padding:--s5`，**无投影无底色** | 180 |
| 2.1 | 　标签 | 12/600 `--text-muted`：「今天」 | 18 |
| 2.2 | 　大数 | 40/700 `--ink` + `small` 15/600 `--text-soft`：「12 个词到期」 | 46 |
| 2.3 | 　进度 | 12.5 `--text-soft`「已掌握 23 / 75」+ 4px 轨 `--line` / 填充 `--ink` | 30 |
| 2.4 | 　主按钮 | **`--brand` 实底** 52px、`r-ctl`、`--on-fill` 字 16/600；`:active` → `--brand-press` | 52 |
| 3 | 阅读卡 `.entry` | 见下 | 96 |
| 4 | 页脚 | 来源说明 12 `--text-soft` | 40 |

```css
.entry{ padding:var(--s5); gap:var(--s4); border-radius:var(--r-card);
        border:1px solid var(--line); background:var(--card); }   /* 无图标、无投影 */
.e-t{ font-family:var(--font-zh); font-size:20px; font-weight:700; }
.e-s{ font-family:var(--font-zh); font-size:13px; color:var(--text-soft); margin-top:2px; }
```
标题 17 → **20/700**，补上原先由图标承担的视觉重量；chevron 保留但 `aria-hidden`。
首屏总高 ≈ 410px，375×667 与 320×568 均无需滚动。
未登录/无记录：副行降级为「本机还没有记录 · 登录后自动合并」，**不阻挡**。
数据来源：读 `localStorage['jp_srs_v2']` 统计 `s<3 && due<=now`；分母固定 75。

---

## 4. 阅读目录 `reading.html`

| 项 | 改法 |
|---|---|
| 页头标题 | 「三篇阅读」→ **「阅读目录」**（实际 5 篇，不写数字，避免再次漂移） |
| 卡片 | 5 张同构；`data-piece="a1…a5"`；**删掉 2 处 inline `style`**（konbini `#2a5c8a`、train `#8a5a24`） |
| 编号 | `.stamp` 28×28（`--piece` 实底 + `--on-fill` 字 12/700 tabular-nums + `r-tag`），替换 `.num/.num.c2/.num.c3` |
| 篇名 | 统一 **`04 · コンビニ`**（序号在前 + `·` + 日文名），与复习页、课文页同一字符串 |
| tags | 每个保留 2 个（句数 / 语法点），第三个"约 3 分钟"在 320 隐藏；tag 用 `--inset` 底 + `--text-soft` 字，`r-pill`（删 `#7a6a45`/`#f4eee0`） |
| 「开始读 →」 | 删除（整卡可点，重复的链接文案只是噪音） |

---

## 5. 复习页 `review.html`

### 5.1 start 视图（默认展开，首屏 ≈480px）

| 顺序 | 元素 | 规格 |
|---|---|---|
| 1 | 页头 | `← 首页` 44×44 |
| 2 | **状态行** | 44 高，**透明底无边框**；左侧 8px 槽位 **`flex:none;width:8px;height:8px`**、`aria-hidden="true"`：已同步=透明、未登录=`--text-muted` 实心、失败=`--no` 实心；文案 12.5 `--text-soft`；右侧 44px 文字按钮 |
| 3 | 今日卡 | 与首页**同一组件、同一 DOM 结构** |
| 4 | 次级入口 | 「只练没掌握的（52 个词）」48 高，`--brand` 文字 14.5/600，右侧 chevron |
| 5 | `<details>` 按篇练 | 标题行 48 高；展开后 6 行，**每行 44 高**：`.stamp` 28 + `04 · コンビニ` 14.5/600 `--ink` + 右侧 `15 词` 12 `--text-muted`；**`全部混测` 用 `.row--all`**：28×28 描边空槽（1px `--line-control` + 「全」11/600 `--text-muted`，**不是印章**，注释写明），文字 `--text-soft` |
| 6 | `<details>` 进度与同步 | 48 高标题；展开后：账户行（登录 4 控件 / 已登录+退出）、**语音设置入口（仅此处）**、离线备份（复制链接 / 粘贴导入 → 页内 textarea + 44px 按钮，**不用 prompt**）、上次同步时间 12 `--text-soft`、清空进度（**`--no` 文字 + 二次确认**，写明"云端也会删"） |

删除：`.dash` 三格、8 个 `.mode` 常驻布局、`.syncbox` 常驻、`.reset` 灰下划线、`#jpvBtn` 浮动按钮。
**行高说明**：6 行必须是 44 而不是 56——行内容是"28px 印章 + 单行篇名 + 右侧词数"同一行，内容高 28，加 8px 上下内边距正好 44；56 会让 6 行多占 72px，把「进度与同步」推出首屏，破坏验收第 3 条。

### 5.2 stage 视图（单屏，不滚动）

```
grid: 52px 顶栏 / 1fr 卡片 / 64px 动作区 (+ env(safe-area-inset-bottom))
顶栏：← 44×44 ｜ 3/20 12.5 --text-soft ｜ 4px 进度条（轨 --line / 填充 --ink） ｜ 剩 17
卡片：--card 1px --line r-card，--shadow-flip（翻转中需要深度感，R6 第 2 类）
　　　.snd 44×44 于卡片内右上（--line 环 + --ink 图标，按 R7 属"有图标按钮"，环是装饰），不再 fixed
　　　tagline：篇名 pill，--piece-tint 底 + --piece 字（R5 第 3 位置；a1×ok=16.3 不相撞）
　　　正面：词 clamp(1.5rem,7.4vw,2rem)/700 --ink ／ 提示 12 --text-muted
　　　背面：假名 15/400 --text-soft ／ 中译 19/600 --ink ／ 提示 12 --text-muted
动作区：sticky bottom，两按钮各 52 高，边框 == 字色
　　　　✗ 没记住：--no 字 + --no 边框 + --no-tint 底
　　　　✓ 记住了：--ok 字 + --ok 边框 + --ok-tint 底
```
- 假名用 `--text-soft` 而**不是** `--brand`：stage 内绿色只允许一个来源（`--ok`）。
- 禁止 `window.scrollTo` on each card（单屏后无需，且 iOS 会每张闪一次）。
- 中途退出：顶栏 `←` 触发**页内提示条**（不用 `confirm`）：「本轮已记录 7 个词，还剩 12 个｜继续 / 结束本轮」。
- 连对圆点：`.dots i` 7px，on 用 `--ok`；**必须配文字**「连对 2 次 · 再对 1 次进入 3 天间隔」。
- **stage 内无语音设置入口**，只有卡片上的 `.snd` 播放当前词。

### 5.3 result 视图
按钮顺序：**`继续今日复习`（brand 实底，primary）→ `再练这 N 个错词` → `回首页`**。
数字口径与首页/start 一致：「今天还剩 N 个（其中 M 个是第一次学）」。
`.score` 44/700 保留 `--brand`（文字非实底，不破 R3）。

---

## 6. 课文页 ×5

### 6.1 吸顶条（sticky）
| 元素 | 375 | 320 |
|---|---|---|
| `← 目录`（44×44，`aria-label`） | 44 | 44 |
| `.stamp` 28×28 `--piece`（`aria-hidden`） | 28 | 28 |
| 4 个 tab〔课文/词汇/语法/文化〕44 高，13/600 | 各 59.75 | 各 50 |
| 激活态 | **2px `--ink` 下划线** + 文字 `--ink` 600；未激活 `--text-soft` 400 | 同 |
| 底边 / 背景 | 1px `--line`；`rgba(247,245,239,.92)` + `backdrop-filter:blur(8px)`（`@supports` 回落实色） | 同 |
| `z-index` | 20 | 20 |

**全条唯一有色元素 = 篇色印章。不得出现 `--brand`**（见 R5 附一：a1×brand ΔE 仅 5.2）。

### 6.2 四区规格
| 区 | 必需内容 | 375 高度 | 删除 |
|---|---|---|---|
| `#text` | 15×(序号 gutter 24 + 日文 ruby 20/1.9 + 🔊44 + 行内「译」44)；工具行 44 | 1500 | h2 + 说明、`.tip` 🎧 段、句间 dashed |
| `#vocab` | 15×(词 + 假名 + 罗马音 + 释义 + 出现句号③) | 1500 | 3 列表头 |
| `#grammar` | 7–9×(句式 16/700 + 课次徽标 + 例句 14/1.9) | 900–1140 | `h2 .dot` |
| `#culture` | 3–4×fact（3px 篇色左竖线 + 无底色）+ 来源折叠行 | 700–790 | 篇色 tint 底、`.src` 常驻 |

**词汇区 ≤400px 一律 2 行式**（第 1 行 词 16/700 + 读音 13 `--text-soft`；第 2 行 释义 14 满宽 + 出现句号）。这是总高能否压到 1900（13 句篇）/ 2200（15 句篇）的**唯一决定项**。
工具行 = 3 个文字 pill（显示全部中译 / 显示罗马音 / ▶全文朗读，44 高，按下态 `--ink` 实底）+ 1 个 44×44 **语音设置**图标（`data-voice-slot`）。**不做四个图标**：「显示全部中译」这行字对中文学习者本身就是说明。
CTA「测这 15 个词」：`#text` 与 `#vocab` 末尾各一个（`--brand` 实底 44+），不是 4 个。

### 6.3 逐句「译」
- DOM：`<div class="sent" data-zh="0">` + `<div class="zh" id="zh-3" hidden lang="zh-CN">`。
  **必须删掉 `.zh{display:none}`**，否则去掉 `hidden` 也不显示。
- 按钮：`<button class="zh-toggle" aria-expanded="false" aria-controls="zh-3">译</button>`，行内句末。
  `min-width/height:44px; inline-flex; vertical-align:middle; margin:-7px -4px -7px 8px`
  （负 margin 使 margin-box 30px ≤ 行高 38px，**1 行句子行高不得被撑到 44**，验收差 ≤2px）。
  视觉 28px 胶囊：1px `--line-control` 边（与正文同字体同色，只能靠边框识别，按 R7 用 control 级）+ 12/600 `--text-soft`；**展开态边与字 = `--ink`**。
- 全局控件：**不用 `aria-pressed`**（是命令不是状态）。`allOpen` → 「隐藏全部中译」/ 否则「显示全部中译」；点击 = 全部置 0/1，**永不出现"部分"文案**；每次逐句切换后 `syncMaster()`。
- 优先级：**逐句 > 全局**（全局是批量写一次，不是持续绑定）。不持久化，刷新回全关。
- 罗马音是真正的显隐模式 → 保留 `aria-pressed`（差异写注释）。

### 6.4 hash 与返回
- 4 个 panel 的 id = `text|vocab|grammar|culture`；无 hash / 无 JS → `#text`。
- 切换用 **`history.replaceState`**（不用 pushState：4 个切面不是 4 个页面，否则要按 4 次返回才离开）。
- 首帧读 `location.hash` 直接激活，不得先渲染 `#text` 再跳。非法 hash 静默落 `#text` 并清掉 URL。
- 切 tab 后：若 `scrollY` 已超过目标 panel 顶部 → `scrollTo(panelTop − 52 − safeAreaTop)`，**即时无动画**；否则不动。
- 每个 panel：`scroll-margin-top: calc(52px + env(safe-area-inset-top, 0px))`。
- 复习页 `ARTICLES` 映射改为 `'konbini.html#text'`（显式 hash）。
- 无 JS 降级：`<html data-tabs="on">` 由 JS 添加，初始 4 区全可见。

### 6.5 iOS sticky
```css
.tabbar{ position:sticky; top:env(safe-area-inset-top,0px);
         padding-top:env(safe-area-inset-top,0px); min-height:52px; }
```
- `top` + `padding-top` 同时写：条的背景必须覆盖刘海区，否则上面露 20px 正文裂缝。
- 不用 `height`（padding 会撑高）。
- **禁令**：`body` / `.wrap` 不得设 `overflow-x:hidden`（会让 sticky 完全失效）；需裁切用 `overflow-x:clip`。
- 不得给吸顶条加 `will-change` / `transform` / 动画（iOS 抖动）。
- **全部 8 页**补 `viewport-fit=cover`（现在只有 review.html 有，其余 `env()` 恒为 0）。
- 页面底部：`padding-bottom: calc(var(--s9) + env(safe-area-inset-bottom))`（=56px）。
  **课文页没有 sticky 底栏**（CTA 在 `#text` / `#vocab` 末尾的文档流里），所以不需要 96px；原先的 96 是为固定语音按钮留的，该按钮已撤。

---

## 7. 无障碍与浮层

### 7.1 语音设置面板（sheet）—— 无可见遮罩，三条硬约束必须照办

**背景（已定，不再讨论）**：`--scrim:rgba(36,31,26,.28)` **仅登记备用，本轮不渲染可见遮罩**。产品理由：调语速时要能同时看到正文。退出路径三条：透明捕获层点击 / Esc / 面板内 44px 关闭按钮。
因此"边界与层级"改由下列三条承担，缺一条面板都会糊进正文：

| # | 约束 | 数值 / 理由 |
|---|---|---|
| S1 | **边框必须用 `--line-control`，不得用 `--line`** | `--card`(#fffefb) 压 `--paper`(#f7f5ef) 只有 **1.08:1**，正文还从下方透出，1.32 的 `--line` 等于没有边界。无遮罩时边界是可感知性的唯一承担者（1.4.11）；`--line-control` = 3.47 |
| S2 | **必须有标题行**（「语音设置」16/700 `--ink`） | 无遮罩时没有"背景变暗"这个模态信号，面板会被读成正文里多出的一段 |
| S3 | **44×44 关闭按钮常驻可见**，置于标题行右端，`--ink` 图标 + 1px `--line` 圆环（与 `.snd` 同一套） | 另外两条退出路径在触屏上用户看不见；这颗按钮是唯一**可见**出口。**不做淡色、不做 hover 才显** |

```css
.sheet{ position:fixed; inset:auto 14px calc(60px + env(safe-area-inset-bottom)) 14px;
        max-width:420px; margin:0 auto; z-index:60;
        background:var(--card); border:1px solid var(--line-control);
        border-radius:var(--r-card); box-shadow:var(--shadow-overlay); }
.sheet-head{ display:flex; align-items:center; justify-content:space-between; }
.sheet-close{ width:44px; height:44px; border:1px solid var(--line); border-radius:999px;
              background:var(--card); color:var(--ink); }   /* 与 .snd 同一套 */
```

**透明捕获层（实现注释必须写清）**
```html
<div class="sheet-catch" aria-hidden="true"></div>
```
```css
.sheet-catch{ position:fixed; inset:0; background:transparent; z-index:59; }
```
必须同时满足：① **吞掉点击**（点外部即关闭）；② **不遮挡视线**（`background:transparent`，不加任何底色）。
若它顺带锁定了页面滚动，**必须在代码注释里写明"这是无视觉的模态"**——否则后来者会以为页面仍可滚，把 `body{overflow:hidden}` 当 bug 删掉。

**其余**：语音设置入口在课文页工具行（`data-voice-slot` 44×44）与复习页「进度与同步」折叠区；**stage 内无入口**。`voice.js` 需支持锚点：存在 `[data-voice-slot]` 就挂进槽并去掉 `fixed`，否则退回现状（便于分批迁移）。试听按钮改 outlined（`--brand` 1px 边 + 字），不再实底。

### 7.2 无障碍清单

| 项 | 要求 |
|---|---|
| lang | 日文句/词 `lang="ja"`，中译 `lang="zh-CN"`（读屏用中文音库念日文是当前最大问题） |
| 翻卡 | 背面 `aria-hidden` 随翻面切换（`backface-visibility` 只藏视觉，**读屏会提前念出答案**）；正面 `aria-label="第 3 张，共 20 张。ならびます。点按显示读音与释义"`；`aria-live="polite"` 播报翻面 |
| 进度条 | `role="progressbar" aria-valuenow/min/max` |
| tab | `role="tablist"/"tab"/"tabpanel"`，`aria-selected`，roving tabindex，←→ 切换 |
| 焦点 | 全局 `:focus-visible{outline:2px solid var(--ink); outline-offset:2px}`；移除 `*{-webkit-tap-highlight-color:transparent}` |
| 44px | 课文 🔊 / 复习 🔊 / 工具行 pill / 返回 pill / tab / ← / sheet 关闭 / 退出与清空，全部 ≥44 |
| 动效 | `prefers-reduced-motion:reduce`：翻面 3D → 0.12s 透明度切换；进度条 transition 关闭；去 `behavior:'smooth'` |
| 装饰 | `.chev`、`.stamp` 副标记、状态行 8px 槽位 → `aria-hidden="true"` |

### 7.3 错误态文案（一律人话 + 一个动作；JS 不得 `style.color` 赋值，改切类名）

| 场景 | 文案 | 动作 |
|---|---|---|
| 未登录 | 未登录 · 进度只在这台手机 | 登录 |
| 同步失败 | 没能存到云端，进度已在这台手机保存 | 重试 |
| 断网 | 网络断了。答题不受影响，恢复后自动补传 | — |
| 云未就绪 | 云服务加载中，稍等几秒再试 | — |
| 验证码 | 手机号要是 11 位 / 验证码已发出，60 秒后可重发 | — |
| 空队列 | **不得 `alert`**：今天没有到期的词 · 明天再来 | 去读一篇 / 只练没掌握的 |
| 清空 | 清空后本机与云端记录都会删除 | 二次确认 |

---

## 8. 响应式

`@media (max-width:400px)`：词汇表 2 行式；日文正文降为 `1.125rem`（18px，见 §1.2）。
`@media (max-width:360px)`（320 档）——**先删后缩**：

| 级 | 元素 | 动作 |
|---|---|---|
| P0 删 | 封面装饰汉字（已全尺寸删除，非仅 320）、`.romaji` 行、meta 第 3/4 个 tag、`.kicker` | 0 信息损失 |
| P1 删 | `.tip` 🎧 段（语音面板已有）；`.src` 折叠为一行 | 别处可得 |
| P1 折 | 封面 lead `line-clamp:2` | 钩子够用 |
| P2 缩 | `.g-form` 16→15；padding 24→16；margin 20→12；动作按钮 52→48 | 仍 ≥44 |
| P3 换 | 语法课次徽标换行到句式下 | 320 放不下同行 |
| **严禁** | 句序号 / 日文句 / 🔊 / 译 / 印章编号 / CTA / 工具行 | 任何尺寸不得隐藏 |

---

## 9. 验收清单（可测）

1. `document.body.scrollHeight`（取当屏可见的那个切面，通常是 `#text`）：**375 下 13 句篇 ≤ 1900、15 句篇 ≤ 2200**；320 ≤ 1950。超线先查词汇区是否已改 2 行式；`#text` 仍超线按**附录 B** 判定，**不得**自行压缩字号或移动 🔊 位置。
2. 首屏（375×667）：首页、复习 start 均**无需滚动**看到主按钮；主按钮顶部 ≤ 480px。
3. 复习页首屏可点控件 ≤ **6 个**（未登录态现在是 15 个）。
4. 切 4 个 tab 后按浏览器返回 → **回目录页**，不残留 tab 历史。
5. 深链 `konbini.html#grammar` 首帧即显示语法区，无 `#text` 闪现；`#foo` 落 `#text` 且 URL 被清理。
6. 吸顶条：激活态 2px `--ink` 下划线；全条唯一有色元素为篇色印章；**无 `--brand`**。
7. sticky 在 iOS Safari 竖屏 / 横屏 / 加入主屏三态都停在刘海下，且条背景覆盖刘海区。
8. 320：吸顶条 5 元素不换行、每 tab 可点宽 ≥44；页尾 CTA 不被 home indicator 遮挡。
9. 「译」：单句展开 → 全局文案变「隐藏全部中译」；再点全局 → 全收起；1 行句子行高变化 ≤2px；展开态为 `--ink` 不是 `--brand`。
10. 触控：所有可点元素 ≥44×44（DevTools 逐个核）；无 `:hover` 独家控件。
11. **P6 grep 归零**：8 个 html/js 文件 215 处 → 0 处（命令见 §0；不含 tokens.css）。
12. 全文无 `alert/prompt/confirm`；无 `style.color` 赋值。
13. **字号跟随**：系统字号 125% 时，正文 `1.25rem` 实际 ≈25px；词卡 9 字长词允许换行，**不得横向溢出、不得截断**（判定口径：允许换行 / 禁止溢出与信息丢失）。
14. **语音面板（无遮罩）**：边框为 `--line-control`（3.47）而非 `--line`；有标题行；关闭按钮 44×44 常驻可见；点面板外任意处关闭；**面板打开时正文仍可见可读**。
15. **封面不能退化成裸卡**：320 下 h1 ≥ `1.5rem`、3px 篇色顶线可见；`header.cover::after` 已不存在（`getComputedStyle(h,'::after').content` 为 `none`）。

---

## 10. 篇色退场表（R5 落地，逐行改）

| 选择器 | 现在 | 改为 |
|---|---|---|
| `.kicker` | 篇色 | `--text-muted`（卡面 5.06） |
| `h2 .dot` | 篇色圆点 | **删** |
| `.snd svg`（15 个/篇） | 篇色 fill | `--ink`；圆环 `--line`（有图标，环是装饰，见 R7） |
| `td .kana` | 篇色 | `--text-soft` |
| `.g-form` | 篇色 700 | `--ink` 700 |
| `.fact` | 篇色边框 + 篇色 tint 底 | **`border-left:3px solid var(--piece)`，底透明**；`.fact b` → `--ink` 700 |
| `.g-lesson`（第4课） | `--green` 实底白字 | `--inset` 底 + `--text-soft` 字（5.99）+ `r-tag` |
| `.tbtn.on` | 篇色实底 | `--ink` 实底 |
| `header.cover::after` 水印 | 每篇一色（`#e8f0f8` / `#e8f3f0` / `#f3ead8` / `#f4ecdf`，vending 无） | **5 篇全删**（含 new-year 的「正月」） |
| 底部 CTA | 篇色实底（konbini/train 为 inline 硬编码） | `--brand` 实底 + `--on-fill` 字 |
| 封面 3px 顶线 / 印章 / 篇 pill / fact 竖线 | — | 保留篇色（R5 合法位置） |

---

## 11. 遗留硬编码清单（P5 一起清，共 215 处）

**实测分布（`§0` 的 grep，已复现，可作为分批验收的进度表）：**

| 文件 | 命中 | 文件 | 命中 |
|---|---|---|---|
| `review.html` | 46 | `vending-machines.html` | 26 |
| `train.html` | 27 | `new-year.html` | 26 |
| `onsen.html` | 27 | `reading.html` | 13 |
| `konbini.html` | 27 | `index.html` | 12 |
| | | `voice.js` | 11 |
| **合计** | | **215** | |

> 课文页小计 = 27+27+27+26+26 = **133 处**。
> 215 是「字面量出现次数」，不是「需要改的属性数」。按文件归零比按属性数见效快：先 `voice.js`(11) 与 `index.html`(12) 归零（两文件 23 处，结构最简单），即可验证 grep 口径，再推进课文页 133 处与 `review.html`(46)。

| 位置 | 处数 | 内容 |
|---|---|---|
| `voice.js` 自注入 `<style>` | 11 | 线色 `#e7e0d2`、`#9a938a`(2.79)、`#2b2b2b`、`#6f6a60`；混合字体栈 ×2；`font:` 简写 ×2（含 `14px/1.6`）；圆角 `16px`/`8px`/`10px`/`999px`（前两个越界）；**`box-shadow` ×2（全站仅存的两个投影）**；`#jpvRow button.p{background:#1f6b63}` |
| 5 篇课文页 inline | 25（5×5） | 返回条、h2 说明、底部卡容器、卡内说明、CTA（CTA 已漂成 3 色：`#1f6b63`×3 / `#2a5c8a` / `#8a5a24`） |
| `reading.html` | 13 | `.num` 的 `#2a5c8a`/`#8a5a24`、`.tags span` 的 `#7a6a45`/`#f4eee0` 等 |
| `review.html` | 46 | `.tagline`/`.hint` 的 `#b3a98f`、`#nextDue` 的 `#6f6a60`、JS `abMsg` 的 `#3e7d4f`/`#a8341f` 等 |
| `index.html` | 12 | `.icon.read` `#e7f1ee`、`.icon.review` `#f7ecdf`+`#b8762a`（整块删除）等 |
| `cloud.js` | 0 | 已核实无样式 |

> `#b8762a` 的定性：对自身底 `#f7ecdf` **3.18:1**（对纸底 3.40），**作为图形是过的**。它不是对比度问题，是**体系外颜色**问题——既不在 5 篇色、也不在任何语义色里。所以处理方式是删除，不是调深。

---

## 附录 A. 按文件索引（前端按文件施工用）

| # | 文件 | 篇色 | 必读节 | 该文件专属要点 | grep |
|---|---|---|---|---|---|
| 1 | `index.html` | — | §0 · §1 · §3 · §7.2 · §8 · §10 | 删 3 pill + 2 图标块（含 SVG）；`.entry` 无图标、标题 20/700；今日卡读 localStorage | 12 |
| 2 | `reading.html` | a1–a5 | §0 · §4 · §7.2 · §8 | 标题改「阅读目录」；`.stamp` 替 `.num`；删「开始读 →」；2 处 inline 色 | 13 |
| 3 | `review.html` | a1–a5 | §0 · §5.1 · §5.2 · §5.3 · §7.1 · §7.2 · §7.3 · §8 · §10 | 状态行降级；8 模式收 1+1+2 折叠（行高 **44**）；stage 单屏化；`.snd` 进卡；退出用页内条；语音入口进折叠区 | 46 |
| 4 | `vending-machines.html` | a1 | §0 · §6.1–6.5 · §7.2 · §8 · §10 | 删 `::after`（本就无）；CTA 硬编码改 brand；四区 tab 化 | 26 |
| 5 | `new-year.html` | a2 | 同上 | 删「正月」水印；9 条语法（最高区） | 26 |
| 6 | `onsen.html` | a3 | 同上 | 删「湯」水印；篇色不再用于中译/语法式/读音 | 27 |
| 7 | `konbini.html` | a4 | 同上 | 删「店」水印；**删 inline `#2a5c8a`** | 27 |
| 8 | `train.html` | a5 | 同上 | 删「駅」水印；**删 inline `#8a5a24`** | 27 |
| 9 | `voice.js` | — | §0(P5) · §7.1 · §11 | 自注入 `<style>` 全量重写；加 `[data-voice-slot]` 锚点；试听改 outlined；取消 fixed；`box-shadow` ×2 | 11 |

**每个课文页共用**：§6.1 吸顶条尺寸 / §6.2 四区与高度 / §6.3 逐句「译」/ §6.4 hash / §6.5 sticky / §10 退场表。
**全部文件共用**：§0 六条纪律、§1 token、§2 八条规则 + R5 两个附录、§7.2 无障碍、§8 断点、§9 验收。

---

## 附录 B. 课文页高度目标（双档）与两个已否决方案（**勿再提**）

**结论**：`#text` 切面高度按句数分两档 —— **13 句篇 ≤1900 / 15 句篇 ≤2200（375）**。五篇现状（静态推算，非实测）：

| 文件 | 句数 | 总行数 | `#text` | 目标 | 判定 |
|---|---|---|---|---|---|
| `vending-machines.html` (a1) | 13 | 32 | ≈1849 | ≤1900 | ✓ |
| `new-year.html` (a2) | 15 | 39 | ≈2149 | ≤2200 | ✓ |
| `onsen.html` (a3) | 15 | 39 | ≈2149 | ≤2200 | ✓ |
| `konbini.html` (a4) | 15 | 33 | ≈1921 | ≤2200 | ✓ |
| `train.html` (a5) | 15 | 32 | ≈1883 | ≤2200 | ✓ |

推算口径：375 下文列 = 343 − 面板 40 − 序号槽 24 − 2×gap 16 − 🔊44 = **219px**，`.jp` 20px → 10 字/行；「译」在末行再占约 2 字位；行高 38px；另加封面 218 + 吸顶条 53。
**为什么分档**：1900 最初是按 13 句篇（vending）推出来的数。15 句天然多约 190px（每句 ≈95px），把 1900 套到 15 句上本身不成立。

**已评估、已否决的两个方案（不要再提，也不要"顺手"实现）：**

| 方案 | 做法 | 收益 | 否决理由（team-lead 裁决） |
|---|---|---|---|
| **A** | 🔊 从右侧 44px 列移到句末，与「译」并排（文本列 219→271px，10→13 字/行） | vending 1773 / new-year 1845 / onsen 2035 / konbini 1845 / train 1845 | **按钮位置一致性优先于 52px 文本宽度**。逐句听读是高频动作，播放按钮必须每句对齐在同一列；跟着句子长度浮动会毁掉肌肉记忆，为少滚半屏不值得 |
| **B** | A + `.jp` 在 375 也保持 `1.125rem`（18px、15 字/行、行高 34.2） | 五篇全部 ≤1755（vending 1449） | **字号优先级更高**。这是带假名注音的初级阅读，20px 是关键可读性，为 150px 滚动距离牺牲字号方向反了；且字号一改 5 篇全要重算，收益不成比例 |

**因此**：`#text` 超 2200 时唯一允许的动作是查两件事 —— ① 词汇区是否还是 3 列（§6.2 的 2 行式是唯一决定项）；② 是否有规格外多余 `margin`/`padding`。
**禁止**：改 `.jp` 字号、移动 `.snd` 位置、给日文加 `line-clamp` 截断。
