import type { Directive } from 'vue';
import { translate } from '@/plugins/i18n.plugin';

/**
 * Beschriftet die Plus- und Minus-Knöpfe eines Naive-UI-Zahlenfelds (`<n-input-number v-input-number-labels />`).
 * Naive UI rendert dort Knöpfe, die nur ein Symbol enthalten und keinen Namen haben; ohne Namen sind
 * sie für Screenreader nicht erkennbar (WCAG 4.1.2). Der erste Knopf verringert, der zweite erhöht.
 */
function applyLabels(element: HTMLElement) {
  const [decrease, increase] = Array.from(element.querySelectorAll('button'));
  decrease?.setAttribute('aria-label', translate('common.decrease'));
  increase?.setAttribute('aria-label', translate('common.increase'));
}

export const vInputNumberLabels: Directive<HTMLElement> = {
  mounted: element => applyLabels(element),
  updated: element => applyLabels(element),
};
