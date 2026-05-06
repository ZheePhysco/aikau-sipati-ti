"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/image-config";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  const sizes = {
    sm: { img: 38, title: "text-sm", subtitle: "text-[9px]", tagline: false },
    md: { img: 72, title: "text-base", subtitle: "text-[9px]", tagline: true },
    lg: { img: 128, title: "text-2xl", subtitle: "text-[10px]", tagline: true },
  };

  const s = sizes[size];
  const isSmall = size === "sm";

  return (
    <div className={`flex ${isSmall ? "flex-row" : "flex-col"} items-center gap-3 ${className}`}>
      {/* Logo — square with SVG corner ticks instead of rounded border */}
      <div
        className="relative shrink-0"
        style={{ width: s.img, height: s.img }}
      >
        {/* Outer frame with corner ticks */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 10 }}
        >
          {/* Corner tick — top-left */}
          <path d="M2 18 L2 2 L18 2" stroke="rgba(196,162,78,0.65)" strokeWidth="1.5" />
          {/* Corner tick — top-right */}
          <path d="M82 2 L98 2 L98 18" stroke="rgba(196,162,78,0.65)" strokeWidth="1.5" />
          {/* Corner tick — bottom-left */}
          <path d="M2 82 L2 98 L18 98" stroke="rgba(196,162,78,0.65)" strokeWidth="1.5" />
          {/* Corner tick — bottom-right */}
          <path d="M98 82 L98 98 L82 98" stroke="rgba(196,162,78,0.65)" strokeWidth="1.5" />
        </svg>

        {/* Logo image */}
        <div className="absolute inset-[4px] overflow-hidden">
          <Image
            src={IMAGES.logo}
            alt="Siolaakenen Muti'ti Logo"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Text block */}
      <div className={`flex flex-col ${isSmall ? "items-start gap-0.5" : "items-center gap-0.5"}`}>
        <span
          className={`font-serif ${s.title} tracking-[0.18em] text-foreground leading-none`}
          style={{ letterSpacing: "0.18em" }}
        >
          Siolaakenen
        </span>

        {/* Thin motif rule — only for md/lg */}
        {!isSmall && (
          <svg
            viewBox="0 0 120 6"
            className="w-24 my-0.5"
            style={{ opacity: 0.5 }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="3" x2="48" y2="3" stroke="var(--accent)" strokeWidth="0.5" />
            <circle cx="60" cy="3" r="1.5" fill="var(--accent)" />
            <line x1="72" y1="3" x2="120" y2="3" stroke="var(--accent)" strokeWidth="0.5" />
          </svg>
        )}

        <span
          className={`font-sans font-light ${s.subtitle} tracking-[0.35em] text-accent leading-none`}
        >
          MUTI&apos;TI
        </span>

        {s.tagline && !isSmall && (
          <span className="mt-1.5 font-serif text-[9px] italic text-muted-foreground opacity-75 tracking-[0.08em]">
            Come, Get Tattooed
          </span>
        )}
      </div>
    </div>
  );
}
