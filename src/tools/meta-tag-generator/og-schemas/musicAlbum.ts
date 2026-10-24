import type { OGSchemaType } from '../OGSchemaType.type';

export const musicAlbum: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.musicAlbum.name',
  elements: [
    {
      type: 'input',
      key: 'music:song',
      labelKey: 'tools.og-meta-generator.schemas.musicAlbum.songLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicAlbum.songPlaceholder',
    },
    {
      type: 'input',
      key: 'music:song:disc',
      labelKey: 'tools.og-meta-generator.schemas.musicAlbum.discLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicAlbum.discPlaceholder',
    },
    {
      type: 'input',
      key: 'music:song:track',
      labelKey: 'tools.og-meta-generator.schemas.musicAlbum.trackLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicAlbum.trackPlaceholder',
    },
    {
      type: 'input',
      key: 'music:musician',
      labelKey: 'tools.og-meta-generator.schemas.musicAlbum.musicianLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicAlbum.musicianPlaceholder',
    },
    {
      type: 'input',
      key: 'music:release_date',
      labelKey: 'tools.og-meta-generator.schemas.musicAlbum.releaseDateLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicAlbum.releaseDatePlaceholder',
    },
  ],
};
