'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import VerticalNav from '@/components/layout/VerticalNav';
import Footer from '@/components/layout/Footer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const INPUT_CLS =
  'w-full rounded-lg border border-white/[0.06] bg-ink-900 px-4 py-3 text-sm text-cream placeholder-silver/50 outline-none transition-colors focus:border-gold/40 focus:ring-1 focus:ring-gold/20';

export default function ContactPageClient() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer');

  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  // Reset status message after 5 seconds
  useEffect(() => {
    if (formState === 'success' || formState === 'error') {
      const timer = setTimeout(() => setFormState('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');
      setFormState('success');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('addressLabel'),
      value: t('address'),
      href: 'https://maps.google.com/?q=Yakuplu+194.+Sk.+No:1+D:176+Beylikdüzü+İstanbul',
    },
    {
      icon: Phone,
      label: t('phoneLabel'),
      value: tFooter('phone'),
      href: `tel:${tFooter('phone')}`,
    },
    {
      icon: Mail,
      label: t('emailLabel'),
      value: tFooter('email'),
      href: `mailto:${tFooter('email')}`,
    },
    {
      icon: Clock,
      label: t('workingHours'),
      value: t('workingHoursValue'),
    },
  ];

  return (
    <main className="flex min-h-screen">
      <VerticalNav />
      <div className="w-full lg:ml-[260px]">
        {/* Map */}
        <section className="relative h-[350px] w-full lg:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.5!2d28.6285!3d40.9835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa5e1a0a328af%3A0x0!2sYakuplu%2C+194.+Sk.+No%3A1+D%3A176%2C+34000+Beylikd%C3%BCz%C3%BC%2F%C4%B0stanbul!5e0!3m2!1str!2str"
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SIM Baskı Malzemeleri Konum"
          />
        </section>

        {/* Title */}
        <section className="bg-ink-900 px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {t('title')}
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
              {t('subtitle')}
            </h1>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="border-t border-white/[0.06] bg-ink-800 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="font-heading text-xl font-bold text-cream">
                  {t('infoTitle')}
                </h2>
                <div className="mt-8 space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                          <Icon size={20} className="text-gold" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-silver">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-cream">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block rounded-xl border border-white/[0.06] bg-ink-900 p-5 transition-all hover:border-gold/20"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/[0.06] bg-ink-900 p-5"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="rounded-xl border border-white/[0.06] bg-ink-900 p-6 lg:p-8">
                  <h2 className="font-heading text-xl font-bold text-cream">
                    {t('formTitle')}
                  </h2>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">
                          {t('name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={INPUT_CLS}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">
                          {t('email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={INPUT_CLS}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">
                          {t('phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={INPUT_CLS}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">
                          {t('company')}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={INPUT_CLS}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">
                        {t('subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={INPUT_CLS}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">
                        {t('message')} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`${INPUT_CLS} resize-none`}
                      />
                    </div>

                    {/* Status Messages */}
                    {formState === 'success' && (
                      <div className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        <CheckCircle size={18} className="shrink-0" />
                        {t('success')}
                      </div>
                    )}

                    {formState === 'error' && (
                      <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        <AlertCircle size={18} className="shrink-0" />
                        {t('error')}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState === 'sending'}
                      className="inline-flex w-full items-center justify-center gap-2 bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-gold/90 disabled:opacity-60 sm:w-auto"
                    >
                      {formState === 'sending' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          {t('send')}
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
