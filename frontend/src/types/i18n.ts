export const locales = ['fr', 'en', 'sw', 'ln'] as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}
