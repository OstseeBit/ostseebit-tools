<script setup lang="ts">
import { parse as parseToml } from 'smol-toml';
import { stringify as stringifyToYaml } from 'yaml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

const { t } = useI18n();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => stringifyToYaml(parseToml(value)), '');

const rules = computed(() => [createParseValidationRule(v => parseToml(v), 'TOML', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.toml-to-yaml.inputLabel')"
    :input-placeholder="t('tools.toml-to-yaml.inputPlaceholder')"
    :output-label="t('tools.toml-to-yaml.outputLabel')"
    output-language="yaml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
