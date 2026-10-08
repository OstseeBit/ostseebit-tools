import type { XMLFormatterOptions } from 'xml-formatter';
import xmlFormat from 'xml-formatter';
import { withDefaultOnError } from '@/utils/defaults';

export { formatXml, parseXml };

function cleanRawXml(rawXml: string): string {
  return rawXml.trim();
}

function formatXml(rawXml: string, options?: XMLFormatterOptions): string {
  return withDefaultOnError(() => xmlFormat(cleanRawXml(rawXml), options) ?? '', '');
}

// Throws on invalid XML (via the underlying xml-formatter library) so it can
// be used directly with createParseValidationRule, same as the JSON/YAML/TOML
// parsers used by the other format-converter tools.
function parseXml(rawXml: string): string {
  return xmlFormat(cleanRawXml(rawXml));
}
