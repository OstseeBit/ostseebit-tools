import { describe, expect, it } from 'vitest';
import { isChunkLoadError } from './chunk-error';

describe('isChunkLoadError', () => {
  it.each([
    'Failed to fetch dynamically imported module: http://localhost/assets/tool-abc.js',
    'error loading dynamically imported module: /assets/tool-abc.js',
    'Importing a module script failed.',
    'Unable to preload CSS for /assets/tool.css',
  ])('erkennt "%s"', (message) => {
    expect(isChunkLoadError(new TypeError(message))).toBe(true);
  });

  it('erkennt Zeichenketten', () => {
    expect(isChunkLoadError('Failed to fetch dynamically imported module')).toBe(true);
  });

  it('ignoriert andere Fehler', () => {
    expect(isChunkLoadError(new Error('Cannot read properties of undefined'))).toBe(false);
    expect(isChunkLoadError(undefined)).toBe(false);
  });
});
