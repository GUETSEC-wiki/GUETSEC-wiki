'use client';

import { useEffect, useRef, useState } from 'react';

export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

/**
 * 文章右栏目录：列出 markdown 里 # / ## / ### 生成的标题，滚动时高亮当前小节。
 * 用 rAF 节流的滚动计算而不是 IntersectionObserver——长文里连续短标题会同时进出观察带，
 * 观察器可能给出「无可见项」而让高亮闪空；按「最后一个越过阅读线的标题」判定始终有唯一答案。
 * 无目录（headings 为空）时不渲染，右栏留空。
 */
export function Toc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      // 阅读线：视口顶部往下 120px（留出吸顶导航的高度）
      const line = 120;
      let current = headings[0].slug;
      for (const h of headings) {
        const el = document.getElementById(h.slug);
        // offsetTop 相对 offsetParent（文章容器），必须用视口坐标换算回文档坐标
        if (el && el.getBoundingClientRect().top <= line) current = h.slug;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headings]);

  // 目录本身超长时，让高亮项始终留在目录可视区内
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const active = list.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`);
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeId]);

  if (headings.length === 0) return null;

  return (
    <nav ref={navRef} aria-label="文章目录" className="text-[13.5px] leading-relaxed">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">目录</p>
      <ul
        ref={listRef}
        className="mt-3 max-h-[calc(100vh-12rem)] space-y-1 overflow-y-auto border-l border-white/[0.08]"
      >
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              aria-current={activeId === h.slug ? 'location' : undefined}
              style={{ paddingLeft: `${(h.depth - 1) * 12 + 14}px` }}
              className={[
                '-ml-px block border-l py-1.5 pr-2 transition-colors duration-300',
                h.depth > 2 ? 'text-[12px]' : '',
                activeId === h.slug
                  ? 'border-cyan-300/60 font-medium text-cyan-200'
                  : 'border-transparent text-white/50 hover:text-white/80',
              ].join(' ')}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
