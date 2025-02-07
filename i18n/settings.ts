export const defaultLocale = 'en';
export const locales = ['en', 'es', 'ar'] as const;
export type ValidLocale = typeof locales[number];

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
} as const;