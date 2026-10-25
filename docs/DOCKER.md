# Docker: Kurzreferenz

Der Container liefert die fertig gebaute App über nginx aus (Port 80 im Container, Benutzer `nginx`, mit Komprimierung, Zwischenspeicher-Regeln und Sicherheits-Headern). Das Image heißt auf Docker Hub `<docker-hub-name>/ostseebit-tools` und trägt Tags wie `latest` oder `1.2.3`.

## Bauen und starten

Im Projektordner auf einem Rechner mit Docker:

```bash
docker build -t ostseebit-tools:latest --build-arg GIT_COMMIT_SHA=$(git rev-parse HEAD) --build-arg BUILD_DATE=$(git log -1 --format=%cs) .
```

Die beiden `--build-arg` füllen die Versionsanzeige in der Fußzeile ("Version 2026-10-25 · a1b2c3d"). Im Build-Container gibt es kein git, deshalb werden die Werte von außen übergeben. Ohne sie zeigt die Fußzeile das Build-Datum und keinen Commit.

```bash
docker run --rm -p 8080:80 ostseebit-tools:latest
```

Dann `http://<host>:8080` öffnen. Auslieferung prüfen:

```bash
curl -I http://localhost:8080/
```

Erwartet: `Cache-Control: no-cache` für `/`, `Cache-Control: public, max-age=31536000, immutable` für Dateien unter `/assets/`, dazu die Sicherheits-Header.

## Veröffentlichung auf Docker Hub

Der Workflow `.github/workflows/docker-publish.yml` baut das Image für `linux/amd64` und `linux/arm64` und lädt es hoch:

| Auslöser | Tags |
| --- | --- |
| Änderung auf `main` (zusammengeführter Pull-Request) | `latest` und `sha-<Commit>` |
| Git-Tag `v1.2.3` | `1.2.3` und `1.2` |
| Manuell (*Actions → Publish Docker image → Run workflow*) | wie bei `main` |

Dafür müssen im GitHub-Repository die Secrets `DOCKERHUB_USERNAME` und `DOCKERHUB_TOKEN` gesetzt sein (Token mit der Berechtigung *Read & Write*). Fehlen sie, wird der Lauf mit einem Hinweis übersprungen und bleibt grün. Optional legt eine Repository-Variable `DOCKERHUB_IMAGE` einen anderen Image-Namen fest.

## Auf einem Docker-Host betreiben

```bash
docker run -d --name ostseebit-tools --restart unless-stopped -p 8080:80 <docker-hub-name>/ostseebit-tools:latest
```

Mit Compose: `docker-compose.yml` auf den Host kopieren, daneben eine Datei `.env` mit `DOCKERHUB_USERNAME=<docker-hub-name>` anlegen, dann:

```bash
docker compose up -d
```

Aktualisieren:

```bash
docker compose pull && docker compose up -d
```

`latest` wandert mit jedem Merge in `main` mit; für einen festen Stand dient ein `sha-<Commit>`- oder Versions-Tag (in Compose über `OSTSEEBIT_TAG`).

## Hinweise

- Die App ist eine statische Webseite und speichert nichts auf dem Server; Einstellungen liegen im Browser der Nutzer.
- Für Zugriff von außen gehört ein Reverse-Proxy mit HTTPS davor. Der Container selbst spricht nur HTTP.
