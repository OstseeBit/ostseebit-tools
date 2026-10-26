<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logoUrl from '@/assets/leuchtturm-mark.png';
import { brand } from '@/branding';
import NavbarButtons from './NavbarButtons.vue';
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="brand" :aria-label="brand.name">
      <span class="logo"><img :src="logoUrl" alt="" width="28" height="28"></span>
      <span class="name" aria-hidden="true">{{ brand.name }}</span>
    </RouterLink>

    <div class="search">
      <command-palette />
    </div>

    <div class="actions">
      <locale-selector />
      <NavbarButtons />
    </div>
  </header>
</template>

<style scoped>
.topbar {
  grid-area: top;
  display: grid;
  grid-template-columns: 1fr minmax(0, 560px) 1fr;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-3);
  background: linear-gradient(90deg, var(--c-surface) 40%, var(--c-tint));
  border-bottom: 1px solid var(--c-line);
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: var(--space-2);
  padding: 4px var(--space-2) 4px 0;
  border-radius: var(--radius-md);
  color: var(--c-text);
  font-size: var(--fs-lg);
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
}

.logo {
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: #fff;
}

.logo img {
  display: block;
}

.search {
  min-width: 0;
}

.actions {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: var(--space-1);
}

@media (max-width: 1100px) {
  .topbar {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }
}

@media (max-width: 700px) {
  .name {
    display: none;
  }

  .actions :deep(.nav-optional) {
    display: none;
  }
}
</style>
