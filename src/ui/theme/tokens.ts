/**
 * Design-Tokens: die einzige Quelle für Farben, Radien, Abstände und Schriftgrößen.
 *
 * Alle Werte sind Hexwerte (oder rgba), weil Naive UI die Override-Farben mit `seemly` weiterrechnet
 * und bei `var(--…)` mit "Invalid color value" abbricht. Aus diesen Werten entsteht die statische
 * Datei `src/assets/tokens.css` (`pnpm tokens:build`); ein Test prüft, dass beide übereinstimmen
 * und dass die Kontrastpaare halten (siehe tokens.test.ts).
 *
 * Palette "Ostseelicht": hell mit Himmelston und Meerblau, Bernstein als Akzent, je Kategorie eine
 * eigene Farbe; Dunkelmodus "Abendsee". Die Verhältnisse in den Kommentaren sind nach WCAG 2.x gerechnet.
 */

export type ThemeMode = 'light' | 'dark';

export const categoryIds = ['dev', 'data', 'net', 'sec', 'ops', 'calc'] as const;
export type CategoryId = typeof categoryIds[number];

export interface ColorTokens {
  /** Seitenhintergrund. */
  bg: string
  /** Himmelston oben im Hauptbereich (Verlaufsbeginn). */
  sky: string
  /** Karten, Kopfleiste, Eingaben. */
  surface: string
  text: string
  muted: string
  primary: string
  primaryHover: string
  primaryPress: string
  onPrimary: string
  amberText: string
  amberFill: string
  onAmber: string
  /** Rand von Eingabefeldern und Bedienelementen, mindestens 3:1 (WCAG 1.4.11). */
  fieldBorder: string
  /** Haarlinie, dekorativ. */
  line: string
  tint: string
  hover: string
  danger: string
  ok: string
  /** Anteil der Kategoriefarbe in der Symbolfläche (CSS-Prozentwert). */
  categoryTintPercent: string
  categories: Record<CategoryId, string>
  /** Schaltflächen und Felder ohne Betonung (halbtransparent über der Fläche). */
  neutral: { color: string, hover: string, pressed: string }
  /** Halbtransparente Abdunklung hinter Dialogen. */
  scrim: string
}

export const colorTokens: Record<ThemeMode, ColorTokens> = {
  light: {
    bg: '#f1f8fb', //             13,92:1 mit text
    sky: '#dff1f8',
    surface: '#ffffff', //        14,95:1 mit text
    text: '#0f2a36',
    muted: '#46616d', //          6,13:1 auf bg, 6,58:1 auf surface
    primary: '#0a6a8a', //        6,10:1 auf surface, weißer Text darauf 6,10:1
    primaryHover: '#07566f',
    primaryPress: '#054559',
    onPrimary: '#ffffff',
    amberText: '#8f4500', //      6,96:1 auf surface
    amberFill: '#ffc247', //      nur Fläche, trägt nie allein Bedeutung
    onAmber: '#3a2200', //        9,27:1 auf amberFill
    fieldBorder: '#6a8794', //    3,81:1 auf surface, 3,55:1 auf bg
    line: '#d7e7ee',
    tint: '#e0f2f8',
    hover: '#eaf5f9',
    danger: '#b42318', //         6,57:1 auf surface
    ok: '#0a6b3d',
    categoryTintPercent: '13%',
    categories: {
      dev: '#0a6ea8',
      data: '#0b7a82',
      net: '#4a58c2',
      sec: '#b4472a',
      ops: '#3b7a28',
      calc: '#97570a',
    },
    neutral: { color: 'rgba(15, 42, 54, 0.05)', hover: 'rgba(15, 42, 54, 0.09)', pressed: 'rgba(15, 42, 54, 0.18)' },
    scrim: 'rgba(10, 30, 40, 0.5)',
  },
  dark: {
    bg: '#12232f', //             14,53:1 mit text
    sky: '#1a3a4b',
    surface: '#1a3140', //        12,20:1 mit text
    text: '#ecf5f9',
    muted: '#a9c1cc', //          8,56:1 auf bg, 7,18:1 auf surface
    primary: '#52d3ee', //        7,65:1 auf surface, dunkler Text darauf 9,26:1
    primaryHover: '#8be3f5',
    primaryPress: '#b9f0fa',
    onPrimary: '#0b2230',
    amberText: '#ffc857', //      8,77:1 auf surface
    amberFill: '#ffc857',
    onAmber: '#0b2230',
    fieldBorder: '#7396a6', //    4,27:1 auf surface, 3,14:1 auf hover
    line: '#2a4a5b',
    tint: '#21424f',
    hover: '#244757',
    danger: '#ff9b90', //         6,64:1 auf surface
    ok: '#4ade80',
    categoryTintPercent: '18%',
    categories: {
      dev: '#69bff5',
      data: '#4fd6c8',
      net: '#a3aeff',
      sec: '#ff9f80',
      ops: '#93d96d',
      calc: '#f6c560',
    },
    neutral: { color: 'rgba(236, 245, 249, 0.08)', hover: 'rgba(236, 245, 249, 0.12)', pressed: 'rgba(236, 245, 249, 0.24)' },
    scrim: 'rgba(4, 14, 20, 0.65)',
  },
};

