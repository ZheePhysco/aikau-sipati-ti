"use client";

import { useState, useEffect } from "react";
import { BrandMark } from "./brand-mark";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    // Show brand mark, then reveal page
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const curtainTimer = setTimeout(() => {
      setShowCurtain(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(curtainTimer);
    };
  }, []);

  if (!showCurtain) return null;

  return (
    <>
      {/* Brand mark overlay */}
      <div
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
        style={{
          opacity: isLoading ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: isLoading ? "auto" : "none",
        }}
      >
        <div className="brand-animate">
          <BrandMark size="lg" />
        </div>
      </div>

      {/* Curtain wipe */}
      <div
        className="page-curtain fixed inset-0 z-[9999] bg-background"
        style={{
          pointerEvents: "none",
        }}
      />
    </>
  );
}
