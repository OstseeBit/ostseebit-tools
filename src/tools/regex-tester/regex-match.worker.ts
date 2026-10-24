import { matchRegex } from './regex-tester.service';

// Errors cross the worker boundary as data, not as display text: `failed` marks the
// failure, `detail` carries the browser's own (untranslatable) syntax error, and the
// component picks the translated fallback message.
globalThis.onmessage = (event: MessageEvent<{ regex: string, text: string, flags: string }>) => {
  const { regex, text, flags } = event.data;
  try {
    globalThis.postMessage({ results: matchRegex(regex, text, flags), failed: false, detail: '' });
  }
  catch (error) {
    globalThis.postMessage({ results: [], failed: true, detail: error instanceof Error ? error.message : '' });
  }
};

// First message, see regex-worker.ts: the run timeout only starts once the worker is loaded.
globalThis.postMessage({ ready: true });
