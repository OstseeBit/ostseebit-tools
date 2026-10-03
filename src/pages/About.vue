<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { brand } from '@/branding';

useHead({ title: `About - ${brand.name}` });
</script>

<template>
  <c-markdown :markdown="$t('about.content')" mx-auto mt-50px max-w-600px />
</template>
