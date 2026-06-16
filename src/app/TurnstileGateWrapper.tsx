"use client";

import { useEffect, useState } from "react";
import TurnstileGate from "./comp/TurnstileGate";

export default function TurnstileGateWrapper({
  children,
  header,
  footer,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}>) {
  const [verified, setVerified] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem("turnstileVerified");
      setVerified(stored === "true");
    }
  }, []);

  const handleVerified = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("turnstileVerified", "true");
    }
    setVerified(true);
  };

  if (!hydrated) {
    return null;
  }

  if (!verified) {
    return <TurnstileGate onVerified={handleVerified} />;
  }

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
