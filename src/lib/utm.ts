export function getStoredUtm() {
    if (typeof window === 'undefined') return {};
    try {
        const stored = sessionStorage.getItem('__seiren_utm');
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}
