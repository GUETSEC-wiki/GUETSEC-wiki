---
name: GUETSEC Wiki
description: 深色、平面、单一青色强调的 CTF writeup 阅览室
colors:
  ink: "#0f1214"
  chrome: "#121417"
  surface: "#161a1d"
  wash: "#ffffff06"
  hairline: "#ffffff12"
  hairline-strong: "#a6b8c929"
  block: "#a6b8c914"
  text: "#ffffff"
  text-body: "#ffffffcc"
  text-muted: "#ffffffb3"
  text-strong: "#ffffffe6"
  text-quiet: "#ffffff80"
  text-meta: "#ffffff8c"
  text-faint: "#ffffff66"
  text-ghost: "#ffffff59"
  accent: "#1cd0fd"
  accent-text: "#90e8fe"
  link: "#47d2f5"
  code-text: "#95d5e5"
  halo: "#1cd0fd12"
  # 背景氛围光（仅 .sitebg 一层使用，前景/UI 不用）：
  amb-cyan: "hsl(192 98% 55% / 0.2)"
  amb-cyan-soft: "hsl(192 90% 50% / 0.07)"
  amb-indigo: "hsl(226 72% 58% / 0.16)"
  amb-teal: "hsl(170 68% 46% / 0.12)"
  amb-warm: "hsl(28 78% 56% / 0.09)"
  # amb-cyan-soft：右下角与右上靛青成对角的第二层淡青
  amb-vignette: "hsl(210 26% 3% / 0.62)"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "2.85rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "2.1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "0em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0em"
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.3em"
  meta:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  headline-article:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "2.2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline-mobile:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "1.9rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  body-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0em"
  meta-sm:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  prose-h1:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0em"
  prose-h2:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0em"
  prose-h3:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  hair: "4px"
  tight: "8px"
  base: "12px"
  loose: "16px"
  panel: "24px"
  panel-wide: "40px"
  section: "40px"
components:
  nav-link:
    textColor: "{colors.text-quiet}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  nav-link-active:
    backgroundColor: "#1cd0fd33"
    textColor: "{colors.accent}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "40px"
  list-row:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px 12px"
  tag-chip:
    textColor: "{colors.text-quiet}"
    rounded: "{rounded.xs}"
    padding: "0px"
  category-link:
    textColor: "#7dd3fc8c"
    rounded: "{rounded.xs}"
    padding: "0px"
  prev-next-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.lg}"
    padding: "16px"
  masonry-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-quiet}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: GUETSEC Wiki

## Overview

**Creative North Star: "The Reading Room"**

一套深色阅览室：房间近乎全黑，唯一的光是顶部一层极淡的青色天光；书架、索引卡与书桌都用同一种发丝线勾勒，不用玻璃、不用阴影、不用第二种颜色。读者进来是为了找到某一篇、然后安静读完，而不是被界面本身吸引。

性格取「安静 · 精确 · 略冷」：文字是唯一的主角，界面元素退到 7% 白的线条与 2.5% 白的悬停填充里；青色只出现在「你现在在哪」「这篇属于哪类」「阅读进度」这三件事上。层级不靠模糊、不靠投影，只靠三档表面亮度（#0f1214 页面 / #121417 导航外壳 / #161a1d 浮层面板）与 1px 线条的边界。

组件手感是「克制而精确」：控件形状几乎不变，悬停只微弱变亮；数字一律等宽对齐；标签小、紧、灰，只有分类与当前导航允许带色。整站只有深色一种状态，不设想浅色版本。

