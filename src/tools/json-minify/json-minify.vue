<script setup lang="ts">
import JSON5 from 'json5';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '{',
  '  "name": "OstseeBit Tools",',
  '  "version": "1.0.0",',
  '  "aktiv": true,',
  '  "sprachen": ["de", "en"],',
  '  "server": {',
  '    "host": "localhost",',
  '    "port": 8080',
  '  }',
  '}',
].join('\n');
const transformer = (value: string) => withDefaultOnError(() => JSON.stringify(JSON5.parse(value), null, 0), '');

const rules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-minify.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-minify.inputPlaceholder')"
    :output-label="t('tools.json-minify.outputLabel')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
