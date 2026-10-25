import { defineThemes } from '../theme/theme.models';
import { colorTokens } from '../theme/tokens';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: colorTokens.dark.bg,
    borderColor: colorTokens.dark.fieldBorder,

    focus: {
      backgroundColor: `${colorTokens.dark.primary}1a`,
    },
  },
  light: {
    backgroundColor: colorTokens.light.surface,
    borderColor: colorTokens.light.fieldBorder,

    focus: {
      backgroundColor: colorTokens.light.surface,
    },
  },
});
