import type { OGSchemaType } from '../OGSchemaType.type';

export const musicSong: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.musicSong.name',
  elements: [
    {
      type: 'input',
      key: 'music:duration',
      labelKey: 'tools.og-meta-generator.schemas.musicSong.durationLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicSong.durationPlaceholder',
    },
    {
      type: 'input',
      key: 'music:album',
      labelKey: 'tools.og-meta-generator.schemas.musicSong.albumLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicSong.albumPlaceholder',
    },
    {
      type: 'input',
      key: 'music:album:disk',
      labelKey: 'tools.og-meta-generator.schemas.musicSong.discLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicSong.discPlaceholder',
    },
    {
      type: 'input',
      key: 'music:album:track',
      labelKey: 'tools.og-meta-generator.schemas.musicSong.trackLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicSong.trackPlaceholder',
    },
    {
      type: 'input-multiple',
      key: 'music:musician',
      labelKey: 'tools.og-meta-generator.schemas.musicSong.musicianLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicSong.musicianPlaceholder',
    },
  ],
};
