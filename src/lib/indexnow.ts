import { BASE_URL } from '@/data/organization';

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/** IndexNow (Bing, Yandex, Seznam, Naver) toplu bildirim isteği. Anahtar dosyası: /<key>.txt */
export function buildIndexNowRequest(urls: string[], key: string, base: string = BASE_URL) {
  const host = new URL(base).host;
  return {
    url: INDEXNOW_ENDPOINT,
    body: { host, key, keyLocation: `${base}/${key}.txt`, urlList: urls },
  };
}
