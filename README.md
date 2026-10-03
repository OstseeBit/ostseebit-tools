<picture>
  <source srcset="./.github/logo-white.svg" media="(prefers-color-scheme: dark)">
  <img src="./.github/logo-dark.svg" alt="OstseeBit Tools" width="640">
</picture>

# OstseeBit Tools

OstseeBit Tools ist eine Sammlung praktischer Werkzeuge für Entwicklung, Administration, Netzwerk und IT.

Das Projekt wird von **OstseeBit** weitergeführt und basiert auf dem Open-Source-Projekt **it-tools**. Herkunft, ursprüngliche Urheberschaft und die übernommene Ausgangsbasis sind in [NOTICE.md](NOTICE.md) und im [Baseline-Bericht](docs/BASELINE.md) dokumentiert.

## Projektstatus

OstseeBit Tools befindet sich im kontrollierten Umbau von der übernommenen Ausgangsbasis zu einer eigenständig gepflegten OstseeBit-Version.

Der aktuelle Stand wurde lokal erfolgreich geprüft:

- TypeScript-Typecheck erfolgreich
- ESLint ohne Fehler
- Produktions-Build erfolgreich
- 33 Testdateien erfolgreich
- 138 Unit-Tests erfolgreich
- Tracking- und Sponsoring-Komponenten aus der Anwendung entfernt
- OstseeBit-Branding integriert
- Projektversion auf `0.1.0` umgestellt

Die technische Plattform und die Abhängigkeiten werden anschließend schrittweise modernisiert. Größere Versionssprünge erfolgen bewusst getrennt und werden jeweils einzeln validiert.

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

Die übernommene Ausgangsbasis enthält derzeit noch unterschiedliche Toolchain-Vorgaben:

- `.nvmrc`: Node.js 18.18.2
- bisherige CI-Konfiguration: Node.js 20
- `packageManager`: pnpm 9.11.0

Diese Unterschiede werden im Rahmen der geplanten Plattformmodernisierung kontrolliert bereinigt.

Abhängigkeiten sollten bis dahin nicht pauschal mit `--latest`, `--force` oder vergleichbaren Verfahren aktualisiert werden.

## Self-Hosting

Der vorhandene Docker-Build erzeugt eine statische Webanwendung, die über nginx bereitgestellt wird.

Die Container- und CI-Konfiguration stammt teilweise noch aus der übernommenen Ausgangsbasis und wird vor einer offiziellen OstseeBit-Veröffentlichung separat überarbeitet.

Insbesondere werden noch geprüft:

- Basis-Images und deren Versionierung
- pnpm-Installation im Container
- CI/CD-Workflows
- Release-Prozess
- Registry-Ziel
- reproduzierbare Builds
- Security- und Dependency-Prüfungen

Aktuell wird kein offizielles OstseeBit-Container-Image veröffentlicht.

## Datenschutz

Im Rahmen des OstseeBit-Rebrandings wurden unter anderem entfernt:

- Plausible-Integration in der Anwendung
- Analytics-Konfiguration
- Social-Media-Verknüpfungen
- Sponsoring-Oberflächen

Eine ältere `plausible-tracker`-Abhängigkeit kann in der übernommenen Dependency-Basis noch vorhanden sein und wird im Rahmen der geplanten Abhängigkeitsbereinigung separat behandelt.

Für den aktuellen Stand ist kein produktiver Analytics-Endpunkt konfiguriert.

## Fehler melden und neue Tools vorschlagen

Fehler, Verbesserungsvorschläge und neue Tool-Ideen können über die GitHub-Issues eingereicht werden:

[Issue erstellen](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose)

Weitere Projektdokumentation:

- [Rebranding-Inventar](docs/REBRANDING-INVENTORY.md)
- [Validierungsbericht](docs/REBRANDING-VALIDATION.md)
- [Baseline-Bericht](docs/BASELINE.md)
- [Urheberschaft und Herkunft](NOTICE.md)

## Herkunft und Weiterentwicklung

OstseeBit Tools ist keine Neuentwicklung des ursprünglichen Projekts.

Die Codebasis basiert auf dem Open-Source-Projekt:

**it-tools**
Originalprojekt: `CorentinTh/it-tools`

OstseeBit führt diese Codebasis unter Einhaltung der bestehenden Lizenz weiter, passt sie an und entwickelt darauf aufbauend eigene Änderungen und Erweiterungen.

Die genaue übernommene Ausgangsbasis und weitere Herkunftsinformationen sind in [NOTICE.md](NOTICE.md) und [docs/BASELINE.md](docs/BASELINE.md) dokumentiert.

## Lizenz

Dieses Projekt wird unter der [GNU General Public License Version 3](LICENSE) bereitgestellt.

Bestehende Copyright-, Lizenz- und Drittanbieterhinweise bleiben gültig.

Bei der Weitergabe kompilierter oder anderweitig verteilter Versionen sind die Bedingungen der GPLv3 einschließlich der Bereitstellung des entsprechenden Quellcodes und der erforderlichen Lizenzhinweise zu beachten.