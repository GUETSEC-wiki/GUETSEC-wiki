'use client';

import { BlurFade } from '../magicui/blur-fade';
import type { PostCardData } from './PostGrid';

interface PostMasonryProps {
  posts: PostCardData[];
  /** 卡片错峰渐入的基础延迟步长（秒） */
  stagger?: number;
  maxStagger?: number;
}

const card =
  'group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] ' +
  'bg-[hsl(210_14%_10%)] transition-colors duration-300 hover:border-white/15';

const coverImage = 'block aspect-[16/9] w-full border-b border-white/[0.07] object-cover';

const body = 'flex flex-1 flex-col p-5';

const eyebrow = 'text-[10px] uppercase leading-none tracking-[0.28em] text-white/50';

const title =
  'mt-3 block text-[17px] font-medium leading-snug text-white/90 transition-colors duration-300 ' +
  'group-hover:text-white';

const description = 'mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-white/50';

const meta = 'mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] leading-none';

/**
 * 首页瀑布流：CSS 多列（column-count）排版。
 * 卡片高度由封面图与摘要长度自然参差，不写死高度、不做等高拉伸。
 */
export function PostMasonry({ posts, stagger = 0.05, maxStagger = 0.25 }: PostMasonryProps) {
  // 首页中轴内容宽 880px（宽视口下两侧留白约 200px，保持阅览室的克制度）：
  // ≥640 两列、≥1024 三列（每卡约 282px）；文章不足时逐级降级，避免空列。
  const columns =
    posts.length <= 1
      ? 'columns-1'
      : posts.length <= 3
        ? 'columns-1 sm:columns-2'
        : 'columns-1 sm:columns-2 lg:columns-3';

  return (
    <div className={`${columns} gap-4`}>
      {posts.map((post, index) => (
        <BlurFade
          key={post.id}
          inView
          offset={6}
          blur="3px"
          duration={0.45}
          delay={Math.min(index * stagger, maxStagger)}
          /* 瀑布流靠 break-inside 断开，卡片自身承担底边距 */
          className="mb-4 break-inside-avoid"
        >
          <article className={card}>
            {post.cover && (
              <img src={post.cover} alt="" loading="lazy" decoding="async" className={coverImage} />
            )}
            <div className={body}>
              {post.categories.length > 0 && (
                <p className={eyebrow}>{post.categories.slice(0, 2).join(' · ')}</p>
              )}
              <h3 className={title}>
                <a
                  href={`/posts/${post.id}/`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </a>
              </h3>
              {post.description && <p className={description}>{post.description}</p>}
              <div className={`${meta} mt-auto pt-4`}>
                {post.date && <time className="tabular-nums text-white/50">{post.date}</time>}
                {post.tags.length > 0 && (
                  <ul className="relative z-20 flex flex-wrap gap-x-2.5 gap-y-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <li key={tag}>
                        <a
                          href={`/tags/${encodeURIComponent(tag)}/`}
                          className="text-white/50 transition-colors duration-300 hover:text-white/80"
                        >
                          #{tag}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        </BlurFade>
      ))}
    </div>
  );
}
