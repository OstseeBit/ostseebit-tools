import { afterEach, describe, expect, it, vi } from 'vitest';
import { createToken, normalizeTokenLength } from './token-generator.service';

describe('token-generator', () => {
  describe('createToken', () => {
    it('should generate an empty string when all params are false', () => {
      const token = createToken({
        withLowercase: false,
        withUppercase: false,
        withNumbers: false,
        withSymbols: false,
        length: 10,
      });

      expect(token).toHaveLength(0);
    });

    it('should generate a random string with the specified length', () => {
      const createTokenWithLength = (length: number) =>
        createToken({
          withLowercase: true,
          withUppercase: true,
          withNumbers: true,
          withSymbols: true,
          length,
        });

      expect(createTokenWithLength(5)).toHaveLength(5);
      expect(createTokenWithLength(10)).toHaveLength(10);
      expect(createTokenWithLength(100)).toHaveLength(100);
    });

    it('should generate a random string with just uppercase if only withUppercase is set', () => {
      const token = createToken({
        withLowercase: false,
        withUppercase: true,
        withNumbers: false,
        withSymbols: false,
        length: 256,
      });

      expect(token).toHaveLength(256);
      expect(token).toMatch(/^[A-Z]+$/);
    });

    it('should generate a random string with just lowercase if only withLowercase is set', () => {
      const token = createToken({
        withLowercase: true,
        withUppercase: false,
        withNumbers: false,
        withSymbols: false,
        length: 256,
      });

      expect(token).toHaveLength(256);
      expect(token).toMatch(/^[a-z]+$/);
    });

    it('should generate a random string with just numbers if only withNumbers is set', () => {
      const token = createToken({
        withLowercase: false,
        withUppercase: false,
        withNumbers: true,
        withSymbols: false,
        length: 256,
      });

      expect(token).toHaveLength(256);
      expect(token).toMatch(/^\d+$/);
    });

    it('should generate a random string with just symbols if only withSymbols is set', () => {
      const token = createToken({
        withLowercase: false,
        withUppercase: false,
        withNumbers: false,
        withSymbols: true,
        length: 256,
      });

      expect(token).toHaveLength(256);
      const symbols = new Set('.,;:!?./-"\'#{([-|\\@)]=}*+');
      expect([...token].every(character => symbols.has(character))).toBe(true);
    });

    it('should generate a random string with just letters (case incensitive) with withLowercase and withUppercase', () => {
      const token = createToken({
        withLowercase: true,
        withUppercase: true,
        withNumbers: false,
        withSymbols: false,
        length: 256,
      });

      expect(token).toHaveLength(256);
      expect(token).toMatch(/^[a-z]+$/i);
    });
  });
});

describe('secure token generation', () => {
  afterEach(() => vi.restoreAllMocks());

  it.each([0, -1, 513, 10000000, 1.5, Number.NaN, Number.POSITIVE_INFINITY])('rejects invalid length %s before requesting randomness', (length) => {
    const random = vi.spyOn(globalThis.crypto, 'getRandomValues');
    expect(() => createToken({ length })).toThrow(RangeError);
    expect(random).not.toHaveBeenCalled();
    expect(normalizeTokenLength(length)).toBe(64);
  });

  it('rejects biased bytes and preserves all alphabet characters', () => {
    const random = vi.spyOn(globalThis.crypto, 'getRandomValues');
    random.mockImplementationOnce((array) => {
      (array as Uint8Array).set([255, 0, 1]);
      return array;
    });
    random.mockImplementationOnce((array) => {
      (array as Uint8Array).set([2, 0, 0]);
      return array;
    });
    expect(createToken({ alphabet: 'abc', length: 3 })).toBe('abc');
    expect(random).toHaveBeenCalledTimes(2);
  });

  it('fails closed when secure randomness fails', () => {
    vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation(() => {
      throw new Error('Unavailable');
    });
    expect(() => createToken({})).toThrow('Unavailable');
  });

  it('accepts the boundary lengths', () => {
    expect(createToken({ length: 1 })).toHaveLength(1);
    expect(createToken({ length: 512 })).toHaveLength(512);
    expect(normalizeTokenLength(512)).toBe(512);
  });
});
