<script setup lang="ts">
import { parse as parseYaml } from 'yaml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '# Kommentare werden bei der Umwandlung nicht übernommen',
  'name: OstseeBit Tools',
  'version: 1.0.0',
  'aktiv: true',
  'sprachen:',
  '  - de',
  '  - en',
  'server:',
  '  host: localhost',
  '  port: 8080',
].join('\n');

function transformer(value: string) {
  return withDefaultOnError(() => {
    const obj = parseYaml(value, { merge: true });
    return obj ? JSON.stringify(obj, null, 3) : '';
  }, '');
}

const rules = computed(() => [createParseValidationRule(v => parseYaml(v), 'YAML', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.yaml-to-json-converter.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.yaml-to-json-converter.inputPlaceholder')"
    :output-label="t('tools.yaml-to-json-converter.outputLabel')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
