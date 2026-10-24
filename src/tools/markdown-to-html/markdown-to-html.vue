<script setup lang="ts">
import DomPurify from 'dompurify';
import markdownit from 'markdown-it';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const inputMarkdown = ref([
  '# Willkommen',
  '',
  'Das ist **fetter** und *kursiver* Text.',
  '',
  '- Erster Punkt',
  '- Zweiter Punkt',
  '',
  '[Ein Link](https://example.org)',
].join('\n'));
const outputHtml = computed(() => {
  const md = markdownit();
  // Sanitized even though markdown-it's defaults already escape raw HTML —
  // this is the only line of defense if that ever changes (e.g. an html-passthrough
  // plugin or `html: true` gets added later), matching the c-markdown component.
  return DomPurify.sanitize(md.render(inputMarkdown.value));
});

function printHtml() {
  const w = window.open(undefined, undefined, 'noopener');
  if (w === null) {
    return;
  }
  w.document.body.innerHTML = outputHtml.value;
  w.print();
}
</script>

<template>
  <div>
    <c-input-text
      v-model:value="inputMarkdown"
      multiline raw-text
      :placeholder="t('tools.markdown-to-html.inputPlaceholder')"
      rows="8"
      autofocus
      :label="t('tools.markdown-to-html.inputLabel')"
    />

    <n-divider />

    <n-form-item :label="t('tools.markdown-to-html.outputLabel')">
      <TextareaCopyable :value="outputHtml" :word-wrap="true" language="html" />
    </n-form-item>

    <div flex justify-center>
      <n-button @click="printHtml">
        {{ t('tools.markdown-to-html.printButton') }}
      </n-button>
    </div>
  </div>
</template>
