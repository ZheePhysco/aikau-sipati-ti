"use client";

import { useRef, useState, useEffect, type CSSProperties } from "react";

interface MentawaiDividerProps {
  variant?: "horizontal" | "border-top" | "ornament" | "band";
  className?: string;
  color?: string;
}

/**
 * Authentic Mentawai geometric section divider.
 * Replaces plain <hr> with ceremonial SVG motifs inspired by titi hand-tap patterns.
 */
export function MentawaiDivider({
  variant = "horizontal",
  className = "",
  color = "currentColor",
}: MentawaiDividerProps) {
  const ornamentRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (variant !== "ornament") return;
    const el = ornamentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [variant]);

  if (variant === "ornament") {
    // Central ornament — SVG lines draw themselves on scroll
    return (
      <div ref={ornamentRef} className={`flex items-center justify-center py-3 ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 240 24"
          className="w-48 md:w-64"
          style={{ color: "var(--accent)", opacity: 0.7 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left arm — draws left to right */}
          <line
            x1="0" y1="12" x2="80" y2="12"
            stroke={color} strokeWidth="0.75"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "80", animationDelay: "0s" } as CSSProperties}
          />
          {/* Left chevrons */}
          <path
            d="M72 6 L80 12 L72 18"
            stroke={color} strokeWidth="0.75" fill="none"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "20", animationDelay: "0.28s" } as CSSProperties}
          />
          <path
            d="M64 6 L72 12 L64 18"
            stroke={color} strokeWidth="0.75" fill="none"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "20", animationDelay: "0.4s" } as CSSProperties}
          />

          {/* Center diamond — draws its perimeter */}
          <rect
            x="110" y="4" width="20" height="16"
            transform="rotate(45 120 12)"
            stroke={color} strokeWidth="0.75" fill="none"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "72", animationDelay: "0.55s" } as CSSProperties}
          />
          {/* Center dot — instant, no draw */}
          <circle cx="120" cy="12" r="2.5" fill={color}
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.3s ease 0.95s" }}
          />
          {/* Flanking dots */}
          <circle cx="100" cy="12" r="1.5" fill={color} opacity="0.5"
            style={{ opacity: drawn ? 0.5 : 0, transition: "opacity 0.3s ease 0.7s" }}
          />
          <circle cx="140" cy="12" r="1.5" fill={color} opacity="0.5"
            style={{ opacity: drawn ? 0.5 : 0, transition: "opacity 0.3s ease 0.7s" }}
          />

          {/* Right chevrons */}
          <path
            d="M168 6 L160 12 L168 18"
            stroke={color} strokeWidth="0.75" fill="none"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "20", animationDelay: "0.78s" } as CSSProperties}
          />
          <path
            d="M176 6 L168 12 L176 18"
            stroke={color} strokeWidth="0.75" fill="none"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "20", animationDelay: "0.9s" } as CSSProperties}
          />
          {/* Right arm — draws left to right from center-out feel */}
          <line
            x1="160" y1="12" x2="240" y2="12"
            stroke={color} strokeWidth="0.75"
            className={`motif-draw${drawn ? " animate" : ""}`}
            style={{ "--dash-len": "80", animationDelay: "1.05s" } as CSSProperties}
          />
        </svg>
      </div>
    );
  }

  if (variant === "band") {
    // Full-width ceremonial band — chevrons + dotwork row
    return (
      <div className={`w-full overflow-hidden ${className}`} aria-hidden="true" style={{ height: 28 }}>
        <svg
          viewBox="0 0 800 28"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          style={{ color: "var(--accent)", opacity: 0.28 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top rule */}
          <line x1="0" y1="2" x2="800" y2="2" stroke={color} strokeWidth="0.5" />

          {/* Repeating chevron pattern */}
          {Array.from({ length: 53 }).map((_, i) => {
            const x = i * 15 + 0;
            return (
              <g key={i}>
                <path d={`M${x} 8 L${x + 7.5} 14 L${x + 15} 8`} stroke={color} strokeWidth="0.6" fill="none" />
              </g>
            );
          })}

          {/* Dotwork row */}
          {Array.from({ length: 160 }).map((_, i) => (
            <circle key={i} cx={i * 5 + 2.5} cy="21" r="1" fill={color} />
          ))}

          {/* Bottom rule */}
          <line x1="0" y1="27" x2="800" y2="27" stroke={color} strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  if (variant === "border-top") {
    // Used as footer top-border replacement
    return (
      <div className={`w-full overflow-hidden ${className}`} aria-hidden="true" style={{ height: 32 }}>
        <svg
          viewBox="0 0 800 32"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          style={{ color: "var(--accent)", opacity: 0.35 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top double rule */}
          <line x1="0" y1="2" x2="800" y2="2" stroke={color} strokeWidth="1" />
          <line x1="0" y1="5" x2="800" y2="5" stroke={color} strokeWidth="0.4" />

          {/* Hook spirals repeating */}
          {Array.from({ length: 40 }).map((_, i) => {
            const x = i * 20;
            return (
              <g key={i}>
                <path
                  d={`M${x + 2} 18 Q${x + 10} 10 ${x + 18} 18 Q${x + 10} 26 ${x + 2} 18`}
                  stroke={color}
                  strokeWidth="0.5"
                  fill="none"
                />
              </g>
            );
          })}

          {/* Bottom rule */}
          <line x1="0" y1="30" x2="800" y2="30" stroke={color} strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  // Default: horizontal — thin double-rule with center ornament
  return (
    <div className={`w-full flex items-center gap-0 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 16"
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ color: "var(--accent)", opacity: 0.4 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left half */}
        <line x1="0" y1="8" x2="370" y2="8" stroke={color} strokeWidth="0.75" />

        {/* Center diamond */}
        <rect x="394" y="2" width="12" height="12" transform="rotate(45 400 8)" stroke={color} strokeWidth="0.75" fill="none" />
        <circle cx="400" cy="8" r="2" fill={color} />

        {/* Right half */}
        <line x1="430" y1="8" x2="800" y2="8" stroke={color} strokeWidth="0.75" />
      </svg>
    </div>
  );
}
