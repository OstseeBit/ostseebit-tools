import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#075985',
    primaryColorHover: '#0369a1',
    primaryColorPressed: '#0c4a6e',
    primaryColorSuppl: '#0369a1',
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

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#38bdf8',
    primaryColorHover: '#7dd3fc',
    primaryColorPressed: '#0ea5e9',
    primaryColorSuppl: '#7dd3fc',
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
