import type { GlobalThemeOverrides } from 'naive-ui';

// Akzentfarbe aus ostseebit-app (static/css/core/_neomorphic-tokens.css, --color-accent),
// dort bereits auf WCAG-AA-Kontrast (~5.25:1 auf #e0e0e0) geprüft.
export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'var(--font-sans)',
    fontFamilyMono: 'var(--font-mono)',
    primaryColor: '#086278',
    primaryColorHover: '#0a7a94',
    primaryColorPressed: '#054a5c',
    primaryColorSuppl: '#0a7a94',
  },
  Menu: {
    itemHeight: '32px',
  },

  Layout: { color: '#f1f5f9' },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

// Dark-Mode-Akzent aus ostseebit-app (--color-accent / --color-accent-light / --color-accent-dark).
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'var(--font-sans)',
    fontFamilyMono: 'var(--font-mono)',
    primaryColor: '#22d3ee',
    primaryColorHover: '#67e8f9',
    primaryColorPressed: '#0891b2',
    primaryColorSuppl: '#67e8f9',
  },

  Notification: {
    color: '#333333',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#1c1c1c',
    siderColor: '#232323',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#232323',
    borderColor: '#282828',
  },

  Table: {
    tdColor: '#232323',
    thColor: '#353535',
  },
};
