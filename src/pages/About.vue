<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { brand } from '@/branding';

const { t } = useI18n();

useHead({ title: computed(() => `${t('about.title')} - ${brand.name}`) });
</script>

<template>
  <c-markdown :markdown="$t('about.content')" mx-auto mt-50px max-w-600px />
</template>
