'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { GlobeIcon } from '@/components/icons';
import { locales } from '@/types/i18n';
import { localeNames, localeFlags } from '@/i18n/config';
import type { Locale } from '@/types';

interface LanguageSwitcherProps {
  readonly currentLocale: Locale;
  readonly className?: string;
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLocaleChange(locale: Locale) {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-text-secondary hover:text-text-primary',
          'hover:bg-bg-card transition-all duration-200',
          'min-h-[44px]'
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <GlobeIcon size={18} />
        <span className="text-sm font-medium hidden sm:inline">
          {localeFlags[currentLocale]} {localeNames[currentLocale]}
        </span>
        <span className="text-sm sm:hidden">{localeFlags[currentLocale]}</span>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 py-2 w-48',
            'bg-bg-card border border-border rounded-xl shadow-xl',
            'animate-scale-in origin-top-right z-50'
          )}
        >
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-2.5 text-sm',
                'transition-colors duration-150',
                locale === currentLocale
                  ? 'text-secondary font-semibold bg-secondary/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
              )}
            >
              <span className="text-lg">{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
