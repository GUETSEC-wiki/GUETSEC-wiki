'use client';

import { useEffect, useState, type CSSProperties } from 'react';

import { cn } from '../../lib/utils';

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  color?: string;
  className?: string;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  color = '#67e8f9',
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(
      () =>
        ({
          '--angle': -angle + 'deg',
          '--meteor-color': color,
          top: '-5%',
          left: `${Math.random() * 100}%`,
          animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + 's',
          animationDuration:
            Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + 's',
        }) as CSSProperties,
    );
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle, color]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            'animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-(--meteor-color) shadow-[0_0_0_1px_#ffffff10]',
            className,
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-(--meteor-color) to-transparent" />
        </span>
      ))}
    </>
  );
};
