"use client";

interface TattooVisualProps {
  variant?:
    | "pattern1" | "pattern2" | "pattern3" | "pattern4" | "pattern5" | "pattern6"
    | "mandala"
    | "titiDotwork" | "hookSpiral" | "bandChevron" | "sectionBorder";
  className?: string;
  opacity?: number;
}

export function TattooVisual({
  variant = "pattern1",
  className = "",
  opacity = 0.15,
}: TattooVisualProps) {
  const patterns: Record<string, React.ReactNode> = {

    /* ── NEW: Authentic Mentawai Titi Dotwork ── */
    titiDotwork: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="0.5">
          {/* Outer border double-rule */}
          <rect x="4" y="4" width="192" height="192" />
          <rect x="8" y="8" width="184" height="184" />

          {/* Horizontal chevron bands */}
          {[30, 60, 90, 120, 150].map((y, bi) =>
            Array.from({ length: 13 }).map((_, i) => {
              const x = i * 16;
              return (
                <path
                  key={`${bi}-${i}`}
                  d={`M${x} ${y - 5} L${x + 8} ${y} L${x + 16} ${y - 5}`}
                  strokeWidth="0.6"
                />
              );
            })
          )}

          {/* Dotwork grid */}
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`d-${row}-${col}`}
                cx={16 + col * 18}
                cy={16 + row * 18}
                r="1.2"
                fill="currentColor"
                stroke="none"
              />
            ))
          )}

          {/* Cross-hatch lines — vertical */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={22 + i * 18} y1="12" x2={22 + i * 18} y2="188" strokeWidth="0.3" />
          ))}
        </g>
      </svg>
    ),

    /* ── NEW: Hook Spiral (Sipatiti motif) ── */
    hookSpiral: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="0.7">
          {/* Central spiral hooks — 3×3 grid */}
          {[[50, 50], [100, 50], [150, 50],
            [50, 100], [100, 100], [150, 100],
            [50, 150], [100, 150], [150, 150]].map(([cx, cy], i) => (
            <g key={i}>
              <path d={`M${cx - 15} ${cy} Q${cx} ${cy - 15} ${cx + 15} ${cy} Q${cx} ${cy + 15} ${cx - 15} ${cy}`} />
              <circle cx={cx} cy={cy} r="3" fill="currentColor" stroke="none" />
              {/* Hook tail */}
              <path d={`M${cx + 15} ${cy} Q${cx + 22} ${cy - 8} ${cx + 18} ${cy - 18}`} strokeWidth="0.5" />
            </g>
          ))}
          {/* Corner marks */}
          <line x1="5" y1="5" x2="20" y2="5" strokeWidth="0.5" />
          <line x1="5" y1="5" x2="5" y2="20" strokeWidth="0.5" />
          <line x1="195" y1="5" x2="180" y2="5" strokeWidth="0.5" />
          <line x1="195" y1="5" x2="195" y2="20" strokeWidth="0.5" />
          <line x1="5" y1="195" x2="20" y2="195" strokeWidth="0.5" />
          <line x1="5" y1="195" x2="5" y2="180" strokeWidth="0.5" />
          <line x1="195" y1="195" x2="180" y2="195" strokeWidth="0.5" />
          <line x1="195" y1="195" x2="195" y2="180" strokeWidth="0.5" />
        </g>
      </svg>
    ),

    /* ── NEW: Horizontal Band Chevron ── */
    bandChevron: (
      <svg viewBox="0 0 400 40" className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor">
          {/* Top + bottom rules */}
          <line x1="0" y1="2" x2="400" y2="2" strokeWidth="0.75" />
          <line x1="0" y1="38" x2="400" y2="38" strokeWidth="0.75" />
          <line x1="0" y1="5" x2="400" y2="5" strokeWidth="0.3" />
          <line x1="0" y1="35" x2="400" y2="35" strokeWidth="0.3" />

          {/* Alternating up/down chevrons */}
          {Array.from({ length: 27 }).map((_, i) => {
            const x = i * 15;
            return (
              <g key={i}>
                <path d={`M${x} 9 L${x + 7.5} 19 L${x + 15} 9`} strokeWidth="0.6" fill="none" />
                <path d={`M${x} 31 L${x + 7.5} 21 L${x + 15} 31`} strokeWidth="0.6" fill="none" />
              </g>
            );
          })}

          {/* Center dot row */}
          {Array.from({ length: 80 }).map((_, i) => (
            <circle key={i} cx={i * 5 + 2.5} cy="20" r="0.8" fill="currentColor" stroke="none" />
          ))}
        </g>
      </svg>
    ),

    /* ── NEW: Tall Section Border (left/right edge ornament) ── */
    sectionBorder: (
      <svg viewBox="0 0 24 400" className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="0.6">
          <line x1="12" y1="0" x2="12" y2="400" strokeWidth="0.4" />
          <line x1="8" y1="0" x2="8" y2="400" strokeWidth="0.2" />
          {/* Chevrons along the line */}
          {Array.from({ length: 25 }).map((_, i) => {
            const y = i * 16 + 8;
            return (
              <g key={i}>
                <path d={`M6 ${y - 4} L12 ${y} L6 ${y + 4}`} fill="none" />
              </g>
            );
          })}
          {/* Dots */}
          {Array.from({ length: 13 }).map((_, i) => (
            <circle key={i} cx="19" cy={i * 32 + 8} r="1.2" fill="currentColor" stroke="none" />
          ))}
        </g>
      </svg>
    ),

    /* ── ORIGINAL patterns (kept intact) ── */
    pattern1: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          <path d="M100 20 L180 100 L100 180 L20 100 Z" />
          <path d="M100 40 L160 100 L100 160 L40 100 Z" />
          <path d="M100 60 L140 100 L100 140 L60 100 Z" />
          <line x1="100" y1="0" x2="100" y2="200" />
          <line x1="0" y1="100" x2="200" y2="100" />
          <circle cx="100" cy="100" r="8" fill="currentColor" />
          <circle cx="100" cy="20" r="4" />
          <circle cx="180" cy="100" r="4" />
          <circle cx="100" cy="180" r="4" />
          <circle cx="20" cy="100" r="4" />
          {[30, 50, 70, 130, 150, 170].map((y) =>
            [30, 50, 70, 130, 150, 170].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" />
            ))
          )}
        </g>
      </svg>
    ),
    pattern2: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          <path d="M100 10 L90 30 M100 10 L110 30" />
          <path d="M100 190 L90 170 M100 190 L110 170" />
          <line x1="100" y1="30" x2="100" y2="170" />
          <path d="M10 100 L30 90 M10 100 L30 110" />
          <path d="M190 100 L170 90 M190 100 L170 110" />
          <line x1="30" y1="100" x2="170" y2="100" />
          {[40, 60, 80, 120, 140, 160].map((pos) => (
            <g key={pos}>
              <path d={`M${pos} 40 L${pos + 10} 50 L${pos} 60`} />
              <path d={`M${pos} 140 L${pos + 10} 150 L${pos} 160`} />
            </g>
          ))}
          <rect x="90" y="90" width="20" height="20" />
          <circle cx="100" cy="100" r="5" fill="currentColor" />
        </g>
      </svg>
    ),
    pattern3: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          {[20, 35, 50, 65, 80].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} />
          ))}
          <path d="M100 100 Q120 80 140 100 Q160 120 140 140 Q120 160 100 140 Q80 120 100 100" />
          <path d="M20 20 Q30 30 20 40 Q10 50 20 60" />
          <path d="M180 20 Q170 30 180 40 Q190 50 180 60" />
          <path d="M20 140 Q30 150 20 160 Q10 170 20 180" />
          <path d="M180 140 Q170 150 180 160 Q190 170 180 180" />
          <circle cx="100" cy="100" r="6" fill="currentColor" />
        </g>
      </svg>
    ),
    pattern4: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          <path d="M20 180 Q60 160 80 120 Q100 80 140 60 Q180 40 180 20" strokeWidth="1.5" />
          <path d="M30 180 Q70 160 90 120 Q110 80 150 60 Q180 50 180 30" strokeWidth="0.5" />
          {[[40, 160], [70, 130], [100, 100], [130, 70], [160, 40]].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="4" ry="6" fill="currentColor" />
              <ellipse cx={x + 8} cy={y + 5} rx="3" ry="5" fill="currentColor" />
            </g>
          ))}
          <path d="M170 30 L180 20 L175 35" fill="currentColor" />
          <rect x="10" y="10" width="180" height="180" />
        </g>
      </svg>
    ),
    pattern5: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          <ellipse cx="100" cy="100" rx="50" ry="30" />
          <ellipse cx="100" cy="100" rx="30" ry="18" />
          <circle cx="100" cy="100" r="12" fill="currentColor" />
          <circle cx="96" cy="96" r="4" fill="var(--background)" />
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
          <path d="M20 20 Q25 35 20 50 Q30 45 35 55" />
          <path d="M180 20 Q175 35 180 50 Q170 45 165 55" />
          <path d="M20 180 Q25 165 20 150 Q30 155 35 145" />
          <path d="M180 180 Q175 165 180 150 Q170 155 165 145" />
        </g>
      </svg>
    ),
    pattern6: (
      <svg viewBox="0 0 200 200" className={className} style={{ opacity }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.75">
          <line x1="100" y1="60" x2="100" y2="180" strokeWidth="2" />
          <path d="M100 80 Q80 70 60 80 Q50 85 40 80" />
          <path d="M100 80 Q120 70 140 80 Q150 85 160 80" />
          <path d="M100 100 Q85 95 70 100" />
          <path d="M100 100 Q115 95 130 100" />
          <path d="M100 180 Q80 190 60 185 Q50 183 40 190" strokeWidth="1.5" />
          <path d="M100 180 Q120 190 140 185 Q150 183 160 190" strokeWidth="1.5" />
          <path d="M100 180 Q90 195 85 200" />
          <path d="M100 180 Q110 195 115 200" />
          {[[40, 75], [60, 85], [140, 85], [160, 75], [70, 95], [130, 95]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="currentColor" />
          ))}
          <circle cx="100" cy="30" r="15" />
          <circle cx="100" cy="30" r="8" fill="currentColor" />
        </g>
      </svg>
    ),

    mandala: (
      <svg viewBox="0 0 400 400" className={className} style={{ opacity }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="0.5">
          {[30, 55, 80, 110, 140, 170, 190].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} />
          ))}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={200 + Math.cos(angle) * 30}
                y1={200 + Math.sin(angle) * 30}
                x2={200 + Math.cos(angle) * 190}
                y2={200 + Math.sin(angle) * 190}
                strokeWidth="0.35"
              />
            );
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 200 + Math.cos(angle) * 120;
            const y = 200 + Math.sin(angle) * 120;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="14" />
                <circle cx={x} cy={y} r="5" fill="currentColor" />
              </g>
            );
          })}
          {/* Chevron ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const r1 = 62, r2 = 75;
            const x1 = 200 + Math.cos(angle) * r1;
            const y1 = 200 + Math.sin(angle) * r1;
            const x2 = 200 + Math.cos(angle + 0.13) * r2;
            const y2 = 200 + Math.sin(angle + 0.13) * r2;
            const x3 = 200 + Math.cos(angle + 0.26) * r1;
            const y3 = 200 + Math.sin(angle + 0.26) * r1;
            return (
              <path key={i} d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`} strokeWidth="0.5" fill="none" />
            );
          })}
          <circle cx="200" cy="200" r="22" fill="currentColor" />
          <circle cx="200" cy="200" r="12" fill="var(--background)" />
          <circle cx="200" cy="200" r="5" fill="currentColor" />
        </g>
      </svg>
    ),
  };

  return <>{patterns[variant]}</>;
}

/* ─────────────────────────────────────────────
   Background pattern for sections — authentic titi geometry
───────────────────────────────────────────── */
export function MentawaiPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      preserveAspectRatio="none"
      style={{ opacity: 0.035 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="mentawai-titi" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="currentColor" />
          <circle cx="0" cy="0" r="0.6" fill="currentColor" />
          <circle cx="20" cy="0" r="0.6" fill="currentColor" />
          <circle cx="0" cy="20" r="0.6" fill="currentColor" />
          <circle cx="20" cy="20" r="0.6" fill="currentColor" />
          <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.3" />
          <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
        <pattern id="mentawai-chevron" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 L10 0 L20 6" stroke="currentColor" strokeWidth="0.4" fill="none" />
          <path d="M0 12 L10 6 L20 12" stroke="currentColor" strokeWidth="0.3" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mentawai-titi)" />
    </svg>
  );
}
