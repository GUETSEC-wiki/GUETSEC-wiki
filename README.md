# GUETSEC-wiki

GUETSEC 队内知识库，同时对外展示。基于 [Astro](https://astro.build) 的静态站点，线上地址 <https://wiki.guetsec.cn>。

这份 README 只讲两件事：**怎么在本地跑起来**、**怎么发一篇文章 / 一张图**。要改代码看 [`docs/`](docs/README.md)。

---

## 一、本地跑起来

### 环境要求

| 依赖 | 版本 | 说明 |
| --- | --- | --- |
| Node.js | **≥ 22.23.4** | Astro 7 的硬性要求，低于这个版本装不上 |
| npm | ≥ 9.6.5 | 随 Node 一起装 |

```bash
node -v   # 确认版本
```

### 安装与启动

```bash
git clone git@github.com:GUETSEC-wiki/GUETSEC-wiki.git
cd GUETSEC-wiki
npm install
npm run dev          # 打开 http://localhost:4321
```

改文件即时热更新，不用重启。

### 构建与预览

```bash
npm run build        # 生成静态产物到 dist/
npm run preview      # 用 dist/ 起一个本地服务
```

只写文章时 `npm run dev` 就够；**改了组件、样式、配置后建议再跑一次 `npm run build`**——dev 能渲染不代表构建能过，构建失败会挡住发布。

### 常见问题

- **端口被占**：`npm run dev -- --port 4322`。Astro 起过 preview 之后再换端口不会真的重启，先 `lsof -ti tcp:4321 | xargs -r kill -9`。
- **改了没反应 / 样式错乱**：删掉缓存再装一遍 `npm run clean && npm install`（`clean` 会删 `dist/`、`.astro/`、`node_modules/.astro/`）。
- **构建报 `Unterminated regular expression`**：`.astro` 模板里不要写裸 `/` 当分隔符，用 CSS 伪元素代替。

---

## 二、发一篇文章

### 1. 新建文件

在 `src/content/posts/` 下新建 `<slug>.md`，**文件名就是 URL**：

```
src/content/posts/my-writeup.md  →  https://wiki.guetsec.cn/posts/my-writeup/
```

文件名只用小写字母、数字和连字符，别用中文和空格。

### 2. 写 front-matter

```yaml
---
title: 菜狗杯 WP
author: Yunxi
description: CTFshow 菜狗杯的 WriteUp
cover: https://cdn.jsdelivr.net/gh/GUETSEC-wiki/Wiki_Photo@main/blog/Archback.png
date: 2025-09-30
tags: [CTF, Web, CTFshow]
categories: [CTFshow]
toc: true
---
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | **是** | 文章标题，列表、卡片、浏览器标签都用它 |
| `date` | 建议 | `2025-09-30`。决定列表排序、首页「最近更新」和 sitemap 的 lastmod |
| `author` | 否 | 默认 `GUETSEC` |
| `description` | 否 | 一句话摘要，显示在列表和首页卡片上 |
| `cover` | 否 | 首页瀑布流封面，16:9 最佳，填图床 URL（见下一节） |
| `tags` | 否 | `[CTF, Web]`，进标签页、卡片标签、列表页右栏 |
| `categories` | 否 | `[CTFshow]`，决定分类页与文章页左栏归属 |
| `toc` | 否 | 默认 `true`，控制右栏目录开关 |
| `draft` | 否 | `true` 为草稿：不生成页面、不进 sitemap、不参与统计 |

> **最容易踩的坑**：front-matter 必须夹在文件开头的那一对 `---` 之间。把 `date` 写到第二个 `---` 之后，它不会报错，而是变成正文里的一行文字，同时文章在所有页面都变成「无日期」、sitemap 也没有 lastmod。保存前扫一眼前后两个 `---`。

### 3. 写正文

就是普通 Markdown。`#` / `##` / `###` 标题会自动进文章页右栏目录（宽屏 ≥1200px 显示），滚动时高亮当前小节。

### 4. 本地看一眼

```bash
npm run dev   # 首页、/posts/、文章页都过一遍
```

### 5. 提交

```bash
git add src/content/posts/
git commit -m "文章：菜狗杯 WP"
git push
```

---

## 三、图片与图床

本站仓库**不放图片**。图片统一进独立仓库 `GUETSEC-wiki/Wiki_Photo` 的 `blog/` 目录，用 jsDelivr 免费 CDN 外链引用。

### 引用格式

```
https://cdn.jsdelivr.net/gh/GUETSEC-wiki/Wiki_Photo@main/blog/<文件名>
```

文章里封面、正文插图都用这个前缀：

```markdown
![架构图](https://cdn.jsdelivr.net/gh/GUETSEC-wiki/Wiki_Photo@main/blog/arch.webp)
```

### 上传流程

```bash
# 1. 先按用途出图（见下方尺寸表），别直接扔原图
magick 原图.png -resize '1600x900^' -gravity center -extent 1600x900 -quality 82 封面.webp

# 2. 放进图床仓库
cp 封面.webp ~/WorkSpace/www/Wiki_Photo/blog/

# 3. 提交并推送，push 之后 CDN 才拿得到
cd ~/WorkSpace/www/Wiki_Photo
git add blog/封面.webp && git commit -m "新增封面 封面.webp" && git push
```

推送完用 `curl -I` 确认返回 200 再写进文章。

### 尺寸建议

| 用途 | 尺寸 | 参考体积 |
| --- | --- | --- |
| 首页卡片封面 | 1600×900 WebP | ~12 KB |
| 正文大图 | 宽 1200–1600 WebP | ~30–80 KB |
| 原始素材 | 随便存，别直接引用 | 4480×2800 PNG ≈ 485 KB，首屏要等 2 秒 |

同样一张图，原图 PNG 和 1600×900 WebP 差 40 倍。**封面一定出派生图再传**。

### 两个坑

- **图还没 push 就写进文章**：CDN 返回 404，`<img>` 不会报错，卡片只剩一个 16:9 空占位。先推图床，再推文章。
- **`@main` 还是 `@commit`**：`@main` 跟着分支走，改图立刻生效（jsDelivr 缓存约 12 小时）；要永久不可变就用 commit 短哈希，如 `@cb8b8a5`。文章封面建议 `@main`，长期引用建议哈希。

---

## 四、想改代码

技术栈、目录结构、组件与动效、设计系统、SEO 细节都在开发文档里：

**→ [`docs/README.md`](docs/README.md)**

根目录还有两份规范文档，改视觉或产品定位前先读：

- [`DESIGN.md`](DESIGN.md) —— 设计系统 token 与规则（机器可读部分在 `.impeccable/design.json`）
- [`PRODUCT.md`](PRODUCT.md) —— 站点定位、内容原则、未决事项
