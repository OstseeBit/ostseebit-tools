// Schreibt src/assets/tokens.css aus src/ui/theme/tokens.ts (Aufruf: pnpm tokens:build).
// Benötigt Node 22.18 oder neuer, weil die TypeScript-Datei direkt geladen wird.
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { renderTokensCss } = await import(pathToFileURL(resolve(root, 'src/ui/theme/tokens.ts')).href);

const target = resolve(root, 'src/assets/tokens.css');
writeFileSync(target, renderTokensCss());
console.log(`Geschrieben: ${target}`);
