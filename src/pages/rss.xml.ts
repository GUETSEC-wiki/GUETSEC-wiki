import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  );
  return rss({
    title: 'GUETSEC Wiki',
    description: 'GUETSEC 团队知识库 · CTF WriteUps 与技术笔记',
    site: context.site ?? 'https://wiki.guetsec.cn',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
      categories: [...post.data.tags, ...post.data.categories],
    })),
    customData: '<language>zh-CN</language>',
  });
}
