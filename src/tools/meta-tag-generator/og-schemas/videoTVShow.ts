import type { OGSchemaType } from '../OGSchemaType.type';
import { videoMovie } from './videoMovie';

export const videoTVShow: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.videoTVShow.name',
  elements: [
    ...videoMovie.elements,
  ],
};
