'use client';

import { createContext, useContext, type ReactNode } from 'react';

/**
 * Dinamik sayfalarda (ürün, blog) mevcut içeriğin dil bazlı slug haritası.
 * Dil değiştirici bu haritayla hedef dilin kendi slug'ına link verir;
 * sağlayıcı yoksa mevcut slug kullanılır (sunucu 308 ile doğru slug'a yönlendirir).
 */
const LocaleSlugsContext = createContext<Record<string, string> | null>(null);

export function LocaleSlugsProvider({
  slugs,
  children,
}: {
  slugs: Record<string, string>;
  children: ReactNode;
}) {
  return <LocaleSlugsContext.Provider value={slugs}>{children}</LocaleSlugsContext.Provider>;
}

export function useLocaleSlugs(): Record<string, string> | null {
  return useContext(LocaleSlugsContext);
}
