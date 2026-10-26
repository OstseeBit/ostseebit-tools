<script setup lang="ts">
import type { ToolWithCategory } from '@/tools/tools.types';
import { NIcon } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';

/**
 * Längliche Kachel für die Startseite. Die ganze Fläche ist der Link zum Werkzeug (gestreckter Link),
 * der Favoriten-Knopf liegt darüber. Gehört in eine `<ul>`.
 */
defineProps<{ tool: ToolWithCategory }>();
</script>

<template>
  <li class="tile" :class="`cat-${tool.categoryId}`">
    <span class="ico"><NIcon :component="tool.icon" /></span>

    <div class="text">
      <h3>
        <router-link :to="tool.path" class="tile-link">
          {{ tool.name }}
        </router-link>
        <span v-if="tool.isNew" class="new">{{ $t('toolCard.new') }}</span>
      </h3>
      <p>{{ tool.description }}</p>
    </div>

    <FavoriteButton :tool="tool" class="fav" />
  </li>
</template>

<style scoped>
.tile {
  position: relative;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) 34px;
  align-items: center;
  gap: var(--space-2);
  min-height: 56px;
  padding: 7px 4px 7px 9px;
  background: var(--c-surface);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 2px rgb(15 42 54 / 5%), 0 3px 10px rgb(15 42 54 / 5%);
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}

.dark .tile {
  box-shadow: none;
}

.tile:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--cat) 55%, var(--c-line));
  box-shadow: 0 2px 4px rgb(15 42 54 / 8%), 0 12px 32px rgb(15 42 54 / 14%);
}

.dark .tile:hover {
  box-shadow: none;
}

.ico {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--cat) var(--c-category-tint), var(--c-surface));
  color: var(--cat);
  font-size: 20px;
}

.text {
  min-width: 0;
}

h3 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  font-size: var(--fs-base);
  font-weight: 600;
  line-height: 1.25;
}

.tile-link {
  overflow: hidden;
  color: var(--c-text);
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* gestreckter Link: die ganze Kachel ist klickbar */
.tile-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
}

.tile-link:focus-visible {
  outline: none;
}

.tile-link:focus-visible::after {
  outline: var(--focus-ring-width, 3px) solid var(--focus-ring-color, var(--c-primary));
  outline-offset: 2px;
}

.new {
  flex: none;
  padding: 1px 8px;
  border-radius: var(--radius-pill);
  background: var(--c-amber-fill);
  color: var(--c-on-amber);
  font-size: var(--fs-xs);
  font-weight: 600;
}

p {
  margin: 1px 0 0;
  overflow: hidden;
  color: var(--c-muted);
  font-size: var(--fs-sm);
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fav {
  position: relative;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    transition: none;
  }

  .tile:hover {
    transform: none;
  }
}
</style>
