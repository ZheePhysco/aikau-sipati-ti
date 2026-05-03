"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/image-config";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  const sizes = {
    sm: { img: 40, title: "text-base", subtitle: "text-[10px]" },
    md: { img: 80, title: "text-lg", subtitle: "text-[10px]" },
    lg: { img: 140, title: "text-3xl", subtitle: "text-xs" },
  };

  const s = sizes[size];
  const isSmall = size === "sm";

  return (
    <div className={`flex ${isSmall ? 'flex-row' : 'flex-col'} items-center gap-3 ${className}`}>
      {/* Uploaded Logo Image */}
      <div 
        className="relative overflow-hidden rounded-full border border-accent/20 shrink-0"
        style={{ width: s.img, height: s.img }}
      >
        <Image
          src={IMAGES.logo}
          alt="Aikau Sipati 'ti Logo"
          fill
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className={`flex flex-col ${isSmall ? 'items-start gap-0.5' : 'items-center'}`}>
        <span
          className={`font-serif tracking-[0.15em] text-foreground ${s.title} leading-none`}
        >
          Siolaakenen
        </span>
        <span
          className={`tracking-[0.3em] text-muted ${s.subtitle} font-sans font-light leading-none`}
        >
          Muti'ti
        </span>
        {!isSmall && (
          <span className="mt-1 font-serif text-[10px] italic text-accent opacity-80">
            Come, Get Tattooed
          </span>
        )}
      </div>
    </div>
  );
}
