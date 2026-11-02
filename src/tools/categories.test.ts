import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { categoryIds, colorTokens } from '../ui/theme/tokens';
import { tools, toolsByCategory } from './index';

const localesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../locales');

describe('kategorien der Werkzeuge', () => {
  it('jedes Werkzeug gehört zu genau einer Kategorie', () => {
    const paths = tools.map(tool => tool.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.length).toBeGreaterThan(0);
  });

  it('jede Kategorie hat eine bekannte Kennung, eine Farbe und mindestens ein Werkzeug', () => {
    const ids = toolsByCategory.map(category => category.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const category of toolsByCategory) {
      expect(categoryIds, category.name).toContain(category.id);
      expect(category.components.length, category.name).toBeGreaterThan(0);
      expect(colorTokens.light.categories[category.id], category.name).toBeTruthy();
      expect(colorTokens.dark.categories[category.id], category.name).toBeTruthy();
    }
  });

  it('die Reihenfolge der Kategorien entspricht der Reihenfolge der Tokens', () => {
    expect(toolsByCategory.map(category => category.id)).toEqual([...categoryIds]);
  });

  it('jede Kategorie hat in jeder Sprachdatei einen Namen', () => {
    const files = readdirSync(localesDir).filter(file => file.endsWith('.yml'));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const content = parse(readFileSync(resolve(localesDir, file), 'utf8')) as { tools: { categories: Record<string, string> } };
      for (const category of toolsByCategory) {
        const key = category.name.toLowerCase();
        expect(content.tools.categories[key], `${file}: ${key}`).toBeTruthy();
      }
    }
  });
});
