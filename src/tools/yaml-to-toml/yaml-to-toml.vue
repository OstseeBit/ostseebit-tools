<script setup lang="ts">
import { stringify as stringifyToml } from 'smol-toml';
import { parse as parseYaml } from 'yaml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

const convertYamlToToml = (value: string) => [stringifyToml(parseYaml(value))].flat().join('\n').trim();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => convertYamlToToml(value), '');

const rules = [createParseValidationRule(v => parseYaml(v), 'YAML')];
</script>

<template>
  <format-transformer
    input-label="Your YAML"
    input-placeholder="Paste your YAML here..."
    output-label="TOML from your YAML"
    output-language="toml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
