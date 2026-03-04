import { localizedString } from '../schemas/localizedString';
import { localizedText } from '../schemas/localizedText';
import { localizedSlug } from '../schemas/localizedSlug';
import { product } from '../schemas/product';
import { productCategory } from '../schemas/productCategory';
import { brand } from '../schemas/brand';
import { post } from '../schemas/post';
import { faq } from '../schemas/faq';

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedSlug,
  product,
  productCategory,
  brand,
  post,
  faq,
];
