import type { GlobalThemeOverrides } from 'naive-ui';
import { colorTokens, radiusTokens } from '@/ui/theme/tokens';

const { light, dark } = colorTokens;

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
