<script setup lang="ts">
import type { ShadowRootExpose } from 'vue-shadow-dom';
import { render } from '@regexper/render';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { useValidation } from '@/composable/validation';
import { matchRegex } from './regex-tester.service';

const regex = useQueryParamOrStorage({ name: 'regex', storageName: 'regex-tester:regex', defaultValue: '' });
const text = ref('');
const global = ref(true);
const ignoreCase = ref(false);
const multiline = ref(false);
const dotAll = ref(true);
const unicode = ref(true);
const unicodeSets = ref(false);
const visualizerSVG = ref<ShadowRootExpose>();

const regexValidation = useValidation({
  source: regex,
  rules: [
    {
      message: 'Invalid regex: {0}',
      validator: value => new RegExp(value),
      getErrorMessage: (value) => {
        const _ = new RegExp(value);
        return '';
      },
    },
  ],
});
const flags = computed(() => {
  let value = 'd';
  if (global.value) {
    value += 'g';
  }
  if (ignoreCase.value) {
    value += 'i';
  }
  if (multiline.value) {
    value += 'm';
  }
  if (dotAll.value) {
    value += 's';
  }
  if (unicode.value) {
    value += 'u';
  }
  else if (unicodeSets.value) {
    value += 'v';
  }
  return value;
});

// Matching runs in a Web Worker with a timeout: the pattern is restorable from a
// shared `?regex=` link, so an unguarded main-thread catastrophic-backtracking
// regex would freeze the tab for anyone opening such a link (not just the author).
const results = ref<ReturnType<typeof matchRegex>>([]);
const resultsError = ref('');

watch([regex, text, flags], ([pattern, textValue, flagsValue], _previous, onCleanup) => {
  resultsError.value = '';
  let worker: Worker | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let active = true;
  const stop = () => {
    active = false;
    clearTimeout(timer);
    worker?.terminate();
  };
  onCleanup(stop);
  try {
    worker = new Worker(new URL('./regex-match.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event: MessageEvent<{ results: ReturnType<typeof matchRegex>, error: string }>) => {
      if (!active) {
        return;
      }
      results.value = event.data.results;
      resultsError.value = event.data.error;
      stop();
    };
    worker.onerror = () => {
      results.value = [];
      resultsError.value = 'Matching failed.';
      stop();
    };
    timer = setTimeout(() => {
      results.value = [];
      resultsError.value = 'Matching timed out. Simplify the expression.';
      stop();
    }, 1000);
    worker.postMessage({ regex: pattern, text: textValue, flags: flagsValue });
  }
  catch {
    // No Worker support in this environment: fall back to inline matching
    // (still try/catch-guarded, just without the hang-protection timeout).
    try {
      results.value = matchRegex(pattern, textValue, flagsValue);
    }
    catch {
      results.value = [];
    }
    stop();
  }
}, { immediate: true });

const sample = ref('');
const sampleError = ref('');
const samplePending = ref(false);

watch(regex, (pattern, _previous, onCleanup) => {
  sample.value = '';
  sampleError.value = '';
  samplePending.value = true;
  let worker: Worker | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let active = true;
  const stop = () => {
    active = false;
    clearTimeout(timer);
    worker?.terminate();
  };
  onCleanup(stop);
  try {
    worker = new Worker(new URL('./regex-sample.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (event: MessageEvent<{ sample: string, error: string }>) => {
      if (!active) {
        return;
      }
      sample.value = event.data.sample;
      sampleError.value = event.data.error;
      samplePending.value = false;
      stop();
    };
    worker.onerror = () => {
      sampleError.value = 'Sample generation failed.';
      samplePending.value = false;
      stop();
    };
    timer = setTimeout(() => {
      sampleError.value = 'Sample generation timed out. Simplify the expression.';
      samplePending.value = false;
      stop();
    }, 1000);
    worker.postMessage(pattern);
  }
  catch {
    sampleError.value = 'Sample generation is unavailable in this browser.';
    samplePending.value = false;
    stop();
  }
}, { immediate: true });

watchEffect(
  async () => {
    const regexValue = regex.value;
    // shadow root is required:
    // @regexper/render append a <defs><style> that broke svg transparency of icons in the whole site
    const visualizer = visualizerSVG.value?.shadow_root;
    if (visualizer) {
      while (visualizer.lastChild) {
        visualizer.removeChild(visualizer.lastChild);
      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      try {
        // A pathological pattern can make @regexper/render hang; race it against
        // a timeout so opening a shared link alone can't freeze the page.
        await Promise.race([
          render(regexValue, svg),
          new Promise((_resolve, reject) => setTimeout(() => reject(new Error('timeout')), 1000)),
        ]);
      }
      catch {
      }
      visualizer.appendChild(svg);
    }
  },
);
</script>

<template>
  <div max-w-600px>
    <c-card title="Regex" mb-1>
      <c-input-text
        v-model:value="regex"
        label="Regex to test:"
        placeholder="Put the regex to test"
        multiline
        rows="3"
        :validation="regexValidation"
      />
      <router-link target="_blank" to="/regex-memo" mb-1 mt-1>
        See Regular Expression Cheatsheet
      </router-link>
      <n-space>
        <n-checkbox v-model:checked="global">
          <span title="Global search">Global search. (<code>g</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="ignoreCase">
          <span title="Case-insensitive search">Case-insensitive search. (<code>i</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="multiline">
          <span title="Allows ^ and $ to match next to newline characters.">Multiline(<code>m</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="dotAll">
          <span title="Allows . to match newline characters.">Singleline(<code>s</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="unicode">
          <span title="Unicode; treat a pattern as a sequence of Unicode code points.">Unicode(<code>u</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="unicodeSets">
          <span title="An upgrade to the u mode with more Unicode features.">Unicode Sets (<code>v</code>)</span>
        </n-checkbox>
      </n-space>

      <n-divider />

      <c-input-text
        v-model:value="text"
        label="Text to match:"
        placeholder="Put the text to match"
        multiline
        rows="5"
      />
    </c-card>

    <c-card title="Matches" mb-1 mt-3>
      <c-alert v-if="resultsError" type="error">
        {{ resultsError }}
      </c-alert>
      <n-table v-else-if="results?.length > 0">
        <thead>
          <tr>
            <th scope="col">
              Index in text
            </th>
            <th scope="col">
              Value
            </th>
            <th scope="col">
              Captures
            </th>
            <th scope="col">
              Groups
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match of results" :key="match.index">
            <td>{{ match.index }}</td>
            <td>{{ match.value }}</td>
            <td>
              <ul>
                <li v-for="capture in match.captures" :key="capture.name">
                  "{{ capture.name }}" = {{ capture.value }} [{{ capture.start }} - {{ capture.end }}]
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="group in match.groups" :key="group.name">
                  "{{ group.name }}" = {{ group.value }} [{{ group.start }} - {{ group.end }}]
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </n-table>
      <c-alert v-else>
        No match
      </c-alert>
    </c-card>

    <c-card title="Sample matching text" mt-3>
      <div aria-live="polite" data-test-id="regex-sample">
        <c-alert v-if="sampleError" type="error">
          {{ sampleError }}
        </c-alert>
        <span v-else-if="samplePending">Generating sample…</span>
        <pre v-else style="white-space: pre-wrap; word-break: break-all;">{{ sample }}</pre>
      </div>
    </c-card>

    <c-card title="Regex Diagram" style="overflow-x: scroll;" mt-3>
      <shadow-root ref="visualizerSVG">
&#xa0;
      </shadow-root>
    </c-card>
  </div>
</template>
