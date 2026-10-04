import type { Plugin } from 'vue';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { get } from '@vueuse/core';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  // Deutsch ist laut README die verbindliche Projektsprache; index.html
  // deklariert <html lang="de">, daher muss auch die Standard-UI-Sprache
  // Deutsch sein (sonst Abweichung zwischen lang-Attribut und Inhalt).
  locale: 'de',
  fallbackLocale: 'en',
  messages,
});

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);
  },
};

export function translate(localeKey: string) {
  const hasKey = i18n.global.te(localeKey, get(i18n.global.locale));
  return hasKey ? i18n.global.t(localeKey) : localeKey;
}
