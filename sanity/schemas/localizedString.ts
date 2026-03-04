import { defineType } from 'sanity';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'tr', title: 'Türkçe', type: 'string' },
    { name: 'en', title: 'English', type: 'string' },
    { name: 'ru', title: 'Русский', type: 'string' },
    { name: 'ar', title: 'العربية', type: 'string' },
  ],
});
