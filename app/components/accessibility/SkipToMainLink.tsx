/**
 * Keyboard / SR: jumps to in-page landmark. Target `#main-content` must exist on each route’s primary `<main>`.
 */
export function SkipToMainLink() {
    return (
        <a
            href="#main-content"
            className="fixed left-4 top-0 z-[9999] -translate-y-full rounded-b-md bg-primary px-4 py-2 text-sm font-bold text-white shadow-md outline-none ring-offset-2 transition-transform focus:translate-y-0 focus:ring-2 focus:ring-white"
        >
            メインコンテンツへスキップ
        </a>
    );
}
