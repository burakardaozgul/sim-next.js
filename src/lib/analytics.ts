/** GTM dataLayer olayı (GTM yoksa sessizce yok sayılır). İstemci tarafında kullanılır. */
export function track(event: string, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
