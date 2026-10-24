import type { OGSchemaType } from '../OGSchemaType.type';

export const musicRadioStation: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.musicRadioStation.name',
  elements: [
    {
      type: 'input',
      key: 'music:creator',
      labelKey: 'tools.og-meta-generator.schemas.musicRadioStation.creatorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicRadioStation.creatorPlaceholder',
    },
  ],
};
