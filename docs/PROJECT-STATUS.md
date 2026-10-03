# Projektstatus

Stand: 2026-10-03

## Aktueller Zustand

- Paketversion: `0.1.0`
- Arbeitsbranch für die aktuelle Bereinigung: `chore/ostseebit-rebranding`
- Zielbranch: `main`
- Repository: öffentlich
- Lizenz: GNU GPLv3
- Projektsprache: Deutsch

## Erfolgreich validiert

- Dependency-Installation mit eingefrorenem Lockfile
- TypeScript-Typecheck
- ESLint: 0 Fehler, 6 Warnungen
- Produktions-Build
- Vitest: 33 Testdateien, 138 Tests

## Bekannte offene Punkte

### Plattform und Abhängigkeiten

- Node-/pnpm-Zielversion vereinheitlichen
- veraltete Toolchain-Komponenten kontrolliert modernisieren
- Dependencies gruppenweise aktualisieren
- nach jeder Gruppe Typecheck, Lint, Tests und Build wiederholen

### Performance

- große Chunks analysieren
- Lazy Loading / Code Splitting prüfen
- besonders große Tool-Abhängigkeiten untersuchen
- PWA-Precache und Build-Ausgabe bewerten

### Container

Die Containerbereitstellung ist noch nicht abgeschlossen und bleibt ein fester Arbeitspunkt.

Offen:

- Dockerfile modernisieren und härten
- Basis-Images bewusst pinnen
- reproduzierbaren Build herstellen
- Container lokal bauen
- Container-Laufzeit prüfen
- Registry und Tagging festlegen
- offizielles Image bereitstellen

### CI/CD

- inaktive CI-/Testvorlagen prüfen
- Least-Privilege-Berechtigungen festlegen
- Toolchain konsistent definieren
- automatisierte Validierung wieder aktivieren
- Publishing erst nach separater Freigabe einführen

## Nächster geplanter Schritt

Nach Abschluss und Merge des aktuellen Repository-Cleanups beginnt die kontrollierte Plattformmodernisierung. Die Reihenfolge ist in [ROADMAP.md](ROADMAP.md) festgelegt.
