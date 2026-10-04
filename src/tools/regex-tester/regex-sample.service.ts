import RandExp from 'randexp';

export const MAX_SAMPLE_PATTERN_LENGTH = 2048;
export const SAMPLE_LIMIT_MESSAGE = 'Sample generation exceeded its safety limit. Simplify the expression.';

// RandExp 0.5.x has no public work/output budget. Guard every recursive
// expansion, including empty repetitions and backreferences, not only max.
interface BudgetedGenerator {
  _gen: (token: unknown, groups: unknown[]) => string
}

export function generateRegexSample(pattern: string) {
  if (pattern.length > MAX_SAMPLE_PATTERN_LENGTH) {
    throw new Error(SAMPLE_LIMIT_MESSAGE);
  }
  const generator = new RandExp(new RegExp(pattern.replace(/\(\?<[^>]*>/g, '(?:')));
  const internal = generator as unknown as BudgetedGenerator;
  const expand = internal._gen;
  if (typeof expand !== 'function') {
    throw new TypeError('Sample generator is incompatible with the safety guard.');
  }
  let depth = 0;
  let steps = 0;
  let characters = 0;
  internal._gen = (token, groups) => {
    if (++steps > 10000 || ++depth > 100) {
      throw new Error(SAMPLE_LIMIT_MESSAGE);
    }
    const result = expand.call(generator, token, groups);
    depth--;
    characters += result.length;
    if (result.length > 4096 || characters > 16384) {
      throw new Error(SAMPLE_LIMIT_MESSAGE);
    }
    return result;
  };
  return generator.gen();
}
