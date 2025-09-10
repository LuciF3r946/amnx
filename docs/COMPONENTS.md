'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ExploreButtonProps {
    href: string
    className?: string
    children?: React.ReactNode
}

export function ExploreButton({ href, className, children = 'Explore' }: ExploreButtonProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative"
        >
            {/*Glow effect on hover*/}
            <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-600/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3, ease: "easeOut" }}
            />

            <Link
                href={href}
                className={cn(
                    // Base styles matching your theme
                    'group relative inline-flex items-center gap-3 px-8 py-4',
                    // Modern styling to match your project theme
                    'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90',
                    'text-primary-foreground font-semibold text-lg',
                    // Shape and effects
                    'rounded-2xl border border-primary/20',
                    'shadow-lg hover:shadow-primary/20 hover:shadow-2xl',
                    // Smooth transitions
                    'transition-all duration-300 ease-out',
                    // Backdrop blur for modern look
                    'backdrop-blur-sm',
                    // Focus states for accessibility
                    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                    className
                )}
            >
                {/* Animated compass/explore icon */}
                <motion.svg
                    className="w-6 h-6 transition-all duration-500 ease-out group-hover:rotate-[360deg] group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                </motion.svg>

                {/* Button text */}
                <span className="relative z-10">
                    {children}
                </span>

                {/* Arrow indicator */}
                <motion.svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                    }}
                />
            </Link>
        </motion.div>
    )
}
