'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TattooVisual } from './tattoo-visual'

interface SmartImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  fallbackPattern?: 'warrior' | 'forest' | 'river' | 'spirit' | 'lineage' | 'protection'
  showLabel?: boolean
  label?: string
  category?: string
  noOverlay?: boolean
  noGrade?: boolean
}

export function SmartImage({
  src, alt, fill, width, height,
  className, style, priority,
  fallbackPattern = 'warrior',
  showLabel, label, category,
  noOverlay = false,
  noGrade = false,
}: SmartImageProps) {
  const [error, setError] = useState(false)

  if (!src || error) {
    const variantMap = {
      warrior: 'pattern1' as const,
      forest: 'pattern2' as const,
      river: 'pattern3' as const,
      spirit: 'pattern4' as const,
      lineage: 'pattern5' as const,
      protection: 'pattern6' as const,
    }
    return (
      <TattooVisual
        variant={variantMap[fallbackPattern as keyof typeof variantMap] || 'pattern1'}
        className={className}
      />
    )
  }

  if (fill) {
    return (
      <>
        <Image
          src={src}
          alt={alt}
          fill
          className={`${className || ''} ${noGrade ? '' : 'image-color-grade'}`.trim()}
          onError={() => setError(true)}
          priority={priority}
          loading={priority ? 'eager' : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', ...style }}
        />
        {!noOverlay && <div className="absolute inset-0 image-overlay pointer-events-none" />}
      </>
    )
  }

  return (
    <div className="relative inline-flex overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={`${className || ''} image-color-grade`.trim()}
        onError={() => setError(true)}
        priority={priority}
        loading={priority ? 'eager' : undefined}
        sizes={priority ? undefined : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={style}
      />
      <div className="absolute inset-0 image-overlay pointer-events-none" />
    </div>
  )
}
