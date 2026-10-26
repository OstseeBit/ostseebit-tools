import type { ColorTokens, ThemeMode } from './tokens';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import { describe, expect, it } from 'vitest';
import { darkThemeOverrides, lightThemeOverrides } from '../../themes';
import { categoryIds, colorTokens, radiusTokens, renderTokensCss } from './tokens';

extend([a11yPlugin]);

const modes: ThemeMode[] = ['light', 'dark'];
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const readText = (path: string) => readFileSync(resolve(root, path), 'utf8').replace(/\r\n/g, '\n');

function contrast(a: string, b: string) {
  return colord(a).contrast(b);
}

/** Mischung wie `color-mix(in srgb, farbe anteil, hintergrund)`, kanalweise linear. */
function mix(color: string, background: string, percent: number) {
  const c = colord(color).toRgb();
  const b = colord(background).toRgb();
  const channel = (x: number, y: number) => Math.round(x * (percent / 100) + y * (1 - percent / 100));
  return colord({ r: channel(c.r, b.r), g: channel(c.g, b.g), b: channel(c.b, b.b) }).toHex();
}

describe('tokens', () => {
  it('src/assets/tokens.css stimmt mit tokens.ts überein (sonst: pnpm tokens:build)', () => {
    expect(readText('src/assets/tokens.css')).toBe(renderTokensCss());
  });

  it('theme-color in index.html entspricht der hellen Primärfarbe', () => {
    expect(readText('index.html')).toContain(`<meta name="theme-color" content="${colorTokens.light.primary}" />`);
  });

  it.each(modes)('%s: alle Farben sind gültige Hexwerte oder rgba', (mode) => {
    const tokens = colorTokens[mode];
    const values = [
      ...Object.entries(tokens).filter(([, v]) => typeof v === 'string' && !v.endsWith('%')).map(([, v]) => v as string),
      ...Object.values(tokens.categories),
      ...Object.values(tokens.neutral),
    ];
    for (const value of values) {
      expect(colord(value).isValid(), value).toBe(true);
    }
  });

  it('jede Kategorie hat in beiden Modi eine Farbe', () => {
    for (const mode of modes) {
      for (const id of categoryIds) {
        expect(colorTokens[mode].categories[id], `${mode}/${id}`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });
});

describe('kontrast (WCAG 2.x)', () => {
  const textPairs: Array<[keyof ColorTokens, keyof ColorTokens]> = [
    ['text', 'bg'],
    ['text', 'surface'],
    ['text', 'tint'],
    ['text', 'hover'],
    ['muted', 'bg'],
    ['muted', 'surface'],
    ['muted', 'tint'],
    ['muted', 'hover'],
    ['muted', 'sky'],
    ['primary', 'bg'],
    ['primary', 'surface'],
    ['primary', 'tint'],
    ['primary', 'hover'],
    ['primary', 'sky'],
    ['amberText', 'bg'],
    ['amberText', 'surface'],
    ['amberText', 'tint'],
    ['danger', 'surface'],
    ['danger', 'bg'],
    ['danger', 'tint'],
    ['onPrimary', 'primary'],
    ['onPrimary', 'primaryHover'],
    ['onAmber', 'amberFill'],
    ['bg', 'text'],
  ];

  const nonTextPairs: Array<[keyof ColorTokens, keyof ColorTokens]> = [
    ['fieldBorder', 'surface'],
    ['fieldBorder', 'bg'],
    ['fieldBorder', 'tint'],
    ['fieldBorder', 'hover'],
    ['primary', 'bg'],
    ['primary', 'surface'],
    ['primary', 'tint'],
    ['ok', 'surface'],
  ];

  it.each(modes)('%s: Text erreicht mindestens 4,5:1', (mode) => {
    const tokens = colorTokens[mode];
    for (const [fg, bg] of textPairs) {
      expect(contrast(tokens[fg] as string, tokens[bg] as string), `${mode}: ${fg} auf ${bg}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(modes)('%s: Ränder und Symbole erreichen mindestens 3:1', (mode) => {
    const tokens = colorTokens[mode];
    for (const [fg, bg] of nonTextPairs) {
      expect(contrast(tokens[fg] as string, tokens[bg] as string), `${mode}: ${fg} auf ${bg}`).toBeGreaterThanOrEqual(3);
    }
  });

  it.each(modes)('%s: Kategoriefarben sind als Symbol auf ihrer Tönung und den Flächen lesbar (3:1)', (mode) => {
    const tokens = colorTokens[mode];
    const percent = Number.parseFloat(tokens.categoryTintPercent);
    for (const id of categoryIds) {
      const color = tokens.categories[id];
      const tint = mix(color, tokens.surface, percent);
      for (const [name, background] of [['Tönung', tint], ['surface', tokens.surface], ['bg', tokens.bg], ['tint', tokens.tint]]) {
        expect(contrast(color, background), `${mode}: ${id} auf ${name}`).toBeGreaterThanOrEqual(3);
      }
    }
  });
});

describe('naive-ui-overrides', () => {
  function colorValues(node: unknown, path: string[] = []): Array<[string, string]> {
    if (typeof node === 'string') {
      return /color|border|background/i.test(path[path.length - 1] ?? '') && !/font/i.test(path[path.length - 1] ?? '') ? [[path.join('.'), node]] : [];
    }
    if (node && typeof node === 'object') {
      return Object.entries(node).flatMap(([key, value]) => colorValues(value, [...path, key]));
    }
    return [];
  }

  it.each([['light', lightThemeOverrides], ['dark', darkThemeOverrides]] as const)('%s: keine var(--…)-Werte in Farben (Naive UI bricht sonst ab)', (_mode, overrides) => {
    for (const [path, value] of colorValues(overrides)) {
      expect(value, path).not.toContain('var(');
    }
  });

  it.each([['light', lightThemeOverrides], ['dark', darkThemeOverrides]] as const)('%s: Radien kommen aus den Tokens', (_mode, overrides) => {
    expect(overrides.common?.borderRadius).toBe(`${radiusTokens.md}px`);
    expect(overrides.common?.borderRadiusSmall).toBe(`${radiusTokens.sm}px`);
  });
});