**Key Characteristics:**
- 近纯黑底 (#0f1214) + 顶部两层青晕（12% 主光 / 5.5% 宽幅二次晕）与四角暗角，全站唯一的彩色背景
- 平面分层：无阴影、无 backdrop-filter、无玻璃拟态
- 单一青色强调 (#1cd0fd)，占屏面积 ≤10%，无第二色相
- 发丝线 1px（白 7% / 蓝灰 8%）承担所有边界，圆角 4–16px 分级
- 中文正文 16px / 行高 1.8，标题走白→灰白的 `.text-sheen` 微金属渐变

## Colors

一个近黑的中性灰蓝底，配一支高饱和青；没有第二色相，彩色只作为「当前/归类/进度」的信号。

### Primary
- **Signal Cyan** (#1cd0fd, `--theme`): 唯一的强调色。用于当前导航项（文字 + 20% 底色）、分类链接、列表行悬停时的左侧 1px 竖线、阅读进度条、正文内链接。绝不做大面积填充或发光。
- **Signal Cyan Soft** (#90e8fe, `--accent`): 正文链接与强调文字在悬停时的提亮档，避免纯青在小字号上过度振动。
- **Signal Cyan Link** (#47d2f5, `--link`): `.prose-post` 内文字链接的常态色。
- **Reading Halo** (#1cd0fd1f, 12%): 页面顶部主光，椭圆 70%×52% 起于 `50% -10%`，向外淡出到 62%。
- **Halo Wash** (#1cd0fd0e, 5.5%): 同一色相的宽幅二次晕，椭圆 120%×85% 起于 `50% -25%`，淡出到 70%，用来接住主光、避免上半屏出现硬切。
- **Vignette** (#080a0b99, 60%): 四角暗角，`ellipse 100% 88% at 50% 42%`，36% 以内完全透明，向边缘压暗至 60%。属于黑色，不是彩色。

### Neutral
- **Ink** (#0f1214, `--background`): 页面底色，也是列表行悬停前的表面。
- **Chrome** (#121417, `hsl(210 14% 8%)`): 顶部导航与 footer 的实心外壳，比页面亮一档并带 1px 下线。
- **Smoked Surface** (#161a1d, `--surface`): hero、文章容器等浮层面板。
- **Wash** (#ffffff06, 2.5% 白): 唯一允许的悬停填充；行悬停即此色，不再加其它效果。
- **Hairline** (#ffffff12, 白 7%): 浮层面板与卡片的 1px 边框。
- **Hairline Structural** (#a6b8c914, `--border`) 与 **Hairline Strong** (#a6b8c929, `--border-strong`): 导航外壳、正文分隔、代码块与表格的线条。
- **Block Fill** (#a6b8c914, `--block`): 行内代码、引用块、表头的 8% 蓝灰填充。
- **Code Text** (#95d5e5, `hsl(192 60% 74%)`): 行内代码与代码块内文字的青色族柔化档。
- **Text Ladder**: #ffffff 标题 · #ffffffe6 列表标题 · #ffffffcc 长文正文 (`--text-p1`) · #ffffffb3 次要 (`--text-p2`) · #ffffff8c 面板副标题与文章元信息 · #ffffff80 元信息/标签下限 (`--text-p3`) · #ffffff66 弱化 (`--text-p4`，仅装饰) · #ffffff59 分隔符伪元素。文字类下限为 80（50% 白，4.5:1 以上），66 与 59 只允许出现在非信息元素上。

### Named Rules
**The One Voice Rule.** 青色只用于「当前位置 / 分类归属 / 阅读进度」这三种信号，任何一屏的青色面积不超过 10%。它的稀有就是它的分量。

**The Ambient Field Rule.** 背景氛围光（`.sitebg`）是唯一允许多色相的层，由两支持续运动的光组成：五向布光层（青主光 / 靛青 / 青绿 / 暖光 / 淡青，`sitebg-drift` 26s 大幅漂移 + 旋转缩放）与 conic 光环层（`.sitebg-aurora`，`sitebg-spin` 40s 整圈旋转 + `sitebg-hue` 12s 色相 ±60° 往复）；最上层压静止的暗角与颗粒纹理收束视线。全部走 GPU transform/filter，实测满帧；`prefers-reduced-motion` 下全部静止。所有色相 alpha ≤ 0.12，只做环境不参与信息编码；前景与 UI 仍然只认青色族。

**The No Second Hue Rule.** 前景与 UI（文字、边框、强调、链接、图标）除青色族外不引入任何色相：没有紫色、橙色、靛蓝。正文内代码与链接也落在青色族或中性灰里。氛围光四色相只属于背景层（见 Ambient Field Rule）。

## Typography

**Display Font:** 系统无衬线栈（system-ui → PingFang SC / Microsoft YaHei）
**Body Font:** 同上
**Mono Font:** ui-monospace → JetBrains Mono → Menlo / Consolas

**Character:** 一套字承担阅读，一套等宽只承担代码与数字。无衬线栈刻意留给系统渲染，中文优先拾取苹方/微软雅黑，观感「像系统应用而不像宣传页」。

### Hierarchy
- **Display** (600, 2.85rem / 45.6px, 1.15, -0.025em): 首页标题。桌面端唯一一次大字号，配 `.text-sheen` 白→74% 白的纵向渐变。
- **Headline** (600, 2.1rem / 33.6px, 1.2, -0.025em): 列表页与文章页标题（文章页 2.2rem / 35.2px）。
- **Title** (500, 17px, 1.375): 列表行标题；悬停时从 `text-white/90` 提到纯白。
- **Body** (400, 16px, 1.8): `.prose-post` 正文，颜色 `--text-p1`；段落行宽由 `max-w-3xl` 容器（768px）隐含限制。
- **Label** (500, 10px, 0.3em, uppercase): eyebrow，如 `WRITEUP`、`WRITING`；色 `text-white/50`。
- **Meta** (400, 11px, tabular-nums): 日期、计数、`共 N 篇`、缩略描述 13.5px / 1.6。
- **Mono** (400, 14px, 1.6): 代码块；行内代码 0.875em、`--block` 底、1px `--block-border` 边、4px 圆角、颜色 `code-text` (#95d5e5)。
- **Prose Heading** (700, 1.6rem / 1.35rem / 1.15rem, 1.3): Markdown `h1/h2/h3`，白色实色，仅 `h1` 带一条下方发丝线。
- **Headline Mobile** (600, 1.9rem, 1.2): 文章标题在 <640px 的降级档；列表标题降级到 `text-3xl` (1.875rem)。
- **Body SM** (400, 15px, 1.7): 面板副标题与简介段。
- **Meta SM** (400, 12px, 1.5): 文章页元信息行（作者 / 日期 / 分类）。

### Named Rules
**The Two-Job Rule.** 无衬线只负责阅读，等宽只负责代码与数字。不用等宽做装饰性标题，不用无衬线做代码。

**The Small Label Rule.** 一切 eyebrow 固定在 10px / 字距 0.3em / 大写 / 50% 白，永远不承担正文信息。

**The Readable Floor Rule.** 任何承载信息的文字不低于 50% 白（#161a1d 上 5.2:1、#0f1214 上 5.3:1）；40% 与 35% 仅允许用于装饰性分隔符、列表序号与分隔线。

## Layout

三条中轴：阅读列表页（文章列表、标签、分类、归档）为 `max-w-3xl`（768px）；首页为 `max-w-[912px]`（内容 880px），宽视口下两侧留白随视口增大（1280 时各约 200px），保持阅览室的克制度；文章页与 `/posts/` 列表页正文仍是 768px 不变，≥1200px 时左右各挂一栏 200px（`mainClass` 放宽到 1264px 容器，均 sticky）：文章页左 = 全站文章概览（按时间倒序，当前篇青色高亮，超长内部滚动）、右 = 文章目录；列表页左 = 全站分类（按文章数降序）、右 = 标签云（前 12 个，按文章数降序，带计数）。首页放宽时导航与页脚同步放宽（`PageLayout` 的 `wide`）保持边缘对齐；文章页三栏与顶栏同轴居中，顶栏宽度不变（MDN/Tailwind docs 模式）。左右内边距 16px（`px-4`）；导航高 58px（`h-14` + 1px 边框）吸顶。

首页索引区是 CSS 多列瀑布流：`column-count: 1` → 2 列（≥640px）→ 3 列（≥1024px），`gap: 16px`，卡片 `break-inside: avoid` + 下边距 16px；三列时每卡约 283px，两列约 432px。文章不足 3 篇降为两列、不足 2 篇降为单列全宽，避免出现空列。多列布局下视觉顺序按列，DOM 顺序仍按时间倒序，屏幕阅读器与键盘按 DOM 走。

浮层面板内部节奏：hero 桌面 `px-10 py-14`、移动 `px-6 py-12`；列表 hero `px-9 py-11`；文章容器 `px-9 pb-9 pt-8`（移动 `px-6`）。区块之间固定 40px（`mt-10`），列表行 `px-3 py-6` 并向外溢出 12px 让悬停底色贴到容器边缘而不碰到视口边缘。

统计条不使用卡片：`border-t` 一条发丝线下面直接排 `dl`，数字 20px `tabular-nums`，标签 11px / 50% 白，`最近更新` 靠右（`ml-auto`）。

响应式只有两档：`sm` (640px) 放开面板内边距与标题字号（display 45.6 → 桌面；移动端 36px 由 `text-4xl` 承接），其余尺寸沿用。移动端实测 375px 宽无横向溢出。

## Elevation & Depth

**平面分层（flat），无阴影、无模糊。** 整站不出现 `box-shadow`，也不出现 `backdrop-filter` 或玻璃拟态；深度只由三档表面亮度差 + 1px 线条表达：页面 #0f1214 → 导航外壳 #121417 → 浮层面板 #161a1d。面板置于页面之上时，靠 16px 圆角与白 7% 边框把它「抬」起来，而不是靠投影。

唯一的"光"是背景顶部两层青晕与四角暗角，以及 hero 面板内部同款 8–10% 的椭圆径向渐变；它们属于氛围，不属于层级。

### Shadow Vocabulary
- 无。任何需要强调的层次改用：边框提亮（白 7% → 白 15%）、填充 2.5% 白、或文字从 80% 白提到 100% 白。

### Named Rules
**The Flat-By-Default Rule.** 表面在静止态永远平面；层次 = 亮度档位 + 发丝线，不引入投影或模糊。

**The One Halo Rule.** 背景彩色只允许出现在页面顶部（主光 + 同色相宽幅二次晕，合计不超过两个渐变层），从顶部向下消散；页面其余部分保持近纯黑，滚动到文章中部时不应再看到彩色。四角暗角用黑色压暗边缘，不计入彩色。

## Shapes

圆角按"物体大小"分五档：行内元素 4px（行内代码、分隔符）、控件 6px（导航项）、块 8px（图片、引用块、代码块、列表行悬停层）、小卡片 12px（首页索引卡、上一页/下一页卡片）、浮层 16px（hero、文章容器）。没有全圆角（9999px）的容器——标签在列表页里也不是药丸形，而是纯文字链接。

线条承担全部形状语言：1px 贯穿，颜色在 7% 与 8% 白之间；只有悬停时才允许升到 15%（`hover:border-white/15`）。不使用虚线边框、不使用粗边框、不使用双线。

## Components

### Navigation
- **Shape:** 吸顶实心条，6px 圆角导航项（`px-2.5 py-1.5`），底部 1px `--border` 线。
- **Default:** 14px 文字，`--text-p3`（50% 白）。
- **Hover:** 文字提到纯白 + `--block` 8% 填充，无位移。
- **Active:** 20% 青底 (#1cd0fd33) + `--theme` 青字 + medium 字重。

### Panels (hero / article container)
- **Corner Style:** 16px。
- **Background:** `--surface` #161a1d（平面，无模糊）。
- **Border:** 1px 白 7%。
- **Internal Padding:** 桌面 40px，移动 24px。
- **Decoration:** 一层 64px（列表 hero 56px）网格，白 10–12% 不透明度，顶部椭圆遮罩淡出；网格是被"读"到的，不是被"看"到的。

### List Row
- **Shape:** 无卡片。`ul` 用 `divide-y` (白 6%) 与上下 `border-y` 划出书架线，行内 8px 圆角悬停层。
- **Hover:** 仅 `background: #ffffff06` + 左侧 1px 竖线从透明升到 `cyan-300/45` + 标题变纯白。
- **In-row meta:** 分类 11px 青色 `cyan-200/55`（5.1:1）；标签 11px `#tag`、50% 白；日期 11px `tabular-nums`、50% 白。

### Index Card (home masonry)
- **Shape:** 12px 圆角（`overflow: hidden` 裁剪封面）、1px 白 7% 边框、`--surface` #161a1d 实心底、内容区 20px 内边距；卡片之间只有 16px 间距，不叠阴影。
- **Cover（可选）:** front-matter 写了 `cover` 就渲染 16:9 封面（`aspect-[16/9] object-cover`），贴住卡片上边缘与左右边缘、下方 1px 发丝线分隔；没写就是纯文字卡。站内路径与图床直链都可以，`alt` 留空（标题链接已表达内容）。
- **Anatomy:** 分类眉标 10px / 0.28em（最多两个）→ 标题 17px / 500 / 90% 白 → 摘要 13.5px / 50% 白、最多三行（`line-clamp-3`）→ 底部 meta 行（日期 11px `tabular-nums` + 最多三个 `#标签`，均 50% 白）。只有一格内容的卡片靠 `mt-auto` 把 meta 行压到卡底，同一行卡片底部对齐。
- **Height:** 由「有无封面」与「摘要行数（1–3 行）」共同决定 —— 有图卡约 345px、纯文字卡约 104–145px，这正是瀑布流参差的来源；不写死高度、不做等高拉伸。
- **Hover / Focus:** 边框升到白 15%，标题变纯白，无位移、无缩放、无阴影。
- **Click model:** 标题链接用 `after:absolute after:inset-0` 铺满整张卡；标签行 `relative z-20` 浮在其上，保证标签仍可单独点击。

### Article Side Rails (≥1200px)
- **Left rail:** 200px；「全部文章」眉标（10px / 0.3em / 50% 白）+ 篇数，下面是按时间倒序的全站文章列表（当前篇 `text-cyan-200 font-medium` + `aria-current="page"`，其余 50% 白悬停 80%），列表最高 `calc(100vh - 12rem)` 内部滚动。sticky top-20。
- **Right rail:** 200px 目录，条目直接来自 markdown 的 `#` / `##` / `###`（h1–h3）；条目 13.5px（三级 12px），左缘 1px 白 8% 轨道线，缩进每级 12px；当前小节 `border-cyan-300/60 text-cyan-200 font-medium`，其余 50% 白。滚动高亮由 rAF 节流的滚动计算驱动（island `Toc.tsx`，按「最后一个越过阅读线的标题」判定，长目录自动内部滚动跟随）。sticky top-20。
- **缺席行为：** <1200px 两栏隐藏，正文回到 768px 单栏；文章无 h2/h3 时右栏不渲染。

### Tag / Category Links
- **Style:** 无底色、无边框的纯文字链接（列表行）；分类页与标签页保留 8% 填充 + 全圆角计数胶囊（历史页面，未随博客三页统一）。
- **State:** 常态 50% 白 / 分类 `cyan-200/55`；hover 时分类变亮到 `cyan-100`，标签提到 80% 白。

### Prev / Next Cards
- **Shape:** 12px 圆角、1px 白 7% 边框、`--ink` 底、16px 内边距，桌面两列（`sm:grid-cols-2`，上一篇靠右列）。
- **Label:** 10px / 0.28em 大写的 `上一篇 / 下一篇`，50% 白；标题 14–15px（70% 白，悬停纯白）。
- **Hover:** 边框升到白 15% + 2.5% 白填充。

### Reading Progress
- **Style:** 1px 高、`cyan-300/60`、固定在视口顶部的进度条，`scaleX` 由滚动进度驱动（`useSpring` stiffness 120 / damping 24）。
- **Behavior:** 仅在文章页挂载；prefers-reduced-motion 下不播放渐入动画。

### Eyebrow / Meta Separator
- **Eyebrow:** 10px 大写 0.3em、50% 白，前导 4px 青点（首页）。
- **Meta separator:** `.meta-sep::before { content: '·'; }`，35% 白（装饰元素，不承载信息），10px 右间距；不使用 `|` 或 `—`。

## Do's and Don'ts

### Do:
- **Do** 用三档亮度做层次：#0f1214 页面、#121417 导航外壳、#161a1d 浮层面板；同一屏最多出现这三档。
- **Do** 用 1px 发丝线（白 7% / 蓝灰 8%）划分所有边界，悬停最多升到白 15%。
- **Do** 把青色限制在导航当前项、分类链接、行悬停竖线、阅读进度四处。
- **Do** 数字一律 `tabular-nums`，日期与大写标签 11px，eyebrow 10px / 0.3em。
- **Do** 保证信息文字的对比度 ≥ 4.5:1（深色底上即 ≥50% 白）；装饰性分隔符与序号可降到 35–40%。
- **Do** 正文保持 16px / 1.8，段落宽度落在 768px 容器内；长代码行允许 `overflow-x` 横向滚动。
- **Do** 引用块用 1px `--border-strong` 左线 + `--block` 填充表达，不用粗色条。
- **Do** 在 `prefers-reduced-motion: reduce` 下关闭 `.reveal` 与所有入场动画。
- **Do** 声明 `backdrop-filter` 时只写无前缀版本：本仓构建链（lightningcss）遇到 `-webkit-backdrop-filter` 重复声明时会保留带前缀那条并丢掉无前缀那条，而 Chromium 不认 `-webkit-backdrop-filter` 的 `CSS.supports`，效果会静默失效。

### Don't:
- **Don't** 使用 `box-shadow`、`backdrop-filter` 或玻璃拟态：平面是本系统的身份，不是省钱。
- **Don't** 引入第二色相（紫、橙、靛蓝）；历史 `--accent: hsl(14 100% 57%)` 与 `--link: hsl(207 90% 54%)` 已并入青色族。
- **Don't** 用彩色渐变字或虹彩标题：标题渐变只能是 `.text-sheen` 的白 → 74% 白。
- **Don't** 在悬停时改变几何（位移、缩放）：`motion.div` 会写入内联 `transform`，Tailwind 的 `hover:-translate-y-*` 永远不会生效。
- **Don't** 把列表页做成卡片墙：`/posts/` 是书架（发丝线清单），卡片墙只允许出现在首页的索引卡区。
- **Don't** 用大于 16px 的圆角做容器，也不要用全圆角容器（药丸只允许出现在标签页的计数胶囊上）。
