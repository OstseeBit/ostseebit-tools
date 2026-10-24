<script setup lang="ts">
import convert from 'xml-js';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import { parseXml } from '../xml-formatter/xml-formatter.service';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '<bibliothek ort="Kiel">',
  '  <buch id="1">',
  '    <titel>Die Ostsee</titel>',
  '    <autor>Anna Beispiel</autor>',
  '  </buch>',
  '  <buch id="2">',
  '    <titel>Leuchttürme</titel>',
  '    <autor>Ben Muster</autor>',
  '  </buch>',
  '</bibliothek>',
].join('\n');
function transformer(value: string) {
  return withDefaultOnError(() => {
    return JSON.stringify(convert.xml2js(value, { compact: true }), null, 2);
  }, '');
}

const rules = computed(() => [createParseValidationRule(parseXml, 'XML', t)]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.xml-to-json.inputLabel')"
    :input-default="defaultValue"
    :input-placeholder="t('tools.xml-to-json.inputPlaceholder')"
    :output-label="t('tools.xml-to-json.outputLabel')"
    output-language="json"
    :transformer="transformer"
    :input-validation-rules="rules"
  />
</template>
