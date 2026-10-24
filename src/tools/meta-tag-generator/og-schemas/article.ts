import type { OGSchemaType } from '../OGSchemaType.type';

export const article: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.article.name',
  elements: [
    {
      type: 'input',
      key: 'article:published_time',
      labelKey: 'tools.og-meta-generator.schemas.article.publishedTimeLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.article.publishedTimePlaceholder',
    },
    {
      type: 'input',
      key: 'article:modified_time',
      labelKey: 'tools.og-meta-generator.schemas.article.modifiedTimeLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.article.modifiedTimePlaceholder',
    },
    {
      type: 'input',
      key: 'article:expiration_time',
      labelKey: 'tools.og-meta-generator.schemas.article.expirationTimeLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.article.expirationTimePlaceholder',
    },
    {
      type: 'input',
      key: 'article:author',
      labelKey: 'tools.og-meta-generator.schemas.article.authorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.article.authorPlaceholder',
    },
    {
      type: 'input',
      key: 'article:section',
      labelKey: 'tools.og-meta-generator.schemas.article.sectionLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.article.sectionPlaceholder',
    },
    {
      type: 'input',
      key: 'article:tag',
      labelKey: 'tools.og-meta-generator.schemas.article.tagLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.article.tagPlaceholder',
    },
  ],
};
