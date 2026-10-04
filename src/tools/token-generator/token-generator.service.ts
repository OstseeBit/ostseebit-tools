export const MAX_TOKEN_LENGTH = 512;

export function normalizeTokenLength(value: number) {
  return Number.isInteger(value) && value >= 1 && value <= MAX_TOKEN_LENGTH ? value : 64;
}

export function createToken({
  withUppercase = true,
  withLowercase = true,
  withNumbers = true,
  withSymbols = false,
  length = 64,
  alphabet,
}: {
  withUppercase?: boolean
  withLowercase?: boolean
  withNumbers?: boolean
  withSymbols?: boolean
  length?: number
  alphabet?: string
}) {
  if (!Number.isInteger(length) || length < 1 || length > MAX_TOKEN_LENGTH) {
    throw new RangeError('Token length must be an integer between 1 and 512.');
  }

  const allAlphabet = alphabet ?? [
    withUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
    withLowercase ? 'abcdefghijklmnopqrstuvwxyz' : '',
    withNumbers ? '0123456789' : '',
    withSymbols ? '.,;:!?./-"\'#{([-|\\@)]=}*+' : '',
  ].join('');

  const characters = [...new Set(allAlphabet)];
  if (characters.length === 0) {
    return '';
  }
  if (characters.length > 256) {
    throw new RangeError('Token alphabet must contain at most 256 unique characters.');
  }

  // Reject the incomplete interval to keep every character equally likely.
  const limit = 256 - (256 % characters.length);
  const bytes = new Uint8Array(length);
  const result: string[] = [];
  while (result.length < length) {
    globalThis.crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      if (byte < limit) {
        result.push(characters[byte % characters.length]);
        if (result.length === length) {
          break;
        }
      }
    }
  }
  return result.join('');
}
