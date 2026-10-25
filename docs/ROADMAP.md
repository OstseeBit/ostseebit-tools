# Roadmap

Diese Roadmap legt die Arbeitsreihenfolge für die weitere technische Entwicklung fest. Größere Themen werden getrennt bearbeitet und jeweils vor dem nächsten Schritt validiert.

## Phase 1 — Repository und Baseline abschließen

Status: laufend

- öffentlich lesbare Dokumentation konsolidieren
- Projektmetadaten vereinheitlichen
- Herkunft und Lizenz sauber dokumentieren
- aktuellen Stand nach `main` übernehmen
- temporäre Arbeitsbranches anschließend aufräumen
- Recovery-/Baseline-Branches nur so lange behalten, wie sie für die Absicherung benötigt werden

## Phase 2 — Toolchain modernisieren

- unterstützte Node.js-Zielversion festlegen
- pnpm-Version festlegen
- `.nvmrc`, Manifest und spätere CI angleichen
- TypeScript / ESLint / TypeScript-ESLint kompatibel aktualisieren
- Buildskripte plattformübergreifend halten

Abnahme:

- Install
- Typecheck
- Lint
- Unit-Tests
- Build

## Phase 3 — Dependencies kontrolliert modernisieren

Abhängigkeiten werden in sinnvollen Gruppen aktualisiert, nicht pauschal.

Reihenfolge:

1. Vue / Vite / Compiler / Router / Pinia / VueUse
2. Teststack
3. UI / UnoCSS / Icons
4. Editor- und Content-Abhängigkeiten
5. Parser / Converter / Crypto / Utility-Libraries

Nach jeder Gruppe erfolgt erneut die Baseline-Validierung.

## Phase 4 — Performance

- Bundlegrößen analysieren
- große Chunks identifizieren
- Lazy Loading und Code Splitting verbessern
- schwere Tool-Abhängigkeiten bedarfsgerecht laden
- PWA-Precache optimieren
- Navigation und Ladeverhalten erneut messen

## Phase 5 — Docker und Containerbereitstellung

Status: **umgesetzt (2026-10-25)**. Das Image `ostseebit/ostseebit-tools` wird bei jeder Änderung an `main` automatisch gebaut und auf Docker Hub veröffentlicht (`linux/amd64` und `linux/arm64`); Bau, Start, Bezug von Docker Hub und Betrieb auf einem Docker-Host wurden bestätigt.

Arbeitspunkte:

1. ✅ vorhandenes Dockerfile prüfen und reparieren (`pnpm-workspace.yaml` und `corepack` in der Build-Stufe)
2. ✅ Node- und nginx-Basis-Images bewusst versionieren (`node:24.18.1-alpine`, `nginx:1.27-alpine`)
3. ✅ Buildstufe reproduzierbar gestalten (eingefrorene Lockfile, pnpm-Version über `packageManager`, Build-Stufe auf `BUILDPLATFORM`); offen bleibt, die Basis-Images zusätzlich per Digest zu fixieren
4. ✅ Runtime-Image minimieren und härten (mehrstufig, Benutzer `nginx`, Sicherheits-Header, Healthcheck)
5. ✅ Container bauen (auf einem Docker-Host bestätigt)
6. ✅ statische Auslieferung über nginx (gzip, Cache-Header, Fallback auf `index.html`)
7. ✅ Healthcheck im Image; die Auswertung der HTTP-Header per `curl -I` ist als Prüfschritt in `docs/DOCKER.md` beschrieben
8. ✅ Multi-Arch: `amd64` und `arm64`
9. ✅ Namensschema und Tags: `latest`, `sha-<Commit>`, `1.2.3`/`1.2`
10. ✅ Registry: Docker Hub
11. ✅ Image veröffentlicht (Workflow `docker-publish.yml`)
12. ✅ Self-Hosting-Dokumentation: `docs/DOCKER.md`, README

## Phase 6 — CI/CD

- CI auf die festgelegte Toolchain ausrichten
- Lint, Typecheck, Unit-Test und Build automatisieren
- E2E gezielt integrieren
- minimale Berechtigungen verwenden
- Container-Build als eigenes Gate einführen
- Publishing von Build und Test trennen
- Releases nur mit expliziter Version und geprüftem Artefakt

## Phase 7 — Funktionale Weiterentwicklung

Erst nach Stabilisierung der technischen Basis:

- neue Tools
- bestehende Tools verbessern
- zusätzliche Kategorien
- UI-/Theme-Erweiterungen als eigene Changes

## Grundregel

Jede Phase endet mit einem überprüfbaren Zustand. Größere Themen werden nicht vermischt, wenn dadurch Ursache, Rollback oder Testbarkeit unklar werden.
