import type { OGSchemaType } from '../OGSchemaType.type';

export const twitter: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.twitter.name',
  elements: [
    {
      type: 'select',
      key: 'twitter:card',
      labelKey: 'tools.og-meta-generator.schemas.twitter.cardLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.twitter.cardPlaceholder',
      options: [
        { labelKey: 'tools.og-meta-generator.schemas.twitter.optionSummary', value: 'summary' },
        { labelKey: 'tools.og-meta-generator.schemas.twitter.optionSummaryLargeImage', value: 'summary_large_image' },
        { labelKey: 'tools.og-meta-generator.schemas.twitter.optionApp', value: 'app' },
        { labelKey: 'tools.og-meta-generator.schemas.twitter.optionPlayer', value: 'player' },
      ],
    },
    {
      type: 'input',
      key: 'twitter:site',
      labelKey: 'tools.og-meta-generator.schemas.twitter.siteLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.twitter.sitePlaceholder',
    },
    {
      type: 'input',
      key: 'twitter:creator',
      labelKey: 'tools.og-meta-generator.schemas.twitter.creatorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.twitter.creatorPlaceholder',
    },
  ],
};
