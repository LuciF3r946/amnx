'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/lib/scroll-animations'

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up'
}: ScrollRevealProps) {
    useScrollReveal()

    const variants = {
        up: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
        },
        down: {
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 }
        },
        left: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
        },
        right: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants[direction]}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface StaggerContainerProps {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({
    children,
    className = '',
    direction = 'up'
}: {
    children: React.ReactNode
    className?: string
    direction?: 'up' | 'left' | 'right' | 'scale'
}) {
    const variants = {
        up: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        left: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
        },
        right: {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
        }
    }

    return (
        <motion.div
            variants={variants[direction]}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
