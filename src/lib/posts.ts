import { getCollection, type CollectionEntry } from 'astro:content';

import type { PostCardData } from '../components/blog/PostGrid';

export type Post = CollectionEntry<'posts'>;

export const formatDate = (d?: Date, style: 'short' | 'long' = 'short') =>
  d
    ? d.toLocaleDateString(
        'zh-CN',
        style === 'long'
          ? { year: 'numeric', month: 'long', day: 'numeric' }
          : { year: 'numeric', month: '2-digit', day: '2-digit' },
      )
    : '';

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0));
}

export function toCardData(posts: Post[]): PostCardData[] {
  return posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    cover: post.data.cover,
    date: formatDate(post.data.date),
    tags: post.data.tags,
    categories: post.data.categories,
  }));
}
