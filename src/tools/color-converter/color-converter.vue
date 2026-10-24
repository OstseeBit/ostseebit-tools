<script setup lang="ts">
import type { Colord } from 'colord';
import { colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
import namesPlugin from 'colord/plugins/names';
import _ from 'lodash';
import { buildColorFormat } from './color-converter.service';

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

const { t } = useI18n();

const formats = {
  picker: buildColorFormat({
    formatId: 'hex',
    format: (v: Colord) => v.toHex(),
    type: 'color-picker',
    t,
  }),
  hex: buildColorFormat({
    formatId: 'hex',
    format: (v: Colord) => v.toHex(),
    t,
  }),
  rgb: buildColorFormat({
    formatId: 'rgb',
    format: (v: Colord) => v.toRgbString(),
    t,
  }),
  hsl: buildColorFormat({
    formatId: 'hsl',
    format: (v: Colord) => v.toHslString(),
    t,
  }),
  hwb: buildColorFormat({
    formatId: 'hwb',
    format: (v: Colord) => v.toHwbString(),
    t,
  }),
  lch: buildColorFormat({
    formatId: 'lch',
    format: (v: Colord) => v.toLchString(),
    t,
  }),
  cmyk: buildColorFormat({
    formatId: 'cmyk',
    format: (v: Colord) => v.toCmykString(),
    t,
  }),
  name: buildColorFormat({
    formatId: 'name',
    format: (v: Colord) => v.toName({ closest: true }) ?? t('tools.color-converter.unknownColorName'),
    t,
  }),
};

updateColorValue(colord('#1ea54c'));

function updateColorValue(value: Colord | undefined, omitLabel?: string) {
  if (value === undefined) {
    return;
  }

  if (!value.isValid()) {
    return;
  }

  _.forEach(formats, ({ value: valueRef, format }, key) => {
    if (key !== omitLabel) {
      valueRef.value = format(value);
    }
  });
}
</script>

<template>
  <c-card>
    <template v-for="({ parse, validation, type }, key) in formats" :key="key">
      <input-copyable
        v-if="type === 'text'"
        v-model:value="formats[key].value.value"
        :test-id="`input-${key}`"
        :label="`${t(`tools.color-converter.${key}Label`)}:`"
        label-position="left"
        label-width="100px"
        label-align="right"
        :placeholder="t(`tools.color-converter.${key}Placeholder`)"
        :validation="validation"
        raw-text
        clearable
        mt-2
        @update:value="(v:string) => updateColorValue(parse(v), key)"
      />

      <n-form-item v-else-if="type === 'color-picker'" :label="`${t('tools.color-converter.pickerLabel')}:`" label-width="100" label-placement="left" :show-feedback="false">
        <n-color-picker
          v-model:value="formats[key].value.value"
          placement="bottom-end"
          @update:value="(v:string) => updateColorValue(parse(v), key)"
        />
      </n-form-item>
    </template>
  </c-card>
</template>
