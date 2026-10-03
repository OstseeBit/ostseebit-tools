# Hinweis zu Herkunft und Urheberschaft

**OstseeBit Tools** ist eine eigenständig von **OstseeBit** gepflegte Fortführung des Open-Source-Projekts **it-tools**, das ursprünglich von Corentin Thomasset erstellt und gemeinsam mit weiteren Mitwirkenden entwickelt wurde.

- Ursprüngliches Projekt: https://github.com/CorentinTh/it-tools
- Ursprüngliche Mitwirkende: https://github.com/CorentinTh/it-tools/graphs/contributors
- Übernommene Quellbasis: https://github.com/CorentinTh/it-tools/commit/d505845f918e946ec300af7b36efc107e2f66e9e
- OstseeBit-Fortführung: https://github.com/OstseeBit/ostseebit-tools

Das ursprüngliche Projekt steht unter der GNU GPL Version 3. Die vorhandene [LICENSE](LICENSE) bleibt unverändert. Bestehende Copyright-, Urheber-, Namens- und Drittanbieterhinweise gelten weiter.

**OstseeBit beansprucht nicht die Urheberschaft am übernommenen Upstream-Code.** Diese Datei dient dazu, Herkunft, Weiterentwicklung und Verantwortungsgrenzen transparent zu dokumentieren. Sie ersetzt weder die LICENSE noch Lizenzbedingungen Dritter.

## Übernahme der Ausgangsbasis am 2026-10-03

Die definierte Upstream-Quellbasis wurde in das Repository übernommen und mit einer nachvollziehbaren Baseline dokumentiert. Die ursprüngliche Git-Historie wurde nicht importiert; stattdessen identifizieren Commit- und Tree-Hash die verwendete Quelle eindeutig.

Die vier übernommenen GitHub-Actions-Workflows wurden zunächst aus `.github/workflows/` nach `.github/workflows-disabled/` verschoben, damit keine geerbten CI-, Release- oder Publishing-Abläufe unbeabsichtigt ausgeführt werden.

Details zur Quellidentität und Wiederherstellung stehen in [docs/BASELINE.md](docs/BASELINE.md).

## OstseeBit-Projektidentität am 2026-10-03

Die Fortführung wurde auf die Projektidentität **OstseeBit Tools** ausgerichtet. Dazu gehören unter anderem Repository-Verweise, Metadaten, Navigation, Texte, Paket-Maintainer und die OstseeBit-Darstellung innerhalb des Projekts.

Nicht übernommen wurden fremde Sponsoring-, Social-Media- oder Tracking-Ziele. Die geerbten Nightly- und Release-Publishing-Workflows wurden entfernt. CI-/Testvorlagen bleiben bis zu einer separaten Prüfung inaktiv.

Die ursprüngliche LICENSE, die historische Upstream-Herkunft und reale Drittanbieter-Paketnamen bleiben erhalten. Historische Einträge werden nicht rückwirkend in OstseeBit umbenannt.

## Aktueller Validierungsstand

Für den aktuellen OstseeBit-Stand wurden lokal erfolgreich ausgeführt:

- Installation mit eingefrorenem Lockfile
- TypeScript-Typecheck
- ESLint mit 0 Fehlern und 6 Warnungen
- Produktions-Build
- Vitest: 33 Testdateien und 138 Tests erfolgreich

Playwright-E2E, vollständige Browser-/PWA-Prüfung und produktive Veröffentlichung sind weiterhin offen. Der genaue Nachweis steht in [docs/REBRANDING-VALIDATION.md](docs/REBRANDING-VALIDATION.md).

## Weiterentwicklung

Zukünftige Änderungen müssen anwendbare Lizenz- und Herkunftshinweise erhalten. Bei der Weitergabe gebauter Artefakte sind die GPLv3-Anforderungen an korrespondierenden Quellcode und Lizenzhinweise zu beachten.

OstseeBit ist Maintainer der Fortführung **OstseeBit Tools**. Eine Unterstützung oder Billigung durch das ursprüngliche Upstream-Projekt wird nicht behauptet.
