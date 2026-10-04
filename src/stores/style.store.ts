import type { Ref } from 'vue';
import { useDark, useMediaQuery, useStorage, useToggle } from '@vueuse/core';
import { defineStore } from 'pinia';
import { watch } from 'vue';

export const useStyleStore = defineStore('style', {
  state: () => {
    const isDarkTheme = useDark();
    const toggleDark = useToggle(isDarkTheme);
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    // Menü startet standardmäßig eingeklappt (auch auf Desktop), bis der
    // Nutzer es einmal öffnet — die Wahl wird dann per localStorage gemerkt.
    const isMenuCollapsed = useStorage('isMenuCollapsed', true) as Ref<boolean>;

    watch(isSmallScreen, v => (isMenuCollapsed.value = v));

    return {
      isDarkTheme,
      toggleDark,
      isMenuCollapsed,
      isSmallScreen,
    };
  },
});
