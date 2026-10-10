<script setup lang="ts">
import type { ShadowRootExpose } from 'vue-shadow-dom';
import { render } from '@regexper/render';
import { useQueryParamOrStorage } from '@/composable/queryParams';
import { useValidation } from '@/composable/validation';
import { matchRegex } from './regex-tester.service';

const { t } = useI18n();

const regex = useQueryParamOrStorage({ name: 'regex', storageName: 'regex-tester:regex', defaultValue: '' });
const text = ref('');
const global = ref(true);
const ignoreCase = ref(false);
const multiline = ref(false);
const dotAll = ref(true);
const unicode = ref(true);
const unicodeSets = ref(false);
const visualizerSVG = ref<ShadowRootExpose>();

// `{0}` is replaced by useValidation with the error text of the browser's RegExp parser.
const regexValidation = useValidation({
  source: regex,
  rules: computed(() => [
    {
      message: t('tools.regex-tester.invalidRegex', { error: '{0}' }),
      validator: (value: string) => new RegExp(value),
      getErrorMessage: (value: string) => {
        const _ = new RegExp(value);
        return '';
      },
    },
  ]),
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
    worker.onmessage = (event: MessageEvent<{ results: ReturnType<typeof matchRegex>, failed: boolean, detail: string }>) => {
      if (!active) {
        return;
      }
      results.value = event.data.results;
      resultsError.value = event.data.failed ? (event.data.detail || t('tools.regex-tester.errors.matchFailed')) : '';
      stop();
    };
    worker.onerror = () => {
      results.value = [];
      resultsError.value = t('tools.regex-tester.errors.matchFailed');
      stop();
    };
    timer = setTimeout(() => {
      results.value = [];
      resultsError.value = t('tools.regex-tester.errors.matchTimeout');
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
    worker.onmessage = (event: MessageEvent<{ sample: string, failed: boolean, limit: boolean, detail: string }>) => {
      if (!active) {
        return;
      }
      sample.value = event.data.sample;
      sampleError.value = !event.data.failed
        ? ''
        : event.data.limit
          ? t('tools.regex-tester.errors.sampleLimit')
          : (event.data.detail || t('tools.regex-tester.errors.sampleFailed'));
      samplePending.value = false;
      stop();
    };
    worker.onerror = () => {
      sampleError.value = t('tools.regex-tester.errors.sampleFailed');
      samplePending.value = false;
      stop();
    };
    timer = setTimeout(() => {
      sampleError.value = t('tools.regex-tester.errors.sampleTimeout');
      samplePending.value = false;
      stop();
    }, 1000);
    worker.postMessage(pattern);
  }
  catch {
    sampleError.value = t('tools.regex-tester.errors.sampleUnavailable');
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
    <c-card :title="t('tools.regex-tester.regexCard')" mb-1>
      <c-input-text
        v-model:value="regex"
        :label="t('tools.regex-tester.regexLabel')"
        :placeholder="t('tools.regex-tester.regexPlaceholder')"
        multiline
        rows="3"
        :validation="regexValidation"
      />
      <router-link target="_blank" to="/regex-memo" mb-1 mt-1>
        {{ t('tools.regex-tester.cheatsheet') }}
      </router-link>
      <n-space>
        <n-checkbox v-model:checked="global">
          <span :title="t('tools.regex-tester.flags.globalTitle')">{{ t('tools.regex-tester.flags.global') }} (<code>g</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="ignoreCase">
          <span :title="t('tools.regex-tester.flags.ignoreCaseTitle')">{{ t('tools.regex-tester.flags.ignoreCase') }} (<code>i</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="multiline">
          <span :title="t('tools.regex-tester.flags.multilineTitle')">{{ t('tools.regex-tester.flags.multiline') }} (<code>m</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="dotAll">
          <span :title="t('tools.regex-tester.flags.dotAllTitle')">{{ t('tools.regex-tester.flags.dotAll') }} (<code>s</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="unicode">
          <span :title="t('tools.regex-tester.flags.unicodeTitle')">{{ t('tools.regex-tester.flags.unicode') }} (<code>u</code>)</span>
        </n-checkbox>
        <n-checkbox v-model:checked="unicodeSets">
          <span :title="t('tools.regex-tester.flags.unicodeSetsTitle')">{{ t('tools.regex-tester.flags.unicodeSets') }} (<code>v</code>)</span>
        </n-checkbox>
      </n-space>

      <n-divider />

      <c-input-text
        v-model:value="text"
        :label="t('tools.regex-tester.textLabel')"
        :placeholder="t('tools.regex-tester.textPlaceholder')"
        multiline
        rows="5"
      />
    </c-card>

    <c-card :title="t('tools.regex-tester.matchesCard')" mb-1 mt-3>
      <c-alert v-if="resultsError" type="error">
        {{ resultsError }}
      </c-alert>
      <n-table v-else-if="results?.length > 0">
        <thead>
          <tr>
            <th scope="col">
              {{ t('tools.regex-tester.columnIndex') }}
            </th>
            <th scope="col">
              {{ t('tools.regex-tester.columnValue') }}
            </th>
            <th scope="col">
              {{ t('tools.regex-tester.columnCaptures') }}
            </th>
            <th scope="col">
              {{ t('tools.regex-tester.columnGroups') }}
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
        {{ t('tools.regex-tester.noMatch') }}
      </c-alert>
    </c-card>

    <c-card :title="t('tools.regex-tester.sampleCard')" mt-3>
      <div aria-live="polite" data-test-id="regex-sample">
        <c-alert v-if="sampleError" type="error">
          {{ sampleError }}
        </c-alert>
        <span v-else-if="samplePending">{{ t('tools.regex-tester.sampleGenerating') }}</span>
        <pre v-else style="white-space: pre-wrap; word-break: break-all;">{{ sample }}</pre>
      </div>
    </c-card>

    <c-card :title="t('tools.regex-tester.diagramCard')" style="overflow-x: scroll;" mt-3>
      <shadow-root ref="visualizerSVG">
&#xa0;
      </shadow-root>
    </c-card>
  </div>
</template>
