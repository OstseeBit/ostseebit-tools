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
    // Ohne min-width: 0 ließe der Inhalt die Karte breiter als das Fenster werden (WCAG 1.4.10 Reflow).
    min-width: 0;
    max-width: 100%;
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

<!-- Nicht scoped: gilt für die Naive-UI-Formulare in allen Werkzeugen. -->
<style lang="less">
/* Schmale Fenster (WCAG 1.4.10 Reflow, 320 CSS-Pixel): Beschriftung über das Feld stellen statt daneben,
   damit feste Beschriftungsbreiten (label-width) nicht seitliches Scrollen erzwingen. */
@media (max-width: 700px) {
  .tool-content .n-form-item.n-form-item--left-labelled {
    grid-template-areas:
      'label'
      'blank'
      'feedback' !important;
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .tool-content .n-form-item.n-form-item--left-labelled .n-form-item-label {
    width: auto !important;
    padding: 0 0 4px !important;
    text-align: left !important;
  }

  /* Bausteine dürfen schmaler werden als ihr Inhalt, Knopfzeilen dürfen umbrechen. */
  .tool-content .c-input-text,
  .tool-content .c-select,
  .tool-content .n-form,
  .tool-content .n-form-item,
  .tool-content .n-input,
  .tool-content .n-input-number,
  .tool-content .n-base-selection,
  .tool-content .n-statistic {
    min-width: 0;
    max-width: 100%;
  }

  .tool-content .n-input-number,
  .tool-content .n-base-selection {
    width: 100% !important;
  }

  /* Knopf- und Feldzeilen dürfen umbrechen; Code und Tabellen scrollen in sich statt die Seite zu weiten.
     (Die Karten selbst scrollen nicht: ihre Auswahlmenüs müssen über den Rand hinausragen dürfen.) */
  .tool-content .flex,
  .tool-content [flex] {
    flex-wrap: wrap;
  }

  /* Eingabegruppen (Beschriftung + Feld): Beschriftung über das Feld stellen. */
  .tool-content .n-input-group {
    flex-wrap: wrap;
  }

  .tool-content .n-input-group > .n-input-group-label:first-child {
    flex: 1 1 100% !important;
    box-sizing: border-box;
    width: auto !important;
    max-width: 100%;
  }

  .tool-content .n-input-group > :not(.n-input-group-label) {
    flex: 1 1 160px !important;
    min-width: 0;
  }

  .tool-content pre {
    max-width: 100%;
    overflow-x: auto;
  }

  .tool-content .n-table {
    display: block;
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
