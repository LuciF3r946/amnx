'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config'

interface SectionProps {
    children: React.ReactNode
    className?: string
    id?: string
    animate?: boolean
    delay?: number
}

export function Section({
    children,
    className = '',
    id,
    animate = true,
    delay = 0
}: SectionProps) {
    const sectionVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: ANIMATION_CONFIG.duration.normal,
                ease: ANIMATION_CONFIG.ease.out,
                delay
            }
        }
    }

    if (!animate) {
        return (
            <section id={id} className={className}>
                {children}
            </section>
        )
    }

    return (
        <motion.section
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={sectionVariants}
            className={className}
        >
            {children}
        </motion.section>
    )
}

interface ContainerProps {
    children: React.ReactNode
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({
    children,
    className = '',
    size = 'xl'
}: ContainerProps) {
    const sizeClasses = {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-none'
    }

    return (
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
            {children}
        </div>
    )
}
