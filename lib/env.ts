/**
 * Environment Variable Validator
 * Ensures that all required environment variables are set during runtime.
 * Usage: Import and call ensureEnv() in server-side entry points.
 */

export const REQUIRED_ENV_VARS = [
    'DATABASE_URL',
    'DIRECT_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'ADMIN_ALLOWLIST',
] as const;

export function ensureEnv() {
    const missing = REQUIRED_ENV_VARS.filter(key => !process.env[key]);

    if (missing.length > 0) {
        const errorMsg = `[CRITICAL_FAIL] Missing required environment variables: ${missing.join(', ')}`;
        console.error(errorMsg);

        // In production, we want to fail fast if these are missing.
        if (process.env.NODE_ENV === 'production') {
            throw new Error(errorMsg);
        }
    } else {
        console.log('[ENV_CHECK_OK] All essential environment variables are set.');
    }
}
