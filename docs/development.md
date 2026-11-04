# 开发

## 技术栈

| 层 | 选型 | 说明 |
| --- | --- | --- |
| 框架 | Astro 7（`astro@7.4.4`，静态输出） | 要求 Node ≥ 22.23.4、npm ≥ 9.6.5 |
| 样式 | Tailwind CSS 4（`@tailwindcss/vite`） | **没有 `tailwind.config.js`**，token 全在 `src/styles/global.css` 的 `@theme` / `:root` |
| 交互 | React 19 islands（`@astrojs/react`）+ Motion 14 + Magic UI 移植组件 | 只有显式 `client:*` 的组件会加载 JS |
| 代码高亮 | Shiki（light/dark 双主题） | 构建期完成，运行时零开销 |
| 内容 | Content Collections（glob loader） | schema 见 `src/content.config.ts` |
| 附加 | `@astrojs/rss`、`@astrojs/sitemap`、`public/robots.txt` | 见 [seo.md](seo.md) |

没有 SSR、没有后端、没有数据库，也没有类型检查门（未装 `@astrojs/check`，`.astro` 文件走 esbuild/oxc 不做类型校验，`tsconfig.json` 的 strict 只作用于 `.ts`）。**所以 `npm run build` 通过 + 运行时 DOM 验证是唯一的正确性保险。**

## 常用命令

```bash
npm run dev       # 开发服务器，默认 4321
npm run build     # 构建到 dist/
npm run preview   # 用 dist/ 起本地服务
npm run clean     # rm -rf dist .astro node_modules/.astro
```

## 目录结构

```
src/
├── components/
│   ├── Header.astro / Footer.astro     # 全站顶栏与页脚（接收 wide prop 控制宽度）
│   ├── blog/                           # 页面级组合组件（React islands）
│   │   ├── Hero.tsx                    #   HomeHero / ListHero
│   │   ├── PostMasonry.tsx             #   首页瀑布流索引卡
│   │   ├── PostGrid.tsx                #   /posts/ 发丝线列表
│   │   └── Toc.tsx                     #   文章页右栏目录（滚动高亮）
│   └── magicui/                        # Magic UI 组件移植版
├── content/posts/                      # 文章 Markdown（文件名 = slug）
├── content.config.ts                   # 内容集合 schema
├── layouts/
│   ├── BaseLayout.astro                # html head、背景层、全局样式
│   └── PageLayout.astro                # Header + main + Footer，接收 wide / mainClass
├── lib/
│   ├── posts.ts                        # getPosts / toCardData / formatDate
│   └── utils.ts                        # cn()（clsx + tailwind-merge）
├── pages/                              # 路由：首页、posts/、tags/、categories/、archives、rss.xml
└── styles/global.css                   # @theme token、背景层、.chrome、.prose-post、动效 keyframes
public/                                 # robots.txt、头像等静态文件（图片一律走图床）
```

## 构建流程

1. `astro.config.mjs` 里注册 `react()`、`sitemap()`，Vite 插件挂 `tailwindcss()`，Markdown 走 Shiki 双主题。
2. 构建前 `scanPosts()` 扫描 `src/content/posts/**/*.md` 收集每篇的 `date`，交给 sitemap 的 `serialize` 补 lastmod（详见 [seo.md](seo.md)）。
3. 页面静态渲染成 HTML，`client:*` 的 island 输出 `<astro-island>` 包装并附带序列化 props。
4. 产物在 `dist/`，可直接丢到任意静态托管。

## React islands

全站只有六个 island，其余都是静态 HTML：

| 组件 | 挂载方式 | 位置 |
| --- | --- | --- |
| `HomeHero` | `client:load` | 首页首屏 |
| `ListHero` | `client:load` | `/posts/` 首屏 |
| `PostMasonry` | `client:visible` | 首页索引卡区 |
| `PostGrid` | `client:visible` | `/posts/` 列表 |
| `ScrollProgress` | `client:load` | 文章页顶部阅读进度条 |
| `Toc` | `client:load` | 文章页右栏（headings 为空时不渲染） |

写 island 时注意：

- **SSR 内容要是最终值**。`NumberTicker` 这类组件在 SSR 时如果渲染起始值（0），爬虫和禁用 JS 的用户看到的就永远是 0。正确做法是把真实值作为 children，挂载后再从起始值动画。
- **`motion.div` 会写内联 `transform: none`**，覆盖 Tailwind 的 `translate-*` 变换。需要位移反馈时用 border/背景色变化，不要指望 `hover:-translate-y-*`。
- 动效全部在 `prefers-reduced-motion: reduce` 下关闭，新增动画记得沿用这个约束。
- Markdown 正文是纯静态 HTML，不 hydration；交互只能来自 island。

## Magic UI 组件现状

`src/components/magicui/` 是从 [Magic UI](https://magicui.design) registry 移植的版本，实际在用的只有三个：`grid-pattern`（首页极淡网格）、`blur-fade`（内容入场）、`scroll-progress`（阅读进度）。`meteors`、`sparkles-text`、`animated-shiny-text`、`border-beam`、`shine-border`、`number-ticker`、`magic-card` 保留在磁盘上但未引用——它们是未跟踪文件，**不要随手删**，需要时统一从 git 恢复或重新取 registry。

移植 Magic UI 组件进这个项目的三条固定改动：

1. 去掉 `next-themes`，颜色写死为本站 token（站点只有深色主题）；
2. `@/lib/utils` 改成 `../lib/utils`（项目没有路径别名）；
3. 需要的 `@keyframes` 必须以 `--animate-*` 形式写在 `global.css` 的同一个 `@theme` 块里（Tailwind 4 只在对应 utility 被使用时才输出 keyframes）。

## 工具函数

- `src/lib/utils.ts` —— `cn()`，`twMerge(clsx(...))`，用于合并条件类名。
- `src/lib/posts.ts` —— `getPosts()`（按日期倒序，过滤草稿）、`toCardData()`（转成列表/卡片所需的扁平数据）、`formatDate()`（`2025/09/30` 与 `2025年9月30日` 两种格式）。

## 常见改造点

| 想做的事 | 改哪里 |
| --- | --- |
| 调颜色/字体/圆角 | `src/styles/global.css` 的 `@theme`，同时更新 `DESIGN.md` 与 `.impeccable/design.json` |
| 改页面宽度 | `src/layouts/PageLayout.astro`（`wide` 与 `mainClass`），并确认 Header/Footer 同步 |
| 加导航项 | `src/components/Header.astro` 的 `navItems` |
| 改首页卡片 | `src/components/blog/PostMasonry.tsx` |
| 改文章排版 | `src/styles/global.css` 的 `.prose-post` 段 |
| 改 SEO / 抓取 | `astro.config.mjs` 的 `scanPosts()` 与 sitemap 配置、`public/robots.txt` |

改完统一验证流程：

```bash
npm run build                                  # 必须过
npm run preview &                              # 起本地服务
# 浏览器里过一遍改动的路由：0 横向溢出、无 console 报错、文字对比度 ≥ 4.5:1
```
