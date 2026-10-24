<script setup lang="ts">
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { decodeSafeLinksURL } from './safelink-decoder.service';

const { t } = useI18n();

const inputSafeLinkUrl = ref('https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.example.com%2Fseite%3Fa%3D1&data=05%7C01%7C&sdata=abc&reserved=0');
const outputDecodedUrl = computed(() => {
  try {
    return decodeSafeLinksURL(inputSafeLinkUrl.value, t) ?? '';
  }
  catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputSafeLinkUrl"
      raw-text
      :placeholder="t('tools.safelink-decoder.inputPlaceholder')"
      autofocus
      :label="t('tools.safelink-decoder.inputLabel')"
    />

    <n-divider />

    <n-form-item :label="t('tools.safelink-decoder.outputLabel')">
      <TextareaCopyable :value="outputDecodedUrl" :word-wrap="true" />
    </n-form-item>
  </div>
</template>
