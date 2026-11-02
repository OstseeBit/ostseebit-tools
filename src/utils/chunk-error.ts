/**
 * Erkennt, dass ein Teil der Anwendung (ein Werkzeug) nicht nachgeladen werden konnte.
 * Das passiert nach einer neuen Version (alte Dateinamen existieren nicht mehr) oder ohne Verbindung.
 * Die Meldungen unterscheiden sich je nach Browser.
 */
export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i.test(message);
}
