'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

import { cn } from '../../lib/utils';

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  surface?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 260,
  gradientColor = '#0f2f36',
  gradientOpacity = 0.9,
  gradientFrom = '#22d3ee',
  gradientTo = '#a855f7',
  surface = 'hsl(210 12% 14%)',
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const [hovered, setHovered] = useState(false);
  const gradientSizeRef = useRef(gradientSize);
  gradientSizeRef.current = gradientSize;

  const reset = useCallback(() => {
    const off = -gradientSizeRef.current;
    mouseX.set(off);
    mouseY.set(off);
  }, [mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset();
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset();
    };
    const handleBlur = () => reset();

    window.addEventListener('pointerout', handleGlobalPointerOut);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('pointerout', handleGlobalPointerOut);
      window.removeEventListener('blur', handleBlur);
    };
  }, [reset]);

  return (
    <motion.div
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl border border-white/10',
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        reset();
      }}
      style={{
        background: useMotionTemplate`
          linear-gradient(${surface} 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            rgba(255,255,255,0.08) 100%
          ) border-box
        `,
      }}
    >
      <div className="absolute inset-px z-20 rounded-[inherit]" style={{ background: surface }} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit]"
        animate={{ opacity: hovered ? gradientOpacity : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor},
              transparent 100%
            )
          `,
        }}
      />

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
