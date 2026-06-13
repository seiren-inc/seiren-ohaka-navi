export default function Loading() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-bg gap-4"
            role="status"
            aria-live="polite"
            aria-label="読み込み中"
        >
            <span className="h-10 w-10 rounded-full border-4 border-border border-t-primary animate-spin" />
            <span className="text-sm text-text-muted">読み込み中...</span>
        </div>
    );
}
