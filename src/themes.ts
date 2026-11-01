import type { GlobalThemeOverrides } from 'naive-ui';
import { colorTokens, radiusTokens } from '@/ui/theme/tokens';

const { light, dark } = colorTokens;

// Farben der Code-Hervorhebung (Naive UI, highlight.js). Die Standardwerte erreichen auf den Flächen
// nicht überall 4,5:1; die hier gesetzten schon (geprüft in tokens.test.ts).
export const lightCodeColors = {
  'mono-3': '#5a6070',
  'hue-1': '#00709f',
  'hue-2': '#2f63d6',
  'hue-4': '#3b7a3a',
  'hue-5': '#c2392d',
  'hue-6-2': '#8a5d00',
};
export const darkCodeColors = {
  'mono-3': '#9db0bb',
  'hue-5': '#ea8089',
  'hue-5-2': '#e57f72',
};

// Alle Farben kommen aus den Design-Tokens (Hexwerte): Naive UI rechnet mit ihnen weiter und
// verträgt keine `var(--…)`-Werte in den Overrides.
export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'var(--font-sans)',
    fontFamilyMono: 'var(--font-mono)',
    primaryColor: light.primary,
    primaryColorHover: light.primaryHover,
    primaryColorPressed: light.primaryPress,
    primaryColorSuppl: light.primaryHover,
    bodyColor: light.bg,
    borderColor: light.line,
    dividerColor: light.line,
    borderRadius: `${radiusTokens.md}px`,
    borderRadiusSmall: `${radiusTokens.sm}px`,
  },
  Menu: {
    itemHeight: '32px',
  },

  Layout: { color: light.bg },

  Code: lightCodeColors,

  // Eingabegrenzen brauchen mindestens 3:1 (WCAG 1.4.11).
  Input: {
    border: `1px solid ${light.fieldBorder}`,
    borderHover: `1px solid ${light.primary}`,
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'var(--font-sans)',
    fontFamilyMono: 'var(--font-mono)',
    primaryColor: dark.primary,
    primaryColorHover: dark.primaryHover,
    primaryColorPressed: dark.primaryPress,
    primaryColorSuppl: dark.primaryHover,
    bodyColor: dark.bg,
    cardColor: dark.surface,
    modalColor: dark.surface,
    popoverColor: dark.surface,
    borderColor: dark.line,
    dividerColor: dark.line,
    borderRadius: `${radiusTokens.md}px`,
    borderRadiusSmall: `${radiusTokens.sm}px`,
  },

  Notification: {
    color: dark.surface,
  },

  Code: darkCodeColors,

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: dark.surface },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: dark.bg,
    siderColor: dark.surface,
    siderBorderColor: 'transparent',
  },

  Card: {
    color: dark.surface,
    borderColor: dark.line,
  },

  Input: {
    border: `1px solid ${dark.fieldBorder}`,
    borderHover: `1px solid ${dark.primary}`,
  },

  Table: {
    tdColor: dark.surface,
    thColor: dark.tint,
  },
};
