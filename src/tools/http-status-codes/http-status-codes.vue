<script setup lang="ts">
import { useFuzzySearch } from '@/composable/fuzzySearch';
import { codesByCategories } from './http-status-codes.constants';

const { t } = useI18n();

const search = ref('');

const translatedCategories = computed(() =>
  codesByCategories.map(({ id, codes }) => ({
    id,
    category: t(`tools.http-status-codes.category${id}`),
    codes: codes.map(code => ({ ...code, description: t(`tools.http-status-codes.description${code.code}`) })),
  })),
);

const { searchResult } = useFuzzySearch({
  search,
  data: computed(() => translatedCategories.value.flatMap(({ codes, category }) => codes.map(code => ({ ...code, category })))),
  options: {
    keys: [{ name: 'code', weight: 3 }, { name: 'name', weight: 2 }, 'description', 'category'],
  },
});

const codesByCategoryFiltered = computed(() => {
  if (!search.value) {
    return translatedCategories.value;
  }

  return [{ id: 'search', category: t('tools.http-status-codes.searchResults'), codes: searchResult.value }];
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="search"
      :placeholder="t('tools.http-status-codes.searchPlaceholder')"
      autofocus raw-text mb-10
    />

    <div v-for="{ codes, category, id } of codesByCategoryFiltered" :key="id" mb-8>
      <div mb-2 text-xl>
        {{ category }}
      </div>

      <c-card v-for="{ code, description, name, type } of codes" :key="code" mb-2>
        <div text-lg font-bold>
          {{ code }} {{ name }}
        </div>
        <div op-70>
          {{ description }} {{ type !== 'HTTP' ? t('tools.http-status-codes.forProtocol', { type }) : '' }}
        </div>
      </c-card>
    </div>
  </div>
</template>
