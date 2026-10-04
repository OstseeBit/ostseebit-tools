<script setup lang="ts">
import figlet from 'figlet';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const input = ref('Ascii ART');
const font = useStorage('ascii-text-drawer:font', 'Standard');
const width = useStorage('ascii-text-drawer:width', 80);
const output = ref('');
const errored = ref(false);
const processing = ref(false);

// Load versioned font data from the installed package, without a third-party request.
const fontSources = import.meta.glob<string>('/node_modules/figlet/fonts/*.flf', { query: '?raw', import: 'default' });
const fonts = Object.keys(fontSources).map(path => path.slice(path.lastIndexOf('/') + 1, -4)).sort();
const loadedFonts = new Set<string>();
if (!fonts.includes(font.value)) {
  font.value = 'Standard';
}

watch([input, font, width], async ([text, fontName, lineWidth], _previous, onCleanup) => {
  let cancelled = false;
  onCleanup(() => {
    cancelled = true;
  });
  processing.value = true;
  try {
    if (!loadedFonts.has(fontName)) {
      const loadFont = fontSources[`/node_modules/figlet/fonts/${fontName}.flf`];
      if (!loadFont) {
        throw new Error('Unknown font');
      }
      figlet.parseFont(fontName, await loadFont());
      loadedFonts.add(fontName);
    }
    if (cancelled) {
      return;
    }
    output.value = figlet.textSync(text, {
      font: fontName as figlet.Fonts,
      width: lineWidth ?? 80,
      whitespaceBreak: true,
    });
    errored.value = false;
  }
  catch {
    if (!cancelled) {
      errored.value = true;
    }
  }
  finally {
    if (!cancelled) {
      processing.value = false;
    }
  }
}, { immediate: true });
</script>

<template>
  <c-card style="max-width: 600px;">
    <c-input-text
      v-model:value="input"
      label="Your text:"
      placeholder="Your text to draw"
      raw-text
      multiline
      rows="4"
    />

    <n-divider />

    <n-grid cols="4" x-gap="12" w-full>
      <n-gi span="2">
        <c-select
          v-model:value="font"
          label-position="top"
          label="Font:"
          :options="fonts"
          searchable
          placeholder="Select font to use"
        />
      </n-gi>
      <n-gi span="2">
        <n-form-item label="Width:" label-placement="top" label-width="100" :show-feedback="false">
          <n-input-number v-model:value="width" :min="0" :max="10000" w-full placeholder="Width of the text" />
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-divider />

    <div v-if="processing" flex items-center justify-center>
      <n-spin size="medium" />
      <span class="ml-2">Loading font...</span>
    </div>

    <c-alert v-if="errored" mt-1 text-center type="error">
      Current settings resulted in error.
    </c-alert>

    <n-form-item v-if="!processing && !errored" label="Ascii Art text:">
      <TextareaCopyable
        :value="output"
        mb-1 mt-1
        copy-placement="outside"
      />
    </n-form-item>
  </c-card>
</template>
