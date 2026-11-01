<script setup lang="ts">
import type { ToolWithCategory } from '@/tools/tools.types';
import type { CategoryId } from '@/ui/theme/tokens';
import { useHead } from '@unhead/vue';
import DragDrop from '@vicons/tabler/es/DragDrop';
import { NIcon } from 'naive-ui';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Draggable from 'vuedraggable';
import { brand } from '@/branding';
import { categoryIcons } from '@/tools/category-icons';
import { useToolStore } from '@/tools/tools.store';
import { categoryIds } from '@/ui/theme/tokens';
import ToolCard from '../components/ToolCard.vue';

const toolStore = useToolStore();
const route = useRoute();
const router = useRouter();

useHead({ title: `${brand.name} - ${brand.description}` });
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);

// Update favorite tools order when drag is finished
function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value); // Update the store with the new order
}

const categories = computed(() =>
  toolStore.toolsByCategory.flatMap(category =>
    category.id ? [{ id: category.id, name: category.name, tools: category.components as ToolWithCategory[] }] : [],
  ),
);

// Der Kategorie-Filter steht in der Adresse (?category=sec), damit man ihn verlinken kann.
const filter = computed<CategoryId | 'all'>(() => {
  const value = route.query.category;
  return typeof value === 'string' && (categoryIds as readonly string[]).includes(value) ? value as CategoryId : 'all';
});
const visibleCategories = computed(() => filter.value === 'all' ? categories.value : categories.value.filter(({ id }) => id === filter.value));

const pillsRef = ref<HTMLElement>();

// Auf dem Handy läuft die Pillen-Zeile waagerecht; die gewählte Pille soll im Blick bleiben.
function revealSelectedPill() {
  nextTick(() => pillsRef.value?.querySelector('[aria-pressed="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest' }));
}
onMounted(revealSelectedPill);
watch(filter, revealSelectedPill);

function setFilter(id: CategoryId | 'all') {
  router.replace({ query: id === 'all' ? {} : { category: id } });
}
</script>

<template>
  <div class="home">
    <section class="head" aria-labelledby="home-title">
      <div class="title-row">
        <h1 id="home-title" class="title">
          {{ t('home.nav.tools') }}
        </h1>
        <span class="count">{{ t('home.nav.toolCount', { count: toolStore.tools.length }) }} · {{ t('home.statusLocal') }}</span>
      </div>

      <div ref="pillsRef" class="pills" role="group" :aria-label="t('home.filterLabel')">
        <button type="button" class="pill" :aria-pressed="filter === 'all'" @click="setFilter('all')">
          {{ t('home.filterAll') }}
          <span class="n">{{ toolStore.tools.length }}</span>
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="pill"
          :class="`cat-${category.id}`"
          :aria-pressed="filter === category.id"
          :data-test-id="`filter-${category.id}`"
          @click="setFilter(category.id)"
        >
          <NIcon aria-hidden="true" :component="categoryIcons[category.id]" class="pill-icon" />
          {{ category.name }}
          <span class="n">{{ category.tools.length }}</span>
        </button>
      </div>
    </section>

    <section v-if="favoriteTools.length > 0 || toolStore.newTools.length > 0" class="quick">
      <div v-if="favoriteTools.length > 0" class="qrow">
        <span class="q-lab">
          {{ t('home.categories.favoriteTools') }}
          <c-tooltip :tooltip="t('home.categories.favoritesDndToolTip')">
            <NIcon aria-hidden="true" :component="DragDrop" size="16" />
          </c-tooltip>
          <span class="sr-only">{{ t('home.categories.favoritesDndToolTip') }}</span>
        </span>
        <Draggable
          :list="favoriteTools"
          tag="ul"
          class="chips"
          ghost-class="ghost-chip"
          item-key="path"
          @end="onUpdateFavoriteTools"
        >
          <template #item="{ element: tool }">
            <li>
              <router-link :to="tool.path" class="chip" :class="`cat-${tool.categoryId}`">
                <NIcon aria-hidden="true" :component="tool.icon" />
                {{ tool.name }}
              </router-link>
            </li>
          </template>
        </Draggable>
      </div>

      <div v-if="toolStore.newTools.length > 0" class="qrow">
        <span class="q-lab">{{ t('home.categories.newestTools') }}</span>
        <ul class="chips">
          <li v-for="tool in toolStore.newTools" :key="tool.path">
            <router-link :to="tool.path" class="chip" :class="`cat-${tool.categoryId}`">
              <NIcon aria-hidden="true" :component="tool.icon" />
              {{ tool.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <section v-for="category in visibleCategories" :key="category.id" class="grp" :class="`cat-${category.id}`" :aria-labelledby="`group-${category.id}`">
      <div class="grp-head">
        <span class="ico"><NIcon aria-hidden="true" :component="categoryIcons[category.id]" /></span>
        <h2 :id="`group-${category.id}`">
          {{ category.name }}
        </h2>
        <span class="cnt">{{ t('home.nav.toolCount', { count: category.tools.length }) }}</span>
      </div>
      <ul class="tiles">
        <ToolCard v-for="tool in category.tools" :key="tool.path" :tool="tool" />
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1680px;
  margin: 0 auto;
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-4);
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-3);
}

