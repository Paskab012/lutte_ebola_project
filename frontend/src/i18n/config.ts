import type { Locale } from '@/types/i18n';

export const locales: readonly Locale[] = ['fr', 'en', 'sw', 'ln'] as const;

export const defaultLocale: Locale = 'fr';

export const localeNames: Readonly<Record<Locale, string>> = {
  fr: 'Français',
  en: 'English',
  sw: 'Kiswahili',
  ln: 'Lingála',
} as const;

export const localeFlags: Readonly<Record<Locale, string>> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  sw: '🇹🇿',
  ln: '🇨🇩',
} as const;
