<script setup lang="ts">
import type { Tool } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const props = defineProps<{ tool: Tool }>();

const toolStore = useToolStore();

const { tool } = toRefs(props);

const isFavorite = computed(() => toolStore.isToolFavorite({ tool }));
const buttonType = computed(() => (isFavorite.value ? 'primary' : 'default'));
const label = computed(() => (isFavorite.value ? 'favoriteButton.remove' : 'favoriteButton.add'));

function toggleFavorite(event: MouseEvent) {
  event.preventDefault();

  if (toolStore.isToolFavorite({ tool })) {
    toolStore.removeToolFromFavorites({ tool });
    return;
  }

  toolStore.addToolToFavorites({ tool });
}
</script>

<template>
  <c-tooltip :tooltip="$t(label)">
    <c-button
      variant="text"
      circle
      :type="buttonType"
      :aria-label="$t(label)"
      :aria-pressed="isFavorite"
      :style="{ opacity: isFavorite ? 1 : 0.75 }"
      @click="toggleFavorite"
    >
      <icon-mdi-heart v-if="isFavorite" />
      <icon-mdi-heart-outline v-else />
    </c-button>
  </c-tooltip>
</template>
