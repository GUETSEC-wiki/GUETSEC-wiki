'use client';

import { BlurFade } from '../magicui/blur-fade';

export interface PostCardData {
  id: string;
  title: string;
  description?: string;
  /** 首页瀑布流封面图，留空则不带图 */
  cover?: string;
  date?: string;
  tags: string[];
  categories: string[];
}

interface PostGridProps {
  posts: PostCardData[];
  /** 行间错峰渐入的基础延迟步长（秒） */
  stagger?: number;
  maxStagger?: number;
}

export function PostGrid({ posts, stagger = 0.04, maxStagger = 0.2 }: PostGridProps) {
  return (
    <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {posts.map((post, index) => (
        <li key={post.id}>
          <BlurFade inView offset={6} blur="3px" duration={0.45} delay={Math.min(index * stagger, maxStagger)}>
            <div className="group relative -mx-3 rounded-lg px-3 py-6 transition-colors duration-300 hover:bg-white/[0.025]">
              <span
                aria-hidden="true"
                className="absolute inset-y-5 left-0 w-px bg-cyan-300/0 transition-colors duration-300 group-hover:bg-cyan-300/45"
              />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[17px] font-medium leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
                  <a
                    href={`/posts/${post.id}/`}
                    className="after:absolute after:inset-0 after:rounded-lg after:content-['']"
                  >
                    {post.title}
                  </a>
                </h3>
                {post.date && (
                  <time className="shrink-0 text-[11px] tabular-nums tracking-wide text-white/50">
                    {post.date}
                  </time>
                )}
              </div>

              {post.description && (
                <p className="mt-2 line-clamp-2 max-w-2xl text-[13.5px] leading-relaxed text-white/50">
                  {post.description}
                </p>
              )}

              {(post.tags.length > 0 || post.categories.length > 0) && (
                <div className="relative z-20 mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1">
                  {post.categories.map((category) => (
                    <a
                      key={`c-${category}`}
                      href={`/categories/${encodeURIComponent(category)}/`}
                      className="text-[11px] tracking-wide text-cyan-200/55 transition-colors hover:text-cyan-100"
                    >
                      {category}
                    </a>
                  ))}
                  {post.tags.map((tag) => (
                    <a
                      key={`t-${tag}`}
                      href={`/tags/${encodeURIComponent(tag)}/`}
                      className="text-[11px] tracking-wide text-white/50 transition-colors hover:text-white/80"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </BlurFade>
        </li>
      ))}
    </ul>
  );
}
