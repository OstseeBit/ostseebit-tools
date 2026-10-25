<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F52BA,100:00A9A5&height=190&section=header&text=OstseeBit%20Tools&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Open-Source-Werkzeuge%20f%C3%BCr%20Entwicklung%20%C2%B7%20Administration%20%C2%B7%20Netzwerk%20%C2%B7%20IT&descAlignY=55&descSize=16)

[![Lizenz](https://img.shields.io/badge/Lizenz-GPLv3-0F52BA?style=for-the-badge)](LICENSE)
[![Sprache](https://img.shields.io/badge/Sprache-Deutsch%20%C2%B7%20Englisch-0F52BA?style=for-the-badge)](#-sprache)
[![Prüfung](https://img.shields.io/github/actions/workflow/status/OstseeBit/ostseebit-tools/validate.yml?branch=main&style=for-the-badge&label=Pr%C3%BCfung&color=00A9A5)](https://github.com/OstseeBit/ostseebit-tools/actions/workflows/validate.yml)
[![Docker](https://img.shields.io/docker/pulls/ostseebit/ostseebit-tools?style=for-the-badge&label=Docker%20Pulls&color=0F52BA)](https://hub.docker.com/r/ostseebit/ostseebit-tools)
[![OstseeBit](https://img.shields.io/badge/by-OstseeBit-00A9A5?style=for-the-badge)](https://github.com/OstseeBit)

</div>

<br>

**OstseeBit Tools** ist eine Sammlung von **86 Werkzeugen** für Entwicklung, Administration, Netzwerk und IT, die direkt im Browser laufen. Alle Eingaben werden lokal verarbeitet, es wird nichts an einen Server gesendet.

## 💡 Idee und Herkunft

Das Projekt basiert auf dem Open-Source-Projekt **[it-tools](https://github.com/CorentinTh/it-tools)** von Corentin Thomasset und weiteren Mitwirkenden. Herkunft und Urheberschaft stehen in [NOTICE.md](NOTICE.md) und [docs/BASELINE.md](docs/BASELINE.md).

Der Anspruch: eine **deutschsprachige, schnelle und selbst betreibbare** Werkzeugsammlung. Gegenüber dem Original ist neu:

- vollständige **deutsche und englische Oberfläche** (Umschalter oben in der Leiste); Werkzeuge mit Eingabefeld starten mit einem Beispiel
- **kleine Startdatei und Offline-Betrieb** (installierbare Web-App); schwere Teile werden erst bei Bedarf geladen
- **aktualisierte Abhängigkeiten** und strengere Sicherheits-Header ohne Drittanbieter-Dienste
- fertiges **Docker-Image** für `amd64` und `arm64`
- automatische **Prüfung** bei jeder Änderung (Unit-Tests und Browsertests in Chromium, Firefox und WebKit)

## 🐳 Docker

```bash
docker run -d --name ostseebit-tools --restart unless-stopped -p 8080:80 ostseebit/ostseebit-tools:latest
```

Danach ist die App unter `http://localhost:8080` erreichbar. Mit Compose, zum Aktualisieren und zum Selbstbauen: [docs/DOCKER.md](docs/DOCKER.md). Image: [Docker Hub](https://hub.docker.com/r/ostseebit/ostseebit-tools).

## ⚡ Entwickeln

Voraussetzung: Node.js 24 (siehe `.nvmrc`), pnpm wird über Corepack bereitgestellt.

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Die App läuft dann unter `http://localhost:5173`. Produktions-Build:

```bash
corepack pnpm build
```

Ein neues Werkzeug lässt sich mit dem Generator anlegen:

```bash
corepack pnpm run script:create:tool my-tool-name
```

## ✅ Prüfen

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test:unit
```

Mit echten Browsern (Ports 5173 und 5050 müssen frei sein):

```bash
corepack pnpm exec playwright install
corepack pnpm check:all
```

## 🔒 Datenschutz

Die App verwendet keine Analyse- oder Tracking-Dienste und lädt keine Schriften oder Skripte von Drittanbietern. Eingaben verlassen den Browser nicht.

## 🐞 Fehler melden und Werkzeuge vorschlagen

[Issue erstellen](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose)

## 📚 Dokumentation

- [Docker](docs/DOCKER.md)
- [Barrierefreiheit](docs/ACCESSIBILITY.md)
- [Technische Baseline (Herkunft)](docs/BASELINE.md)
- [Herkunft und Urheberschaft](NOTICE.md)

## 🌍 Sprache

Die Projektsprache ist Deutsch. Die Oberfläche der App gibt es zusätzlich auf Englisch. Produktnamen, Bibliotheksnamen und technische Standardbezeichnungen bleiben unverändert.

## 📄 Lizenz

Dieses Projekt steht unter der [GNU General Public License Version 3](LICENSE). Bestehende Copyright-, Lizenz- und Drittanbieterhinweise bleiben gültig; der [CHANGELOG.md](CHANGELOG.md) enthält den übernommenen Verlauf des ursprünglichen Projekts.

<br>

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:00A9A5,100:0F52BA&height=100&section=footer)

**OstseeBit**

</div>
