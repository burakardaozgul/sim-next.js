'use client';

import { useState, type FormEvent } from 'react';
import Script from 'next/script';
import { Link } from '@/i18n/navigation';
import { track } from '@/lib/analytics';
import { CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';

export interface RfqLabels {
  title: string;
  intro: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  productGroup: string;
  quantity: string;
  quantityHint: string;
  incoterm: string;
  message: string;
  consent: string;
  consentLink: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  select: string;
}

export interface RfqFormProps {
  labels: RfqLabels;
  productGroups: { value: string; label: string }[];
  incoterms: readonly string[];
  countries: readonly string[];
  /** Analitik ve e-posta konusu için sayfa kimliği */
  source: string;
}

const INPUT_CLS =
  'w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-3 text-sm text-cream placeholder:text-silver/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30';

/**
 * RFQ (teklif talebi) formu — mevcut /api/contact uç noktasını kullanır:
 * ülke, ürün grubu, miktar ve Incoterm alanları mesaj gövdesine yapılandırılmış satırlar olarak eklenir,
 * e-posta konusu "RFQ" ile başlar. KVKK onayı, honeypot ve Turnstile (anahtar tanımlıysa) iletişim formuyla aynıdır.
 */
export default function RfqForm({ labels, productGroups, incoterms, countries, source }: RfqFormProps) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [data, setData] = useState({ name: '', email: '', company: '', phone: '', country: '', productGroup: '', quantity: '', incoterm: '', message: '', _honey: '' });
  const [consent, setConsent] = useState(false);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      const form = e.currentTarget as HTMLFormElement;
      const turnstileToken = (form.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value ?? undefined;
      const message = [
        `Country: ${data.country}`,
        `Product group: ${data.productGroup}`,
        `Quantity: ${data.quantity}`,
        `Incoterm: ${data.incoterm}`,
        `Source page: ${source}`,
        '',
        data.message,
      ].join('\n');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          subject: `RFQ - ${data.country} - ${data.productGroup}`.slice(0, 300),
          message,
          _honey: data._honey,
          consent,
          turnstileToken,
        }),
      });
      (window as Window & { turnstile?: { reset?: () => void } }).turnstile?.reset?.();
      if (!res.ok) throw new Error('Failed');
      setState('success');
      track('rfq_form_submit', { form: 'rfq', source });
      setData({ name: '', email: '', company: '', phone: '', country: '', productGroup: '', quantity: '', incoterm: '', message: '', _honey: '' });
      setConsent(false);
    } catch {
      setState('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.06] bg-ink-800 p-6 lg:p-8" aria-labelledby="rfq-title">
      <h2 id="rfq-title" className="font-heading text-2xl font-bold text-cream">{labels.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-silver">{labels.intro}</p>
      {/* Honeypot */}
      <input type="text" name="_honey" value={data._honey} onChange={onChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.name}
          <input name="name" required maxLength={200} value={data.name} onChange={onChange} className={`${INPUT_CLS} mt-1.5`} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.email}
          <input type="email" name="email" required maxLength={254} value={data.email} onChange={onChange} className={`${INPUT_CLS} mt-1.5`} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.company}
          <input name="company" required maxLength={200} value={data.company} onChange={onChange} className={`${INPUT_CLS} mt-1.5`} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.phone}
          <input name="phone" maxLength={30} value={data.phone} onChange={onChange} className={`${INPUT_CLS} mt-1.5`} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.country}
          <input name="country" required list="rfq-countries" maxLength={60} value={data.country} onChange={onChange} className={`${INPUT_CLS} mt-1.5`} />
          <datalist id="rfq-countries">
            {countries.map((c) => <option key={c} value={c} />)}
          </datalist>
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.productGroup}
          <select name="productGroup" required value={data.productGroup} onChange={onChange} className={`${INPUT_CLS} mt-1.5`}>
            <option value="">{labels.select}</option>
            {productGroups.map((g) => <option key={g.value} value={g.label}>{g.label}</option>)}
          </select>
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.quantity}
          <input name="quantity" required maxLength={60} placeholder={labels.quantityHint} value={data.quantity} onChange={onChange} className={`${INPUT_CLS} mt-1.5`} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wider text-silver">
          {labels.incoterm}
          <select name="incoterm" required value={data.incoterm} onChange={onChange} className={`${INPUT_CLS} mt-1.5`}>
            <option value="">{labels.select}</option>
            {incoterms.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-xs font-medium uppercase tracking-wider text-silver">
        {labels.message}
        <textarea name="message" rows={4} maxLength={4000} value={data.message} onChange={onChange} className={`${INPUT_CLS} mt-1.5 resize-none`} />
      </label>
      <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-silver">
        <input type="checkbox" name="consent" required checked={consent} onChange={(ev) => setConsent(ev.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-gold" />
        <span>
          {labels.consent}{' '}
          <Link href="/gizlilik-politikasi" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">{labels.consentLink}</Link>
        </span>
      </label>
      {turnstileSiteKey && (
        <div className="mt-4">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />
        </div>
      )}
      {state === 'success' && (
        <p className="mt-4 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"><CheckCircle size={18} />{labels.success}</p>
      )}
      {state === 'error' && (
        <p className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"><AlertCircle size={18} />{labels.error}</p>
      )}
      <button type="submit" disabled={state === 'sending'} className="mt-6 inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink-900 transition-all hover:bg-gold-light disabled:opacity-60">
        {state === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {state === 'sending' ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
