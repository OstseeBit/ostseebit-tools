# Validierungsstand — 2026-10-03

## Scope

Dieses Dokument hält den nachweisbaren lokalen Validierungsstand fest.

Eine vollständige Produktions- oder Release-Freigabe wird daraus nicht abgeleitet.

## Erfolgreich ausgeführte Prüfungen

### Dependency-Installation

```sh
corepack pnpm install --frozen-lockfile
```

Ergebnis: erfolgreich.

### TypeScript-Typecheck

```sh
corepack pnpm typecheck
```

Ergebnis: erfolgreich.

### ESLint

```sh
corepack pnpm lint
```

Ergebnis: 0 Fehler, 6 Warnungen.

Die verbleibenden Warnungen werden im Rahmen der Toolchain- und Code-Modernisierung behandelt.

### Unit-Tests

```sh
corepack pnpm exec vitest run --environment jsdom
```

Ergebnis:

- 33 Testdateien erfolgreich
- 138 Tests erfolgreich

### Produktions-Build

```sh
corepack pnpm build
```

Ergebnis: erfolgreich.

Der Build meldet unter anderem große Chunks sowie Hinweise zu älteren Toolchain-Komponenten und Browserdaten. Diese Befunde werden später separat bearbeitet.

## Noch nicht abgeschlossen

- Playwright-E2E
- vollständiger Browser-Test
- PWA-Installation und Updateverhalten
- verschachtelter Base-Path
- gezielte Browser-Netzwerkprüfung
- produktive CSP-/Security-Header-Prüfung
- Container-Build
- Container-Laufzeittest
- Release-/Publishing-Pipeline
- vollständige Drittanbieter-Lizenzprüfung für veröffentlichte Artefakte

## Toolchain-Hinweis

Die lokale Baseline wurde mit Node.js 24.18.1 ausgeführt.

Die Repository-Vorgaben sind noch uneinheitlich:

- `.nvmrc`: Node.js 18.18.2
- CI-Konfiguration: Node.js 20
- pnpm: 9.11.0 im Manifest

Die Zielplattform wird in einem eigenen Modernisierungsschritt festgelegt.

## Ergebnis

Der aktuelle Stand ist lokal build- und unit-testfähig.

Containerbereitstellung, E2E/Browser/PWA und produktive Veröffentlichung bleiben ausdrücklich offen und werden erst nach eigener Validierung als abgeschlossen dokumentiert.
