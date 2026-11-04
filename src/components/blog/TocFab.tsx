'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { TocHeading } from './Toc';

/**
 * 窄屏（<1200px）的目录入口：右下角浮动按钮 + 半屏抽屉。
 * ≥1200px 由文章页右栏的 Toc 承担，这里整体不渲染（min-[1200px]:hidden）。
 * 高亮复用与右栏一致的「最后一个越过阅读线的标题」判定，抽屉打开时即时同步当前位置。
 */
export function TocFab({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const line = 120;
      let current = headings[0].slug;
      for (const h of headings) {
        const el = document.getElementById(h.slug);
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

  // 抽屉打开时把高亮项滚进可视区
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list || !activeId) return;
    const active = list.querySelector<HTMLAnchorElement>(`a[href="#${CSS.escape(activeId)}"]`);
    active?.scrollIntoView({ block: 'center' });
  }, [open, activeId]);

  // 抽屉打开期间锁滚动，关闭时还原
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="打开目录"
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-[hsl(210_14%_10%)] text-white/70 transition-colors duration-300 hover:border-white/25 hover:text-white min-[1200px]:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="h-5 w-5"
        >
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 min-[1200px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="关闭目录"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/55"
            />
            <motion.nav
              aria-label="文章目录"
              className="absolute inset-x-0 bottom-0 flex max-h-[70dvh] flex-col rounded-t-2xl border-t border-white/[0.09] bg-[hsl(210_14%_8%)] pb-[env(safe-area-inset-bottom)]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.26, ease: [0.2, 0.65, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                  目录
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] tabular-nums text-white/50">
                    {headings.length} 节
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="关闭"
                    className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="h-4 w-4"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </div>

              <ul ref={listRef} className="flex-1 overflow-y-auto px-5 py-3">
                {headings.map((h) => (
                  <li key={h.slug}>
                    <a
                      href={`#${h.slug}`}
                      onClick={() => setOpen(false)}
                      aria-current={activeId === h.slug ? 'location' : undefined}
                      style={{ paddingLeft: `${(h.depth - 1) * 14}px` }}
                      className={[
                        'flex min-h-11 items-center border-l pl-3 text-[14px] transition-colors duration-300',
                        activeId === h.slug
                          ? 'border-cyan-300/60 font-medium text-cyan-200'
                          : 'border-transparent text-white/55 hover:text-white/85',
                      ].join(' ')}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
