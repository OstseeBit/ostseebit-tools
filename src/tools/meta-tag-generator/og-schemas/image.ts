import type { OGSchemaType } from '../OGSchemaType.type';

export const image: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.image.name',
  elements: [
    {
      type: 'input',
      key: 'image',
      labelKey: 'tools.og-meta-generator.schemas.image.urlLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.image.urlPlaceholder',
    },
    {
      type: 'input',
      key: 'image:alt',
      labelKey: 'tools.og-meta-generator.schemas.image.altLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.image.altPlaceholder',
    },
    {
      type: 'input',
      key: 'image:width',
      labelKey: 'tools.og-meta-generator.schemas.image.widthLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.image.widthPlaceholder',
    },
    {
      type: 'input',
      key: 'image:height',
      labelKey: 'tools.og-meta-generator.schemas.image.heightLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.image.heightPlaceholder',
    },
  ],
};
