<script setup lang="ts">
import type { UseValidationRule } from '@/composable/validation';
import { parse as parseToml } from 'smol-toml';
import { withDefaultOnError } from '../../utils/defaults';
import { isValidToml } from './toml-to-json.service';

const transformer = (value: string) => value === '' ? '' : withDefaultOnError(() => JSON.stringify(parseToml(value), null, 3), '');

const rules: UseValidationRule<string>[] = [
  {
    validator: isValidToml,
    message: 'Provided TOML is not valid.',
  },
];
</script>

<template>
  <format-transformer
    input-label="Your TOML"
    input-placeholder="Paste your TOML here..."
    output-label="JSON from your TOML"
    output-language="json"
    :input-validation-rules="rules"
    :transformer="transformer"
  />
</template>
