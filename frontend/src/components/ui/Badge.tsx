import { cn } from '@/utils/cn';
import type { RiskLevel } from '@/types';

interface BadgeProps {
  readonly level: RiskLevel;
  readonly label: string;
  readonly className?: string;
}

const badgeStyles: Readonly<Record<RiskLevel, string>> = {
  low: 'bg-success-bg text-success-light border-success/30',
  moderate: 'bg-warning-bg text-warning-light border-warning/30',
  high: 'bg-secondary-glow text-secondary-light border-secondary/30',
  critical: 'bg-danger-bg text-danger-light border-danger/30',
};

export function Badge({ level, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border',
        'animate-fade-in',
        badgeStyles[level],
        className
      )}
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          level === 'low' && 'bg-success',
          level === 'moderate' && 'bg-warning',
          level === 'high' && 'bg-secondary animate-pulse',
          level === 'critical' && 'bg-danger animate-pulse'
        )}
      />
      {label}
    </span>
  );
}
