<picture>
  <source srcset="./.github/logo-white.svg" media="(prefers-color-scheme: dark)">
  <img src="./.github/logo-dark.svg" alt="OstseeBit Tools" width="640">
</picture>

# OstseeBit Tools

**OstseeBit Tools** ist eine von **OstseeBit** gepflegte Open-Source-Werkzeugsammlung für Entwicklung, Administration, Netzwerk und IT.

## Projektidentität

- **Projektname:** OstseeBit Tools
- **Maintainer der Fortführung:** [OstseeBit](https://github.com/OstseeBit)
- **Repository:** [OstseeBit/ostseebit-tools](https://github.com/OstseeBit/ostseebit-tools)
- **Lizenz:** GNU GPLv3
- **Schreibweise:** `OstseeBit` und `OstseeBit Tools`

Die OstseeBit-Schreibweise wird in Repository-Dokumentation, Vorlagen und Projektmetadaten einheitlich verwendet. Diese Dokumentationsbereinigung verändert weder die Anwendungsoberfläche noch bestehende OstseeBit-Logos, Bilder oder Designelemente.

OstseeBit Tools basiert auf dem Open-Source-Projekt **it-tools**. Herkunft, ursprüngliche Urheberschaft und die übernommene Ausgangsbasis sind in [NOTICE.md](NOTICE.md) und im [Baseline-Bericht](docs/BASELINE.md) dokumentiert.

## Projektstatus

Der aktuelle OstseeBit-Stand verwendet die Paketversion `0.1.0` und wurde lokal mit dem vorhandenen Lockfile geprüft:

- Installation mit `corepack pnpm install --frozen-lockfile` erfolgreich
- TypeScript-Typecheck erfolgreich
- ESLint: 0 Fehler, 6 Warnungen
- Produktions-Build erfolgreich
- 33 Testdateien erfolgreich
- 138 Unit-Tests erfolgreich
- Tracking- und Sponsoring-Komponenten aus der Anwendung entfernt
- OstseeBit-Projektidentität integriert

Noch nicht als vollständige Freigabe geprüft sind insbesondere Playwright-E2E, Browser-/PWA-Verhalten, ein produktives Deployment sowie die spätere Veröffentlichungs-Pipeline.

## Entwicklung

Das Projekt verwendet aktuell unter anderem:

- Vue 3
- TypeScript
- Vite
- Naive UI
- UnoCSS
- Vitest
- Playwright
- pnpm

Abhängigkeiten installieren:

```sh
corepack pnpm install --frozen-lockfile
```

Entwicklungsserver starten:

```sh
corepack pnpm dev
```

Produktions-Build erstellen:

```sh
corepack pnpm build
```

Wichtige Prüfungen:

```sh
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm exec vitest run --environment jsdom
corepack pnpm build
```

Ein neues Tool kann über das vorhandene Generator-Skript angelegt werden:

```sh
corepack pnpm run script:create:tool my-tool-name
```

## Toolchain

Die übernommene Ausgangsbasis enthält noch unterschiedliche Toolchain-Vorgaben:

- `.nvmrc`: Node.js 18.18.2
- übernommene CI-Konfiguration: Node.js 20
- `packageManager`: pnpm 9.11.0

Die lokale Baseline-Validierung wurde mit Node.js 24.18.1 durchgeführt. Eine einheitliche, offiziell unterstützte Ziel-Toolchain wird in einem getrennten Modernisierungsschritt festgelegt.

Abhängigkeiten werden nicht pauschal mit `--latest`, `--force` oder vergleichbaren Verfahren aktualisiert.

## Self-Hosting

Der vorhandene Docker-Build erzeugt eine statische Webanwendung, die über nginx bereitgestellt wird.

Container-, CI/CD- und Release-Konfigurationen werden vor einer offiziellen OstseeBit-Veröffentlichung separat geprüft. Dazu gehören insbesondere:

- Basis-Images und Versionierung
- pnpm-Installation im Container
- CI/CD-Workflows
- Release-Prozess
- Registry-Ziel
- reproduzierbare Builds
- Security- und Dependency-Prüfungen

Aktuell wird kein offizielles OstseeBit-Container-Image veröffentlicht.

## Datenschutz

Im Rahmen der OstseeBit-Fortführung wurden aus der Anwendung unter anderem entfernt:

- Plausible-Laufzeitintegration
- Analytics-Konfiguration
- Social-Media-Verknüpfungen
- Sponsoring-Oberflächen

Die ältere Abhängigkeit `plausible-tracker` ist in der übernommenen Dependency-Basis noch vorhanden und wird in einem separaten Dependency-Cleanup behandelt. Für den aktuellen Stand ist kein produktiver Analytics-Endpunkt konfiguriert.

## Fehler melden und neue Tools vorschlagen

Fehler, Verbesserungsvorschläge und neue Tool-Ideen können über die GitHub-Issues eingereicht werden:

[Issue erstellen](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose)

Weitere Projektdokumentation:

- [Rebranding-Inventar](docs/REBRANDING-INVENTORY.md)
- [Validierungsbericht](docs/REBRANDING-VALIDATION.md)
- [Baseline-Bericht](docs/BASELINE.md)
- [Urheberschaft und Herkunft](NOTICE.md)

## Herkunft und Weiterentwicklung

OstseeBit Tools ist eine eigenständig von OstseeBit gepflegte Fortführung auf Basis des Open-Source-Projekts **it-tools** von Corentin Thomasset und den dortigen Mitwirkenden.

OstseeBit beansprucht nicht die Urheberschaft am übernommenen Upstream-Code. Die genaue Quellbasis und die ursprüngliche Projektgeschichte bleiben nachvollziehbar dokumentiert.

## Historischer Changelog

[CHANGELOG.md](CHANGELOG.md) enthält den übernommenen historischen Changelog des ursprünglichen Projekts. Die historischen Einträge werden nicht rückwirkend umbenannt. Neue OstseeBit-Änderungen werden ab der eigenen Versionslinie dokumentiert.

## Lizenz

Dieses Projekt wird unter der [GNU General Public License Version 3](LICENSE) bereitgestellt.

Bestehende Copyright-, Lizenz- und Drittanbieterhinweise bleiben gültig. Bei der Weitergabe kompilierter oder anderweitig verteilter Versionen sind die Bedingungen der GPLv3 einschließlich der Bereitstellung des entsprechenden Quellcodes und der erforderlichen Lizenzhinweise zu beachten.
