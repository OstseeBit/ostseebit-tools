import WarningIcon from '~icons/mdi/alert-circle-outline';
import ErrorIcon from '~icons/mdi/close-circle-outline';

import { defineThemes } from '../theme/theme.models';
import { appThemes } from '../theme/themes';
import { colorTokens } from '../theme/tokens';

export const { useTheme } = defineThemes({
  dark: {
    warning: {
      backgroundColor: appThemes.dark.warning.colorFaded,
      borderColor: appThemes.dark.warning.color,
      textColor: appThemes.dark.warning.color,
      icon: WarningIcon,
    },
    error: {
      backgroundColor: appThemes.dark.error.colorFaded,
      borderColor: appThemes.dark.error.color,
      textColor: appThemes.dark.error.color,
      icon: ErrorIcon,
    },
  },
  light: {
    warning: {
      backgroundColor: appThemes.light.warning.colorFaded,
      borderColor: appThemes.light.warning.color,
      // Text auf der getönten Fläche braucht 4,5:1 (Farben aus den Tokens).
      textColor: colorTokens.light.amberText,
      icon: WarningIcon,
    },
    error: {
      backgroundColor: appThemes.light.error.colorFaded,
      borderColor: appThemes.light.error.color,
      textColor: colorTokens.light.danger,
      icon: ErrorIcon,
    },
  },
});
