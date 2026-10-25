<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F52BA,100:00A9A5&height=190&section=header&text=OstseeBit%20Tools&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Open-Source-Werkzeuge%20f%C3%BCr%20Entwicklung%20%C2%B7%20Administration%20%C2%B7%20Netzwerk%20%C2%B7%20IT&descAlignY=55&descSize=16)

[![Lizenz](https://img.shields.io/badge/Lizenz-GPLv3-0F52BA?style=for-the-badge)](LICENSE)
[![Sprache](https://img.shields.io/badge/Sprache-Deutsch%20%C2%B7%20Englisch-0F52BA?style=for-the-badge)](#-projektsprache)
[![Prüfung](https://img.shields.io/github/actions/workflow/status/OstseeBit/ostseebit-tools/validate.yml?branch=main&style=for-the-badge&label=Pr%C3%BCfung&color=00A9A5)](https://github.com/OstseeBit/ostseebit-tools/actions/workflows/validate.yml)
[![Stand](https://img.shields.io/github/last-commit/OstseeBit/ostseebit-tools/main?style=for-the-badge&label=Stand&color=00A9A5)](https://github.com/OstseeBit/ostseebit-tools/commits/main)
[![OstseeBit](https://img.shields.io/badge/by-OstseeBit-00A9A5?style=for-the-badge)](https://github.com/OstseeBit)

</div>

<br>

**OstseeBit Tools** ist eine von **OstseeBit** gepflegte und weiterentwickelte Open-Source-Werkzeugsammlung für Entwicklung, Administration, Netzwerk und IT.

Die Codebasis basiert auf dem Open-Source-Projekt **it-tools**. Herkunft und ursprüngliche Urheberschaft bleiben in [NOTICE.md](NOTICE.md) und [docs/BASELINE.md](docs/BASELINE.md) nachvollziehbar dokumentiert.

<div align="center">

![Divider](https://capsule-render.vercel.app/api?type=rect&color=0:0F52BA,100:00A9A5&height=3&width=100%25)

</div>

## 📌 Projektstatus

- **86 Werkzeuge**, alle mit deutscher und englischer Oberfläche (Sprachwahl oben in der Leiste). Wo eine Eingabe nötig ist, startet das Werkzeug mit einem Beispiel und zeigt sofort ein Ergebnis.
- **Vollständige Prüfkette bei jedem Pull-Request** auf GitHub Actions (Ubuntu und Windows): Installation mit eingefrorenem Lockfile, ESLint, Typprüfung, Unit-Tests, Produktions-Build, Browserprüfungen gegen den Entwicklungsserver nach einem Kaltstart, Browserprüfungen gegen den Produktions-Build in Chromium, Firefox und WebKit sowie ein Offline-Test der installierbaren Web-App (PWA). Der aktuelle Stand steht im Badge "Prüfung" oben.
- **Schnelle Auslieferung:** kleine Startdatei, schwere Teile (Code-Editor, Schriften, Hersteller-Datenbank) werden erst beim Aufruf des jeweiligen Tools geladen und danach für den Offline-Betrieb gespeichert.
- **Weitgehend aktuelle Abhängigkeiten**; verbleibende Sicherheitsmeldungen und bewusst nicht aktualisierte Pakete sind mit Begründung in [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md) dokumentiert.
- Die Version in der Fußzeile der App ist das Datum des letzten Commits plus dessen Kurz-ID (z. B. "Version 2026-10-25 · a1b2c3d") und wird bei jedem Build automatisch gesetzt.

Zahlen, Prüfgrenzen und offene Arbeiten stehen in [docs/PROJECT-STATUS.md](docs/PROJECT-STATUS.md) und [docs/VALIDATION.md](docs/VALIDATION.md).

## 🧰 Technische Basis

Das Projekt verwendet aktuell unter anderem:

- Vue 3 und Vue Router
- TypeScript
- Vite
- vue-i18n (Deutsch und Englisch)
- Naive UI
- UnoCSS
- Vitest
- Playwright
- pnpm

Die lokale Toolchain verwendet Node.js **24.18.1** (`.nvmrc`) und pnpm **12.8.1** (`packageManager`). Die CI-Prüfkette (`.github/workflows/validate.yml`) liest dieselbe Node-Vorgabe und läuft unter Windows und Linux.

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

Die App ist eine statische Webseite und wird im Container über nginx ausgeliefert (Port 80, Benutzer `nginx`, mit Komprimierung, Zwischenspeicher-Regeln und Sicherheits-Headern).

**Selbst bauen und starten** (auf einem Rechner mit Docker):

```bash
docker build -t ostseebit-tools:test --build-arg GIT_COMMIT_SHA=$(git rev-parse HEAD) --build-arg BUILD_DATE=$(git log -1 --format=%cs) .
docker run --rm -p 8080:80 ostseebit-tools:test
```

Danach ist die App unter `http://localhost:8080` erreichbar.

**Veröffentlichung auf Docker Hub:** Der Workflow `.github/workflows/docker-publish.yml` ist vorbereitet. Er baut das Image für `linux/amd64` und `linux/arm64` und lädt es als `<docker-hub-name>/ostseebit-tools` mit den Tags `latest` (aktueller Stand von `main`) und Versionsnummern hoch. Die Einrichtung (Konto, Zugriffstoken, GitHub-Secrets), die Installation auf einem Docker-Host und das Aktualisieren stehen in [docs/DOCKER.md](docs/DOCKER.md).

> **Stand:** Dockerfile, nginx-Konfiguration und Veröffentlichungs-Workflow sind vorbereitet, aber ein Container-Build wurde auf einem Docker-Host noch **nicht** abgenommen, und ein offizielles Image auf Docker Hub ist noch **nicht** veröffentlicht. Erst wenn Build und Laufzeittest erfolgreich waren und die erste Veröffentlichung durch ist, gilt das Image als bereitgestellt.

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
- [Docker: bauen, veröffentlichen, betreiben](docs/DOCKER.md)
- [Technische Baseline](docs/BASELINE.md)
- [Barrierefreiheit](docs/ACCESSIBILITY.md)
- [Herkunft und Urheberschaft](NOTICE.md)

## 🌍 Projektsprache

Die verbindliche Projektsprache ist Deutsch. Die Oberfläche der App ist zusätzlich vollständig auf Englisch verfügbar; die Sprache wird oben in der Leiste umgeschaltet.

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
