<script setup lang="ts">
import type { CategoryId } from '@/ui/theme/tokens';
import Heart from '@vicons/tabler/es/Heart';
import Home2 from '@vicons/tabler/es/Home2';
import { NIcon } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { RouterLink, useRoute } from 'vue-router';
import { useStyleStore } from '@/stores/style.store';
import { categoryIcons } from '@/tools/category-icons';
import { useToolStore } from '@/tools/tools.store';

const { t } = useI18n();
const route = useRoute();
const styleStore = useStyleStore();
const { isSmallScreen } = storeToRefs(styleStore);
const { tools, favoriteTools, toolsByCategory } = storeToRefs(useToolStore());

const flyoutId = 'category-flyout';
const railRef = ref<HTMLElement>();
const flyoutRef = ref<HTMLElement>();
const openId = ref<CategoryId>();
let lastButton: HTMLElement | undefined;

const categories = computed(() =>
  toolsByCategory.value.flatMap(category =>
    category.id ? [{ id: category.id, name: category.name, tools: category.components }] : [],
  ),
);
const openCategory = computed(() => categories.value.find(category => category.id === openId.value));
const currentCategoryId = computed(() => tools.value.find(tool => tool.path === route.path)?.categoryId);

/** Kurzname für die schmale Tab-Leiste auf dem Handy: erstes Wort des Kategorienamens. */
function shortName(name: string) {
  return name.split(/[\s&]+/)[0];
}

async function toggle(id: CategoryId, event: MouseEvent) {
  if (openId.value === id) {
    close(false);
    return;
  }
  lastButton = event.currentTarget as HTMLElement;
  openId.value = id;
  await nextTick();
  flyoutRef.value?.querySelector<HTMLElement>('a')?.focus();
}

function close(restoreFocus: boolean) {
  if (!openId.value) {
    return;
  }
  openId.value = undefined;
  if (restoreFocus) {
    lastButton?.focus();
  }
}

watch(() => route.fullPath, () => close(false));
onClickOutside(flyoutRef, () => close(false), { ignore: [railRef] });
onKeyStroke('Escape', () => close(true));

function moveFocus(items: HTMLElement[], event: KeyboardEvent, next: string, previous: string) {
  const index = items.indexOf(document.activeElement as HTMLElement);
  if (index < 0) {
    return;
  }
  const step = { [next]: 1, [previous]: items.length - 1, Home: -index, End: items.length - 1 - index }[event.key];
  if (step === undefined) {
    return;
  }
  event.preventDefault();
  items[(index + step) % items.length].focus();
}

function onFlyoutKeydown(event: KeyboardEvent) {
  moveFocus([...(flyoutRef.value?.querySelectorAll<HTMLElement>('a') ?? [])], event, 'ArrowDown', 'ArrowUp');
}

function onRailKeydown(event: KeyboardEvent) {
  const rail = railRef.value;
  if (!rail || flyoutRef.value?.contains(event.target as Node)) {
    return;
  }
  const horizontal = getComputedStyle(rail).flexDirection === 'row';
  const items = [...rail.querySelectorAll<HTMLElement>(':scope > .rb, :scope > .favs > .rb')];
  moveFocus(items, event, horizontal ? 'ArrowRight' : 'ArrowDown', horizontal ? 'ArrowLeft' : 'ArrowUp');
}
</script>

<template>
  <nav ref="railRef" class="rail" :aria-label="t('home.nav.tools')" @keydown="onRailKeydown">
    <n-tooltip placement="right" :disabled="isSmallScreen || !!openId">
      <template #trigger>
        <RouterLink to="/" class="rb" :aria-label="t('home.home')">
          <NIcon :component="Home2" />
          <span class="rl">{{ t('home.home') }}</span>
        </RouterLink>
      </template>
      {{ t('home.home') }}
    </n-tooltip>

    <n-tooltip v-for="category in categories" :key="category.id" placement="right" :disabled="isSmallScreen || !!openId">
      <template #trigger>
        <button
          type="button"
          class="rb"
          :class="[`cat-${category.id}`, { 'is-cur': currentCategoryId === category.id }]"
          :aria-label="t('home.nav.showCategory', { name: category.name })"
          :aria-expanded="openId === category.id"
          :aria-controls="flyoutId"
          :aria-current="currentCategoryId === category.id ? 'true' : undefined"
          :data-test-id="`rail-category-${category.id}`"
          @click="toggle(category.id, $event)"
        >
          <NIcon :component="categoryIcons[category.id]" />
          <span class="rl">{{ shortName(category.name) }}</span>
        </button>
      </template>
      {{ category.name }}
    </n-tooltip>

    <template v-if="favoriteTools.length > 0">
      <span class="sep" aria-hidden="true" />
      <div class="favs" role="group" :aria-label="t('tools.categories.favorite-tools')">
        <n-tooltip v-for="tool in favoriteTools" :key="tool.path" placement="right" :disabled="isSmallScreen || !!openId">
          <template #trigger>
            <RouterLink :to="tool.path" class="rb" :class="`cat-${tool.categoryId}`" :aria-label="tool.name">
              <NIcon :component="tool.icon" />
              <NIcon :component="Heart" class="badge" />
            </RouterLink>
          </template>
          {{ tool.name }}
        </n-tooltip>
      </div>
    </template>

    <div
      v-if="openCategory"
      :id="flyoutId"
      ref="flyoutRef"
      class="flyout"
      :class="`cat-${openCategory.id}`"
      role="region"
      :aria-label="t('home.nav.toolsOf', { name: openCategory.name })"
      @keydown="onFlyoutKeydown"
    >
      <div class="fl-head">
        <span class="ico"><NIcon :component="categoryIcons[openCategory.id]" /></span>
        <div>
          <h2>{{ openCategory.name }}</h2>
          <p>{{ t('home.nav.toolCount', { count: openCategory.tools.length }) }}</p>
        </div>
      </div>
      <ul class="fl-list">
        <li v-for="tool in openCategory.tools" :key="tool.path">
          <RouterLink :to="tool.path" class="fl-item">
            <span class="ico"><NIcon :component="tool.icon" /></span>
            <span>
              <strong>{{ tool.name }}</strong>
              <small>{{ tool.description }}</small>
            </span>
          </RouterLink>
        </li>
      </ul>
      <RouterLink :to="{ path: '/', query: { category: openCategory.id } }" class="fl-foot">
        {{ t('home.nav.showOverview') }}
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.rail {
  grid-area: rail;
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--space-2) 0;
  background: var(--c-surface);
  border-right: 1px solid var(--c-line);
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
}

