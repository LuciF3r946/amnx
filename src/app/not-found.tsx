'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { Home, ArrowLeft, Navigation, Compass } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="relative mb-6"
                        animate={{
                            rotate: [0, -5, 0, 5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Compass className="h-24 w-24 text-primary/30 mx-auto" />
                    </motion.div>
                    <div className="text-8xl md:text-9xl font-bold text-primary/10 mb-2 tracking-tighter relative">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Lost in the Digital Void
                        </h1>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent w-1/2 mx-auto animate-pulse-slow"></div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">
                        Page Not Found
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild className="relative overflow-hidden group">
                            <Link href="/" className="flex items-center">
                                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 transform group-hover:scale-105 transition-transform duration-300"></span>
                                <span className="relative z-10 flex items-center">
                                    <Home className="h-4 w-4 mr-2" />
                                    Go Home
                                </span>
                            </Link>
                        </Button>

                    </div>
                    <motion.div
                        className="mt-12 text-xs text-gray-400 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Navigation className="h-3 w-3 mr-1" />
                        <span>Error code: 404 - Page not found</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
