import { defineThemes } from '../theme/theme.models';
import { appThemes } from '../theme/themes';
import { colorTokens } from '../theme/tokens';

const sizes = {
  small: {
    height: '28px',
    fontSize: '12px',
  },
  medium: {
    height: '34px',
    fontSize: '14px',
  },
  large: {
    height: '40px',
    fontSize: '16px',
  },
};

export const { useTheme } = defineThemes({
  dark: {
    sizes,

    backgroundColor: colorTokens.dark.bg,
    borderColor: colorTokens.dark.fieldBorder,
    dropdownShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px',

    option: {
      hover: {
        backgroundColor: colorTokens.dark.hover,
      },
      active: {
        textColor: appThemes.dark.primary.color,
      },
    },

    focus: {
      backgroundColor: `${appThemes.dark.primary.color}1a`,
    },
  },
  light: {
    sizes,

    backgroundColor: colorTokens.light.surface,
    borderColor: colorTokens.light.fieldBorder,
    dropdownShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',

    option: {
      hover: {
        backgroundColor: colorTokens.light.hover,
      },
      active: {
        textColor: appThemes.light.primary.color,
      },
    },

    focus: {
      backgroundColor: colorTokens.light.surface,
    },
  },
});
