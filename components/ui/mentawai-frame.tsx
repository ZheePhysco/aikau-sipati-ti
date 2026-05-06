"use client";

import { ReactNode } from "react";

interface MentawaiFrameProps {
  children: ReactNode;
  className?: string;
  /** portrait = tall photo, card = project/gallery card, square = square crop */
  variant?: "portrait" | "card" | "square";
  /** Show corner hook ornaments */
  showCorners?: boolean;
}

/**
 * MentawaiFrame — wraps any image/content with an authentic hand-crafted
 * SVG double-border + corner hook ornaments inspired by titi tattoo outlines.
 * The outer border is the natural container; the SVG overlays the gold inset frame.
 */
export function MentawaiFrame({
  children,
  className = "",
  variant = "card",
  showCorners = true,
}: MentawaiFrameProps) {
  const cornerSize = variant === "portrait" ? 20 : 14;

  return (
    <div className={`relative ${className}`} style={{ isolation: "isolate" }}>
      {/* Content */}
      {children}

      {/* Gold inset frame SVG — absolute overlay */}
      {showCorners && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 10 }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Outer rectangle — slightly inset */}
          <rect
            x="2.5"
            y="2.5"
            width="95"
            height="95"
            stroke="rgba(196,162,78,0.30)"
            strokeWidth="0.4"
          />
          {/* Inner rectangle — the double-frame inset */}
          <rect
            x="4.5"
            y="4.5"
            width="91"
            height="91"
            stroke="rgba(196,162,78,0.18)"
            strokeWidth="0.25"
          />

          {/* Top-left corner hook */}
          <path
            d={`M2.5 ${2.5 + cornerSize * 0.5} L2.5 2.5 L${2.5 + cornerSize * 0.5} 2.5`}
            stroke="rgba(196,162,78,0.75)"
            strokeWidth="0.6"
          />
          <path
            d={`M4.5 ${4.5 + cornerSize * 0.35} L4.5 4.5 L${4.5 + cornerSize * 0.35} 4.5`}
            stroke="rgba(196,162,78,0.45)"
            strokeWidth="0.35"
          />
          {/* Top-left dot */}
          <circle cx="2.5" cy="2.5" r="0.8" fill="rgba(196,162,78,0.75)" />

          {/* Top-right corner hook */}
          <path
            d={`M${97.5 - cornerSize * 0.5} 2.5 L97.5 2.5 L97.5 ${2.5 + cornerSize * 0.5}`}
            stroke="rgba(196,162,78,0.75)"
            strokeWidth="0.6"
          />
          <path
            d={`M${95.5 - cornerSize * 0.35} 4.5 L95.5 4.5 L95.5 ${4.5 + cornerSize * 0.35}`}
            stroke="rgba(196,162,78,0.45)"
            strokeWidth="0.35"
          />
          <circle cx="97.5" cy="2.5" r="0.8" fill="rgba(196,162,78,0.75)" />

          {/* Bottom-left corner hook */}
          <path
            d={`M2.5 ${97.5 - cornerSize * 0.5} L2.5 97.5 L${2.5 + cornerSize * 0.5} 97.5`}
            stroke="rgba(196,162,78,0.75)"
            strokeWidth="0.6"
          />
          <path
            d={`M4.5 ${95.5 - cornerSize * 0.35} L4.5 95.5 L${4.5 + cornerSize * 0.35} 95.5`}
            stroke="rgba(196,162,78,0.45)"
            strokeWidth="0.35"
          />
          <circle cx="2.5" cy="97.5" r="0.8" fill="rgba(196,162,78,0.75)" />

          {/* Bottom-right corner hook */}
          <path
            d={`M${97.5 - cornerSize * 0.5} 97.5 L97.5 97.5 L97.5 ${97.5 - cornerSize * 0.5}`}
            stroke="rgba(196,162,78,0.75)"
            strokeWidth="0.6"
          />
          <path
            d={`M${95.5 - cornerSize * 0.35} 95.5 L95.5 95.5 L95.5 ${95.5 - cornerSize * 0.35}`}
            stroke="rgba(196,162,78,0.45)"
            strokeWidth="0.35"
          />
          <circle cx="97.5" cy="97.5" r="0.8" fill="rgba(196,162,78,0.75)" />

          {/* Midpoint ticks — top & bottom */}
          <line x1="50" y1="2.2" x2="50" y2="4.5" stroke="rgba(196,162,78,0.45)" strokeWidth="0.4" />
          <line x1="50" y1="95.5" x2="50" y2="97.8" stroke="rgba(196,162,78,0.45)" strokeWidth="0.4" />
          {/* Midpoint ticks — left & right */}
          <line x1="2.2" y1="50" x2="4.5" y2="50" stroke="rgba(196,162,78,0.45)" strokeWidth="0.4" />
          <line x1="95.5" y1="50" x2="97.8" y2="50" stroke="rgba(196,162,78,0.45)" strokeWidth="0.4" />
        </svg>
      )}
    </div>
  );
}
