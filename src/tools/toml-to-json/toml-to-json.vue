<script setup lang="ts">
import { parse as parseToml } from 'smol-toml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

const { t } = useI18n();

const transformer = (value: string) => value === '' ? '' : withDefaultOnError(() => JSON.stringify(parseToml(value), null, 3), '');

const rules = computed(() => [createParseValidationRule(v => parseToml(v), 'TOML', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.toml-to-json.inputLabel')"
    :input-placeholder="t('tools.toml-to-json.inputPlaceholder')"
    :output-label="t('tools.toml-to-json.outputLabel')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
