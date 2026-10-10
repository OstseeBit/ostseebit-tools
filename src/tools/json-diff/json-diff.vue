<script setup lang="ts">
import JSON5 from 'json5';

import { createParseValidationRule } from '@/composable/validation';
import { withDefaultOnError } from '@/utils/defaults';
import DiffsViewer from './diff-viewer/diff-viewer.vue';

const { t } = useI18n();

const rawLeftJson = ref('');
const rawRightJson = ref('');

const leftJson = computed(() => withDefaultOnError(() => JSON5.parse(rawLeftJson.value), undefined));
const rightJson = computed(() => withDefaultOnError(() => JSON5.parse(rawRightJson.value), undefined));

const jsonValidationRules = computed(() => [createParseValidationRule(v => JSON5.parse(v), 'JSON', t)]);
</script>

<template>
  <c-input-text
    v-model:value="rawLeftJson"
    :validation-rules="jsonValidationRules"
    :label="t('tools.json-diff.firstJsonLabel')"
    :placeholder="t('tools.json-diff.firstJsonPlaceholder')"
    rows="20"
    multiline
    test-id="leftJson"
    raw-text
    monospace
  />

  <c-input-text
    v-model:value="rawRightJson"
    :validation-rules="jsonValidationRules"
    :label="t('tools.json-diff.secondJsonLabel')"
    :placeholder="t('tools.json-diff.secondJsonPlaceholder')"
    rows="20"
    multiline
    test-id="rightJson"
    raw-text
    monospace
  />

  <DiffsViewer :left-json="leftJson" :right-json="rightJson" />
</template>
