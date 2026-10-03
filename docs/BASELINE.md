# Baseline der übernommenen Quellbasis — 2026-10-03

## Zweck und Scope

Diese Baseline dokumentiert die technische Herkunft der Codebasis, auf der **OstseeBit Tools** weiterentwickelt wird.

Klassifikation zum Zeitpunkt der Übernahme:

- Vorgang: Migration / Change / Entwicklungsrepository
- Plattform: GitHub Cloud
- Risiko: Medium
- Zielrepository: öffentlich
- Authentifizierte Repository-Identität: OstseeBit
- Berechtigungen: Admin, Maintain, Push und Pull
- Produktiv-Deployment: nicht Bestandteil dieser Phase

Das Zielrepository war vor der Übernahme leer. Nach dem Bootstrap waren die Branches ungeschützt. Eine produktive Bereitstellung wurde in dieser Phase nicht autorisiert.

## Unveränderliche Quellidentität

- Upstream: https://github.com/CorentinTh/it-tools
- Beobachteter Upstream-Branch: `main`
- Upstream-Commit: `d505845f918e946ec300af7b36efc107e2f66e9e`
- Upstream-Commit-Datum: `2026-02-12T00:59:29Z`
- Tree: `c033c4c7b567f58aaa4c886e1443705838cfe04a`
- Dateien: 498, davon 484 UTF-8-Textdateien und 14 Binärdateien
- LICENSE-Blob: `e72bfddabc15be5718a7cc061ac10e47741d8219`
- Lockfile-Blob: `5d1138932335484ec8781253f87694cf6fbcda84`
- Exakter Import-Snapshot-Commit: `358374351dac7070b188a503a1f0aeb7c341510f`
- Snapshot-Branch: `upstream/baseline-2026-10-03`
- Bootstrap-Commit: `b260d2d2f60636d2dfc9e647af1499c316c3f2fe`
- Bootstrap-Recovery-Branch: `recovery/bootstrap-2026-10-03`

Die importierte Dateistruktur wurde gegen den Upstream-Tree geprüft. LICENSE und Lockfile waren Bestandteil dieser Identitätsprüfung.

Der neu erzeugte Import-Commit reproduziert nicht die ursprüngliche Autorenschaft, Signaturen oder Parent-Historie des Upstream-Projekts. Für diese Historie ist weiterhin das Originalrepository maßgeblich.

## Technische Ausgangslage

Die übernommene Anwendung ist eine Vue-3-SPA mit Vite, TypeScript, Naive UI, PWA-Funktionen und überwiegend browserseitigen Werkzeugen. Eine statische Bereitstellung über nginx ist vorgesehen.

Die übernommene Toolchain enthält unter anderem:

- `.nvmrc`: Node.js 18.18.2
- geerbte CI: Node.js 20
- `packageManager`: pnpm 9.11.0
- Vue: ^3.3.4
- Vite: ^4.4.9
- TypeScript: ~5.2.0
- Vitest: ^0.34.0
- Playwright: ^1.32.3

Diese Angaben beschreiben die übernommenen Manifestvorgaben. Sie sind keine Aussage darüber, welche Versionen künftig für OstseeBit Tools festgelegt werden.

## Geerbte CI- und Veröffentlichungslogik

Die ursprünglichen Workflows enthielten Lint, Unit-Tests, Typecheck, Build sowie aufgeteilte E2E-Tests.

Geerbte Nightly- und Release-Jobs verwiesen auf Veröffentlichungsziele des ursprünglichen Projekts. Diese Ziele dürfen nicht für OstseeBit Tools verwendet werden. Deshalb wurden die geerbten Publishing-Abläufe nicht aktiviert und später aus der OstseeBit-Fortführung entfernt.

CI-/Testvorlagen verbleiben bis zu einer separaten Prüfung in `.github/workflows-disabled/`.

## Datenschutz und externe Ziele

Die ursprüngliche Codebasis enthielt eine Plausible-Integration und Sponsoring-/Social-Verweise. Diese wurden im Rahmen der OstseeBit-Fortführung aus der Anwendung entfernt.

Die ältere Dependency `plausible-tracker` ist weiterhin in der übernommenen Abhängigkeitsbasis vorhanden und wird getrennt modernisiert.

## Historischer Baseline-Status

Zum Zeitpunkt der reinen Quellübernahme wurden Installation, Build, Unit-Tests, E2E und Runtime-Audit noch nicht ausgeführt. Diese historische Aussage bleibt für die Baseline erhalten.

## Aktueller OstseeBit-Validierungsstand

Nach der Quellübernahme und dem Rebranding wurden lokal erfolgreich ausgeführt:

- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm typecheck`
- `corepack pnpm lint` — 0 Fehler, 6 Warnungen
- `corepack pnpm exec vitest run --environment jsdom` — 33 Testdateien, 138 Tests erfolgreich
- `corepack pnpm build` — erfolgreich

Die lokale Validierung erfolgte mit Node.js 24.18.1. Playwright-E2E, vollständige Browser-/PWA-Prüfung und produktive Freigabe sind noch offen.

## Recovery und Sicherheitsgrenzen

Die Snapshot- und Recovery-Branches dienen ausschließlich der nachvollziehbaren Wiederherstellung und Herkunftssicherung. Sie sind keine parallelen Produktversionen.

Der normale Weiterentwicklungsstand soll nach Abschluss eines Changes wieder in `main` zusammengeführt werden. Änderungen an `main` werden über nachvollziehbare Commits bzw. Pull Requests durchgeführt; Force-Push ist für die Recovery-Strategie nicht vorgesehen.

Der Branch `upstream/baseline-2026-10-03` darf nicht als Arbeitsbranch verwendet oder unkontrolliert nach `main` gemerged werden.

## Offene Folgearbeiten

- einheitliche unterstützte Node-/pnpm-Toolchain
- Modernisierung der Abhängigkeiten in kontrollierten Gruppen
- Reaktivierung einer geprüften CI
- E2E-/Browser-/PWA-Prüfung
- Release- und Containerstrategie
- Drittanbieter-Lizenzprüfung vor Distribution
- Branch-Protection für `main`
