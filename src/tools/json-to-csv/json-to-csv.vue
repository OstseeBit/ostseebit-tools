<script setup lang="ts">
import JSON5 from 'json5';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import { convertArrayToCsv } from './json-to-csv.service';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '[',
  '  { "name": "Anna", "alter": 31, "stadt": "Kiel" },',
  '  { "name": "Ben", "alter": 27, "stadt": "Hamburg" },',
  '  { "name": "Clara", "alter": 45, "stadt": "Lübeck" }',
  ']',
].join('\n');

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
    :input-label="t('tools.json-to-csv.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-to-csv.inputPlaceholder')"
    :output-label="t('tools.json-to-csv.outputLabel')"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
