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

Status: **verbindlich vorgesehen, noch nicht umgesetzt**

Ziel: ein reproduzierbar gebautes und getestetes Container-Image für den Self-Hosting-Betrieb bereitstellen.

Arbeitspunkte:

1. vorhandenes Dockerfile prüfen
2. ✅ Node- und nginx-Basis-Images bewusst versionieren (2026-10-04: `node:24.18.1-alpine`, `nginx:1.27-alpine` statt `lts`/`stable`)
3. Buildstufe reproduzierbar gestalten
4. Runtime-Image minimieren und härten (2026-10-04: nginx-Stage läuft als Benutzer `nginx` statt root; Sicherheits-Header in nginx.conf ergänzt — Rest des Punktes offen)
5. Container lokal bauen (noch offen — kein Docker in der Entwicklungsumgebung verfügbar, daher ungetestet)
6. statische Auslieferung über nginx testen
7. Health-/HTTP-Verhalten prüfen
8. Multi-Arch-Bedarf bewerten
9. Image-Namensschema und Tags definieren
10. Registry-Ziel festlegen
11. Image veröffentlichen
12. Self-Hosting-Dokumentation ergänzen

Ein Container wird erst als offiziell verfügbar dokumentiert, wenn Build und Laufzeittest erfolgreich sind.

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
