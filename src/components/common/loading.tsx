'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-8">
            <motion.div
                className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}

export function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
    )
}
