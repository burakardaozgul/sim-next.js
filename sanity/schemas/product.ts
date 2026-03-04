import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Ürün',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'localizedString' }),
    defineField({ name: 'slug', title: 'Slug', type: 'localizedSlug' }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({
      name: 'brand',
      title: 'Marka',
      type: 'reference',
      to: [{ type: 'brand' }],
    }),
    defineField({ name: 'excerpt', title: 'Kısa Açıklama', type: 'localizedText' }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'object',
      fields: [
        { name: 'tr', type: 'array', title: 'Türkçe', of: [{ type: 'block' }] },
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'block' }] },
        { name: 'ru', type: 'array', title: 'Русский', of: [{ type: 'block' }] },
        { name: 'ar', type: 'array', title: 'العربية', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Teknik Özellikler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'localizedString', title: 'Özellik' },
            { name: 'value', type: 'string', title: 'Değer' },
          ],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Görseller',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'datasheet',
      title: 'Teknik Veri Sayfası (PDF)',
      type: 'file',
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'localizedString', title: 'Meta Başlık' },
        { name: 'metaDescription', type: 'localizedText', title: 'Meta Açıklama' },
      ],
    }),
  ],
  preview: { select: { title: 'title.tr', media: 'images.0' } },
});
