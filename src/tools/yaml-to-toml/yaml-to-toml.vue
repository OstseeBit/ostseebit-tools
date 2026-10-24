<script setup lang="ts">
import { stringify as stringifyToml } from 'smol-toml';
import { parse as parseYaml } from 'yaml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

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

const convertYamlToToml = (value: string) => [stringifyToml(parseYaml(value))].flat().join('\n').trim();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => convertYamlToToml(value), '');

const rules = computed(() => [createParseValidationRule(v => parseYaml(v), 'YAML', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.yaml-to-toml.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.yaml-to-toml.inputPlaceholder')"
    :output-label="t('tools.yaml-to-toml.outputLabel')"
    output-language="toml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
