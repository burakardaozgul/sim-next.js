import type { Locale } from '@/i18n/config';

const countryToLocaleMap: Record<string, Locale> = {
  // Türkçe
  TR: 'tr',

  // Rusça
  RU: 'ru',
  KZ: 'ru',
  BY: 'ru',
  UZ: 'ru',
  KG: 'ru',
  TJ: 'ru',

  // Arapça
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  IQ: 'ar',
  JO: 'ar',
  LB: 'ar',
  KW: 'ar',
  QA: 'ar',
  BH: 'ar',
  OM: 'ar',
  YE: 'ar',
  SY: 'ar',
  PS: 'ar',
  LY: 'ar',
  SD: 'ar',
  TN: 'ar',
  DZ: 'ar',
  MA: 'ar',
  MR: 'ar',
};

export function countryToLocale(countryCode: string): Locale {
  return countryToLocaleMap[countryCode.toUpperCase()] ?? 'en';
}
