# Validierung der OstseeBit-Fortführung — 2026-10-03

Dieses Dokument hält den nachweisbaren Validierungsstand des Rebranding-Branches **OstseeBit Tools** fest.

## Scope

Geprüft wird der Rebranding- und Baseline-Stand. Eine vollständige Produktionsfreigabe ist damit nicht verbunden.

Nicht Bestandteil dieser Validierung sind eine allgemeine Abhängigkeitsmodernisierung, produktive Veröffentlichung oder ein neues UI-/Bilddesign.

## Herkunft und Recovery

- ursprüngliche Quellbasis: siehe [BASELINE.md](BASELINE.md)
- Upstream-Snapshot: `upstream/baseline-2026-10-03`
- Recovery vor Rebranding: `recovery/pre-rebranding-2026-10-03`
- Recovery vor Identity-Cleanup: `recovery/pre-identity-cleanup-2026-10-03`
- Arbeitsbranch: `chore/ostseebit-rebranding`

Diese Branches sind Sicherungs- bzw. Referenzstände und keine verschiedenen Produktversionen.

## Erfolgreich ausgeführte lokale Prüfungen

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

Bekannte Warnungen betreffen unter anderem die alte TypeScript-/typescript-estree-Kompatibilitätsgrenze sowie Format-/UnoCSS-Hinweise. Diese Punkte sind Modernisierungsthemen und blockieren die Baseline nicht.

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

Der Build meldet unter anderem große Chunks sowie Hinweise zu älteren Toolchain-Komponenten und Browserdaten. Diese Befunde werden in der späteren Performance- und Plattformmodernisierung behandelt.

## Bereits im Rebranding nachgewiesene Punkte

- LICENSE und Upstream-Herkunft bleiben dokumentiert.
- OstseeBit Tools wird als aktuelle Projektidentität verwendet.
- Tracking-, Sponsoring- und fremde Social-Verweise wurden aus der Anwendung entfernt.
- geerbte Nightly-/Release-Publishing-Workflows wurden entfernt.
- CI-/Testvorlagen bleiben inaktiv, bis sie separat geprüft werden.
- reale Drittanbieter-Paketnamen werden nicht als Branding-Strings umbenannt.
- historischer Changelog bleibt als Historie erhalten.
- OTP-Standard-Issuer wurde im Rebranding auf OstseeBit Tools umgestellt; explizite Custom-Issuer bleiben davon getrennt.

## Noch nicht abgeschlossen

Folgende Prüfungen sind noch offen und werden nicht als bestanden dargestellt:

1. Playwright-E2E-Suite
2. vollständiger Browser-Test über repräsentative Tools
3. PWA-Installation und Updateverhalten
4. Verhalten unter verschachteltem Base-Path
5. gezielte Browser-Netzwerkprüfung auf unerwünschte externe Requests
6. produktive CSP-/Security-Header-Prüfung
7. Container-/Release-Pipeline und Registry-Publishing
8. vollständige Drittanbieter-Lizenzprüfung für veröffentlichte Artefakte

## Toolchain-Hinweis

Die lokale Baseline wurde mit Node.js 24.18.1 ausgeführt. Die Repository-Vorgaben sind noch uneinheitlich:

- `.nvmrc`: Node.js 18.18.2
- geerbte CI: Node.js 20
- pnpm: 9.11.0 im Manifest

Die Festlegung einer einheitlichen Zielplattform ist ein eigener Modernisierungs-Change.

## Bewertung des aktuellen Zustands

Der aktuelle Stand ist als **lokal build- und unit-testfähige OstseeBit-Baseline** nachgewiesen. Eine vollständige Release- oder Produktionsfreigabe wird daraus nicht abgeleitet.

Vor dem Merge werden Repository-Dokumentation und GitHub-Vorlagen konsistent auf OstseeBit ausgerichtet. Danach kann der Rebranding-Branch kontrolliert nach `main` übernommen werden.

## Recovery

Bei Problemen den Rebranding-PR nicht mergen bzw. spätere Änderungen über einen Revert zurücknehmen. Recovery- und Baseline-Branches bleiben bis zum Abschluss der Umstellung erhalten. Kein Force-Push auf `main`.
