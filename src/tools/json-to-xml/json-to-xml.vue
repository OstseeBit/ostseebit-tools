<script setup lang="ts">
import JSON5 from 'json5';
import convert from 'xml-js';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '{',
  '  "bibliothek": {',
  '    "_attributes": { "ort": "Kiel" },',
  '    "buch": [',
  '      {',
  '        "_attributes": { "id": "1" },',
  '        "titel": { "_text": "Die Ostsee" },',
  '        "autor": { "_text": "Anna Beispiel" }',
  '      },',
  '      {',
  '        "_attributes": { "id": "2" },',
  '        "titel": { "_text": "Leuchttürme" },',
  '        "autor": { "_text": "Ben Muster" }',
  '      }',
  '    ]',
  '  }',
  '}',
].join('\n');
function transformer(value: string) {
  return withDefaultOnError(() => {
    return convert.js2xml(JSON5.parse(value), { compact: true });
  }, '');
}

const rules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-xml.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.json-to-xml.inputPlaceholder')"
    :output-label="t('tools.json-to-xml.outputLabel')"
    output-language="xml"
    :transformer="transformer"
    :input-validation-rules="rules"
  />
</template>
