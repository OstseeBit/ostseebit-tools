# Docker

Das fertige Image: [`ostseebit/ostseebit-tools`](https://hub.docker.com/r/ostseebit/ostseebit-tools) (`amd64` und `arm64`).

## Starten

```bash
docker run -d --name ostseebit-tools --restart unless-stopped -p 8080:80 ostseebit/ostseebit-tools:latest
```

Die App ist dann unter `http://localhost:8080` erreichbar. Anderer Port: den ersten Wert bei `-p` ändern, z. B. `-p 3000:80`.

## Mit Docker Compose

Die Datei [`docker-compose.yml`](../docker-compose.yml) auf den Host kopieren und starten:

```bash
docker compose up -d
```

## Aktualisieren

```bash
docker compose pull && docker compose up -d
```

Ohne Compose:

```bash
docker rm -f ostseebit-tools && docker pull ostseebit/ostseebit-tools:latest && docker run -d --name ostseebit-tools --restart unless-stopped -p 8080:80 ostseebit/ostseebit-tools:latest
```

## Selbst bauen

```bash
docker build -t ostseebit-tools:latest --build-arg GIT_COMMIT_SHA=$(git rev-parse HEAD) --build-arg BUILD_DATE=$(git log -1 --format=%cs) .
docker run --rm -p 8080:80 ostseebit-tools:latest
```

Die beiden `--build-arg` setzen die Versionsanzeige in der Fußzeile der App (Datum und Commit); ohne sie fehlt der Commit.

## Hinweise

- Weitere Tags (feste Stände) stehen auf [Docker Hub](https://hub.docker.com/r/ostseebit/ostseebit-tools/tags).
- Der Container spricht nur HTTP. Für Zugriff von außen gehört ein Reverse-Proxy mit HTTPS davor.
