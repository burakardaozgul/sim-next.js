import { defineType, defineField } from 'sanity';

export const brand = defineType({
  name: 'brand',
  title: 'Marka / Temsilcilik',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Marka Adı' }),
    defineField({ name: 'logo', type: 'image', title: 'Logo' }),
    defineField({ name: 'website', type: 'url', title: 'Web Sitesi' }),
    defineField({ name: 'description', type: 'localizedText', title: 'Açıklama' }),
    defineField({ name: 'country', type: 'string', title: 'Ülke' }),
    defineField({ name: 'order', type: 'number', title: 'Sıra' }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
});
