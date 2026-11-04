# 设计系统速查

完整规范看 [`DESIGN.md`](../DESIGN.md)（token 在 frontmatter，机器可读细节在 [`.impeccable/design.json`](../.impeccable/design.json)）。这里只给改代码时最常查的那几张表。

**动手改视觉之前先读 DESIGN.md 的 Overview 与 Named Rules** —— 那几条规则是判断「这样改对不对」的依据，不是风格建议。

## 一句话定位

深色阅览室（The Reading Room）：近乎全黑的房间，唯一的光是 `.sitebg` 那层缓慢流动的氛围光；界面元素退到 1px 发丝线里，青色只标记「你现在在哪」。整站只有深色，不做浅色版本。

## 颜色

| Token | 值 | 用途 |
| --- | --- | --- |
| `--background` / ink | `hsl(210 14% 7%)` = `#0f1214` | 页面底色 |
| `--surface` | `hsl(210 14% 10%)` = `#161a1d` | 浮层面板、卡片 |
| chrome | `#121417` | 导航外壳（`.chrome`） |
| `--border` / hairline | `#ffffff12`（白 7%） | 所有 1px 边界 |
| `--accent` | `#1cd0fd` | 当前位置 / 分类归属 / 阅读进度 |
| `--link` | `#47d2f5` | 正文链接 |
| code-text | `#95d5e5` | 行内代码 |

文字阶梯（白的不透明度）：`text` 100% → `text-strong` 90% → `text-body` 80% → `text-muted` 70% → `text-quiet` **50%（信息文字下限）** → `text-ghost` 35%（仅装饰）。

**The Readable Floor Rule**：任何承载信息的文字 ≥ 50% 白（`#161a1d` 上 5.2:1、`#0f1214` 上 5.3:1）。40% / 35% 只允许给分隔符、序号、分隔线。因为 25%–45% 全被抬到 50% 附近，**层级不能再靠透明度，要靠字号、字重和字距**。

**The No Second Hue Rule**：前景与 UI 除青色族外不引入任何色相。四个色相（青 / 靛青 / 青绿 / 暖光）只属于 `.sitebg` 背景层。

## 字体

| 角色 | 规格 | 用在哪 |
| --- | --- | --- |
| display | 2.85rem / 600 / 1.15 / -0.025em | 首页 h1（`.text-sheen` 渐变） |
| headline | 2.1rem / 600 / 1.2 | 列表页 h1 |
| headline-article | 2.2rem（移动 1.9rem） / 600 | 文章 h1 |
| title | 17px / 500 / 1.375 | 卡片与列表行标题 |
| body | 16px / 400 / 1.8 | 正文 |
| body-sm | 15px | hero 副标题 |
| label | 10px / 500 / **0.3em** / 大写 / 50% 白 | 一切 eyebrow |
| meta | 11px、meta-sm 12px | 日期、标签、计数 |
| mono | 14px / 1.6 | 代码与数字 |
| prose-h1/h2/h3 | 1.6 / 1.35 / 1.15rem，700 | 文章内标题（同时进右栏目录） |

**The Two-Job Rule**：无衬线只负责阅读，等宽只负责代码与数字。

## 圆角与间距

圆角按物体大小分五档：`4px` 行内（行内代码、分隔符）· `6px` 控件（导航项）· `8px` 块（图片、引用块、代码块、列表行）· `12px` 小卡片（首页索引卡、上下篇）· `16px` 浮层（hero、文章容器）。**没有全圆角容器**。

间距：4 / 8 / 12 / 16 / 24 / 40px 六档，面板内边距 40px（窄屏 24px），区块之间 40px。

## 层次

平面分层，**全站不出现 `box-shadow`、不出现 `backdrop-filter`**。深度只由三档亮度（`#0f1214` → `#121417` → `#161a1d`）加 1px 线条表达；要强调就提亮边框（白 7% → 15%）或把文字从 80% 白提到 100% 白。

> 声明 `backdrop-filter` 时只写无前缀版本：本项目构建链（lightningcss）遇到 `-webkit-backdrop-filter` 重复声明会保留带前缀那条、丢掉无前缀那条，而 Chromium 不认 `-webkit-` 别名，效果会静默失效。

## 布局轴

| 页面 | 容器 | 说明 |
| --- | --- | --- |
| 首页 | `max-w-[912px]`（内容 880px） | 宽视口下两侧自然留白，1280 时各约 200px；瀑布流 1 → 2（≥640）→ 3（≥1024）列 |
| 阅读页（文章 / `/posts/` / 标签 / 分类 / 归档） | `max-w-3xl`（768px） | 正文测宽；宽屏两侧不撑开 |

文章页与 `/posts/` 在 ≥1200px 时把两侧留白变成 200px 挂栏（`mainClass` 放宽到 1264px 的 grid，正文仍是 768px）；窄屏两栏隐藏。

## 动效

- 入场：`.reveal`（0.5s，上移 8px + 4px 模糊消散），`BlurFade` 用于列表逐个浮现。
- 状态过渡：颜色/边框 300ms；**不在悬停时改变几何**（`motion.div` 会写内联 `transform`，Tailwind 的 `translate-*` 永远不会生效）。
- 背景：`.sitebg::before` 五向布光 26s 漂移、`.sitebg-aurora` 40s 整圈旋转 + 12s 色相往复，均走 GPU。
- 全部动画在 `prefers-reduced-motion: reduce` 下静止。

## 改完怎么验证

```bash
npm run build          # 必须通过
npm run preview &      # 起服务后逐路由检查
```

要看的三件事：**0 横向溢出**（`document.documentElement.scrollWidth - clientWidth`）、**无 console 报错**、**所有信息文字对比度 ≥ 4.5:1**（`.text-sheen` 标题是 `background-clip: text`，`color` 为透明，需要按渐变两端色单独判断）。

视觉改动完成后跑一次设计审查：

```bash
.pi/skills/impeccable/scripts/impeccable detect --json <改动过的文件>
```

已知的唯一白名单告警是 `.text-sheen` 的 gradient-text —— 它是单色白 98% → 74%，是本系统允许的唯一文字渐变。
