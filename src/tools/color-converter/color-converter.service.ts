import type { Colord } from 'colord';
import { colord } from 'colord';
import { computed, ref } from 'vue';
import { useValidation } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

export { buildColorFormat, removeAlphaChannelWhenOpaque };

function removeAlphaChannelWhenOpaque(hexColor: string) {
  return hexColor.replace(/^(#(?:[0-9a-f]{3}){1,2})ff$/i, '$1');
}

function buildColorFormat({
  formatId,
  parse = value => colord(value),
  format,
  t,
  type = 'text',
}: {
  formatId: string
  parse?: (value: string) => Colord
  format: (value: Colord) => string
  t: (key: string, named?: Record<string, unknown>) => string
  type?: 'text' | 'color-picker'
}) {
  const value = ref('');

  return {
    type,
    formatId,
    parse: (v: string) => withDefaultOnError(() => parse(v), undefined),
    format,
    value,
    validation: useValidation({
      source: value,
      rules: computed(() => [
        {
          message: t('validation.providedFormatInvalid', { format: formatId }),
          validator: (v: string) => withDefaultOnError(() => {
            if (v === '') {
              return true;
            }

            return parse(v).isValid();
          }, false),
        },
      ]),
    }),

  };
}