.rb {
  position: relative;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--cat, var(--c-muted));
  font-size: 22px;
  text-decoration: none;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}

.rb:hover {
  background: var(--c-hover);
}

.rb:active {
  background: var(--c-tint);
}

.rb.is-cur,
.rb.router-link-exact-active,
.rb[aria-expanded='true'] {
  background: color-mix(in srgb, var(--cat, var(--c-primary)) var(--c-category-tint), var(--c-surface));
  color: var(--cat, var(--c-primary));
}

.rb[aria-expanded='true'] {
  box-shadow: inset 0 0 0 1.5px var(--cat, var(--c-primary));
}

.rb.is-cur::before,
.rb.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 9px;
  bottom: 9px;
  width: 4px;
  border-radius: 0 4px 4px 0;
  background: var(--c-amber-fill);
}

.rl {
  display: none;
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 13px;
  height: 13px;
  fill: var(--c-primary);
  stroke: var(--c-surface);
  paint-order: stroke;
}

.sep {
  flex: none;
  width: 24px;
  height: 1px;
  margin: var(--space-2) 0;
  background: var(--c-line);
}

.favs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.ico {
  display: grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--cat, var(--c-primary)) var(--c-category-tint), var(--c-surface));
  color: var(--cat, var(--c-primary));
  font-size: 18px;
}

.flyout {
  position: fixed;
  top: var(--top-h);
  bottom: var(--stat-h);
  left: var(--rail-w);
  display: flex;
  flex-direction: column;
  width: var(--fly-w);
  overflow: auto;
  background: var(--c-surface);
  border-right: 1px solid var(--c-line);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 12px 32px rgb(0 0 0 / 14%);
  animation: flyin 150ms ease;
}

.fl-head {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-line);
}

.fl-head .ico {
  width: 34px;
  height: 34px;
}

.fl-head h2 {
  margin: 0;
  font-size: var(--fs-lg);
  font-weight: 600;
  line-height: 1.25;
}

.fl-head p {
  margin: 0;
  color: var(--c-muted);
  font-size: var(--fs-sm);
}

.fl-list {
  margin: 0;
  padding: var(--space-1);
  list-style: none;
}

.fl-foot {
  margin-top: auto;
  padding: var(--space-3);
  border-top: 1px solid var(--c-line);
  color: var(--c-primary);
  font-size: var(--fs-sm);
  font-weight: 500;
}

.fl-item {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-3);
  padding: 5px 8px;
  border-radius: var(--radius-md);
  color: var(--c-text);
  text-decoration: none;
}

.fl-item:hover {
  background: var(--c-hover);
}

.fl-item:active {
  background: var(--c-tint);
}

.fl-item.router-link-exact-active {
  background: var(--c-tint);
  box-shadow: inset 3px 0 0 var(--cat, var(--c-primary));
}

.fl-item strong {
  display: block;
  font-size: var(--fs-sm);
  font-weight: 600;
  line-height: 1.35;
}

.fl-item small {
  display: block;
  overflow: hidden;
  color: var(--c-muted);
  font-size: var(--fs-sm);
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes flyin {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes flyup {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 700px) {
  .rail {
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 var(--space-2);
    gap: 2px;
    border-top: 1px solid var(--c-line);
    border-right: 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .rb {
    width: 62px;
    height: 46px;
    gap: 1px;
    font-size: 20px;
  }

  .rl {
    display: block;
    max-width: 58px;
    overflow: hidden;
    font-size: 11px;
    line-height: 1.1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rb.is-cur::before,
  .rb.router-link-exact-active::before {
    top: auto;
    right: 12px;
    bottom: 0;
    left: 12px;
    width: auto;
    height: 4px;
    border-radius: 4px 4px 0 0;
  }

  .sep {
    width: 1px;
    height: 30px;
    margin: 0 var(--space-2);
  }

  .favs {
    flex-direction: row;
  }

  .flyout {
    top: auto;
    right: 0;
    bottom: calc(var(--stat-h) + var(--tab-h));
    left: 0;
    width: auto;
    max-height: min(64dvh, 460px);
    border-top: 1px solid var(--c-line);
    border-right: 0;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    animation-name: flyup;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flyout {
    animation: none;
  }
}

@media (forced-colors: active) {
  .rb.is-cur,
  .rb.router-link-exact-active,
  .rb[aria-expanded='true'],
  .fl-item.router-link-exact-active {
    outline: 2px solid Highlight;
  }
}
</style>
