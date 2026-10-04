<script setup lang="ts">
import DomPurify from 'dompurify';
import markdownit from 'markdown-it';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputMarkdown = ref('');
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
      placeholder="Your Markdown content..."
      rows="8"
      autofocus
      label="Your Markdown to convert:"
    />

    <n-divider />

    <n-form-item label="Output HTML:">
      <TextareaCopyable :value="outputHtml" :word-wrap="true" language="html" />
    </n-form-item>

    <div flex justify-center>
      <n-button @click="printHtml">
        Print as PDF
      </n-button>
    </div>
  </div>
</template>
