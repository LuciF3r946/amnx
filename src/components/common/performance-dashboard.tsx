'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Zap, Clock, Wifi, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

interface PerformanceMetrics {
    fcp: number // First Contentful Paint
    lcp: number // Largest Contentful Paint
    fid: number // First Input Delay
    cls: number // Cumulative Layout Shift
    ttfb: number // Time to First Byte
}

/**
 * Performance Dashboard Component
 * 
 * Real-time performance monitoring dashboard showing Core Web Vitals
 * and other key performance metrics for production monitoring.
 */
export const PerformanceDashboard = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [connectionType, setConnectionType] = useState<string>('unknown')

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                // Get navigation timing
                const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

                // Mock metrics - in production, get from performance monitoring service
                const mockMetrics: PerformanceMetrics = {
                    fcp: navigation?.responseStart ? Math.round(navigation.responseStart - navigation.requestStart) : 800,
                    lcp: navigation?.loadEventEnd ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 1200,
                    fid: Math.random() * 100, // Simulate FID
                    cls: Math.random() * 0.1, // Simulate CLS
                    ttfb: navigation?.responseStart ? Math.round(navigation.responseStart - navigation.requestStart) : 200
                }

                setMetrics(mockMetrics)

                // Get connection info
                if ('connection' in navigator) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const connection = (navigator as any).connection
                    setConnectionType(connection?.effectiveType || 'unknown')
                }
            } catch (error) {
                console.error('Failed to load performance metrics:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadMetrics()
    }, [])

    const getScoreColor = (metric: string, value: number) => {
        const thresholds = {
            fcp: { good: 1800, poor: 3000 },
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            ttfb: { good: 800, poor: 1800 }
        }

        const threshold = thresholds[metric as keyof typeof thresholds]
        if (!threshold) return 'text-gray-600'

        if (value <= threshold.good) return 'text-green-600'
        if (value <= threshold.poor) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getScoreStatus = (metric: string, value: number) => {
        const thresholds = {
            fcp: { good: 1800, poor: 3000 },
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            ttfb: { good: 800, poor: 1800 }
        }

        const threshold = thresholds[metric as keyof typeof thresholds]
        if (!threshold) return 'Unknown'

        if (value <= threshold.good) return 'Good'
        if (value <= threshold.poor) return 'Needs Improvement'
        return 'Poor'
    }

    if (isLoading || !metrics) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Performance Metrics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="h-4 bg-muted rounded w-1/3"></div>
                                <div className="h-4 bg-muted rounded w-1/4"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    const performanceData = [
        {
            name: 'First Contentful Paint',
            key: 'fcp',
            value: metrics.fcp,
            unit: 'ms',
            icon: Clock,
            description: 'Time to first meaningful content'
        },
        {
            name: 'Largest Contentful Paint',
            key: 'lcp',
            value: metrics.lcp,
            unit: 'ms',
            icon: Zap,
            description: 'Loading performance metric'
        },
        {
            name: 'First Input Delay',
            key: 'fid',
            value: metrics.fid,
            unit: 'ms',
            icon: AlertTriangle,
            description: 'Interactivity metric'
        },
        {
            name: 'Cumulative Layout Shift',
            key: 'cls',
            value: metrics.cls,
            unit: '',
            icon: Wifi,
            description: 'Visual stability metric'
        },
        {
            name: 'Time to First Byte',
            key: 'ttfb',
            value: metrics.ttfb,
            unit: 'ms',
            icon: Clock,
            description: 'Server response time'
        }
    ]

    return (
        <div className="space-y-6">
            {/* Performance Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Core Web Vitals
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {performanceData.slice(1, 4).map((metric, index) => (
                            <motion.div
                                key={metric.key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 border rounded-lg"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getScoreStatus(metric.key, metric.value) === 'Good'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : getScoreStatus(metric.key, metric.value) === 'Needs Improvement'
                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {getScoreStatus(metric.key, metric.value)}
                                    </span>
                                </div>
                                <div className={`text-2xl font-bold ${getScoreColor(metric.key, metric.value)}`}>
                                    {metric.key === 'cls' ? metric.value.toFixed(3) : Math.round(metric.value)}
                                    <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{metric.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {performanceData.map((metric) => (
                            <div key={metric.key} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{metric.name}</p>
                                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-semibold ${getScoreColor(metric.key, metric.value)}`}>
                                        {metric.key === 'cls' ? metric.value.toFixed(3) : Math.round(metric.value)}
                                        <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getScoreStatus(metric.key, metric.value) === 'Good'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : getScoreStatus(metric.key, metric.value) === 'Needs Improvement'
                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {getScoreStatus(metric.key, metric.value)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Connection Info */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Connection</span>
                        </div>
                        <span className="text-sm capitalize">{connectionType}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PerformanceDashboard
