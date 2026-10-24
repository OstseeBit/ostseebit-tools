<script setup lang="ts">
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase,
} from 'change-case';
import InputCopyable from '../../components/InputCopyable.vue';

const { t } = useI18n();

const input = ref('lorem ipsum dolor sit amet');

const formats = computed(() => [
  {
    label: t('tools.case-converter.formats.lowercase'),
    value: input.value.toLocaleLowerCase(),
  },
  {
    label: t('tools.case-converter.formats.uppercase'),
    value: input.value.toLocaleUpperCase(),
  },
  {
    label: t('tools.case-converter.formats.camelcase'),
    value: camelCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.capitalcase'),
    value: capitalCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.constantcase'),
    value: constantCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.dotcase'),
    value: dotCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.headercase'),
    value: trainCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.nocase'),
    value: noCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.paramcase'),
    value: kebabCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.pascalcase'),
    value: pascalCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.pathcase'),
    value: pathCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.sentencecase'),
    value: sentenceCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.snakecase'),
    value: snakeCase(input.value),
  },
  {
    label: t('tools.case-converter.formats.mockingcase'),
    value: input.value
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join(''),
  },
]);

const inputLabelAlignmentConfig = {
  labelPosition: 'left',
  labelWidth: '120px',
  labelAlign: 'right',
} as const;
</script>

<template>
  <c-card>
    <c-input-text
      v-model:value="input"
      :label="t('tools.case-converter.inputLabel')"
      :placeholder="t('tools.case-converter.inputPlaceholder')"
      raw-text
      v-bind="inputLabelAlignmentConfig"
    />

    <div my-16px divider />

    <InputCopyable
      v-for="format in formats"
      :key="format.label"
      :value="format.value"
      :label="format.label"
      v-bind="inputLabelAlignmentConfig"
      mb-1
    />
  </c-card>
</template>
