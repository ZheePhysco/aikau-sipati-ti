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
  priority?: boolean
  fallbackPattern?: 'warrior' | 'forest' | 'river' | 'spirit' | 'lineage' | 'protection'
  showLabel?: boolean
  label?: string
  category?: string
}

export function SmartImage({
  src, alt, fill, width, height,
  className, priority,
  fallbackPattern = 'warrior',
  showLabel, label, category,
}: SmartImageProps) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <TattooVisual
        pattern={fallbackPattern}
        className={className}
        label={showLabel ? label : undefined}
        category={showLabel ? category : undefined}
      />
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        onError={() => setError(true)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  )
}
