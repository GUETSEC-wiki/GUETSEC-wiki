# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **现役队员（主要）**：GUETSEC 战队成员。赛后把解题过程沉淀下来，备赛/比赛中回来查「这场这题当时怎么做的」，也会按方向（Web / Pwn / Crypto / Reverse / Misc）系统补知识。
- **队外读者**：其他 CTF 选手、安全学习者、潜在新人。通过内容判断团队水平与风格，决定是否关注或加入。
- 两类读者并重：同一批内容既要能被队员快速检索，也要在陌生人眼里显得专业可信。

## Product Purpose

GUETSEC 战队的公开技术知识库：把真实参赛的 writeup 与技术笔记沉淀成**可检索、可按类别成体系阅读**的资料库，同时充当团队对外的技术名片。

成功的样子：队员在 30 秒内定位到某道题的解法、或某个方向的系统入口；外部读者一眼看到持续产出、有细节、不注水的真实内容。

## Positioning

不是通用安全资讯站或题目合集，而是**这个战队亲自打过的比赛的完整过程记录**：每篇对应真实赛题、真实解题路径与真实踩坑，覆盖 Web/Pwn/Crypto/Reverse/Misc 全方向，中文写作。别处无法真实复制的是「我们自己的赛场经验」。

## Operating Context

- 写作方式：Markdown + front-matter（`title` / `author` / `description` / `date` / `tags` / `categories` / `toc` / `draft`），文件放在 `src/content/posts/`，**文件名即 URL slug**。
- 图片来源：自建图床 `gitea.guetsec.cn` 外链，不把图片放进仓库（历史上曾用 GitHub 图床，因显示问题迁至自建）。
- 构建与分发：Astro 静态输出到 `dist/`；`/rss.xml` 与 `/sitemap-index.xml` 属于既有对外通道。
- 阅读场景：桌面为主（查题解、读长文），现场赛与碎片时间会用手机看，窄屏必须可用。
- 历史脉络：站点由 Hexo 迁移而来，旧站文章计划**全量迁回**。

## Capabilities and Constraints

- 已有能力：文章列表 / 详情、分类页、标签页、按年归档、RSS、sitemap、深色主题、代码高亮。
- 内容规模约束：将从个位数增长到**几十至上百篇**，导航必须靠 `categories` / `tags` 组织，不依赖首页手工策展。
- 作者约束：多人共同提交（历史提交者 3 人），每篇作者信息以 front-matter 为准。
- 技术约束：纯静态站（无服务端、无数据库），仅深色主题。
- 未决（不要臆断）：是否引入站内搜索（待内容上量后评估）；部署方式与自动构建流程；旧 Hexo 文章源文件位置与迁移脚本；旧站引导文（如「新人必看」）是否重建。

## Brand Commitments

- 名称：GUETSEC / GUETSEC Wiki；默认作者 `GUETSEC`，实际作者写在 front-matter（如 Yunxi）。
- 语气：中文、技术直述、不营销、不喊话。
- 视觉既有承诺：深色 only，自「深色 only + 类亚克力渐变背景」起确立；不做浅色主题。

## Evidence on Hand

- `src/content/posts/caigou-cup-writeup.md`：CTFshow 菜狗杯完整 WP（约 5.7KB），是当前唯一文章，也是排版与代码块样式的真实基准。
- `public/images/avatar.png`：站点标识；`public/images/sidebar-bg1.jpg`、`public/images/site-bg1.webp`：背景素材。
- 线上域名 `wiki.guetsec.cn`（本地环境当前不可达，未验证其现状）。
- **不存在、且不得虚构**：团队战绩数字、成员名单、赞助方/认证、媒体报道、用户评价。

## Product Principles

1. **先解决「找到答案」**：任何入口都要让目标文章或目标分类在两三次点击内到达。
2. **真实优先于体量**：宁可少，不编造战绩、靶场结论或引用。
3. **队员写得动**：front-matter + 文件名即 slug + 图床外链的投稿流程保持低摩擦，不为视觉改造增加写作成本。
4. **分类承担导航**：内容上量后靠 categories / tags 组织与串联，不靠首页人工精选。
5. **专业度而非音量**：对外展示靠信息密度、可读性与克制的界面，而不是动效和口号。

## Accessibility & Inclusion

- 文字对比度按 WCAG AA 执行：任何承载信息的文字在深色底上不低于 4.5:1（约 50% 白），装饰性分隔符与序号可低至 35%。
- 真实内容约束：中文正文与代码块混排、长代码行必须可横向滚动而不折断、键盘可完成导航与上下篇跳转。
- 动效在 `prefers-reduced-motion: reduce` 下关闭。
