import type { CountryCode, NumberType } from 'libphonenumber-js';
import lookup from 'country-code-lookup';

export { formatTypeToHumanReadable, getDefaultCountryCode, getFullCountryName };

const typeToLabelKey: Record<NonNullable<NumberType>, string> = {
  MOBILE: 'typeMobile',
  FIXED_LINE: 'typeFixedLine',
  FIXED_LINE_OR_MOBILE: 'typeFixedLineOrMobile',
  PERSONAL_NUMBER: 'typePersonalNumber',
  PREMIUM_RATE: 'typePremiumRate',
  SHARED_COST: 'typeSharedCost',
  TOLL_FREE: 'typeTollFree',
  UAN: 'typeUan',
  VOICEMAIL: 'typeVoicemail',
  VOIP: 'typeVoip',
  PAGER: 'typePager',
};

function formatTypeToHumanReadable(type: NumberType, t: (key: string) => string): string | undefined {
  if (!type) {
    return undefined;
  }

  return t(`tools.phone-parser-and-formatter.${typeToLabelKey[type]}`);
}

function getFullCountryName(countryCode: string | undefined, locale: string) {
  if (!countryCode) {
    return undefined;
  }

  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(countryCode) ?? lookup.byIso(countryCode)?.country;
  }
  catch {
    return lookup.byIso(countryCode)?.country;
  }
}

function getDefaultCountryCode({
  locale = window.navigator.language,
  defaultCode = 'FR',
}: { locale?: string, defaultCode?: CountryCode } = {}): CountryCode {
  const countryCode = locale.split('-')[1]?.toUpperCase();

  if (!countryCode) {
    return defaultCode;
  }

  return (lookup.byIso(countryCode)?.iso2 ?? defaultCode) as CountryCode;
}
