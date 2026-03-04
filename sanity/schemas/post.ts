import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localizedString', title: 'Başlık' }),
    defineField({ name: 'slug', type: 'localizedSlug', title: 'Slug' }),
    defineField({ name: 'excerpt', type: 'localizedText', title: 'Özet' }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'object',
      fields: [
        { name: 'tr', type: 'array', title: 'Türkçe', of: [{ type: 'block' }, { type: 'image' }] },
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'block' }, { type: 'image' }] },
        { name: 'ru', type: 'array', title: 'Русский', of: [{ type: 'block' }, { type: 'image' }] },
        { name: 'ar', type: 'array', title: 'العربية', of: [{ type: 'block' }, { type: 'image' }] },
      ],
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Kapak Görseli',
      options: { hotspot: true },
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Yayın Tarihi' }),
    defineField({ name: 'author', type: 'string', title: 'Yazar' }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Etiketler',
      of: [{ type: 'string' }],
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
  preview: { select: { title: 'title.tr', media: 'coverImage' } },
  orderings: [
    {
      title: 'Yayın Tarihi',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
