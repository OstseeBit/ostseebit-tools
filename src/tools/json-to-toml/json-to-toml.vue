<script setup lang="ts">
import JSON5 from 'json5';
import { stringify as stringifyToml } from 'smol-toml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '../../utils/defaults';

const convertJsonToToml = (value: string) => [stringifyToml(JSON5.parse(value))].flat().join('\n').trim();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => convertJsonToToml(value), '');

const rules = [createParseValidationRule(v => JSON5.parse(v), 'JSON')];
</script>

<template>
  <format-transformer
    input-label="Your JSON"
    input-placeholder="Paste your JSON here..."
    output-label="TOML from your JSON"
    output-language="toml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
