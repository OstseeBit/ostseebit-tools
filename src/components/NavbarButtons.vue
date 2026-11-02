<script setup lang="ts">
import BrandGithub from '@vicons/tabler/es/BrandGithub';
import InfoCircle from '@vicons/tabler/es/InfoCircle';
import Moon from '@vicons/tabler/es/Moon';
import Sun from '@vicons/tabler/es/Sun';
import { brand } from '@/branding';
import { config } from '@/config';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isDarkTheme } = toRefs(styleStore);
</script>

<template>
  <c-tooltip v-if="config.app.env === 'development'" class="nav-optional" :tooltip="$t('home.uiLib')" position="bottom">
    <c-button to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
      <icon-mdi:brush-variant text-20px />
    </c-button>
  </c-tooltip>

  <c-tooltip class="nav-optional" :tooltip="$t('home.nav.github')" position="bottom">
    <c-button
      circle
      variant="text"
      :href="brand.repositoryUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="$t('home.nav.githubRepository')"
    >
      <n-icon aria-hidden="true" size="25" :component="BrandGithub" />
    </c-button>
  </c-tooltip>

  <c-tooltip class="nav-optional" :tooltip="$t('home.nav.about')" position="bottom">
    <c-button circle variant="text" to="/about" :aria-label="$t('home.nav.aboutLabel')">
      <n-icon aria-hidden="true" size="25" :component="InfoCircle" />
    </c-button>
  </c-tooltip>
  <c-tooltip :tooltip="isDarkTheme ? $t('home.nav.lightMode') : $t('home.nav.darkMode')" position="bottom">
    <c-button circle variant="text" :aria-label="$t('home.nav.mode')" @click="() => styleStore.toggleDark()">
      <n-icon v-if="isDarkTheme" aria-hidden="true" size="25" :component="Sun" />
      <n-icon v-else aria-hidden="true" size="25" :component="Moon" />
    </c-button>
  </c-tooltip>
</template>

<style lang="less" scoped>
.n-button {
  &:not(:last-child) {
    margin-right: 5px;
  }
}
</style>
