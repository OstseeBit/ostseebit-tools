# Toolchain-Modernisierung – Prüfstand 2026-10-03

> Historischer Zwischenstand. Der aktuelle Prüfstand einschließlich Entwicklungsstart und Browserprüfungen steht in [VALIDATION.md](VALIDATION.md).

Branch: chore/plattform-modernisierung. Lokale Entwicklungsumgebung, kein Deployment.
Der vorhandene uncommittete Modernisierungsstand wurde ergänzt; kein Commit und kein Push.

## Änderungen

- ESLint Flat Config mit @antfu/eslint-config 9.5.1 beibehalten. Der Layout-Fixlauf erzeugte beim Einstieg keine zusätzlichen Änderungen. Verbleibende Meldungen wurden nach Regeln gruppiert; Imports, Typimports und Testkonventionen wurden über eine explizite Fix-Auswahl bearbeitet.
- Ungenutzte Catch-Bindungen entfernt, kleine boolesche Abfragen vereinfacht und widersprüchliche Prop-Verträge korrigiert.
- Playwright-Locator.innerText() bleibt erhalten. Nur für E2E-Dateien ist die hierfür unpassende DOM-textContent-Regel deaktiviert.
- Die ISO-8601-Regex bleibt einschließlich ihrer nummerierten Rückverweise unverändert. Zwei Regeln sind direkt an diesem Ausdruck mit Begründung ausgenommen. Eine fachliche Parserüberarbeitung bleibt ein separater Change.
- 17 weitere Regex-Literale kontrolliert vereinfacht. Vergleich gegen den gesicherten Eingangsstand: 1.544.450 Vergleiche ohne Abweichung bei Matchtext, Matchposition und lastIndex. Der Korpus enthält alle UTF-16-Einzelzeichen, vorhandene Teststrings, numerische und Datumsgrenzen sowie IPv4-Varianten. Das ist ein Regressionstest, kein formaler Äquivalenzbeweis. Eine zunächst erkannte ß-Abweichung wurde vor Abschluss korrigiert.
- Der Symboltest des Token-Generators prüft jetzt den ausdrücklichen Zeichenvorrat; die alte Zeichenklasse enthielt einen unbeabsichtigten Bereich.
- Zwei CSV-Snapshots durch exakte Stringprüfungen ersetzt. Das vorhandene Backslash-Escaping der CSV-Ausgabe wurde dabei unverändert gelassen.
- Automatisch erzeugte Imports und Komponenten-Typen mit der vorhandenen Toolchain aktualisiert. dtsTsx ist deaktiviert: TSX nutzt explizite Imports; globale const-Deklarationen für punktierte Vue-Dateinamen waren syntaktisch ungültig.
- Nach der Typregenerierung sichtbare Komponentenfehler korrigiert: Alert-Varianten, readonly-Auswahllisten, generische Tabellenzeilen, Literaltypen, Nullbehandlung und Demo-Werte. Gruppierte Metadatenoptionen verwenden NSelect. Nichtskalare Auswahlwerte erhalten einen gültigen Vue-Key; die ursprünglichen Funktionswerte werden weiterhin emittiert.
- Drei gezielte Regressionstests für Funktionswerte, readonly-Optionen/reaktive Größe und Tabellen-Slotdaten ergänzt.
- Vite-Konfiguration auf import.meta.dirname und einen expliziten TypeScript-Import umgestellt.
- PWA-Precache-Grenze auf 4 MiB pro Datei begrenzt, damit Monaco und die MAC-Herstellerdatenbank enthalten sind. Der geprüfte Build erzeugt 321 Precache-Einträge mit insgesamt rund 12,1 MiB. Bundleoptimierung bleibt separat.

## Validierung

| Prüfung | Ergebnis |
| --- | --- |
| corepack pnpm typecheck | erfolgreich |
| corepack pnpm lint | erfolgreich, keine Fehler oder Warnungen |
| corepack pnpm test:unit --run | 35 Dateien, 141 Tests erfolgreich |
| corepack pnpm build | erfolgreich, inklusive Service Worker |
| Typecheck nach dem Build | erfolgreich |
| git diff --check | erfolgreich |

Nach dem vollständigen Test-/Buildlauf wurde nur noch die deklarative Reihenfolge von defineProps/defineSlots für ESLint korrigiert; Typecheck und Lint wurden anschließend erneut erfolgreich ausgeführt.

## Grenzen und Folgearbeiten

- Playwright-E2E, interaktive Browser-/Offline-PWA-Abnahme und Containerprüfung wurden nicht ausgeführt.
- Buildwarnungen bleiben sichtbar: große Chunks, browserseitig externalisierte Node-Module in Abhängigkeiten, eval in Drittanbieterpaketen, zwei nicht aufgelöste Scrollbar-Utilities und veraltete Browserslist-Daten. Diese Punkte erfordern gezielte Dependency-/UI-/Performance-Arbeit; dieser Prüfstand ist keine produktive Releasefreigabe.
- Die bestehende CSV-Quote-Behandlung und die fachliche ISO-8601-Validierung wurden nicht neu spezifiziert.
- LICENSE, NOTICE.md und docs/BASELINE.md wurden gegen den Eingangsstand geprüft und nicht verändert. Die historische Baseline bleibt unverändert.

## Recovery und Evidenz

Vor der Bearbeitung wurden src, die neue ESLint-Konfiguration, Manifest, Vite-Konfiguration und Herkunftsdateien gesichert; initial.patch hält die bereits vorhandenen versionierten Änderungen fest.
Die Sicherung und Prüfprotokolle liegen lokal im Chat-Arbeitsordner unter modernisierung-backup. Rücknahmen müssen selektiv gegen diesen Eingangsstand erfolgen, damit die zuvor vorhandenen Änderungen erhalten bleiben. Kein pauschales git reset.
