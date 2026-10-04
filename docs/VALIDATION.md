# Validierungsstand — 2026-10-04

## Ergebnis und Umfang

Der lokale Entwicklungsstart und der Produktions-Build wurden auf Windows mit Node.js 24.18.1 und pnpm 12.8.1 geprüft. Branch: `chore/plattform-modernisierung`. Änderungen sind uncommittet; es erfolgte kein Push oder Deployment.

| Prüfung | Nachgewiesenes Ergebnis |
| --- | --- |
| `corepack pnpm install --frozen-lockfile` | erfolgreich |
| `corepack pnpm lint` | 0 Fehler, 0 Warnungen |
| `corepack pnpm typecheck` | Anwendung, Tests, Vite-, UnoCSS- und Playwright-Konfiguration erfolgreich |
| `corepack pnpm test:unit` | 36 Dateien, 173 Tests erfolgreich |
| `corepack pnpm build` | erfolgreich; Service Worker mit 525 Precache-Einträgen, 14.67 MiB |
| `corepack pnpm test:e2e:dev --project chromium` | 154 erfolgreich; eigener Entwicklungsserver mit `--force`, ohne vorhandenen Optimierungscache |
| `corepack pnpm test:e2e` | 462 erfolgreich; je 154 in Chromium, Firefox und WebKit |
| `corepack pnpm test:pwa` | Chromium: Service Worker installiert; Token-Werkzeug offline geöffnet und neuer Token erzeugt |
| `git diff --check` | erfolgreich |
| Herkunftsdateien | LICENSE, NOTICE.md und docs/BASELINE.md unverändert |

Die Browserläufe enthalten keine übersprungenen, fehlgeschlagenen oder erst durch Wiederholung erfolgreichen Tests. Die 154 Prüfungen umfassen den Aufruf aller 86 Werkzeugseiten, Start- und Infoseite sowie 66 weitere Titel- und Funktionsprüfungen. Beim Seitenaufruf werden Konsolenfehler und unbehandelte JavaScript-Fehler geprüft. Das ist keine vollständige fachliche Prüfung aller möglichen Eingaben in jedem Werkzeug.

Die normalen Funktionstests blockieren Service Worker, damit Hintergrund-Caching die isolierten Werkzeugprüfungen nicht beeinflusst. Ein eigener Chromium-Test aktiviert den Service Worker, wartet auf dessen Installation und prüft anschließend den Offline-Aufruf sowie die Token-Erzeugung.

Zusätzliche Regressionstests prüfen ASCII-Ausgabe bei gesperrten externen Diensten, echte Datei-Downloads einschließlich Inhalt, die Emoji-Suche und das Nachladen weiterer Emojis sowie den Textvergleich mit aktivem Hintergrundprozess. Vorhandene Prüfungen für unter anderem Konverter, IP-Bereiche, OTP, Tokens und begrenzte Regex-Beispielgenerierung bleiben enthalten. Playwright: 1.63.0.

## Ursachen und Korrekturen

- Der gemeldete Windows-Startabsturz wurde reproduziert: Vite las bei der Optimierung sehr viele unbenutzte Icon-Dateien; einzelne Dateien waren zeitweise gesperrt. Geprüfte direkte Icon-Imports ersetzen die Sammelimporte. Der Produktions-Build verarbeitet dadurch wesentlich weniger Module.
- Beim Kaltstart wurden zuvor Abhängigkeiten automatisch registrierter Komponenten zu spät entdeckt. Daraus entstanden während der Navigation `504 Outdated Optimize Dep` und fehlgeschlagene dynamische Imports. Vite scannt nun auch die Vue-Komponenten vorab.
- Die neue Entwicklungs-Testkonfiguration übernimmt alle vorhandenen Browser-Einstellungen, insbesondere Test-ID-Attribut und Zeitzone. Beide Server müssen selbst starten; ein zufällig bereits laufender Server kann kein positives Prüfergebnis vortäuschen.
- Der ASCII-Generator lädt alle 289 Schriftdateien aus dem installierten Paket. Der fehlgeschlagene CDN-Aufruf entfällt; Schriftwechsel bleiben möglich. Verzögerte Ladevorgänge überschreiben keine neueren Eingaben.
- Die MIME-Verarbeitung verwendet eine Browser-kompatible Bibliothek. Verwechselte Lookup-Richtungen, ungültige Download-Adressen und fehlende Data-URL-Präfixe wurden korrigiert.
- Der Textvergleich lädt seinen Worker über Vite, erhält die Editor-Funktionen und gibt Editor und Modelle beim Verlassen frei. Die Emoji-Seite rendert ihre Einträge schrittweise; die Suche umfasst weiterhin die gesamte Sammlung.
- Übersetzungs-Fallbacks prüfen fehlende Schlüssel vor dem Aufruf. Funktionale Icons werden passend zur UI-Komponente eingebunden. Die Scrollbar-Konfiguration passt zur installierten Version.
- Der bisherige Typcheck deckte die Build-Konfiguration nicht ab. Er umfasst jetzt auch diese Dateien; veraltete Optionen wurden entfernt beziehungsweise an die vorhandenen Typen angepasst.

