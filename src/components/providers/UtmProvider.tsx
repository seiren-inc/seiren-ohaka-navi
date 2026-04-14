'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function UtmTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const utmParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const currentUtm: Record<string, string> = {};
    let hasUtm = false;

    utmParameters.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        currentUtm[param] = value;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      try {
        const stored = sessionStorage.getItem('__seiren_utm');
        const existingUtm = stored ? JSON.parse(stored) : {};
        const merged = { ...existingUtm, ...currentUtm };
        sessionStorage.setItem('__seiren_utm', JSON.stringify(merged));
      } catch (error) {
        console.error('Failed to save UTM parameters:', error);
      }
    }
  }, [searchParams]);

  return null;
}

export function UtmProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <UtmTracker />
      </Suspense>
      {children}
    </>
  );
}
