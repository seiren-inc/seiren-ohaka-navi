"use client";

import { useEffect } from "react";

type DeferredAnalyticsProps = {
  gaId?: string;
  clarityId?: string;
};

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const runWhenIdle = (callback: () => void) => {
  if (typeof window === "undefined") return;

  const idleWindow = window as Window & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
  };

  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(() => callback(), { timeout: 2_000 });
    return;
  }

  globalThis.setTimeout(callback, 1_500);
};

const appendScript = (src: string, id: string) => {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

export function DeferredAnalytics({
  gaId,
  clarityId,
}: DeferredAnalyticsProps) {
  useEffect(() => {
    const loadAnalytics = () => {
      if (gaId) {
        appendScript(
          `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          "ga4-script",
        );

        window.dataLayer = window.dataLayer || [];
        window.gtag =
          window.gtag ||
          function gtag(...args: unknown[]) {
            window.dataLayer?.push(args);
          };

        window.gtag("js", new Date());
        window.gtag("config", gaId);
      }

      if (clarityId && !window.clarity) {
        type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
        const clarityWindow = window as Window & { clarity?: ClarityFn };
        const clarity: ClarityFn =
          clarityWindow.clarity ||
          ((...args: unknown[]) => {
            clarity.q = clarity.q || [];
            clarity.q.push(args);
          });

        clarityWindow.clarity = clarity;

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.clarity.ms/tag/${clarityId}`;

        const firstScript = document.getElementsByTagName("script")[0];
        firstScript?.parentNode?.insertBefore(script, firstScript);
      }
    };

    const scheduleLoad = () => runWhenIdle(loadAnalytics);

    if (document.readyState === "complete") {
      scheduleLoad();
      return;
    }

    window.addEventListener("load", scheduleLoad, { once: true });
    return () => window.removeEventListener("load", scheduleLoad);
  }, [clarityId, gaId]);

  return null;
}
