'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ANIMATION_CONFIG } from '@/config'

interface PageLayoutProps {
    children: React.ReactNode
    className?: string
    showPageTransition?: boolean
}

export function PageLayout({
    children,
    className = '',
    showPageTransition = true
}: PageLayoutProps) {
    const pathname = usePathname()

    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20,
            scale: 0.98
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: ANIMATION_CONFIG.duration.normal,
                ease: ANIMATION_CONFIG.ease.out
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 1.02,
            transition: {
                duration: ANIMATION_CONFIG.duration.fast,
                ease: ANIMATION_CONFIG.ease.inOut
            }
        }
    }

    if (!showPageTransition) {
        return (
            <main className={`min-h-screen ${className}`}>
                {children}
            </main>
        )
    }

    return (
        <AnimatePresence mode="wait">
            <motion.main
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                className={`min-h-screen ${className}`}
            >
                {children}
            </motion.main>
        </AnimatePresence>
    )
}
