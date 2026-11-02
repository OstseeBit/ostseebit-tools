import { defineThemes } from './theme.models';
import { colorTokens } from './tokens';

const { light, dark } = colorTokens;

export const { themes: appThemes, useTheme: useAppTheme } = defineThemes({
  light: {
    background: light.surface,
    text: {
      baseColor: light.text,
      mutedColor: light.muted,
    },
    default: {
      color: light.neutral.color,
      colorHover: light.neutral.hover,
      colorPressed: light.neutral.pressed,
    },
    primary: {
      color: light.primary,
      colorHover: light.primaryHover,
      colorPressed: light.primaryPress,
      colorFaded: `${light.primary}1f`,
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#10b981',
      colorHover: '#34d399',
      colorPressed: '#059669',
      colorFaded: '#10b9812f',
    },
    error: {
      color: '#ef4444',
      colorHover: '#f87171',
      colorPressed: '#dc2626',
      colorFaded: '#ef44442a',
    },
  },
  dark: {
    background: dark.surface,
    text: {
      baseColor: dark.text,
      mutedColor: dark.muted,
    },
    default: {
      color: dark.neutral.color,
      colorHover: dark.neutral.hover,
      colorPressed: dark.neutral.pressed,
    },
    primary: {
      color: dark.primary,
      colorHover: dark.primaryHover,
      colorPressed: dark.primaryPress,
      colorFaded: `${dark.primary}2f`,
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#10b981',
      colorHover: '#34d399',
      colorPressed: '#059669',
      colorFaded: '#10b9812f',
    },
    error: {
      color: '#ef4444',
      colorHover: '#f87171',
      colorPressed: '#dc2626',
      colorFaded: '#ef444429',
    },
  },
});
