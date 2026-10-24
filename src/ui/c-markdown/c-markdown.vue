<script setup lang="ts">
import DomPurify from 'dompurify';
import { marked } from 'marked';

const props = withDefaults(defineProps<{ markdown?: string }>(), { markdown: '' });
const { markdown } = toRefs(props);

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

marked.use({
  renderer: {
    // marked 18 passes a token; the link text is the already parsed inline content.
    link({ href, tokens }) {
      return `<a class="text-primary transition decoration-none hover:underline" href="${escapeAttribute(href)}" target="_blank" rel="noopener">${this.parser.parseInline(tokens)}</a>`;
    },
  },
});

// async: false makes marked return a string instead of string | Promise<string>.
const html = computed(() => DomPurify.sanitize(marked.parse(markdown.value, { async: false }), { ADD_ATTR: ['target'] }));
</script>

<template>
  <div v-html="html" />
</template>
