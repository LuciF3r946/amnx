'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Network Status Monitor Component
 * 
 * Monitors network connectivity and displays offline notifications.
 * Essential for production PWA functionality and user experience.
 */
export const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true)
    const [showOfflineToast, setShowOfflineToast] = useState(false)

    useEffect(() => {
        // Initial state
        setIsOnline(navigator.onLine)

        const handleOnline = () => {
            setIsOnline(true)
            setShowOfflineToast(false)
        }

        const handleOffline = () => {
            setIsOnline(false)
            setShowOfflineToast(true)
        }

        // Add event listeners
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // Cleanup
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    // Auto-hide offline toast after 5 seconds when back online
    useEffect(() => {
        if (isOnline && showOfflineToast) {
            const timer = setTimeout(() => {
                setShowOfflineToast(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isOnline, showOfflineToast])

    return (
        <AnimatePresence>
            {showOfflineToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <Card className={`shadow-lg border-l-4 ${isOnline
                            ? 'border-l-green-500 bg-green-50 dark:bg-green-950'
                            : 'border-l-orange-500 bg-orange-50 dark:bg-orange-950'
                        }`}>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${isOnline
                                        ? 'bg-green-100 dark:bg-green-900'
                                        : 'bg-orange-100 dark:bg-orange-900'
                                    }`}>
                                    {isOnline ? (
                                        <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <WifiOff className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className={`font-medium text-sm ${isOnline
                                            ? 'text-green-900 dark:text-green-100'
                                            : 'text-orange-900 dark:text-orange-100'
                                        }`}>
                                        {isOnline ? 'Back Online' : 'No Internet Connection'}
                                    </p>
                                    <p className={`text-xs ${isOnline
                                            ? 'text-green-700 dark:text-green-300'
                                            : 'text-orange-700 dark:text-orange-300'
                                        }`}>
                                        {isOnline
                                            ? 'Connection restored'
                                            : 'Some features may not work'
                                        }
                                    </p>
                                </div>
                                {!isOnline && (
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="p-1.5 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                                        title="Retry connection"
                                    >
                                        <RefreshCw className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/**
 * Simple Network Status Indicator
 * For use in headers or navigation bars
 */
export const NetworkStatusIndicator = () => {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        setIsOnline(navigator.onLine)

        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    if (isOnline) return null

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <WifiOff className="h-3 w-3 text-orange-600" />
            <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                Offline
            </span>
        </div>
    )
}

export default NetworkStatus
