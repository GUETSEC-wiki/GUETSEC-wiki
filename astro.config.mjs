// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 站点地图需要每篇文章的更新时间，构建期的 sitemap 钩子拿不到 Collection，
// 这里直接扫描内容目录的 front-matter，得到 slug → 日期（草稿同时被排除）。
// 页面路由的 getStaticPaths 已过滤草稿，此处的排除只是同源的兜底。
const posts = await scanPosts();

async function scanPosts() {
  const { readdir, readFile } = await import('node:fs/promises');
  const { join } = await import('node:path');
  const base = 'src/content/posts';
  const map = new Map();
  let files = [];
  try {
    files = (await readdir(base, { recursive: true })).filter((f) => f.endsWith('.md'));
  } catch {
    return map;
  }
  for (const file of files) {
    const src = await readFile(join(base, file), 'utf8');
    const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    if (/^draft:\s*true\s*$/m.test(fm[1])) continue;
    const date = fm[1].match(/^date:\s*(\S+)\s*$/m);
    if (!date) continue;
    map.set(`/posts/${file.replace(/\.md$/, '')}/`, date[1]);
  }
  return map;
}

export default defineConfig({
  site: 'https://wiki.guetsec.cn',
  integrations: [
    react(),
    sitemap({
      // 文章页补 lastmod，让搜索引擎按更新时间安排抓取；其余页面不伪造时间。
      serialize: (item) => {
        const lastmod = posts.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
