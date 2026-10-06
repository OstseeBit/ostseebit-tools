<script setup lang="ts">
import { evaluate } from 'mathjs';

import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

// Expressions are capped to keep pathological input (e.g. huge factorials or
// power towers like `9^9^9^9`) from locking up the tab for a long time.
const MAX_EXPRESSION_LENGTH = 1000;

const expression = ref('');

const result = computed(() => withDefaultOnError(() => {
  if (expression.value.length > MAX_EXPRESSION_LENGTH) {
    throw new Error('Expression too long');
  }
  // A fresh scope per evaluation avoids state (variable assignments) leaking
  // between calls.
  return evaluate(expression.value, {}) ?? '';
}, ''));
</script>

<template>
  <div>
    <c-input-text
      v-model:value="expression"
      rows="1"
      multiline
      :placeholder="t('tools.math-evaluator.inputPlaceholder')"
      raw-text
      monospace
      autofocus
      autosize
    />

    <c-card v-if="result !== ''" :title="t('tools.math-evaluator.resultTitle')" mt-5>
      {{ result }}
    </c-card>
  </div>
</template>
