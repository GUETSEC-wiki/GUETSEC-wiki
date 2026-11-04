# GUETSEC-wiki

GUETSEC 团队知识库，基于 [Astro](https://astro.build) 构建的静态站点。

## 技术栈

- **框架**：Astro 7（静态输出）
- **样式**：Tailwind CSS 4（通过 `@tailwindcss/vite` 插件），仅深色主题
- **交互/动效**：React 19 islands（`@astrojs/react`）+ [Magic UI](https://magicui.design) 组件 + Motion
- **代码高亮**：Shiki（light/dark 双主题，构建时锁定深色）
- **内容**：Astro Content Collections（`src/content/posts/`，schema 见 `src/content.config.ts`）
- **附加**：RSS（`/rss.xml`）、Sitemap（`/sitemap-index.xml`）、`public/robots.txt`

## 交互组件

博客核心页（首页、文章列表、文章详情）由 React island + Magic UI 组件构成，位于 `src/components/`：

- `magicui/`：Magic UI 组件移植版。当前页面使用 `grid-pattern`（微弱背景网格）、`blur-fade`（内容入场）、`scroll-progress`（阅读进度）；`meteors`、`sparkles-text`、`magic-card`、`number-ticker`、`border-beam`、`shine-border`、`animated-shiny-text` 也一并移植，供后续单独采用。动效 keyframes 定义在 `src/styles/global.css` 的 `@theme`。
- `blog/`：页面级组合组件（`Hero.tsx` 中的 `HomeHero` / `ListHero`，`PostMasonry.tsx` 首页瀑布流索引卡，`PostGrid.tsx` 文章列表）。

视觉基调：近纯黑底色（`#0f1214`）+ 顶部两层青晕与四角暗角、平面分层（无阴影、无 backdrop-filter）、单一青蓝强调色（`#1cd0fd`）、1px 发丝线与分级圆角，标题使用 `.text-sheen` 微金属渐变；信息类文字对比度不低于 4.5:1（约 50% 白），更暗的档位只用于分隔符等装饰元素。完整设计系统见 `DESIGN.md`（机器可读 token 在 frontmatter，细节扩展在 `.impeccable/design.json`），产品事实见 `PRODUCT.md`。

React 组件以 island 形式挂载（`client:load` / `client:visible`），Markdown 正文仍为静态 HTML，不做 hydration。工具函数见 `src/lib/utils.ts`（`cn`）与 `src/lib/posts.ts`（文章排序、日期格式化、列表数据）。

所有动画在 `prefers-reduced-motion: reduce` 下自动关闭。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（默认 http://localhost:4321）
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 站点地图与抓取

- `@astrojs/sitemap` 在构建时生成 `sitemap-index.xml` + `sitemap-0.xml`，`BaseLayout` 里已声明 `<link rel="sitemap">`，`public/robots.txt` 指向索引文件。
- 文章页会带上 `lastmod`：`astro.config.mjs` 在构建期扫描 `src/content/posts/` 的 front-matter 取 `date`，`serialize` 钩子只给文章 URL 补这个字段，列表页与归档页不伪造时间。
- 草稿（`draft: true`）既不会生成页面路由（`getStaticPaths` 过滤），也不会进入 sitemap（同一扫描里跳过）。
- `site` 必须是正式域名，sitemap 里的绝对 URL 全部由它推导。

## 写文章

> 文章页在宽屏（≥1200px）两侧自动挂栏：左侧是全站分类与同分类文章导航，右侧是本文目录（滚动高亮），正文宽度不变；窄屏两栏隐藏。front-matter 里的 `toc: true` 控制是否渲染目录。

在 `src/content/posts/` 下新建 Markdown 文件，Front-matter 示例：

```yaml
---
title: 文章标题
author: Yunxi
description: 一句话摘要
cover: /images/cover.webp   # 可选，首页瀑布流封面（16:9 最佳，也支持图床直链）
date: 2025-09-30
tags: [CTF, Web]
categories: [CTFshow]
toc: true
---
```

文件名即 URL slug：`my-writeup.md` → `/posts/my-writeup/`。

### 图片与图床

图片放在独立仓库 `GUETSEC-wiki/Wiki_Photo` 的 `blog/` 目录下，通过 jsDelivr CDN 外链引用，本站仓库不存图片：

```yaml
cover: https://cdn.jsdelivr.net/gh/GUETSEC-wiki/Wiki_Photo@main/blog/Archback.png
```

- 写入图床仓库并 push 后即可用；`@main` 跟随分支（jsDelivr 缓存约 12 小时），需要永久不可变就改成 commit 短哈希，如 `@cb8b8a5`。
- 正文内插图同理，用同一个 CDN 前缀。
- 封面按卡片尺寸出图，不要直接传原图：原图 4480×2800 PNG 约 485KB、首屏加载近 2 秒，而同样画面导成 1600×900 WebP 只要约 12KB。出图命令：`magick 原图.png -resize '1600x900^' -gravity center -extent 1600x900 -quality 82 封面.webp`
- 图片路径写错或仓库还没 push 时，`<img>` 会静默加载失败（卡片保留 16:9 占位），检查 CDN 是否返回 200。

## 目录结构

```
src/
├── components/    # Header / Footer / blog（页面组合）/ magicui（Magic UI 组件）
├── content/       # 文章（posts collection）
├── content.config.ts  # 内容集合 schema
├── layouts/       # BaseLayout / PageLayout
├── lib/           # cn 工具、文章查询与格式化
├── pages/         # 路由（首页/文章/标签/分类/归档/RSS）
└── styles/        # 全局样式、@theme 动效与文章排版
```
