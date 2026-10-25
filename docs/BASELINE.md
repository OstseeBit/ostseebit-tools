# Technische Baseline — 2026-10-03

## Zweck

Diese Baseline dokumentiert die technische Ausgangsbasis des Repositorys. Sie dient als Referenz für spätere Vergleiche mit dem Ursprungsprojekt.

## Quellidentität

- Upstream: https://github.com/CorentinTh/it-tools
- Upstream-Branch: `main`
- Upstream-Commit: `d505845f918e946ec300af7b36efc107e2f66e9e`
- Upstream-Commit-Datum: `2026-02-12T00:59:29Z`
- Tree: `c033c4c7b567f58aaa4c886e1443705838cfe04a`
- Dateien: 498
- LICENSE-Blob: `e72bfddabc15be5718a7cc061ac10e47741d8219`
- Lockfile-Blob: `5d1138932335484ec8781253f87694cf6fbcda84`
- Import-Snapshot-Commit: `358374351dac7070b188a503a1f0aeb7c341510f`
- Snapshot-Branch: `upstream/baseline-2026-10-03`
- Bootstrap-Commit: `b260d2d2f60636d2dfc9e647af1499c316c3f2fe`
- Bootstrap-Recovery-Branch: `recovery/bootstrap-2026-10-03`

Die importierte Dateistruktur wurde gegen den Upstream-Tree geprüft. LICENSE und Lockfile waren Bestandteil dieser Prüfung.

Der neu erzeugte Import-Commit reproduziert nicht die ursprüngliche Autorenschaft, Signaturen oder Parent-Historie des Upstream-Projekts. Für diese Historie ist weiterhin das Originalrepository maßgeblich.

## Technische Ausgangslage

Die Anwendung ist eine Vue-3-SPA mit Vite, TypeScript, Naive UI, PWA-Funktionen und überwiegend browserseitigen Werkzeugen.

Vorhandene Toolchain-Vorgaben:

- `.nvmrc`: Node.js 18.18.2
- CI-Konfiguration: Node.js 20
- `packageManager`: pnpm 9.11.0
- Vue: ^3.3.4
- Vite: ^4.4.9
- TypeScript: ~5.2.0
- Vitest: ^0.34.0
- Playwright: ^1.32.3

Diese Angaben beschreiben den übernommenen Manifeststand und sind keine Festlegung für die zukünftige Zielplattform.
