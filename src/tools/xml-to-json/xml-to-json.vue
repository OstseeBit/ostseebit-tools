<script setup lang="ts">
import convert from 'xml-js';
import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import { parseXml } from '../xml-formatter/xml-formatter.service';

const { t } = useI18n();

const defaultValue = '<a x="1.234" y="It\'s"/>';
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
