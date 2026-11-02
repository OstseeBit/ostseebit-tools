import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';
import { colorTokens } from './src/ui/theme/tokens.ts';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar({ compatible: true })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      // Akzentfarbe der Marke (fest, damit weißer Text auf `bg-primary` in beiden Modi lesbar bleibt).
      primary: colorTokens.light.primary,
      // Flächen und Linien folgen dem Modus über die CSS-Variablen aus src/assets/tokens.css.
      surface: 'var(--c-surface)',
      background: 'var(--c-bg)',
      line: 'var(--c-line)',
      muted: 'var(--c-muted)',
    },
  },
  shortcuts: {
    'pretty-scrollbar': 'scrollbar scrollbar-rounded scrollbar-thumb-color-gray-300 scrollbar-track-color-gray-100 dark:scrollbar-thumb-color-#424242 dark:scrollbar-track-color-#686868',
    'divider': 'h-1px bg-current op-10',
  },
});
