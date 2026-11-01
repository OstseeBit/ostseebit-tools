# Barrierefreiheit

Ziel ist die Konformität mit WCAG 2.1 Stufe AA. Das ist ein Ziel und keine Konformitätserklärung. Die automatische Prüfung berücksichtigt zusätzlich die Regeln von WCAG 2.2 Stufe AA, soweit axe-core sie abdeckt.

## Umgesetzt

- Die Seitensprache ist gesetzt (`lang`), die Oberfläche gibt es auf Deutsch und Englisch (weitere Sprachen mit Rückfall auf Englisch).
- Ein **Skip-Link** springt per Tastatur direkt zum Hauptinhalt.
- Der **Tastaturfokus** ist überall deutlich sichtbar (3 px, Farbe aus den Design-Tokens, in Hell und Dunkel).
- Kopfleiste, Icon-Leiste, Hauptbereich und Statusleiste sind als **Landmarks** ausgezeichnet und beschriftet. Die Icon-Leiste und das Flyout lassen sich per Tastatur bedienen: Pfeiltasten, Escape, Fokus wandert ins Flyout und zurück.
- Alle Symbole ohne Text haben einen Namen, dekorative Symbole sind für Screenreader ausgeblendet. Schalter, Schieberegler, Zahlenfelder, Kopier- und Favoriten-Knöpfe sind beschriftet; der Favoriten-Knopf meldet seinen Zustand.
- Die Einstellung **reduzierte Bewegung** des Betriebssystems wird respektiert; im **Hochkontrastmodus** (`forced-colors`) behalten aktive Elemente einen sichtbaren Rahmen.
- **Farbkontrast:** Text erreicht mindestens 4,5:1, Ränder von Eingabefeldern und Symbole mindestens 3:1, in Hell und Dunkel. Das ist durch einen Test gesichert (`src/ui/theme/tokens.test.ts`): die Farben stehen zentral in `src/ui/theme/tokens.ts`, der Test rechnet die Paare nach WCAG 2.x. Auch die Farben der Code-Hervorhebung sind geprüft.
- Links in der Statusleiste sind unterstrichen, damit sie nicht nur an der Farbe erkennbar sind.

## Automatische Prüfung

`src/a11y.e2e.spec.ts` prüft mit [axe-core](https://github.com/dequelabs/axe-core) die Startseite (auch gefiltert), die Seite „Über“, das offene Flyout, die geöffnete Suche, die Handy-Ansicht und 17 Werkzeuge jeweils in Hell und Dunkel gegen WCAG 2.x A/AA. Die Prüfung läuft mit den übrigen E2E-Tests (`pnpm test:e2e`, `pnpm test:e2e:dev`).

## Bekannte Einschränkungen

- Axe prüft die gemeinsame Oberfläche und eine Auswahl von 17 der 86 Werkzeuge. Die übrigen Werkzeuge sind nicht automatisch geprüft; keines der Werkzeuge wurde mit einem Screenreader getestet. Eine automatische Prüfung findet nur einen Teil der Mängel.
- Die Sortierung der Favoriten auf der Startseite geht nur per Ziehen mit Maus oder Finger. Eine Tastatur-Alternative fehlt noch.
- Einzelne neue Beschriftungen (zum Beispiel „Eingabe löschen“, „Erhöhen“, „Verringern“, „Suchergebnisse“) gibt es nur auf Deutsch und Englisch; in den anderen Sprachen erscheint der englische Text.
- Naive UI liefert einige Bedienelemente (Schieberegler, Zahlenfeld-Knöpfe) ohne Namen aus; sie werden in der App nachträglich beschriftet (`src/utils/slider-label.directive.ts`, `src/utils/input-number-labels.directive.ts`). Neue Werkzeuge mit solchen Elementen müssen die Direktiven verwenden.

Hinweise und Fehler bitte als [Issue](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose) melden.
