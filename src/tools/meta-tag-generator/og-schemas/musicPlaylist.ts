import type { OGSchemaType } from '../OGSchemaType.type';

export const musicPlaylist: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.musicPlaylist.name',
  elements: [
    {
      type: 'input',
      key: 'music:song',
      labelKey: 'tools.og-meta-generator.schemas.musicPlaylist.songLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicPlaylist.songPlaceholder',
    },
    {
      type: 'input',
      key: 'music:song:disc',
      labelKey: 'tools.og-meta-generator.schemas.musicPlaylist.discLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicPlaylist.discPlaceholder',
    },
    {
      type: 'input',
      key: 'music:song:track',
      labelKey: 'tools.og-meta-generator.schemas.musicPlaylist.trackLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicPlaylist.trackPlaceholder',
    },
    {
      type: 'input',
      key: 'music:creator',
      labelKey: 'tools.og-meta-generator.schemas.musicPlaylist.creatorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.musicPlaylist.creatorPlaceholder',
    },
  ],
};
