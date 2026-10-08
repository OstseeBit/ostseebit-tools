<script setup lang="ts">
import { parse as parseYaml } from 'yaml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

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
    :input-placeholder="t('tools.yaml-to-json-converter.inputPlaceholder')"
    :output-label="t('tools.yaml-to-json-converter.outputLabel')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
