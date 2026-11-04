'use client';

import { BlurFade } from '../magicui/blur-fade';
import { GridPattern } from '../magicui/grid-pattern';

const PANEL =
  'relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[hsl(210_14%_10%)]';
const EYEBROW = 'text-[10px] font-medium uppercase tracking-[0.3em] text-white/50';

interface HomeHeroProps {
  postCount: number;
  tagCount: number;
  categoryCount: number;
  updated?: string;
}

export function HomeHero({ postCount, tagCount, categoryCount, updated }: HomeHeroProps) {
  const stats = [
    { label: '篇文章', value: postCount },
    { label: '个标签', value: tagCount },
    { label: '个分类', value: categoryCount },
  ];

  return (
    <section className={PANEL}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_-40%,hsl(192_98%_55%/0.1),transparent_62%)]"
      />
      <GridPattern
        width={64}
        height={64}
        className="opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top,white_0%,transparent_70%)]"
      />

      <div className="relative px-6 py-12 sm:px-10 sm:py-14">
        <BlurFade offset={8} blur="4px" duration={0.5}>
          <div className="flex items-center gap-3">
            <img
              src="/images/avatar.png"
              alt="GUETSEC"
              className="h-9 w-9 rounded-full border border-white/15 object-cover"
            />
            <span className={`inline-flex items-center gap-2 ${EYEBROW}`}>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-300/70" />
              CTF WriteUps · 安全技术笔记
            </span>
          </div>

          <h1 className="text-sheen mt-8 text-balance text-4xl font-semibold leading-[1.15] tracking-tight sm:text-[2.85rem]">
            GUETSEC Wiki
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
            团队知识库，收录 CTF 赛题复现、漏洞分析与攻防笔记。
          </p>
        </BlurFade>

        <BlurFade offset={8} blur="4px" duration={0.5} delay={0.08}>
          <dl className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-5 border-t border-white/[0.07] pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-xl font-medium leading-none tabular-nums text-white/85">
                  {stat.value}
                </dd>
                <dt className="mt-1.5 text-[11px] tracking-wide text-white/50">{stat.label}</dt>
              </div>
            ))}
            {updated && (
              <div className="ml-auto text-[11px] tracking-wide text-white/50">
                最近更新 · <span className="tabular-nums">{updated}</span>
              </div>
            )}
          </dl>
        </BlurFade>
      </div>
    </section>
  );
}

interface ListHeroProps {
  eyebrow: string;
  title: string;
  count: number;
  unit?: string;
  description?: string;
}

export function ListHero({ eyebrow, title, count, unit = '篇', description }: ListHeroProps) {
  return (
    <section className={PANEL}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_-40%,hsl(192_98%_55%/0.08),transparent_62%)]"
      />
      <GridPattern
        width={56}
        height={56}
        className="opacity-[0.1] [mask-image:radial-gradient(ellipse_at_top,white_0%,transparent_70%)]"
      />

      <div className="relative px-6 py-9 sm:px-9 sm:py-11">
        <BlurFade offset={8} blur="4px" duration={0.5}>
          <p className={EYEBROW}>{eyebrow}</p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h1 className="text-sheen text-3xl font-semibold tracking-tight sm:text-[2.1rem]">
              {title}
            </h1>
            <span className="text-[11px] tabular-nums tracking-wide text-white/50">
              共 {count} {unit}
            </span>
          </div>
          {description && (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">{description}</p>
          )}
        </BlurFade>
      </div>
    </section>
  );
}
