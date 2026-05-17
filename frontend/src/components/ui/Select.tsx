'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { ChevronIcon } from '@/components/icons';

interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly label?: string;
  readonly error?: string;
  readonly options: readonly SelectOption[];
  readonly placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, error, options, placeholder, className, id, ...props }, ref) {
    const selectId = id ?? label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none rounded-xl bg-bg-card border border-border px-4 py-3 pr-10',
              'text-text-primary',
              'transition-all duration-200',
              'focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light/30',
              'hover:border-border-light',
              'min-h-[44px]',
              error && 'border-danger focus:border-danger focus:ring-danger/30',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <ChevronIcon size={16} />
          </div>
        </div>
        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}
      </div>
    );
  }
);
