'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const cursor = cursorRef.current
        const follower = followerRef.current

        if (!cursor || !follower) return

        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0,
                ease: 'power2.out'
            })

            gsap.to(follower, {
                x: mouseX,
                y: mouseY,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseEnterLink = () => {
            gsap.to([cursor, follower], {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseLeaveLink = () => {
            gsap.to([cursor, follower], {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseEnterButton = () => {
            gsap.to(cursor, {
                scale: 0,
                duration: 0.3
            })
            gsap.to(follower, {
                scale: 2,
                duration: 0.3
            })
        }

        const handleMouseLeaveButton = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            })
            gsap.to(follower, {
                scale: 1,
                duration: 0.3
            })
        }

        const handleMouseDown = () => {
            gsap.to([cursor, follower], {
                scale: 0.8,
                duration: 0.1
            })
        }

        const handleMouseUp = () => {
            gsap.to([cursor, follower], {
                scale: 1,
                duration: 0.1
            })
        }

        // Event listeners
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)

        // Link hover effects
        const links = document.querySelectorAll('a, button')
        links.forEach(link => {
            if (link.tagName === 'BUTTON') {
                link.addEventListener('mouseenter', handleMouseEnterButton)
                link.addEventListener('mouseleave', handleMouseLeaveButton)
            } else {
                link.addEventListener('mouseenter', handleMouseEnterLink)
                link.addEventListener('mouseleave', handleMouseLeaveLink)
            }
        })

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)

            links.forEach(link => {
                if (link.tagName === 'BUTTON') {
                    link.removeEventListener('mouseenter', handleMouseEnterButton)
                    link.removeEventListener('mouseleave', handleMouseLeaveButton)
                } else {
                    link.removeEventListener('mouseenter', handleMouseEnterLink)
                    link.removeEventListener('mouseleave', handleMouseLeaveLink)
                }
            })
        }
    }, [])

    // Don't render on mobile devices
    useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (isMobile) {
            if (cursorRef.current) cursorRef.current.style.display = 'none'
            if (followerRef.current) followerRef.current.style.display = 'none'
        }
    }, [])

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference cursor-dot"
            />

            {/* Cursor follower */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998] mix-blend-difference cursor-follower"
            />
        </>
    )
}
