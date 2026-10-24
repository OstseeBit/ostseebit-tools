<script setup lang="ts">
import { formatBytes } from '@/utils/convert';
import { getStringSizeInBytes } from './text-statistics.service';

const { t } = useI18n();

const text = ref([
  'Die Ostsee ist ein Randmeer des Atlantiks.',
  'Sie liegt zwischen Mitteleuropa und Skandinavien.',
].join('\n'));
</script>

<template>
  <c-card>
    <c-input-text v-model:value="text" multiline :placeholder="t('tools.text-statistics.inputPlaceholder')" rows="5" />

    <div mt-5 flex>
      <n-statistic :label="t('tools.text-statistics.characterCountLabel')" :value="text.length" flex-1 />
      <n-statistic :label="t('tools.text-statistics.wordCountLabel')" :value="text === '' ? 0 : text.split(/\s+/).length" flex-1 />
      <n-statistic :label="t('tools.text-statistics.lineCountLabel')" :value="text === '' ? 0 : text.split(/\r\n|\r|\n/).length" flex-1 />
      <n-statistic :label="t('tools.text-statistics.byteSizeLabel')" :value="formatBytes(getStringSizeInBytes(text))" flex-1 />
    </div>
  </c-card>
</template>
