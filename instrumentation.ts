/**
 * Next.js Instrumentation Hook
 * 
 * Node.js v22+ exposes a global `localStorage` object (experimental WebStorage),
 * but when `--localstorage-file` is not set, `getItem`/`setItem` are broken
 * (they are not functions). This causes 500 errors during SSR/RSC when any
 * library or component accidentally references `localStorage`.
 * 
 * This polyfill replaces the broken global with a safe no-op implementation.
 */
export async function register() {
  if (typeof globalThis.localStorage !== 'undefined') {
    const ls = globalThis.localStorage;

    // Check if the API is broken (getItem is not a function)
    if (typeof ls.getItem !== 'function') {
      const store = new Map<string, string>();

      // Replace with a safe in-memory stub
      Object.defineProperty(globalThis, 'localStorage', {
        value: {
          getItem(key: string): string | null {
            return store.get(key) ?? null;
          },
          setItem(key: string, value: string): void {
            store.set(key, String(value));
          },
          removeItem(key: string): void {
            store.delete(key);
          },
          clear(): void {
            store.clear();
          },
          get length(): number {
            return store.size;
          },
          key(index: number): string | null {
            const keys = Array.from(store.keys());
            return keys[index] ?? null;
          },
        },
        writable: true,
        configurable: true,
      });
    }
  }
}
