'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export const useScrollReveal = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return

        // Initialize scroll-triggered animations
        const revealElements = document.querySelectorAll('.scroll-reveal')
        const revealLeftElements = document.querySelectorAll('.scroll-reveal-left')
        const revealRightElements = document.querySelectorAll('.scroll-reveal-right')

        // Basic reveal animation
        revealElements.forEach((element) => {
            gsap.fromTo(element,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        })

        // Left reveal animation
        revealLeftElements.forEach((element) => {
            gsap.fromTo(element,
                {
                    x: -50,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        })

        // Right reveal animation
        revealRightElements.forEach((element) => {
            gsap.fromTo(element,
                {
                    x: 50,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])
}

export const useParallaxScroll = (elementRef: React.RefObject<HTMLElement>, speed: number = 0.5) => {
    useEffect(() => {
        if (typeof window === 'undefined' || !elementRef.current) return

        const element = elementRef.current

        gsap.to(element, {
            yPercent: -50 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [elementRef, speed])
}

export const useCounterAnimation = (
    elementRef: React.RefObject<HTMLElement>,
    endValue: number,
    duration: number = 2
) => {
    useEffect(() => {
        if (typeof window === 'undefined' || !elementRef.current) return

        const element = elementRef.current
        const obj = { value: 0 }

        gsap.to(obj, {
            value: endValue,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.round(obj.value).toString()
            },
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [elementRef, endValue, duration])
}

export const useMouseFollower = () => {
    const followerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const follower = followerRef.current
        if (!follower) return

        const handleMouseMove = (e: MouseEvent) => {
            gsap.to(follower, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        const handleMouseEnter = () => {
            gsap.to(follower, {
                scale: 1.5,
                opacity: 0.8,
                duration: 0.3
            })
        }

        const handleMouseLeave = () => {
            gsap.to(follower, {
                scale: 1,
                opacity: 0.5,
                duration: 0.3
            })
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return followerRef
}

export const createStaggerAnimation = (
    elements: NodeListOf<Element> | Element[],
    animationProps: gsap.TweenVars & { from?: gsap.TweenVars; to?: gsap.TweenVars },
    stagger: number = 0.1
) => {
    if (typeof window === 'undefined') return

    gsap.fromTo(elements,
        {
            y: 30,
            opacity: 0,
            ...(animationProps.from || {})
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: stagger,
            ...(animationProps.to || {}),
            scrollTrigger: {
                trigger: elements[0] as Element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    )
}
