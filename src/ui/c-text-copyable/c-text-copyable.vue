<script setup lang="ts">
import { useCopy } from '@/composable/copy';

const props = withDefaults(defineProps<{ value?: string, displayedValue?: string, showIcon?: boolean, monospace?: boolean }>(), { value: '', displayedValue: undefined, showIcon: true, monospace: false });
const { value, displayedValue, showIcon, monospace } = toRefs(props);

const { copy, isJustCopied } = useCopy({ source: value, createToast: false });
</script>

<template>
  <c-tooltip :tooltip="isJustCopied ? 'Copied!' : 'Copy to clipboard'" cursor-pointer @click="copy">
    <span flex items-center gap-2 :class="{ 'font-mono': monospace }">
      {{ displayedValue ?? value }}
      <icon-mdi-content-copy v-if="showIcon" op-40 />
    </span>
  </c-tooltip>
</template>
