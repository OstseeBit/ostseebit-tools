import type { Directive } from 'vue';

/**
 * Gibt den Griffen eines Naive-UI-Sliders einen Namen (`<n-slider v-slider-label="…" />`).
 * Naive UI setzt `role="slider"` auf die Griffe, bietet aber keine Möglichkeit, sie zu beschriften;
 * ohne Namen sind sie für Screenreader nicht bedienbar (WCAG 4.1.2). Bei einem Bereichs-Slider
 * wird nummeriert, zum Beispiel "Wörter (1/2)".
 */
function applyLabel(element: HTMLElement, label: string) {
  const handles = element.querySelectorAll('.n-slider-handle-wrapper');
  handles.forEach((handle, index) => {
    handle.setAttribute('aria-label', handles.length > 1 ? `${label} (${index + 1}/${handles.length})` : label);
  });
}

export const vSliderLabel: Directive<HTMLElement, string> = {
  mounted: (element, { value }) => applyLabel(element, value),
  updated: (element, { value }) => applyLabel(element, value),
};
