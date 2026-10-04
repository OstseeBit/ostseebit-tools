import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export { defineDiffEditorThemes };

// Monaco ships its own theming API (monaco.editor.defineTheme), a different
// shape than the rest of the kit's defineThemes()/useTheme() composable — so
// this file doesn't follow that pattern, it just gives Monaco's native light
// and dark themes a transparent editor background so they blend into the
// surrounding c-card instead of Monaco's own default white/dark panel.
function defineDiffEditorThemes() {
  monaco.editor.defineTheme('ostseebit-tools-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#00000000',
    },
  });

  monaco.editor.defineTheme('ostseebit-tools-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#00000000',
    },
  });
}
