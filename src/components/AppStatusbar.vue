<script setup lang="ts">
import { brand } from '@/branding';
import { config } from '@/config';

const buildDate = config.app.buildDate;
const commitSha = config.app.lastCommitSha;
const commitUrl = /^[a-f0-9]{7,40}$/i.test(commitSha) ? `${brand.repositoryUrl}/commit/${commitSha}` : brand.repositoryUrl;
</script>

<template>
  <footer class="footer statusbar">
    <span class="ok hide-small">
      <span class="dot" aria-hidden="true" />
      {{ $t('home.statusLocal') }}
    </span>

    <span data-test-id="build-version" class="version">
      {{ $t('home.version', { date: buildDate }) }}

      <template v-if="commitSha && commitSha.length > 0">
        ·
        <c-link target="_blank" rel="noopener" :href="commitUrl">
          {{ commitSha.slice(0, 7) }}
        </c-link>
      </template>
    </span>

    <span class="grow" />

    <span class="hide-small">
      © {{ new Date().getFullYear() }}
      <c-link target="_blank" rel="noopener" :href="brand.maintainerUrl">
        OstseeBit
      </c-link>
    </span>

    <c-link to="/about">
      {{ $t('home.nav.aboutLabel') }}
    </c-link>
  </footer>
</template>

<style scoped>
.statusbar {
  grid-area: stat;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 0 var(--space-4);
  overflow: hidden;
  background: var(--c-surface);
  border-top: 1px solid var(--c-line);
  color: var(--c-muted);
  font-size: var(--fs-sm);
  white-space: nowrap;
}

.ok {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-ok);
}

.version {
  font-family: var(--font-mono);
}

.grow {
  flex: 1;
}

@media (max-width: 700px) {
  .hide-small {
    display: none;
  }
}
</style>
