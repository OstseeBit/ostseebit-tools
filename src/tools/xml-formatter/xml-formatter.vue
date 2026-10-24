<script setup lang="ts">
import { createParseValidationRule } from '@/composable/validation';
import { formatXml, parseXml } from './xml-formatter.service';

const { t } = useI18n();

// Example input so the result is visible right away; select all and type to replace it.
const defaultValue = [
  '<bibliothek ort="Kiel"><buch id="1"><titel>Die Ostsee</titel><autor>Anna Beispiel</autor></buch><buch id="2"><titel>Leuchttürme</titel><autor>Ben Muster</autor></buch></bibliothek>',
].join('\n');
const indentSize = useStorage('xml-formatter:indent-size', 2);
const collapseContent = useStorage('xml-formatter:collapse-content', true);

function transformer(value: string) {
  return formatXml(value, {
    indentation: ' '.repeat(indentSize.value),
    collapseContent: collapseContent.value,
    lineSeparator: '\n',
  });
}

const rules = computed(() => [createParseValidationRule(parseXml, 'XML', t)]);
</script>

<template>
  <div important:flex-full important:flex-shrink-0 important:flex-grow-0>
    <div flex justify-center>
      <n-form-item :label="t('tools.xml-formatter.collapseContentLabel')" label-placement="left">
        <n-switch v-model:value="collapseContent" />
      </n-form-item>
      <n-form-item :label="t('tools.xml-formatter.indentSizeLabel')" label-placement="left" label-width="150" :show-feedback="false">
        <n-input-number v-model:value="indentSize" min="0" max="10" w-100px />
      </n-form-item>
    </div>
  </div>

  <format-transformer
    :input-label="t('tools.xml-formatter.inputLabel')"
    :input-placeholder="t('tools.xml-formatter.inputPlaceholder')"
    :output-label="t('tools.xml-formatter.outputLabel')"
    output-language="xml"
    :input-validation-rules="rules"
    :transformer="transformer"
    :input-default="defaultValue"
  />
</template>
