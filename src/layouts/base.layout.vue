<script lang="ts" setup>
import AppRail from '../components/AppRail.vue';
import AppStatusbar from '../components/AppStatusbar.vue';
import AppTopbar from '../components/AppTopbar.vue';
import { toolLoadFailed } from '../utils/load-error';

function reload() {
  window.location.reload();
}
</script>

<template>
  <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>

  <div class="shell">
    <AppTopbar />
    <AppRail />
    <main id="main-content" tabindex="-1">
      <c-alert v-if="toolLoadFailed" type="error" mb-4 role="alert">
        <div flex flex-wrap items-center gap-3>
          <span>{{ $t('common.loadFailed') }}</span>
          <c-button @click="reload">
            {{ $t('common.reload') }}
          </c-button>
        </div>
      </c-alert>
      <slot />
    </main>
    <AppStatusbar />
  </div>
</template>

<style scoped>
.shell {
  --top-h: 48px;
  --rail-w: 52px;
  --stat-h: 26px;
  --tab-h: 54px;
  --fly-w: 300px;

  display: grid;
  grid-template-areas:
    'top top'
    'rail main'
    'stat stat';
  grid-template-columns: var(--rail-w) minmax(0, 1fr);
  grid-template-rows: var(--top-h) minmax(0, 1fr) var(--stat-h);
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: var(--c-bg);
  color: var(--c-text);
}

main {
  grid-area: main;
  padding: var(--space-5) clamp(14px, 2vw, 28px);
  overflow: auto;
  background: linear-gradient(180deg, var(--c-sky) 0, var(--c-bg) 240px) no-repeat;
  outline: none;
}

@media (max-width: 700px) {
  .shell {
    grid-template-areas:
      'top'
      'main'
      'rail'
      'stat';
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: var(--top-h) minmax(0, 1fr) var(--tab-h) var(--stat-h);
  }

  main {
    padding: var(--space-4) var(--space-3);
  }
}
</style>
