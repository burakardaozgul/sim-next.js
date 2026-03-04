import { defineType } from 'sanity';

export const localizedSlug = defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  fields: [
    { name: 'tr', title: 'TR Slug', type: 'slug', options: { source: 'title.tr' } },
    { name: 'en', title: 'EN Slug', type: 'slug', options: { source: 'title.en' } },
    { name: 'ru', title: 'RU Slug', type: 'slug', options: { source: 'title.ru' } },
    { name: 'ar', title: 'AR Slug', type: 'slug', options: { source: 'title.ar' } },
  ],
});
