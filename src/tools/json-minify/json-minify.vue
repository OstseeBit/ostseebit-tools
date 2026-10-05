<script setup lang="ts">
import JSON5 from 'json5';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const defaultValue = '{\n\t"hello": [\n\t\t"world"\n\t]\n}';
const transformer = (value: string) => withDefaultOnError(() => JSON.stringify(JSON5.parse(value), null, 0), '');

const rules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <format-transformer
    input-label="Your raw JSON"
    :input-default="defaultValue"
    input-placeholder="Paste your raw JSON here..."
    output-label="Minified version of your JSON"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
