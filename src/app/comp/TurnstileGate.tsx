"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLDivElement,
        options: Record<string, unknown>,
      ) => number;
      execute?: (widgetId: number) => void;
      remove: (widgetId: number) => void;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function TurnstileGate({
  onVerified,
}: {
  onVerified: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const scriptId = "cf-turnstile-script";
    const existingScript = document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => setReady(true);
      script.onerror = () => setError("Failed to load Turnstile script.");
      document.body.appendChild(script);
    } else if (window.turnstile) {
      setReady(true);
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!siteKey) {
      setError("Missing TURNSTILE site key.");
      return;
    }

    if (
      ready &&
      window.turnstile &&
      widgetRef.current &&
      !widgetIdRef.current
    ) {
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey,
        mode: "non-interactive",
        appearance: "always",
        execution: "execute",
        callback: async (token: string) => {
          if (!token) {
            setError("Turnstile verification failed.");
            return;
          }

          const response = await fetch("/api/turnstile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();
          if (response.ok && data.success) {
            onVerified();
          } else {
            setError(
              data.challenge_ts
                ? "Turnstile verification failed. Please try again."
                : data.error || "Turnstile verification failed.",
            );
          }
        },
        "error-callback": () => {
          setError(
            "Turnstile encountered an error. Refresh the page to retry.",
          );
        },
        "expired-callback": () => {
          setError("Turnstile token expired. Please refresh the page.");
        },
      });

      if (window.turnstile?.execute && widgetIdRef.current !== null) {
        window.turnstile.execute(widgetIdRef.current);
      }
    }
  }, [ready, onVerified]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
        <div className="max-w-xl w-full border border-white/10 rounded-3xl bg-slate-900/95 p-8 shadow-2xl backdrop-blur-md">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">
            Verify to continue
          </h1>
          <p className="text-sm leading-6 text-slate-300 mb-6">
            Cloudflare Turnstile helps protect the site from automated traffic.
            Complete the verification to load the full site content.
          </p>
          <div className="flex justify-center">
            <div ref={widgetRef} />
          </div>
          {!ready && (
            <p className="mt-4 text-sm text-slate-400">Loading Turnstile...</p>
          )}
          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
          {!siteKey ? (
            <p className="mt-4 text-sm text-rose-300">
              Set{" "}
              <code className="rounded bg-slate-800 px-1 py-0.5">
                NEXT_PUBLIC_TURNSTILE_SITE_KEY
              </code>{" "}
              in your environment.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
