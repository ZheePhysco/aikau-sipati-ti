"use client";

interface TattooVisualProps {
  variant?: "pattern1" | "pattern2" | "pattern3" | "pattern4" | "pattern5" | "pattern6" | "mandala";
  className?: string;
  opacity?: number;
}

export function TattooVisual({
  variant = "pattern1",
  className = "",
  opacity = 0.15,
}: TattooVisualProps) {
  const patterns: Record<string, React.ReactNode> = {
    pattern1: (
      // Protection pattern - geometric shield
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {/* Central diamond */}
          <path d="M100 20 L180 100 L100 180 L20 100 Z" />
          <path d="M100 40 L160 100 L100 160 L40 100 Z" />
          <path d="M100 60 L140 100 L100 140 L60 100 Z" />
          
          {/* Cross lines */}
          <line x1="100" y1="0" x2="100" y2="200" />
          <line x1="0" y1="100" x2="200" y2="100" />
          
          {/* Corner marks */}
          <circle cx="100" cy="100" r="8" fill="currentColor" />
          <circle cx="100" cy="20" r="4" />
          <circle cx="180" cy="100" r="4" />
          <circle cx="100" cy="180" r="4" />
          <circle cx="20" cy="100" r="4" />
          
          {/* Dots pattern */}
          {[30, 50, 70, 130, 150, 170].map((y) =>
            [30, 50, 70, 130, 150, 170].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" />
            ))
          )}
        </g>
      </svg>
    ),
    pattern2: (
      // Courage pattern - arrow motifs
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {/* Vertical arrows */}
          <path d="M100 10 L90 30 M100 10 L110 30" />
          <path d="M100 190 L90 170 M100 190 L110 170" />
          <line x1="100" y1="30" x2="100" y2="170" />
          
          {/* Horizontal arrows */}
          <path d="M10 100 L30 90 M10 100 L30 110" />
          <path d="M190 100 L170 90 M190 100 L170 110" />
          <line x1="30" y1="100" x2="170" y2="100" />
          
          {/* Chevron patterns */}
          {[40, 60, 80, 120, 140, 160].map((pos) => (
            <g key={pos}>
              <path d={`M${pos} 40 L${pos + 10} 50 L${pos} 60`} />
              <path d={`M${pos} 140 L${pos + 10} 150 L${pos} 160`} />
            </g>
          ))}
          
          {/* Center cross */}
          <rect x="90" y="90" width="20" height="20" />
          <circle cx="100" cy="100" r="5" fill="currentColor" />
        </g>
      </svg>
    ),
    pattern3: (
      // Heritage pattern - spiral and waves
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {/* Concentric circles */}
          {[20, 35, 50, 65, 80].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} />
          ))}
          
          {/* Spiral lines */}
          <path d="M100 100 Q120 80 140 100 Q160 120 140 140 Q120 160 100 140 Q80 120 100 100" />
          
          {/* Wave patterns at edges */}
          <path d="M20 20 Q30 30 20 40 Q10 50 20 60" />
          <path d="M180 20 Q170 30 180 40 Q190 50 180 60" />
          <path d="M20 140 Q30 150 20 160 Q10 170 20 180" />
          <path d="M180 140 Q170 150 180 160 Q190 170 180 180" />
          
          {/* Center dot */}
          <circle cx="100" cy="100" r="6" fill="currentColor" />
        </g>
      </svg>
    ),
    pattern4: (
      // Journey pattern - path and footsteps
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {/* Winding path */}
          <path d="M20 180 Q60 160 80 120 Q100 80 140 60 Q180 40 180 20" strokeWidth="1.5" />
          <path d="M30 180 Q70 160 90 120 Q110 80 150 60 Q180 50 180 30" strokeWidth="0.5" />
          
          {/* Footstep marks along path */}
          {[[40, 160], [70, 130], [100, 100], [130, 70], [160, 40]].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="4" ry="6" fill="currentColor" />
              <ellipse cx={x + 8} cy={y + 5} rx="3" ry="5" fill="currentColor" />
            </g>
          ))}
          
          {/* Direction markers */}
          <path d="M170 30 L180 20 L175 35" fill="currentColor" />
          
          {/* Border frame */}
          <rect x="10" y="10" width="180" height="180" />
        </g>
      </svg>
    ),
    pattern5: (
      // Spirit pattern - ethereal symbols
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {/* Spirit eye */}
          <ellipse cx="100" cy="100" rx="50" ry="30" />
          <ellipse cx="100" cy="100" rx="30" ry="18" />
          <circle cx="100" cy="100" r="12" fill="currentColor" />
          <circle cx="96" cy="96" r="4" fill="var(--background)" />
          
          {/* Radiating lines - pre-calculated to avoid hydration mismatch */}
          <line x1="160" y1="100" x2="190" y2="100" />
          <line x1="152" y1="118" x2="178" y2="127" />
          <line x1="130" y1="131" x2="145" y2="147" />
          <line x1="100" y1="136" x2="100" y2="154" />
          <line x1="70" y1="131" x2="55" y2="147" />
          <line x1="48" y1="118" x2="22" y2="127" />
          <line x1="40" y1="100" x2="10" y2="100" />
          <line x1="48" y1="82" x2="22" y2="73" />
          <line x1="70" y1="69" x2="55" y2="53" />
          <line x1="100" y1="64" x2="100" y2="46" />
          <line x1="130" y1="69" x2="145" y2="53" />
          <line x1="152" y1="82" x2="178" y2="73" />
          
          {/* Corner flames */}
          <path d="M20 20 Q25 35 20 50 Q30 45 35 55" />
          <path d="M180 20 Q175 35 180 50 Q170 45 165 55" />
          <path d="M20 180 Q25 165 20 150 Q30 155 35 145" />
          <path d="M180 180 Q175 165 180 150 Q170 155 165 145" />
        </g>
      </svg>
    ),
    pattern6: (
      // Roots pattern - tree and nature
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {/* Tree trunk */}
          <line x1="100" y1="60" x2="100" y2="180" strokeWidth="2" />
          
          {/* Branches */}
          <path d="M100 80 Q80 70 60 80 Q50 85 40 80" />
          <path d="M100 80 Q120 70 140 80 Q150 85 160 80" />
          <path d="M100 100 Q85 95 70 100" />
          <path d="M100 100 Q115 95 130 100" />
          
          {/* Roots */}
          <path d="M100 180 Q80 190 60 185 Q50 183 40 190" strokeWidth="1.5" />
          <path d="M100 180 Q120 190 140 185 Q150 183 160 190" strokeWidth="1.5" />
          <path d="M100 180 Q90 195 85 200" />
          <path d="M100 180 Q110 195 115 200" />
          
          {/* Leaves/dots */}
          {[[40, 75], [60, 85], [140, 85], [160, 75], [70, 95], [130, 95]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="currentColor" />
          ))}
          
          {/* Sun/moon at top */}
          <circle cx="100" cy="30" r="15" />
          <circle cx="100" cy="30" r="8" fill="currentColor" />
        </g>
      </svg>
    ),
    mandala: (
      // Large mandala for hero
      <svg viewBox="0 0 400 400" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.5">
          {/* Concentric circles */}
          {[40, 70, 100, 130, 160, 190].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} />
          ))}
          
          {/* Radial lines */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={200 + Math.cos(angle) * 40}
                y1={200 + Math.sin(angle) * 40}
                x2={200 + Math.cos(angle) * 190}
                y2={200 + Math.sin(angle) * 190}
              />
            );
          })}
          
          {/* Petal shapes */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 200 + Math.cos(angle) * 120;
            const y = 200 + Math.sin(angle) * 120;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="15" />
                <circle cx={x} cy={y} r="6" fill="currentColor" />
              </g>
            );
          })}
          
          {/* Center */}
          <circle cx="200" cy="200" r="20" fill="currentColor" />
          <circle cx="200" cy="200" r="10" fill="var(--background)" />
          <circle cx="200" cy="200" r="5" fill="currentColor" />
        </g>
      </svg>
    ),
  };

  return <>{patterns[variant]}</>;
}

// Background pattern for sections
export function MentawaiPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity: 0.03 }}
    >
      <defs>
        <pattern id="mentawai-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </pattern>
        <pattern id="mentawai-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mentawai-dots)" />
      <rect width="100%" height="100%" fill="url(#mentawai-lines)" />
    </svg>
  );
}
