import { generateRegexSample, SAMPLE_LIMIT_MESSAGE } from './regex-sample.service';

// See regex-match.worker.ts: failures are reported as data so the component can translate them.
globalThis.onmessage = (event: MessageEvent<string>) => {
  try {
    globalThis.postMessage({ sample: generateRegexSample(event.data), failed: false, limit: false, detail: '' });
  }
  catch (error) {
    const detail = error instanceof Error ? error.message : '';
    globalThis.postMessage({ sample: '', failed: true, limit: detail === SAMPLE_LIMIT_MESSAGE, detail });
  }
};

// First message, see regex-worker.ts: the run timeout only starts once the worker is loaded.
globalThis.postMessage({ ready: true });
