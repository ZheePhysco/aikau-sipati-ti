// components/Loader.tsx
'use client'
import { useEffect, useState } from 'react'

export function Loader() {
    const [hidden, setHidden] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Animasi progress bar
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(interval); return 100 }
                return p + 2
            })
        }, 36)

        // Sembunyikan setelah selesai
        const timer = setTimeout(() => setHidden(true), 2200)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [])

    if (hidden) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            backgroundColor: '#0D0C0A',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 16,
            opacity: hidden ? 0 : 1,
            transition: 'opacity 0.8s ease',
        }}>
            {/* Logo */}
            <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 22, color: '#F5EFE6',
                letterSpacing: '0.04em',
            }}>
                Siolaakenen Muti'ti
            </span>

            {/* Progress bar */}
            <div style={{
                width: 120, height: 1,
                backgroundColor: '#2A2720',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0,
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: '#C9A84C',
                    transition: 'width 0.1s linear',
                }} />
            </div>

            {/* Label */}
            <span style={{
                fontSize: 9, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#6B6158',
            }}>
                Loading
            </span>
        </div>
    )
}