## Wiederholen

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm exec playwright install
corepack pnpm check:all
```

Unter Linux installiert `corepack pnpm exec playwright install --with-deps` bei Bedarf zusätzlich die Systemabhängigkeiten. `check:all` prüft Lint, Unit-Tests, Typen, Build, Entwicklungs-Kaltstart und den Produktionsstand in allen drei konfigurierten Browsern sowie die Offline-Grundfunktion in Chromium. Ports 5173 und 5050 müssen frei sein.

Der neue Workflow `.github/workflows/validate.yml` führt dieselbe Prüfkette auf Windows und Linux aus. Actions sind auf verifizierte Commit-IDs festgelegt, Berechtigungen auf das Lesen von Repository-Inhalten beschränkt. Erst durch Wiederholung erfolgreiche Browsertests lassen die Prüfkette ebenfalls fehlschlagen (`failOnFlakyTests`). Das YAML wurde lokal eingelesen und geprüft. Ein erfolgreicher GitHub-Lauf wird erst nach einem tatsächlich ausgeführten Lauf behauptet; der Workflow wurde nicht gepusht oder remote gestartet. Die Vorlagen unter `workflows-disabled` wurden am 2026-10-04 entfernt (siehe [PROJECT-STATUS.md](PROJECT-STATUS.md)).

## Verbleibende Grenzen

- Der Build enthält weiterhin Hinweise aus `bcryptjs` (`crypto`) und `pdf-signature-reader` (`tls`) sowie große Daten-/Editor-Bundles. Der `eval`-Hinweis aus `iarna-toml-esm` ist entfallen, da die Abhängigkeit am 2026-10-04 durch `smol-toml` ersetzt wurde. Die verbleibenden Hinweise wurden nicht unterdrückt. Die zugehörigen Werkzeuge laden in den Browserprüfungen; die Hinweise sind damit nicht als umfassend sicherheitstechnisch geklärt anzusehen.
- Die Offline-Grundfunktion wurde in Chromium geprüft. Vollständige PWA-Installation als App, Offline-Abdeckung sämtlicher Werkzeuge, Updatewechsel, andere Browser und verschachtelte Base-Paths sind noch nicht abgenommen.
- Container-Build und -Laufzeit, produktive Security-Header/CSP, Deployment und Veröffentlichung sind offen.
- Der übergreifende Sicherheits-Audit ist nicht abgeschlossen. Eingabegrenzen, Drittanbieter-Abhängigkeiten, Signatur-Vertrauen und weitere rechenintensive Werkzeuge benötigen eigene fachliche Prüfung.
- Design-Abgleich mit `ostseebit-app`, vollständige Barrierefreiheit, deutsche Oberflächentexte und konkrete Normnachweise bleiben separate Modernisierungsmodule. Dieser Prüfstand ist weder eine DIN-/ISO-Zertifizierung noch eine Produktionsfreigabe.

## Sicherung

Vor den Änderungen wurde eine zusätzliche Sicherung vom 2026-10-04T02-58-08-069Z angelegt. 513 Projektdateien, Git-Bundle, Arbeitsänderungen und Wiederherstellung wurden anhand von Hashes und Git-Status geprüft. Sie liegt im lokalen Chat-Arbeitsordner unter `backups/ostseebit-tools-2026-10-04T02-58-08-069Z`; `RESTORE-VERIFIED.txt` bestätigt die Prüfung. Bereits vorher vorhandene uncommittete Arbeit ist enthalten. Rücknahmen müssen selektiv gegen diese Sicherung erfolgen, kein pauschales Zurücksetzen des Repositorys.

## Technische Referenzen

- [Vite: Erkennung und Optimierung von Abhängigkeiten](https://vite.dev/config/dep-optimization-options)
- [MIME-Bibliothek: Browser-taugliche ESM-API und Lookup-Verhalten](https://github.com/broofa/mime)
- [Monaco: ESM-Integration und Worker](https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md)
- [Checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) und [Setup Node v7.0.0](https://github.com/actions/setup-node/releases/tag/v7.0.0)
