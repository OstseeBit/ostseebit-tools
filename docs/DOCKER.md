# Docker: bauen, veröffentlichen, betreiben

Der Container liefert die fertig gebaute App über nginx aus (Port 80 im Container). Das Image heißt auf Docker Hub **`<dein-dockerhub-name>/ostseebit-tools`** und trägt Tags wie `latest` oder `1.2.3`.

## 1. Lokal bauen und testen

Im Projektordner auf einem Rechner mit Docker:

```bash
docker build -t ostseebit-tools:test --build-arg GIT_COMMIT_SHA=$(git rev-parse HEAD) --build-arg BUILD_DATE=$(git log -1 --format=%cs) .
```

Die beiden `--build-arg` füllen die Versionsanzeige in der Fußzeile ("Version 2026-10-25 · a1b2c3d"). Im Build-Container gibt es kein git, deshalb werden die Werte von außen übergeben. Ohne sie zeigt die Fußzeile das Build-Datum und keinen Commit.

```bash
docker run --rm -p 8080:80 ostseebit-tools:test
```

Dann `http://<host>:8080` öffnen. Auslieferung prüfen:

```bash
curl -I http://localhost:8080/
```

Erwartet: `Cache-Control: no-cache` für `/`, `Cache-Control: public, max-age=31536000, immutable` für Dateien unter `/assets/`, dazu die Sicherheits-Header.

## 2. Veröffentlichung auf Docker Hub (einmal einrichten)

Der Workflow `.github/workflows/docker-publish.yml` baut das Image für `linux/amd64` und `linux/arm64` und lädt es hoch. Dafür braucht er Zugangsdaten, die **nicht im Code** stehen, sondern als geheime Werte in GitHub.

1. **Konto und Repository:** Auf <https://hub.docker.com> anmelden, *Create repository*, Name `ostseebit-tools`, Sichtbarkeit nach Wunsch (öffentlich, wenn andere Hosts ohne Anmeldung ziehen sollen).
2. **Zugriffstoken:** In Docker Hub unter *Account settings → Personal access tokens* ein Token mit der Berechtigung **Read & Write** erzeugen. Das Token wird nur einmal angezeigt.
3. **GitHub-Secrets:** Im GitHub-Repository unter *Settings → Secrets and variables → Actions → New repository secret* zwei Secrets anlegen:
   - `DOCKERHUB_USERNAME`: dein Docker-Hub-Benutzername
   - `DOCKERHUB_TOKEN`: das Token aus Schritt 2
4. **Optional:** Soll das Image unter einem anderen Namen liegen (z. B. einer Organisation), unter *Variables* eine Variable `DOCKERHUB_IMAGE` mit dem vollen Namen anlegen, z. B. `meine-organisation/ostseebit-tools`.

Danach läuft die Veröffentlichung automatisch:

| Auslöser | Tags |
| --- | --- |
| Änderung auf `main` (zusammengeführter Pull-Request) | `latest` und `sha-<Commit>` |
| Git-Tag `v1.2.3` | `1.2.3` und `1.2` |
| Manuell: *Actions → Publish Docker image → Run workflow* | wie bei `main` |

`latest` zeigt also immer auf den neuesten Stand von `main`. Für einen festen Stand nimmst du `sha-<Commit>` oder eine Versionsnummer.

## 3. Auf einem Docker-Host installieren

Ohne Dateien, ein Befehl (Namen anpassen):

```bash
docker run -d --name ostseebit-tools --restart unless-stopped -p 8080:80 DEIN-DOCKERHUB-NAME/ostseebit-tools:latest
```

Oder mit Compose, wie es sich für dauerhaften Betrieb gehört: Die Datei `docker-compose.yml` aus diesem Repository auf den Host kopieren, daneben eine Datei `.env` mit dem Inhalt `DOCKERHUB_USERNAME=dein-dockerhub-name` anlegen und starten:

```bash
docker compose up -d
```

**Aktualisieren** auf den neuesten Stand:

```bash
docker compose pull && docker compose up -d
```

Mit `docker run` stoppst du den Container (`docker rm -f ostseebit-tools`), holst das Image neu (`docker pull …:latest`) und startest ihn mit demselben Befehl wie oben erneut.

## 4. Hinweise

- Die App ist eine statische Webseite. Sie speichert nichts auf dem Server; Einstellungen liegen im Browser der Nutzer.
- Das Image läuft als Benutzer `nginx`, nicht als `root`.
- Für Zugriff von außen gehört ein Reverse-Proxy mit HTTPS davor (z. B. Nginx Proxy Manager, Traefik oder Caddy). Der Container selbst spricht nur HTTP.
