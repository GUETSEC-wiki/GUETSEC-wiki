'use client';

import { useEffect, useLayoutEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

import { cn } from '../../lib/utils';

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
}

// 服务端渲染阶段用 useEffect，客户端用 useLayoutEffect：保证无 JS 时输出最终数字，
// 水合后又在首次绘制前把显示值复位到起始值，从 0 滚动上去。
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : startValue);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const format = (input: number) =>
    Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(input.toFixed(decimalPlaces)));

  useIsomorphicLayoutEffect(() => {
    if (ref.current) ref.current.textContent = format(startValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? startValue : value);
      }, delay * 1000);
    }

    return () => {
      if (timer !== null) clearTimeout(timer);
    };
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) ref.current.textContent = format(Number(latest.toFixed(decimalPlaces)));
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [springValue, decimalPlaces],
  );

  return (
    <span ref={ref} className={cn('inline-block tracking-wider tabular-nums', className)} {...props}>
      {value}
    </span>
  );
}
