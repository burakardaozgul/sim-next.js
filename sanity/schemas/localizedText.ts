import { defineType } from 'sanity';

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    { name: 'tr', title: 'Türkçe', type: 'text' },
    { name: 'en', title: 'English', type: 'text' },
    { name: 'ru', title: 'Русский', type: 'text' },
    { name: 'ar', title: 'العربية', type: 'text' },
  ],
});
