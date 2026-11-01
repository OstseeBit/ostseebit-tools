import type { MaybeRef, Ref } from 'vue';

import type { Tool, ToolCategory, ToolWithCategory } from './tools.types';
import { get, useStorage } from '@vueuse/core';
import _ from 'lodash';
import { defineStore } from 'pinia';
import { toolsWithCategory } from './index';

export const useToolStore = defineStore('tools', () => {
  const favoriteToolsName = useStorage('favoriteToolsName', []) as Ref<string[]>;
  const { t, te } = useI18n();

  const tools = computed<ToolWithCategory[]>(() => toolsWithCategory.map((tool) => {
    const toolI18nKey = tool.path.replace(/\//g, '');

    return ({
      ...tool,
      path: tool.path,
      name: te(`tools.${toolI18nKey}.title`) ? t(`tools.${toolI18nKey}.title`) : tool.name,
      description: te(`tools.${toolI18nKey}.description`) ? t(`tools.${toolI18nKey}.description`) : tool.description,
      category: t(`tools.categories.${tool.category.toLowerCase()}`, tool.category),
    });
  }));

  const toolsByCategory = computed<ToolCategory[]>(() => {
    return _.chain(tools.value)
      .groupBy('category')
      .map((components, name, path) => ({
        id: components[0].categoryId,
        name,
        path,
        components,
      }))
      .value();
  });

  const favoriteTools = computed(() => {
    return favoriteToolsName.value
      .map(favoriteName => tools.value.find(({ name, path }) => name === favoriteName || path === favoriteName))
      .filter(Boolean) as ToolWithCategory[]; // cast because .filter(Boolean) does not remove undefined from type
  });

  return {
    tools,
    favoriteTools,
    toolsByCategory,
    newTools: computed(() => tools.value.filter(({ isNew }) => isNew)),

    addToolToFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      const toolPath = get(tool).path;
      if (toolPath) {
        favoriteToolsName.value.push(toolPath);
      }
    },

    removeToolFromFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      favoriteToolsName.value = favoriteToolsName.value.filter(name => get(tool).name !== name && get(tool).path !== name);
    },

    isToolFavorite({ tool }: { tool: MaybeRef<Tool> }) {
      return favoriteToolsName.value.includes(get(tool).name)
        || favoriteToolsName.value.includes(get(tool).path);
    },

    updateFavoriteTools(newOrder: ToolWithCategory[]) {
      favoriteToolsName.value = newOrder.map(tool => tool.path);
    },

    /** Verschiebt einen Favoriten um `offset` Plätze (Alternative zum Ziehen, WCAG 2.5.7). */
    moveFavorite(path: string, offset: number) {
      // Aus der aufgelösten Liste ableiten: ältere Einträge können Namen statt Pfade sein.
      const order = favoriteTools.value.map(tool => tool.path);
      const from = order.indexOf(path);
      const to = from + offset;
      if (from < 0 || to < 0 || to >= order.length) {
        return;
      }
      [order[from], order[to]] = [order[to], order[from]];
      favoriteToolsName.value = order;
    },
  };
});
