import type { OGSchemaType } from '../OGSchemaType.type';
import { videoMovie } from './videoMovie';

export const videoOther: OGSchemaType = {
  nameKey: 'tools.og-meta-generator.schemas.videoOther.name',
  elements: [
    ...videoMovie.elements,
  ],
};
