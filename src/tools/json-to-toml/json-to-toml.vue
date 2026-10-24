<script setup lang="ts">
import JSON5 from 'json5';
import { stringify as stringifyToml } from 'smol-toml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

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

const convertJsonToToml = (value: string) => [stringifyToml(JSON5.parse(value))].flat().join('\n').trim();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => convertJsonToToml(value), '');

const rules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-toml.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-to-toml.inputPlaceholder')"
    :output-label="t('tools.json-to-toml.outputLabel')"
    output-language="toml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
