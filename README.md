<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F52BA,100:00A9A5&height=190&section=header&text=OstseeBit%20Tools&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Open-Source-Werkzeuge%20f%C3%BCr%20Entwicklung%20%C2%B7%20Administration%20%C2%B7%20Netzwerk%20%C2%B7%20IT&descAlignY=55&descSize=16)

[![Lizenz](https://img.shields.io/badge/Lizenz-GPLv3-0F52BA?style=for-the-badge)](LICENSE)
[![Sprache](https://img.shields.io/badge/Sprache-Deutsch-0F52BA?style=for-the-badge)](#projektsprache)
![Version](https://img.shields.io/badge/Version-0.1.0-00A9A5?style=for-the-badge)
[![OstseeBit](https://img.shields.io/badge/by-OstseeBit-00A9A5?style=for-the-badge)](https://github.com/OstseeBit)

</div>

<br>

**OstseeBit Tools** ist eine von **OstseeBit** gepflegte Open-Source-Werkzeugsammlung für Entwicklung, Administration, Netzwerk und IT.

Das Projekt basiert auf dem Open-Source-Projekt **it-tools** und wird als eigenständige OstseeBit-Fortführung weiterentwickelt. Herkunft, ursprüngliche Urheberschaft und übernommene Quellbasis bleiben transparent dokumentiert.

<div align="center">

![Divider](https://capsule-render.vercel.app/api?type=rect&color=0:0F52BA,100:00A9A5&height=3&width=100%25)

</div>

## 📌 Projektstatus

Der aktuelle OstseeBit-Stand verwendet die Paketversion `0.1.0`.

Lokal erfolgreich geprüft:

- Installation mit eingefrorenem Lockfile
- TypeScript-Typecheck
- ESLint mit 0 Fehlern und 6 Warnungen
- Produktions-Build
- 33 Vitest-Testdateien
- 138 erfolgreiche Unit-Tests

Noch offen sind insbesondere Playwright-E2E, vollständige Browser-/PWA-Prüfung, produktive Veröffentlichung und die spätere Plattformmodernisierung.

## 🧰 Technische Basis

Das Projekt verwendet aktuell unter anderem:

- Vue 3
- TypeScript
- Vite
- Naive UI
- UnoCSS
- Vitest
- Playwright
- pnpm

Die übernommene Toolchain ist noch nicht vollständig vereinheitlicht:

- `.nvmrc`: Node.js 18.18.2
- geerbte CI-Konfiguration: Node.js 20
- `packageManager`: pnpm 9.11.0

Die lokale Baseline-Validierung wurde mit Node.js 24.18.1 durchgeführt. Die Festlegung einer einheitlichen Zielplattform erfolgt in einem getrennten Modernisierungsschritt.

## ⚡ Schnellstart

Abhängigkeiten installieren:

```bash
corepack pnpm install --frozen-lockfile
```

Entwicklungsserver starten:

```bash
corepack pnpm dev
```

Produktions-Build erstellen:

```bash
corepack pnpm build
```

Wichtige Prüfungen:

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm exec vitest run --environment jsdom
corepack pnpm build
```

Ein neues Tool kann über das vorhandene Generator-Skript angelegt werden:

```bash
corepack pnpm run script:create:tool my-tool-name
```

## 🐳 Self-Hosting

Der vorhandene Docker-Build erzeugt eine statische Webanwendung, die über nginx bereitgestellt wird.

Vor einer offiziellen OstseeBit-Veröffentlichung werden Container-, CI/CD- und Release-Konfigurationen separat geprüft. Dazu gehören insbesondere:

- Basis-Images und Versionierung
- pnpm-Installation im Container
- CI/CD-Workflows
- Release-Prozess
- Registry-Ziel
- reproduzierbare Builds
- Security- und Dependency-Prüfungen

Aktuell wird kein offizielles OstseeBit-Container-Image veröffentlicht.

## 🔒 Datenschutz

Im Rahmen der OstseeBit-Fortführung wurden aus der Anwendung unter anderem entfernt:

- Plausible-Laufzeitintegration
- Analytics-Konfiguration
- Social-Media-Verknüpfungen
- Sponsoring-Oberflächen

Die ältere Abhängigkeit `plausible-tracker` ist in der übernommenen Dependency-Basis noch vorhanden und wird in einem separaten Dependency-Cleanup behandelt.

Für den aktuellen Stand ist kein produktiver Analytics-Endpunkt konfiguriert.

## 🐞 Fehler melden und Tools vorschlagen

Fehler, Verbesserungsvorschläge und neue Tool-Ideen können über die GitHub-Issues eingereicht werden:

[Issue erstellen](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose)

Weitere Projektdokumentation:

- [Rebranding-Inventar](docs/REBRANDING-INVENTORY.md)
- [Validierungsbericht](docs/REBRANDING-VALIDATION.md)
- [Baseline-Bericht](docs/BASELINE.md)
- [Urheberschaft und Herkunft](NOTICE.md)

## 🌊 OstseeBit-Projektidentität

Für dieses Repository gelten verbindlich:

- **Marke / Maintainer:** OstseeBit
- **Produktname:** OstseeBit Tools
- **Schreibweise:** `OstseeBit` und `OstseeBit Tools`
- **Repository:** `OstseeBit/ostseebit-tools`
- **Lizenz:** GNU GPLv3

Die visuelle Repository-Darstellung folgt derselben OstseeBit-Grundlinie wie die übrigen OstseeBit-Repositories: Deutsch als Projektsprache sowie die OstseeBit-Farben **#0F52BA** und **#00A9A5**.

Logo-, Bild- oder UI-Änderungen erfolgen nicht beiläufig, sondern nur als ausdrücklich eigener Change.

## 🌍 Projektsprache

Die verbindliche Projektsprache der OstseeBit-Fortführung ist Deutsch.

Produktnamen, Bibliotheksnamen, API-Bezeichnungen, technische Standarddateien und historische Upstream-Inhalte bleiben unverändert, wenn Genauigkeit, Kompatibilität oder Herkunft dies erfordern.

## 📜 Herkunft und Weiterentwicklung

OstseeBit Tools ist eine eigenständig von OstseeBit gepflegte Fortführung auf Basis des Open-Source-Projekts **it-tools** von Corentin Thomasset und den dortigen Mitwirkenden.

OstseeBit beansprucht nicht die Urheberschaft am übernommenen Upstream-Code.

Die genaue Quellbasis und Herkunft sind dokumentiert in:

- [NOTICE.md](NOTICE.md)
- [docs/BASELINE.md](docs/BASELINE.md)

Der [CHANGELOG.md](CHANGELOG.md) enthält den übernommenen historischen Changelog des ursprünglichen Projekts. Historische Einträge werden nicht rückwirkend umbenannt.

## 📄 Lizenz

Dieses Projekt steht unter der [GNU General Public License Version 3](LICENSE).

Bestehende Copyright-, Lizenz- und Drittanbieterhinweise bleiben gültig. Bei der Weitergabe gebauter Artefakte sind die Bedingungen der GPLv3 einschließlich der Bereitstellung des entsprechenden Quellcodes und der erforderlichen Lizenzhinweise zu beachten.

<br>

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:00A9A5,100:0F52BA&height=100&section=footer)

**OstseeBit**

</div>
