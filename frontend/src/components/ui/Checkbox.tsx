'use client';

import { cn } from '@/utils/cn';
import { CheckIcon } from '@/components/icons';

interface CheckboxProps {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly icon?: string;
  readonly className?: string;
}

export function Checkbox({ id, label, description, checked, onChange, icon, className }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-start gap-3 p-3 rounded-xl cursor-pointer',
        'border transition-all duration-200',
        checked
          ? 'bg-primary/10 border-primary-light'
          : 'bg-bg-card border-border hover:border-border-light hover:bg-bg-card-hover',
        className
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center',
          'transition-all duration-200',
          checked
            ? 'bg-primary-light border-primary-light'
            : 'border-border'
        )}
      >
        {checked && <CheckIcon size={12} className="text-white" />}
      </div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className={cn(
            'text-sm font-medium',
            checked ? 'text-text-primary' : 'text-text-secondary'
          )}>
            {label}
          </span>
        </div>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}
