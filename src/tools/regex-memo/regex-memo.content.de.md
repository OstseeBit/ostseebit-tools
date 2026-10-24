### Normale Zeichen

Ausdruck | Beschreibung
:--|:--
`.` oder `[^\n\r]` | jedes Zeichen *außer* Zeilenumbruch oder Wagenrücklauf
`[A-Za-z]` | Buchstaben
`[a-z]` | Kleinbuchstaben
`[A-Z]` | Großbuchstaben
`\d` oder `[0-9]` | Ziffer
`\D` oder `[^0-9]` | Nicht-Ziffer
`_` | Unterstrich
`\w` oder `[A-Za-z0-9_]` | Buchstabe, Ziffer oder Unterstrich
`\W` oder `[^A-Za-z0-9_]` | Umkehrung von `\w`
`\S` | Umkehrung von `\s`

### Leerraumzeichen

Ausdruck | Beschreibung
:--|:--
` ` | Leerzeichen
`\t` | Tabulator
`\n` | Zeilenumbruch
`\r` | Wagenrücklauf
`\s` | Leerzeichen, Tabulator, Zeilenumbruch oder Wagenrücklauf

### Zeichenklassen

Ausdruck | Beschreibung
:--|:--
`[xyz]` | entweder `x`, `y` oder `z`
`[^xyz]` | weder `x`, `y` noch `z`
`[1-3]` | entweder `1`, `2` oder `3`
`[^1-3]` | weder `1`, `2` noch `3`

- Stelle dir eine Zeichenklasse als `ODER`-Verknüpfung der einzelnen Zeichen vor, die zwischen den eckigen Klammern stehen.
- Verwende `^` nach dem öffnenden `[`, um die Zeichenklasse zu "negieren".
- Innerhalb einer Zeichenklasse bedeutet `.` einen literalen Punkt.

### Zeichen, die maskiert werden müssen

#### Außerhalb einer Zeichenklasse

Ausdruck | Beschreibung
:--|:--
`\.` | Punkt
`\^` | Zirkumflex (Caret)
`\$` | Dollarzeichen
`\|` | senkrechter Strich (Pipe)
`\\` | Backslash
`\/` | Schrägstrich (Slash)
`\(` | öffnende runde Klammer
`\)` | schließende runde Klammer
`\[` | öffnende eckige Klammer
`\]` | schließende eckige Klammer
`\{` | öffnende geschweifte Klammer
`\}` | schließende geschweifte Klammer

#### Innerhalb einer Zeichenklasse

Ausdruck | Beschreibung
:--|:--
`\\` | Backslash
`\]` | schließende eckige Klammer

- Ein `^` muss nur maskiert werden, wenn es unmittelbar nach dem öffnenden `[` der Zeichenklasse steht.
- Ein `-` muss nur maskiert werden, wenn es zwischen zwei Buchstaben oder zwei Ziffern steht.

### Quantifizierer

Ausdruck | Beschreibung
:--|:--
`{2}` | genau 2
`{2,}` | mindestens 2
`{2,7}` | mindestens 2, aber höchstens 7
`*` | 0 oder mehr
`+` | 1 oder mehr
`?` | genau 0 oder 1

- Der Quantifizierer steht *nach* dem Ausdruck, der quantifiziert werden soll.

### Grenzen

Ausdruck | Beschreibung
:--|:--
`^` | Anfang der Zeichenkette
`$` | Ende der Zeichenkette
`\b` | Wortgrenze

- So funktioniert der Abgleich der Wortgrenze:
    - Am Anfang der Zeichenkette, wenn das erste Zeichen `\w` ist.
    - Zwischen zwei benachbarten Zeichen innerhalb der Zeichenkette, wenn das erste Zeichen `\w` und das zweite Zeichen `\W` ist.
    - Am Ende der Zeichenkette, wenn das letzte Zeichen `\w` ist.

### Abgleich

Ausdruck | Beschreibung
:--|:--
`foo\|bar` | entweder `foo` oder `bar`
`foo(?=bar)` | `foo`, wenn es vor `bar` steht
`foo(?!bar)` | `foo`, wenn es *nicht* vor `bar` steht
`(?<=bar)foo` | `foo`, wenn es nach `bar` steht
`(?<!bar)foo` | `foo`, wenn es *nicht* nach `bar` steht

### Gruppierung und Erfassung

Ausdruck | Beschreibung
:--|:--
`(foo)` | erfassende Gruppe; `foo` abgleichen und erfassen
`(?:foo)` | nicht erfassende Gruppe; `foo` abgleichen, aber *ohne* `foo` zu erfassen
`(foo)bar\1` | `\1` ist ein Rückverweis auf die 1. erfassende Gruppe; passt auf `foobarfoo`

- Erfassende Gruppen sind nur bei den folgenden Methoden relevant:
    - `string.match(regexp)`
    - `string.matchAll(regexp)`
    - `string.replace(regexp, callback)`
- `\N` ist ein Rückverweis auf die `N`-te erfassende Gruppe. Erfassende Gruppen werden ab 1 nummeriert.

## Referenzen und Werkzeuge

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [RegExplained](https://leaverou.github.io/regexplained/)
