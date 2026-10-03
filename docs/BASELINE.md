# Technische Baseline — 2026-10-03

## Zweck

Diese Baseline dokumentiert die technische Ausgangsbasis des Repositorys. Sie dient als Referenz für Modernisierung, Recovery und spätere Vergleiche.

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

## CI und Publishing

Die vorhandenen CI-/Testvorlagen enthalten Lint, Unit-Tests, Typecheck, Build und E2E-Abläufe.

Geerbte Nightly- und Release-Publishing-Ziele wurden nicht übernommen. CI-/Testvorlagen bleiben bis zu einer separaten Prüfung in `.github/workflows-disabled/`.

## Container-Ausgangslage

Ein Dockerfile für einen statischen Build mit nginx ist vorhanden.

Die Containerkonfiguration ist **noch nicht als offizieller Auslieferungsweg freigegeben**. Vor einer Bereitstellung sind insbesondere erforderlich:

- Basis-Images versionieren
- Build reproduzierbar machen
- Dockerfile härten
- Container lokal bauen und testen
- Laufzeit- und HTTP-Verhalten prüfen
- Tagging- und Registry-Strategie definieren
- offizielles Image erst nach erfolgreicher Validierung veröffentlichen

Dieser Punkt ist verbindlich in [ROADMAP.md](ROADMAP.md) aufgenommen.

## Aktueller Validierungsstand

Lokal erfolgreich ausgeführt:

- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm typecheck`
- `corepack pnpm lint` — 0 Fehler, 6 Warnungen
- `corepack pnpm exec vitest run --environment jsdom` — 33 Testdateien, 138 Tests erfolgreich
- `corepack pnpm build` — erfolgreich

Die lokale Validierung erfolgte mit Node.js 24.18.1.

Noch offen:

- Playwright-E2E
- vollständige Browser-/PWA-Prüfung
- Container-Build und Container-Laufzeittest
- produktive Release-/Publishing-Pipeline

## Recovery

Die Snapshot- und Recovery-Branches dienen ausschließlich der Wiederherstellung und Herkunftssicherung. Sie sind keine parallelen Produktversionen.

Der reguläre Weiterentwicklungsstand wird nach Abschluss eines Changes wieder nach `main` übernommen.

Kein Force-Push auf `main`.
