import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LOAD_TIMEOUT_MS, RUN_TIMEOUT_MS, runInWorker } from './regex-worker';

class FakeWorker {
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: (() => void) | null = null;
  terminated = false;
  received: unknown[] = [];

  postMessage(data: unknown) {
    this.received.push(data);
  }

  terminate() {
    this.terminated = true;
  }

  emit(data: unknown) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

function setup(createWorker?: () => Worker) {
  const worker = new FakeWorker();
  const handlers = { onResult: vi.fn(), onTimeout: vi.fn(), onFailure: vi.fn(), onUnsupported: vi.fn() };
  const stop = runInWorker<string>({
    createWorker: createWorker ?? (() => worker as unknown as Worker),
    request: 'job',
    handlers,
  });
  return { worker, handlers, stop };
}

describe('runInWorker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('sends the job only after the worker reported that it is loaded', () => {
    const { worker } = setup();
    expect(worker.received).toEqual([]);
    worker.emit({ ready: true });
    expect(worker.received).toEqual(['job']);
  });

  it('does not count the load time against the run timeout', () => {
    const { worker, handlers } = setup();
    vi.advanceTimersByTime(RUN_TIMEOUT_MS * 5);
    expect(handlers.onTimeout).not.toHaveBeenCalled();
    worker.emit({ ready: true });
    worker.emit('result');
    expect(handlers.onResult).toHaveBeenCalledWith('result');
    expect(handlers.onTimeout).not.toHaveBeenCalled();
  });

  it('times out when a loaded worker does not answer in time, and terminates it', () => {
    const { worker, handlers } = setup();
    worker.emit({ ready: true });
    vi.advanceTimersByTime(RUN_TIMEOUT_MS + 1);
    expect(handlers.onTimeout).toHaveBeenCalledTimes(1);
    expect(worker.terminated).toBe(true);
  });

  it('reports a failure when the worker never finishes loading', () => {
    const { worker, handlers } = setup();
    vi.advanceTimersByTime(LOAD_TIMEOUT_MS + 1);
    expect(handlers.onFailure).toHaveBeenCalledTimes(1);
    expect(handlers.onTimeout).not.toHaveBeenCalled();
    expect(worker.terminated).toBe(true);
  });

  it('reports a failure when the worker crashes', () => {
    const { worker, handlers } = setup();
    worker.onerror?.();
    expect(handlers.onFailure).toHaveBeenCalledTimes(1);
  });

  it('reports unsupported environments without creating a worker', () => {
    const { handlers } = setup(() => {
      throw new Error('no Worker');
    });
    expect(handlers.onUnsupported).toHaveBeenCalledTimes(1);
  });

  it('ignores late messages after it was cancelled', () => {
    const { worker, handlers, stop } = setup();
    worker.emit({ ready: true });
    stop();
    worker.emit('late result');
    vi.advanceTimersByTime(RUN_TIMEOUT_MS * 2);
    expect(handlers.onResult).not.toHaveBeenCalled();
    expect(handlers.onTimeout).not.toHaveBeenCalled();
    expect(worker.terminated).toBe(true);
  });

  it('answers only once', () => {
    const { worker, handlers } = setup();
    worker.emit({ ready: true });
    worker.emit('first');
    worker.emit('second');
    expect(handlers.onResult).toHaveBeenCalledTimes(1);
  });
});
