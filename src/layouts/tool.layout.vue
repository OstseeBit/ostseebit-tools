<script lang="ts" setup>
import type { ReactiveHead } from '@unhead/vue';
import type { Tool } from '@/tools/tools.types';
import { useHead } from '@unhead/vue';

import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { brand } from '@/branding';
import FavoriteButton from '@/components/FavoriteButton.vue';
import { useToolStore } from '@/tools/tools.store';
import BaseLayout from './base.layout.vue';

const route = useRoute();

const head = computed<ReactiveHead>(() => ({
  title: `${route.meta.name} - ${brand.name}`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);
const { t, te } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => te(`tools.${i18nKey.value}.title`) ? t(`tools.${i18nKey.value}.title`) : String(route.meta.name));
const toolDescription = computed<string>(() => te(`tools.${i18nKey.value}.description`) ? t(`tools.${i18nKey.value}.description`) : String(route.meta.description));

// Brotkrumen: Start / Kategorie (führt zur gefilterten Übersicht) / Werkzeug
const { tools } = storeToRefs(useToolStore());
const currentTool = computed(() => tools.value.find(tool => tool.path === route.path));
</script>

<template>
  <BaseLayout>
    <div class="tool-layout">
      <div class="tool-header">
        <nav class="crumbs" :aria-label="t('home.breadcrumb')">
          <ol>
            <li>
              <router-link to="/">
                {{ t('home.home') }}
              </router-link>
            </li>
            <li v-if="currentTool">
              <router-link :to="{ path: '/', query: { category: currentTool.categoryId } }">
                {{ currentTool.category }}
              </router-link>
            </li>
            <li aria-current="page">
              {{ toolTitle }}
            </li>
          </ol>
        </nav>

        <div class="title-row">
          <h1 class="title">
            {{ toolTitle }}
          </h1>

          <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
        </div>

        <div class="description">
          {{ toolDescription }}
        </div>
      </div>
    </div>

    <div class="tool-content">
      <slot />
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  > :deep(*) {
    flex: 0 1 600px;
  }
}

.tool-layout {
  box-sizing: border-box;

  .tool-header {
    width: 100%;
    padding: 0 0 var(--space-4);

    .crumbs {
      color: var(--c-muted);
      font-size: var(--fs-sm);

      ol {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2px 8px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      li + li::before {
        content: '/';
        margin-right: 8px;
        color: var(--c-field-border);
      }

      a {
        color: var(--c-primary);
      }
    }

    .title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }

    .title {
      margin: 0;
      font-size: var(--fs-2xl);
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .description {
      margin: 2px 0 0;
      max-width: 70ch;
      color: var(--c-muted);
    }
  }
}
</style>