/** Radien in px. */
export const radiusTokens = { sm: 8, md: 10, lg: 12, pill: 999 } as const;

/** Abstandsskala in px. */
export const spaceTokens = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48 } as const;

/** Schriftgrößen. */
export const fontSizeTokens = {
  'xs': '0.75rem',
  'sm': '0.8125rem',
  'base': '0.9375rem',
  'lg': '1rem',
  'xl': '1.125rem',
  '2xl': 'clamp(1.25rem, 1rem + 0.6vw, 1.5rem)',
} as const;

const colorKeys: Array<[keyof ColorTokens, string]> = [
  ['bg', 'bg'],
  ['sky', 'sky'],
  ['surface', 'surface'],
  ['text', 'text'],
  ['muted', 'muted'],
  ['primary', 'primary'],
  ['primaryHover', 'primary-hover'],
  ['primaryPress', 'primary-press'],
  ['onPrimary', 'on-primary'],
  ['amberText', 'amber-text'],
  ['amberFill', 'amber-fill'],
  ['onAmber', 'on-amber'],
  ['fieldBorder', 'field-border'],
  ['line', 'line'],
  ['tint', 'tint'],
  ['hover', 'hover'],
  ['danger', 'danger'],
  ['ok', 'ok'],
  ['scrim', 'scrim'],
];

function colorBlock(mode: ThemeMode): string {
  const tokens = colorTokens[mode];
  const lines = colorKeys.map(([key, name]) => `  --c-${name}: ${tokens[key] as string};`);
  lines.push(`  --c-category-tint: ${tokens.categoryTintPercent};`);
  for (const id of categoryIds) {
    lines.push(`  --c-cat-${id}: ${tokens.categories[id]};`);
  }
  return lines.join('\n');
}

/** Erzeugt den Inhalt von `src/assets/tokens.css` (Hell auf :root, Dunkel auf .dark). */
export function renderTokensCss(): string {
  const radius = Object.entries(radiusTokens).map(([k, v]) => `  --radius-${k}: ${v}px;`).join('\n');
  const space = Object.entries(spaceTokens).map(([k, v]) => `  --space-${k}: ${v}px;`).join('\n');
  const fontSize = Object.entries(fontSizeTokens).map(([k, v]) => `  --fs-${k}: ${v};`).join('\n');

  return `/*
 * Design-Tokens als CSS-Variablen.
 * Erzeugt aus src/ui/theme/tokens.ts mit "pnpm tokens:build". Nicht von Hand ändern;
 * ein Test (tokens.test.ts) schlägt an, wenn Datei und Quelle auseinanderlaufen.
 */

:root {
  color-scheme: light;
${colorBlock('light')}
${radius}
${space}
${fontSize}
}

.dark {
  color-scheme: dark;
${colorBlock('dark')}
}
`;
}
