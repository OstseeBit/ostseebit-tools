import type { OGSchemaType } from '../OGSchemaType.type';

export const videoMovie: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.videoMovie.name',
  elements: [
    {
      type: 'input-multiple',
      key: 'video:actor',
      labelKey: 'tools.og-meta-generator.schemas.videoMovie.actorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoMovie.actorPlaceholder',
    },
    {
      type: 'input-multiple',
      key: 'video:director',
      labelKey: 'tools.og-meta-generator.schemas.videoMovie.directorLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoMovie.directorPlaceholder',
    },
    {
      type: 'input-multiple',
      key: 'video:writer',
      labelKey: 'tools.og-meta-generator.schemas.videoMovie.writerLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoMovie.writerPlaceholder',
    },
    {
      type: 'input',
      key: 'video:duration',
      labelKey: 'tools.og-meta-generator.schemas.videoMovie.durationLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoMovie.durationPlaceholder',
    },
    {
      type: 'input',
      key: 'video:release_date',
      labelKey: 'tools.og-meta-generator.schemas.videoMovie.releaseDateLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoMovie.releaseDatePlaceholder',
    },
    {
      type: 'input',
      key: 'video:tag',
      labelKey: 'tools.og-meta-generator.schemas.videoMovie.tagLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoMovie.tagPlaceholder',
    },
  ],
};
