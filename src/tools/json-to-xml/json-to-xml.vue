<script setup lang="ts">
import JSON5 from 'json5';
import convert from 'xml-js';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';

const defaultValue = '{"a":{"_attributes":{"x":"1.234","y":"It\'s"}}}';
function transformer(value: string) {
  return withDefaultOnError(() => {
    return convert.js2xml(JSON5.parse(value), { compact: true });
  }, '');
}

const rules = [createParseValidationRule(v => JSON5.parse(v), 'JSON')];
</script>

<template>
  <format-transformer
    input-label="Your JSON content"
    :input-default="defaultValue"
    input-placeholder="Paste your JSON content here..."
    output-label="Converted XML"
    output-language="xml"
    :transformer="transformer"
    :input-validation-rules="rules"
  />
</template>
