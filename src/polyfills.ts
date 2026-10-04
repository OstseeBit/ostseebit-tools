// This imports the `buffer` browser polyfill package (not Node's built-in
// `node:buffer`, which doesn't exist in the browser — that's the whole point).
// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer';

// Some npm packages (e.g. xml-js, via its json2xml module) reference Node's
// ambient `Buffer` global directly (`json instanceof Buffer`). The browser has
// no such global, which throws a cryptic "Cannot read properties of undefined
// (reading 'prototype')" from the `instanceof` check — not a missing-global
// ReferenceError, since nothing ever imports/defines Buffer on our side.
// Providing it globally here makes those checks behave as intended (false).
// eslint-disable-next-line node/prefer-global/buffer
if (typeof globalThis.Buffer === 'undefined') {
  // eslint-disable-next-line node/prefer-global/buffer
  globalThis.Buffer = Buffer;
}
