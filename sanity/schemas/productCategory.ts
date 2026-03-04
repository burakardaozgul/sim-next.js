import { defineType, defineField } from 'sanity';

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Ürün Kategorisi',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', title: 'Başlık' }),
    defineField({ name: 'slug', type: 'localizedSlug', title: 'Slug' }),
    defineField({ name: 'icon', type: 'string', title: 'İkon (emoji)' }),
    defineField({ name: 'order', type: 'number', title: 'Sıra' }),
  ],
  preview: { select: { title: 'title.tr' } },
});
