import RandExp from 'randexp';
import { describe, expect, it, vi } from 'vitest';
import { generateRegexSample, SAMPLE_LIMIT_MESSAGE } from './regex-sample.service';

describe('bounded regex samples', () => {
  it.each(['a{100000000}', '(a{1000}){1000}', '(){100000000}', '(a{4000})\\1\\1', 'a'.repeat(2049), 'a{100000000,}', `${'('.repeat(101)}a${')'.repeat(101)}`])('rejects excessive expansion for %s', (pattern) => {
    expect(() => generateRegexSample(pattern)).toThrow(SAMPLE_LIMIT_MESSAGE);
  });

  it.each(['hello', '[A-Z]{3}[0-9]{2}', '(ab|cd){2}', '(ab)\\1', 'a*', ''])('preserves ordinary sample behavior for %s', (pattern) => {
    const sample = generateRegexSample(pattern);
    expect(new RegExp(`^(?:${pattern})$`).test(sample)).toBe(true);
  });

  it('reports malformed expressions', () => {
    expect(() => generateRegexSample('[')).toThrow();
  });
});

it('preserves deterministic RandExp output and resets budgets per call', () => {
  const random = vi.spyOn(Math, 'random').mockReturnValue(0.5);
  try {
    for (const pattern of ['(ab|cd){2}', '(a{3})\\1', '[A-Z]{8}']) {
      const expected = new RandExp(new RegExp(pattern)).gen();
      expect(generateRegexSample(pattern)).toBe(expected);
      expect(generateRegexSample(pattern)).toBe(expected);
    }
  }
  finally {
    random.mockRestore();
  }
});
