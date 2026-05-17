import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly hoverable?: boolean;
  readonly glowing?: boolean;
}

export function Card({ children, className, hoverable = false, glowing = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-bg-card p-6',
        'transition-all duration-300',
        hoverable && 'hover:bg-bg-card-hover hover:border-border-light hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5',
        glowing && 'shadow-lg shadow-primary-glow',
        className
      )}
    >
      {children}
    </div>
  );
}
