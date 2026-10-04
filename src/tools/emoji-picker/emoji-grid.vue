<script setup lang="ts">
import type { EmojiInfo } from './emoji.types';

const props = withDefaults(defineProps<{ emojiInfos?: EmojiInfo[] }>(), { emojiInfos: () => [] });
const { emojiInfos } = toRefs(props);
const visibleCount = ref(48);
const visibleEmojis = computed(() => emojiInfos.value.slice(0, visibleCount.value));
watch(emojiInfos, () => {
  visibleCount.value = 48;
});
</script>

<template>
  <div grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-6>
    <emoji-card v-for="emojiInfo in visibleEmojis" :key="emojiInfo.name" :emoji-info="emojiInfo" flex items-center gap-3 />
  </div>
  <c-button v-if="visibleCount < emojiInfos.length" mt-3 @click="visibleCount += 48">
    Show more ({{ emojiInfos.length - visibleCount }} remaining)
  </c-button>
</template>
