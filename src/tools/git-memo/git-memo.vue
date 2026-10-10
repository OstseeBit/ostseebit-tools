<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import MemoDe from './git-memo.content.de.md';
import MemoEn from './git-memo.content.md';

const themeVars = useThemeVars();

const { locale } = useI18n();
const Memo = computed(() => locale.value === 'de' ? MemoDe : MemoEn);
</script>

<template>
  <div>
    <component :is="Memo" />
  </div>
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: v-bind('themeVars.cardColor');
  border-radius: 4px;
  overflow: auto;
}
</style>
