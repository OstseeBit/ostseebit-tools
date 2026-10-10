import type { OGSchemaType } from '../OGSchemaType.type';

export const book: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.book.name',
  elements: [
    {
      type: 'input',
      key: 'book:author',
      labelKey: 'tools.og-meta-generator.schemas.book.authorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.book.authorPlaceholder',
    },
    {
      type: 'input',
      key: 'book:isbn',
      labelKey: 'tools.og-meta-generator.schemas.book.isbnLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.book.isbnPlaceholder',
    },
    {
      type: 'input',
      key: 'book:release_date',
      labelKey: 'tools.og-meta-generator.schemas.book.releaseDateLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.book.releaseDatePlaceholder',
    },
    {
      type: 'input',
      key: 'book:tag',
      labelKey: 'tools.og-meta-generator.schemas.book.tagLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.book.tagPlaceholder',
    },
  ],
};
