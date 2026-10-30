# GUETSEC-wiki

GUETSEC 团队知识库，基于 [Astro](https://astro.build) 构建的静态站点。

## 技术栈

- **框架**：Astro 7（静态输出）
- **样式**：Tailwind CSS 4（通过 `@tailwindcss/vite` 插件）
- **代码高亮**：Shiki（light/dark 双主题）
- **内容**：Astro Content Collections（`src/content/posts/`，schema 见 `src/content.config.ts`）
- **附加**：RSS（`/rss.xml`）、Sitemap（`/sitemap-index.xml`）

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（默认 http://localhost:4321）
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 写文章

在 `src/content/posts/` 下新建 Markdown 文件，Front-matter 示例：

```yaml
---
title: 文章标题
author: Yunxi
description: 一句话摘要
date: 2025-09-30
tags: [CTF, Web]
categories: [CTFshow]
toc: true
---
```

文件名即 URL slug：`my-writeup.md` → `/posts/my-writeup/`。

图片使用自建图床（gitea.guetsec.cn）外链，无需放入仓库。

## 目录结构

```
src/
├── components/    # Header / Footer
├── content/       # 文章（posts collection）
├── content.config.ts  # 内容集合 schema
├── layouts/       # BaseLayout / PageLayout
├── pages/         # 路由（首页/文章/标签/分类/归档/RSS）
└── styles/        # 全局样式与文章排版
```
