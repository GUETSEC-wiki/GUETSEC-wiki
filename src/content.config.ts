import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    author: z.string().default('GUETSEC'),
    description: z.string().optional(),
    /** 首页瀑布流封面图：站内路径（/images/xx.webp）或图床直链；留空则渲染纯文字卡 */
    cover: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
