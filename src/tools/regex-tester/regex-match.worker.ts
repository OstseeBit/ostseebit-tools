import { matchRegex } from './regex-tester.service';

globalThis.onmessage = (event: MessageEvent<{ regex: string, text: string, flags: string }>) => {
  const { regex, text, flags } = event.data;
  try {
    globalThis.postMessage({ results: matchRegex(regex, text, flags), error: '' });
  }
  catch (error) {
    globalThis.postMessage({ results: [], error: error instanceof Error ? error.message : 'Matching failed.' });
  }
};
