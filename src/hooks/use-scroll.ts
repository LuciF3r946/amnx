import { useState, useEffect } from 'react'

export interface ScrollState {
    scrollY: number
    scrollDirection: 'up' | 'down'
    isAtTop: boolean
    isAtBottom: boolean
}

export function useScroll(): ScrollState {
    const [scrollState, setScrollState] = useState<ScrollState>({
        scrollY: 0,
        scrollDirection: 'down',
        isAtTop: true,
        isAtBottom: false
    })

    useEffect(() => {
        let lastScrollY = window.scrollY
        let ticking = false

        const updateScrollState = () => {
            const scrollY = window.scrollY
            const documentHeight = document.documentElement.scrollHeight
            const windowHeight = window.innerHeight

            setScrollState({
                scrollY,
                scrollDirection: scrollY > lastScrollY ? 'down' : 'up',
                isAtTop: scrollY === 0,
                isAtBottom: scrollY + windowHeight >= documentHeight - 10
            })

            lastScrollY = scrollY
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollState)
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll)
        updateScrollState() // Initialize

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return scrollState
}
