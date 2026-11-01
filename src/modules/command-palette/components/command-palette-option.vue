<script setup lang="ts">
import type { PaletteOption } from '../command-palette.types';

const props = withDefaults(defineProps<{ option: PaletteOption, selected?: boolean }>(), {
  selected: false,
});
const emit = defineEmits(['activated']);
const { option } = toRefs(props);

const { selected } = toRefs(props);
</script>

<template>
  <div
    role="option"
    :aria-selected="selected"
    class="palette-option"
    :class="{ selected }"
    w-full flex cursor-pointer items-center overflow-hidden rounded pa-3 transition
    @click="() => emit('activated', option)"
  >
    <component :is="option.icon" v-if="option.icon" aria-hidden="true" mr-3 h-30px w-30px shrink-0 class="palette-icon" />

    <div flex-1 overflow-hidden>
      <div truncate font-bold lh-tight>
        {{ option.name }}
      </div>

      <div v-if="option.description" class="palette-desc" truncate lh-tight>
        {{ option.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.palette-option {
  color: var(--c-text);
}

.palette-option:hover,
.palette-option.selected {
  background: var(--c-tint);
  box-shadow: inset 3px 0 0 var(--c-primary);
}

.palette-icon {
  color: var(--c-primary);
}

.palette-desc {
  color: var(--c-muted);
}
</style>
