<script setup lang="ts">
import JSON5 from 'json5';
import { stringify } from 'yaml';
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

const transformer = (value: string) => withDefaultOnError(() => stringify(JSON5.parse(value)), '');

const rules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-yaml-converter.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-to-yaml-converter.inputPlaceholder')"
    :output-label="t('tools.json-to-yaml-converter.outputLabel')"
    output-language="yaml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
