<script setup lang="ts">
import { parse as parseToml } from 'smol-toml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '# Kommentare werden bei der Umwandlung nicht übernommen',
  'name = "OstseeBit Tools"',
  'version = "1.0.0"',
  'aktiv = true',
  'sprachen = ["de", "en"]',
  '',
  '[server]',
  'host = "localhost"',
  'port = 8080',
].join('\n');

const transformer = (value: string) => value === '' ? '' : withDefaultOnError(() => JSON.stringify(parseToml(value), null, 3), '');

const rules = computed(() => [createParseValidationRule(v => parseToml(v), 'TOML', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.toml-to-json.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.toml-to-json.inputPlaceholder')"
    :output-label="t('tools.toml-to-json.outputLabel')"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
