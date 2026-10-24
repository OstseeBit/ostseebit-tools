import type { OGSchemaType } from '../OGSchemaType.type';
import { videoMovie } from './videoMovie';

export const videoEpisode: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.videoEpisode.name',
  elements: [
    ...videoMovie.elements,
    {
      type: 'input',
      key: 'video:series',
      labelKey: 'tools.og-meta-generator.schemas.videoEpisode.seriesLabel',
      placeholderKey: 'tools.og-meta-generator.schemas.videoEpisode.seriesPlaceholder',
    },
  ],
};
