# SEO 与抓取

站点不需要手动维护 sitemap，全是构建期自动生成的。

## Sitemap

- `@astrojs/sitemap` 在构建时输出 `dist/sitemap-index.xml` + `dist/sitemap-0.xml`。
- `src/layouts/BaseLayout.astro` 里已声明 `<link rel="sitemap" href="/sitemap-index.xml" />`。
- `astro.config.mjs` 的 `site` 必须是正式域名（`https://wiki.guetsec.cn`）——sitemap 里的绝对 URL 全部由它推导，本地预览时写 localhost 会污染产物。

## 每篇文章的 lastmod

`astro.config.mjs` 在构建前用 `scanPosts()` 扫描 `src/content/posts/**/*.md`，从 front-matter 抽 `date`，组成 `Map<'/posts/<slug>/', dateString>`，再通过 sitemap 的 `serialize` 钩子只给文章 URL 补 `lastmod`：

```js
sitemap({
  serialize: (item) => {
    const lastmod = posts.get(new URL(item.url).pathname);
    return lastmod ? { ...item, lastmod } : item;
  },
})
```

**列表页、归档页、标签页不伪造时间**——`serialize` 只对命中 Map 的文章路由生效。

`sitemap()` 的顶层 `lastmod` 选项是全局单一日期，不要用；逐条时间只能走 `serialize`。

## 草稿

`draft: true` 的文章在 `getStaticPaths` 阶段就被过滤掉，路由根本不存在，因此也不会出现在 sitemap 里。sitemap 配置里不需要额外的 `filter` 处理草稿（加了也是死代码）。

## robots.txt

`public/robots.txt`：

```
User-agent: *
Allow: /

Sitemap: https://wiki.guetsec.cn/sitemap-index.xml
```

构建时原样复制到 `dist/robots.txt`。

## RSS

`src/pages/rss.xml.ts` 用 `@astrojs/rss` 在构建期生成 `/rss.xml`，条目来自同一个文章集合（已按日期倒序、过滤草稿）。

## 改了之后怎么核对

```bash
npm run build
grep -c '<url>' dist/sitemap-0.xml      # URL 条数
grep '<lastmod>' dist/sitemap-0.xml     # 应只出现在文章条目上
cat dist/robots.txt
```

本地预览时用 `curl -I http://localhost:4321/robots.txt`、`/sitemap-index.xml`、`/sitemap-0.xml` 确认都是 200。

## 常见故障

| 现象 | 原因 |
| --- | --- |
| sitemap 里文章缺 `lastmod` | 该文章 front-matter 的 `date` 写在了第二个 `---` 之后（掉进正文），扫描取不到 |
| sitemap 里出现不该有的 URL | `site` 配错，或某路由没有过滤草稿 |
| 整份 sitemap 只有一个日期 | 误用了顶层 `lastmod: new Date()` |
