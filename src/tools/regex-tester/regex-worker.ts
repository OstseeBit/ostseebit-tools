// Runs one job in a Web Worker with a hang protection: user-supplied patterns can backtrack
// catastrophically, so the work is cancelled after RUN_TIMEOUT_MS instead of freezing the tab.
//
// The run timeout only starts once the worker has reported that it is loaded (it posts
// `{ ready: true }` as its first message). Otherwise the time spent fetching and compiling the
// worker file, which is slow on a cold start in development and on slow devices, counted against the
// regex and showed "timed out" for a harmless pattern. Loading itself has its own, longer limit.

export const RUN_TIMEOUT_MS = 1000;
export const LOAD_TIMEOUT_MS = 10000;

export interface WorkerRunHandlers<Result> {
  /** The worker answered within the time limit. */
  onResult: (result: Result) => void
  /** The worker was loaded but did not answer within RUN_TIMEOUT_MS. */
  onTimeout: () => void
  /** The worker could not be loaded or crashed. */
  onFailure: () => void
  /** Workers cannot be created at all in this environment. */
  onUnsupported: () => void
}

/** Starts the job and returns a function that cancels it (safe to call more than once). */
export function runInWorker<Result>({ createWorker, request, handlers }: {
  createWorker: () => Worker
  request: unknown
  handlers: WorkerRunHandlers<Result>
}): () => void {
  let worker: Worker | undefined;
  let runTimer: ReturnType<typeof setTimeout> | undefined;
  let loadTimer: ReturnType<typeof setTimeout> | undefined;
  let active = true;

  const stop = () => {
    active = false;
    clearTimeout(runTimer);
    clearTimeout(loadTimer);
    worker?.terminate();
  };

  const finish = (callback: () => void) => {
    if (!active) {
      return;
    }
    stop();
    callback();
  };

  try {
    worker = createWorker();
  }
  catch {
    finish(handlers.onUnsupported);
    return stop;
  }

  worker.onmessage = (event: MessageEvent<Result | { ready: true }>) => {
    if (!active) {
      return;
    }
    const data = event.data as { ready?: boolean };
    if (data?.ready === true) {
      clearTimeout(loadTimer);
      runTimer = setTimeout(finish, RUN_TIMEOUT_MS, handlers.onTimeout);
      worker?.postMessage(request);
      return;
    }
    finish(() => handlers.onResult(event.data as Result));
  };
  worker.onerror = () => finish(handlers.onFailure);
  loadTimer = setTimeout(finish, LOAD_TIMEOUT_MS, handlers.onFailure);

  return stop;
}
