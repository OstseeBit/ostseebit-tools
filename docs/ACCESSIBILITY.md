# Barrierefreiheit

Stand: 2026-10-04. Ziel: WCAG 2.1 Stufe AA, orientiert an EN 301 549 — analog zur Zielsetzung des benachbarten `ostseebit-app` (siehe dort `docs/compliance-checklist.md`). Dies ist eine technische Standortbestimmung, kein rechtsverbindlicher Konformitätsnachweis.

## Umgesetzt

- **Sprache der Seite (WCAG 3.1.1):** `index.html` deklariert `lang="de"`, Standard-UI-Sprache ist jetzt ebenfalls Deutsch (`src/plugins/i18n.plugin.ts`). Vorher Widerspruch: Dokument war als Deutsch markiert, rendert aber standardmäßig Englisch.
- **Skip-Link (WCAG 2.4.1):** `src/layouts/base.layout.vue` enthält einen Skip-Link zu `#main-content`, Styling in `src/assets/a11y.css`. Per Tastatur erreichbar, bei Fokus sichtbar (manuell geprüft über programmatischen Fokus — siehe Prüfprotokoll unten).
- **Fokus-Sichtbarkeit (WCAG 2.4.7):** globale `:focus-visible`-Regel in `src/assets/a11y.css`, Akzentfarbe als Ringfarbe (hell `#086278`, dunkel `#67e8f9`), 3px Outline + 2px Offset.
- **Landmarks:** `<main id="main-content">` um den Seiteninhalt, `<nav aria-label="Werkzeuge">` um das Werkzeugmenü, `role="toolbar"` mit `aria-label` für die Icon-Leiste — alle in `src/layouts/base.layout.vue`.
- **Bewegungsreduktion (WCAG 2.3.3):** `@media (prefers-reduced-motion: reduce)`-Regel in `src/assets/a11y.css` reduziert Animations-/Übergangsdauer auf nahe null.
- **Screenreader-only-Hilfsklasse:** `.sr-only` in `src/assets/a11y.css` für künftige Verwendung (noch nicht breit im Markup eingesetzt).
- **Farbkontrast:** Die übernommene Akzentfarbe (`#086278` hell / `#22d3ee` dunkel) stammt unverändert aus `ostseebit-app` (`static/css/core/_neomorphic-tokens.css`), dort dokumentiert mit ca. 5,25:1 Kontrast auf dem dortigen Hintergrund. Für die naive-ui-Flächen in `ostseebit-tools` (andere Hintergrundfarben als in `ostseebit-app`) wurde der Kontrast **nicht erneut einzeln nachgemessen** — offener Punkt.
- Dezenter, nicht programmatisch verifizierter Logo-Alt-Text: `leuchtturm-mark.png` im Header hat `alt=""` (dekorativ, der Markenname steht als Text daneben), analog zur Konvention in `ostseebit-app`.

## Noch offen

- Echter Screenreader-Testlauf (NVDA/VoiceOver) auf Startseite und mindestens einem Tool.
- Kontrastmessung der übernommenen Akzentfarbe gegen die tatsächlichen `ostseebit-tools`-Hintergründe (naive-ui-Flächen unterscheiden sich von `ostseebit-app`s Neomorphism-Flächen).
- `aria-*`-Abdeckung der 86 einzelnen Tool-Seiten wurde nicht einzeln geprüft; dieser Durchgang hat nur die gemeinsame Chrome (Layout, Navigation, Skip-Link, Fokus) behandelt.
- `.sr-only` ist als Utility vorhanden, aber noch nicht gezielt im Markup eingesetzt, wo visuelle Labels fehlen.

## Prüfprotokoll (2026-10-04)

- `pnpm dev` gestartet, Start- und JWT-Parser-Seite im Browser (Light- und Dark-Mode) visuell geprüft — Logo, Farben, Schrift, Layout intakt.
- Skip-Link programmatisch fokussiert: `top` wechselt korrekt von `-100%` auf `8px`, Hintergrundfarbe entspricht der Akzentfarbe.
- `document.getElementById('main-content')` liefert das erwartete `<main>`-Element.
- Naive-ui-Primärfarbe (`.hero-wrapper .divider` Hintergrund) liefert `rgb(8, 98, 120)` = `#086278`, `body`-Schriftart liefert `"IBM Plex Sans", system-ui, ...` — beides wie vorgesehen verdrahtet.
- Automatisierter Tab-Tastendruck über das Browser-Testwerkzeug hat in dieser Sitzung keinen zuverlässigen Fokuswechsel ausgelöst (bekannte Einschränkung des Werkzeugs); die Prüfung erfolgte daher über direkten Fokusaufruf. Ein Test mit echter Tastatur in einem regulären Browser steht noch aus.
