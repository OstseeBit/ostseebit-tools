<script setup lang="ts">
import JSON5 from 'json5';
import { stringify } from 'yaml';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const transformer = (value: string) => withDefaultOnError(() => stringify(JSON5.parse(value)), '');

const rules = [createParseValidationRule(v => JSON5.parse(v), 'JSON')];
</script>

<template>
  <format-transformer
    input-label="Your JSON"
    input-placeholder="Paste your JSON here..."
    output-label="YAML from your JSON"
    output-language="yaml"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
