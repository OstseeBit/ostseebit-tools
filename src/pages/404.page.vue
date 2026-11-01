<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { brand } from '@/branding';

const { t } = useI18n();

useHead({ title: computed(() => `${t('404.pageTitle')} - ${brand.name}`) });
</script>

<template>
  <div mt-20 flex flex-col items-center>
    <span class="muted" text-90px lh-1>
      <icon-mdi:kettle-steam-outline />
    </span>

    <h1 m-0 mt-3>
      {{ $t('404.notFound') }}
    </h1>
    <div class="muted" mt-4>
      {{ $t('404.sorry') }}
    </div>
    <div class="muted" mb-8>
      {{ $t('404.maybe') }}
    </div>

    <c-button to="/">
      {{ $t('404.backHome') }}
    </c-button>
  </div>
</template>

<style scoped>
.muted {
  color: var(--c-muted);
}
</style>
