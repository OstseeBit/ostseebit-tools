<script setup lang="ts">
import JSON5 from 'json5';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import { convertArrayToCsv } from './json-to-csv.service';

const { t } = useI18n();

function transformer(value: string) {
  return withDefaultOnError(() => {
    if (value === '') {
      return '';
    }
    return convertArrayToCsv({ array: JSON5.parse(value) });
  }, '');
}

const rules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <format-transformer
    input-label="Your raw JSON"
    input-placeholder="Paste your raw JSON here..."
    output-label="CSV version of your JSON"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
