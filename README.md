<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F52BA,100:00A9A5&height=190&section=header&text=OstseeBit%20Tools&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Open-Source-Werkzeuge%20f%C3%BCr%20Entwicklung%20%C2%B7%20Administration%20%C2%B7%20Netzwerk%20%C2%B7%20IT&descAlignY=55&descSize=16)

[![Lizenz](https://img.shields.io/badge/Lizenz-GPLv3-0F52BA?style=for-the-badge)](LICENSE)
[![Sprache](https://img.shields.io/badge/Sprache-Deutsch-0F52BA?style=for-the-badge)](#projektsprache)
![Version](https://img.shields.io/badge/Version-0.1.0-00A9A5?style=for-the-badge)
[![OstseeBit](https://img.shields.io/badge/by-OstseeBit-00A9A5?style=for-the-badge)](https://github.com/OstseeBit)

</div>

<br>

**OstseeBit Tools** ist eine von **OstseeBit** gepflegte und weiterentwickelte Open-Source-Werkzeugsammlung für Entwicklung, Administration, Netzwerk und IT.

Die Codebasis basiert auf dem Open-Source-Projekt **it-tools**. Herkunft und ursprüngliche Urheberschaft bleiben in [NOTICE.md](NOTICE.md) und [docs/BASELINE.md](docs/BASELINE.md) nachvollziehbar dokumentiert.

<div align="center">

![Divider](https://capsule-render.vercel.app/api?type=rect&color=0:0F52BA,100:00A9A5&height=3&width=100%25)

</div>

## 📌 Projektstatus

Aktuelle Paketversion: `0.1.0`

Lokal erfolgreich geprüft am 2026-10-04:

- Installation mit eingefrorenem Lockfile
- Typprüfung von Anwendung, Tests und Build-/Testkonfiguration
- ESLint: 0 Fehler, 0 Warnungen
- 36 Vitest-Testdateien mit 173 erfolgreichen Unit-Tests
- Produktions-Build einschließlich Service Worker
- 154 Browserprüfungen gegen den Entwicklungsserver nach einem Kaltstart
- 462 Browserprüfungen gegen den Produktions-Build in Chromium, Firefox und WebKit

Alle 86 Werkzeugseiten sind im Seitenaufruf-Test enthalten. Prüfgrenzen, verbleibende Drittanbieterwarnungen und offene Sicherheits-, PWA- und Containerarbeiten stehen in [docs/VALIDATION.md](docs/VALIDATION.md). Die weitere modulare Modernisierung beschreibt [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md).

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

Die lokale Toolchain verwendet Node.js **24.18.1** (`.nvmrc`) und pnpm **12.8.1** (`packageManager`). Die neue CI-Prüfkette liest dieselbe Node-Vorgabe und ist für Windows und Linux vorbereitet. Historische deaktivierte Workflow-Dateien bestimmen nicht mehr die Zielversion.

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
corepack pnpm test:unit
corepack pnpm build
```

Gesamte lokale Prüfkette einschließlich echter Browser:

```bash
corepack pnpm exec playwright install
corepack pnpm check:all
```

Für die Browserprüfungen müssen die lokalen Ports 5173 und 5050 frei sein. Ein bereits laufender Entwicklungsserver sollte vorher beendet werden.

Ein neues Tool kann über das vorhandene Generator-Skript angelegt werden:

```bash
corepack pnpm run script:create:tool my-tool-name
```

## 🐳 Self-Hosting und Container

Ein Dockerfile für den statischen Betrieb über nginx ist bereits vorhanden. Die Containerbereitstellung ist jedoch noch **nicht abgeschlossen** und gehört ausdrücklich zum weiteren Projektplan.

Vor einer offiziellen Bereitstellung werden mindestens folgende Punkte bearbeitet:

- Dockerfile technisch modernisieren und härten
- Basis-Images bewusst versionieren
- pnpm-/Node-Build reproduzierbar festlegen
- Container lokal bauen und testen
- Laufzeitverhalten und statische Auslieferung prüfen
- Image-Tags und Release-Schema definieren
- Registry-Ziel festlegen
- anschließend ein offizielles Container-Image bereitstellen

Bis diese Arbeiten abgeschlossen und validiert sind, wird kein offizielles Container-Image als fertig bereitgestellt bezeichnet.

Siehe auch [Roadmap](docs/ROADMAP.md).

## 🔒 Datenschutz

Aus der Anwendung wurden unter anderem entfernt:

- Plausible-Laufzeitintegration
- Analytics-Konfiguration
- Social-Media-Verknüpfungen
- Sponsoring-Oberflächen

Die ältere Abhängigkeit `plausible-tracker` wurde entfernt (keine Verwendung im Quellcode).

Für den aktuellen Stand ist kein produktiver Analytics-Endpunkt konfiguriert.

## 🐞 Fehler melden und Tools vorschlagen

[Issue erstellen](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose)

## 📚 Dokumentation

- [Projektstatus](docs/PROJECT-STATUS.md)
- [Validierungsstand](docs/VALIDATION.md)
- [Roadmap](docs/ROADMAP.md)
- [Technische Baseline](docs/BASELINE.md)
- [Barrierefreiheit](docs/ACCESSIBILITY.md)
- [Herkunft und Urheberschaft](NOTICE.md)

## 🌍 Projektsprache

Die verbindliche Projektsprache ist Deutsch.

Produktnamen, Bibliotheksnamen, API-Bezeichnungen, technische Standarddateien und historische Upstream-Inhalte bleiben unverändert, wenn Genauigkeit, Kompatibilität oder Herkunft dies erfordern.

## 📜 Herkunft

Die Codebasis basiert auf dem Open-Source-Projekt **it-tools** von Corentin Thomasset und weiteren Mitwirkenden.

OstseeBit beansprucht nicht die Urheberschaft am übernommenen Upstream-Code. Die genaue Quellbasis ist in [NOTICE.md](NOTICE.md) und [docs/BASELINE.md](docs/BASELINE.md) dokumentiert.

Der [CHANGELOG.md](CHANGELOG.md) enthält den übernommenen historischen Changelog des ursprünglichen Projekts. Historische Einträge werden nicht rückwirkend verändert.

## 📄 Lizenz

Dieses Projekt steht unter der [GNU General Public License Version 3](LICENSE).

Bestehende Copyright-, Lizenz- und Drittanbieterhinweise bleiben gültig. Bei der Weitergabe gebauter Artefakte sind die Bedingungen der GPLv3 einschließlich der Bereitstellung des entsprechenden Quellcodes und der erforderlichen Lizenzhinweise zu beachten.

<br>

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:00A9A5,100:0F52BA&height=100&section=footer)

**OstseeBit**

</div>
