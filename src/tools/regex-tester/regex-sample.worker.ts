import { generateRegexSample } from './regex-sample.service';

globalThis.onmessage = (event: MessageEvent<string>) => {
  try {
    globalThis.postMessage({ sample: generateRegexSample(event.data), error: '' });
  }
  catch (error) {
    globalThis.postMessage({ sample: '', error: error instanceof Error ? error.message : 'Sample generation failed.' });
  }
};
