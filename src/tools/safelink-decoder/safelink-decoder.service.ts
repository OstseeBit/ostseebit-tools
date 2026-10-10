export function decodeSafeLinksURL(safeLinksUrl: string, t: (key: string) => string) {
  if (!/\.safelinks\.protection\.outlook\.com/.test(safeLinksUrl)) {
    throw new Error(t('tools.safelink-decoder.invalidUrlError'));
  }

  return new URL(safeLinksUrl).searchParams.get('url');
}
