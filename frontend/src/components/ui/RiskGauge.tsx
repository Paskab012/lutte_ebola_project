'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import type { RiskLevel } from '@/types';

interface RiskGaugeProps {
  readonly score: number;
  readonly level: RiskLevel;
  readonly animate?: boolean;
  readonly size?: number;
  readonly className?: string;
}

const levelColors: Readonly<Record<RiskLevel, string>> = {
  low: '#2E7D32',
  moderate: '#F9A825',
  high: '#E85D2A',
  critical: '#D32F2F',
};

export function RiskGauge({ score, level, animate = true, size = 180, className }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) return;

    const duration = 1200;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * eased));

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [score, animate]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const color = levelColors[level];

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="12"
            opacity="0.3"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-100 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color}66)`,
            }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-extrabold"
            style={{ color }}
          >
            {animatedScore}
          </span>
          <span className="text-sm text-text-muted font-medium">/100</span>
        </div>
      </div>
    </div>
  );
}
