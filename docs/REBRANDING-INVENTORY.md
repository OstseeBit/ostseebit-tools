# OstseeBit Rebranding-Inventar

Stand: 2026-10-03  
Quellbasis: `d505845f918e946ec300af7b36efc107e2f66e9e`

Dieses Dokument beschreibt die Umstellung der übernommenen Codebasis auf die eigenständig gepflegte Projektidentität **OstseeBit Tools**.

## Verbindliche Projektidentität

- Marke / Maintainer: **OstseeBit**
- Produktname: **OstseeBit Tools**
- Repository: https://github.com/OstseeBit/ostseebit-tools
- Schreibweise: ausschließlich `OstseeBit` bzw. `OstseeBit Tools`
- Lizenz: GNU GPLv3
- Herkunft: it-tools / CorentinTh/it-tools, dokumentiert in [NOTICE.md](../NOTICE.md)

Im Rahmen der Repository-Dokumentationsbereinigung werden keine neuen Logos, Bilder oder UI-Designs eingeführt. Vorhandene OstseeBit-Assets bleiben unverändert. Ziel ist eine konsistente Benennung und Darstellung, nicht die Annäherung an andere Repository-Designs.

## Umgesetzte Bereiche

| Bereich | Stand |
| --- | --- |
| Paketidentität | Paketname, Beschreibung, Repository und Maintainer auf OstseeBit Tools ausgerichtet |
| README | Deutsche OstseeBit-Projektbeschreibung, Status, Entwicklung, Herkunft und Lizenz |
| NOTICE | Herkunft und Urheberschaft klar von der OstseeBit-Fortführung getrennt |
| GitHub-Issue-Vorlagen | Auf Deutsch und auf OstseeBit Tools ausgerichtet |
| Pull-Request-Vorlage | Auf Deutsch, Zielbranch `main`, OstseeBit-Schreibweise berücksichtigt |
| Browser-/PWA-Metadaten | Im Rebranding auf OstseeBit Tools ausgerichtet |
| Navigation und Seitentitel | Im Rebranding auf die zentrale OstseeBit-Projektidentität umgestellt |
| About-Texte | Herkunft, Lizenz und OstseeBit-Fortführung in den vorhandenen Sprachen berücksichtigt |
| Tracking | Plausible-Laufzeitintegration aus der Anwendung entfernt |
| Sponsoring / Social | Übernommene fremde Ziele aus der Anwendung entfernt |
| Publishing | Geerbte Nightly-/Release-Publishing-Workflows entfernt |
| Historischer Changelog | Historische Upstream-Einträge bleiben erhalten und werden als solche gekennzeichnet |

## Bewusst nicht pauschal umbenannt

Folgende Inhalte dürfen nicht nur wegen ihres Namens auf OstseeBit umgeschrieben werden:

- [LICENSE](../LICENSE)
- ursprüngliche Autorenschaft und Contributor-Historie
- reale Drittanbieter-Paketnamen wie `@it-tools/bip39` und `@it-tools/oggen`
- historische Changelog-Einträge
- Upstream-Commit-, Tree- und Recovery-Referenzen
- neutrale technische Testdaten
- technische API-/Bibliotheksbezeichnungen

Dadurch bleibt die Herkunft korrekt, ohne die aktuelle OstseeBit-Projektidentität zu verwässern.

## Validierter aktueller Stand

Lokal erfolgreich:

- Installation mit eingefrorenem Lockfile
- TypeScript-Typecheck
- ESLint: 0 Fehler, 6 Warnungen
- Produktions-Build
- Vitest: 33 Testdateien und 138 Tests

Details stehen in [REBRANDING-VALIDATION.md](REBRANDING-VALIDATION.md).

## Noch offen

- Playwright-E2E
- vollständige Browser-/PWA-Prüfung
- einheitliche Node-/pnpm-Zielversion
- kontrollierte Dependency-Modernisierung
- geprüfte CI/CD-Reaktivierung
- Release- und Registry-Konzept
- offizieller Produktionshostname, falls später benötigt
- Drittanbieter-Lizenzprüfung vor Veröffentlichung gebauter Artefakte

## Abnahmekriterien für die OstseeBit-Projektidentität

1. `OstseeBit` und `OstseeBit Tools` werden konsistent geschrieben.
2. Aktuelle Repository-Dokumentation und GitHub-Vorlagen sind OstseeBit zugeordnet.
3. Fremde Social-, Sponsoring-, Analytics- und Publishing-Ziele werden nicht als OstseeBit-Ziele dargestellt.
4. Ursprüngliche Urheberschaft und Lizenz bleiben nachvollziehbar.
5. Historische Inhalte werden nicht rückwirkend verfälscht.
6. Änderungen an Logo, Bildmaterial oder UI-Design erfolgen nur in einem ausdrücklich dafür vorgesehenen Change.
7. Technische Modernisierung und Rebranding bleiben voneinander getrennt.

Rollback erfolgt über nachvollziehbare Reverts bzw. den Recovery-Pfad; kein Force-Push auf `main`.
