import { defineThemes } from '../theme/theme.models';
import { colorTokens } from '../theme/tokens';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: colorTokens.dark.surface,
    borderColor: colorTokens.dark.line,
  },
  light: {
    backgroundColor: colorTokens.light.surface,
    borderColor: colorTokens.light.line,
  },
});
