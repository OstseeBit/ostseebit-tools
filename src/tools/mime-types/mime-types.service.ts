import mime from 'mime';
import otherTypes from 'mime/types/other.js';
import standardTypes from 'mime/types/standard.js';

export const mimeTypeToExtension: Record<string, string[]> = Object.fromEntries(
  Object.keys({ ...standardTypes, ...otherTypes }).map(type => [type, [...(mime.getAllExtensions(type) ?? [])]]),
);

export const extensionToMimeType: Record<string, string> = Object.fromEntries(
  [...new Set(Object.values(mimeTypeToExtension).flat())].flatMap((extension) => {
    const type = mime.getType(extension);
    return type ? [[extension, type]] : [];
  }),
);
