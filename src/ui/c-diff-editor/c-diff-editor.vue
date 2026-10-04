<script setup lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { useStyleStore } from '@/stores/style.store';
import { defineDiffEditorThemes } from './c-diff-editor.theme';
import 'monaco-editor/esm/vs/editor/edcore.main';

const props = withDefaults(defineProps<{ options?: monaco.editor.IDiffEditorOptions }>(), { options: () => ({}) });

globalThis.window.MonacoEnvironment = {
  getWorker: () => new EditorWorker(),
};

const { options } = toRefs(props);

const editorContainer = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneDiffEditor | null = null;

defineDiffEditorThemes();

const styleStore = useStyleStore();

watch(
  () => styleStore.isDarkTheme,
  isDarkTheme => monaco.editor.setTheme(isDarkTheme ? 'ostseebit-tools-dark' : 'ostseebit-tools-light'),
  { immediate: true },
);

watch(
  () => options.value,
  options => editor?.updateOptions(options),
  { immediate: true, deep: true },
);

useResizeObserver(editorContainer, () => {
  editor?.layout();
});

onMounted(() => {
  if (!editorContainer.value) {
    return;
  }

  editor = monaco.editor.createDiffEditor(editorContainer.value, {
    originalEditable: true,
    minimap: {
      enabled: false,
    },
  });

  editor.setModel({
    original: monaco.editor.createModel('original text', 'plaintext'),
    modified: monaco.editor.createModel('modified text', 'plaintext'),
  });
});
onBeforeUnmount(() => {
  const models = editor?.getModel();
  editor?.dispose();
  models?.original.dispose();
  models?.modified.dispose();
});
</script>

<template>
  <div ref="editorContainer" h-600px />
</template>
