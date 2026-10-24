import type { OGSchemaType, OGSchemaTypeOption } from '../OGSchemaType.type';

const typeOptions: OGSchemaTypeOption[] = [
  { labelKey: 'tools.og-meta-generator.schemas.website.optionWebsite', value: 'website' },
  { labelKey: 'tools.og-meta-generator.schemas.website.optionArticle', value: 'article' },
  { labelKey: 'tools.og-meta-generator.schemas.website.optionBook', value: 'book' },
  { labelKey: 'tools.og-meta-generator.schemas.website.optionProfile', value: 'profile' },
  {
    type: 'group',
    key: 'Music',
    labelKey: 'tools.og-meta-generator.schemas.website.optionGroupMusic',
    children: [
      { labelKey: 'tools.og-meta-generator.schemas.website.optionSong', value: 'music.song' },
      { labelKey: 'tools.og-meta-generator.schemas.website.optionAlbum', value: 'music.album' },
      { labelKey: 'tools.og-meta-generator.schemas.website.optionPlaylist', value: 'music.playlist' },
      { labelKey: 'tools.og-meta-generator.schemas.website.optionRadioStation', value: 'music.radio_station' },
    ],
  },
  {
    type: 'group',
    key: 'Video',
    labelKey: 'tools.og-meta-generator.schemas.website.optionGroupVideo',
    children: [
      { labelKey: 'tools.og-meta-generator.schemas.website.optionMovie', value: 'video.movie' },
      { labelKey: 'tools.og-meta-generator.schemas.website.optionEpisode', value: 'video.episode' },
      { labelKey: 'tools.og-meta-generator.schemas.website.optionTvShow', value: 'video.tv_show' },
      { labelKey: 'tools.og-meta-generator.schemas.website.optionOtherVideo', value: 'video.other' },
    ],
  },
];

export const website: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.website.name',
  elements: [
    {
      type: 'select',
      key: 'type',
      labelKey: 'tools.og-meta-generator.schemas.website.typeLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.website.typePlaceholder',
      options: typeOptions,
    },
    {
      type: 'input',
      key: 'title',
      labelKey: 'tools.og-meta-generator.schemas.website.titleLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.website.titlePlaceholder',
    },
    {
      type: 'input',
      key: 'description',
      labelKey: 'tools.og-meta-generator.schemas.website.descriptionLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.website.descriptionPlaceholder',
    },
    {
      type: 'input',
      key: 'url',
      labelKey: 'tools.og-meta-generator.schemas.website.urlLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.website.urlPlaceholder',
    },
  ],
};
