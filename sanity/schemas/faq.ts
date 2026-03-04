import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'SSS',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'localizedString', title: 'Soru' }),
    defineField({ name: 'answer', type: 'localizedText', title: 'Cevap' }),
    defineField({ name: 'category', type: 'string', title: 'Kategori' }),
    defineField({ name: 'order', type: 'number', title: 'Sıra' }),
  ],
  preview: { select: { title: 'question.tr' } },
});