.title {
  margin: 0;
  font-size: var(--fs-2xl);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.count {
  color: var(--c-muted);
  font-size: var(--fs-sm);
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-2);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 12px;
  border: 1px solid var(--c-field-border);
  border-radius: var(--radius-pill);
  background: var(--c-surface);
  color: var(--c-text);
  font: inherit;
  font-size: var(--fs-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease;
}

.pill:hover {
  border-color: var(--cat, var(--c-primary));
  background: var(--c-hover);
}

.pill:active {
  background: var(--c-tint);
}

.pill[aria-pressed='true'] {
  border-color: var(--c-primary);
  background: var(--c-primary);
  color: var(--c-on-primary);
}

.pill-icon {
  color: var(--cat);
  font-size: 16px;
}

.pill[aria-pressed='true'] .pill-icon {
  color: inherit;
}

.n {
  color: var(--c-muted);
  font: 500 var(--fs-xs) var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.pill[aria-pressed='true'] .n {
  color: inherit;
}

.quick {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  gap: var(--space-1) var(--space-5);
  padding-top: var(--space-3);
}

.qrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
}

.q-lab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 64px;
  color: var(--c-muted);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 2px 12px 2px 8px;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-pill);
  background: var(--c-surface);
  color: var(--c-text);
  font-size: var(--fs-sm);
  font-weight: 500;
  text-decoration: none;
  transition: background 150ms ease, border-color 150ms ease;
}

.chip :deep(.n-icon) {
  color: var(--cat);
  font-size: 16px;
}

.chip:hover {
  border-color: var(--c-field-border);
  background: var(--c-hover);
}

.chip:active {
  background: var(--c-tint);
}

.ghost-chip {
  opacity: 0.4;
  border: 2px dashed var(--c-field-border);
  border-radius: var(--radius-pill);
}

.grp {
  margin-top: var(--space-4);
}

.grp-head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.grp-head .ico {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--cat) var(--c-category-tint), var(--c-surface));
  color: var(--cat);
  font-size: 15px;
}

.grp-head h2 {
  margin: 0;
  font-size: var(--fs-base);
  font-weight: 600;
  line-height: 1.25;
}

.cnt {
  color: var(--c-muted);
  font-size: var(--fs-sm);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Handy: Filter und Schnellzugriff laufen in einer waagerecht scrollbaren Zeile statt über viele Zeilen. */
@media (max-width: 700px) {
  .head {
    display: block;
  }

  .pills {
    margin-top: var(--space-2);
  }

  .pills,
  .chips {
    flex-wrap: nowrap;
    padding-bottom: 2px;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .pill,
  .chip {
    flex: none;
    white-space: nowrap;
  }

  .qrow {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pill,
  .chip {
    transition: none;
  }
}
</style>
