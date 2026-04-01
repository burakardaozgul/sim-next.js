export const LOCALE_COOKIE_NAME = 'USER_LOCALE_PREFERENCE';

export function setLocalePreference(locale: string): void {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}
