import { afterEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { getExtensionFromMimeType, getMimeTypeFromBase64, getMimeTypeFromExtension, previewImageFromBase64, useDownloadFileFromBase64 } from './downloadBase64';

afterEach(() => {
  vi.restoreAllMocks();
  document.body.replaceChildren();
});

describe('base64 file downloads', () => {
  it.each([
    ['SGVsbG8=', undefined, undefined, 'data:text/plain;base64,SGVsbG8=', 'file.txt'],
    ['SGVsbG8=', 'report', 'txt', 'data:text/plain;base64,SGVsbG8=', 'report.txt'],
    ['SGVsbG8=', 'report.txt', '.txt', 'data:text/plain;base64,SGVsbG8=', 'report.txt'],
    ['SGVsbG8=', 'report', 'unknown-extension', 'data:application/octet-stream;base64,SGVsbG8=', 'report.unknown-extension'],
    ['iVBORw0KGgo=', undefined, '', 'data:image/png;base64,iVBORw0KGgo=', 'file.png'],
    ['data:image/png;base64,iVBORw0KGgo=', undefined, undefined, 'data:image/png;base64,iVBORw0KGgo=', 'file.png'],
    ['data:application/x-custom;base64,SGVsbG8=', undefined, undefined, 'data:application/x-custom;base64,SGVsbG8=', 'file.txt'],
  ])('downloads %s with the correct data URL and filename', (source, filename, extension, url, expectedName) => {
    let anchor: { href: string, download: string } | undefined;
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      anchor = { href: this.href, download: this.download };
    });
    useDownloadFileFromBase64({ source: ref(source), filename, extension }).download();
    expect(anchor?.href).toBe(url);
    expect(anchor?.download).toBe(expectedName);
  });

  it('rejects an empty download', () => {
    expect(() => useDownloadFileFromBase64({ source: ref('') }).download()).toThrow('Base64 string is empty');
  });

  it('resolves both MIME lookup directions and JPEG signatures', () => {
    expect(getMimeTypeFromExtension('txt')).toBe('text/plain');
    expect(getExtensionFromMimeType('text/plain')).toBe('txt');
    expect(getMimeTypeFromBase64({ base64String: '/9j/AAAA' }).mimeType).toBe('image/jpeg');
  });

  it('previews raw image bytes with a data URL', () => {
    const container = document.createElement('div');
    container.id = 'previewContainer';
    document.body.append(container);
    expect(previewImageFromBase64('iVBORw0KGgo=').src).toBe('data:image/png;base64,iVBORw0KGgo=');
  });
});
