/**
 * Performance Monitoring Utilities
 * 
 * Production-ready performance monitoring and metrics collection.
 * Includes Web Vitals tracking, custom performance markers,
 * and error reporting capabilities.
 */

import React from 'react'

interface PerformanceMetric {
    name: string
    value: number
    timestamp: number
    url: string
}

interface ErrorReport {
    message: string
    stack?: string
    url: string
    timestamp: number
    userAgent: string
}

interface PerformanceEntryWithDetails extends PerformanceEntry {
    processingStart?: number
    hadRecentInput?: boolean
    value?: number
}

class PerformanceMonitor {
    private metrics: PerformanceMetric[] = []
    private errors: ErrorReport[] = []
    private isProduction = process.env.NODE_ENV === 'production'

    constructor() {
        if (typeof window !== 'undefined') {
            this.initializeMonitoring()
        }
    }

    /**
     * Initialize performance monitoring
     */
    private initializeMonitoring() {
        // Monitor Web Vitals
        this.monitorWebVitals()

        // Monitor errors
        this.monitorErrors()

        // Monitor navigation timing
        this.monitorNavigation()

        // Send metrics periodically in production
        if (this.isProduction) {
            setInterval(() => this.sendMetrics(), 30000) // Every 30 seconds
        }
    }

    /**
     * Monitor Core Web Vitals
     */
    private monitorWebVitals() {
        // Largest Contentful Paint (LCP)
        this.observePerformanceEntries('largest-contentful-paint', (entries) => {
            const lastEntry = entries[entries.length - 1]
            this.recordMetric('LCP', lastEntry.startTime)
        })

        // First Input Delay (FID)
        this.observePerformanceEntries('first-input', (entries) => {
            const firstEntry = entries[0] as PerformanceEntryWithDetails
            if (firstEntry.processingStart) {
                this.recordMetric('FID', firstEntry.processingStart - firstEntry.startTime)
            }
        })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        this.observePerformanceEntries('layout-shift', (entries) => {
            entries.forEach((entry) => {
                const layoutEntry = entry as PerformanceEntryWithDetails
                if (!layoutEntry.hadRecentInput && layoutEntry.value) {
                    clsValue += layoutEntry.value
                }
            })
            this.recordMetric('CLS', clsValue)
        })
    }

    /**
     * Monitor JavaScript errors
     */
    private monitorErrors() {
        window.addEventListener('error', (event) => {
            this.recordError({
                message: event.message,
                stack: event.error?.stack,
                url: window.location.href,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            })
        })

        window.addEventListener('unhandledrejection', (event) => {
            this.recordError({
                message: `Unhandled Promise Rejection: ${event.reason}`,
                url: window.location.href,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            })
        })
    }

    /**
     * Monitor navigation timing
     */
    private monitorNavigation() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

                if (navigation) {
                    this.recordMetric('TTFB', navigation.responseStart - navigation.requestStart)
                    this.recordMetric('Load', navigation.loadEventEnd - navigation.fetchStart)
                    this.recordMetric('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.fetchStart)
                }
            }, 0)
        })
    }

    /**
     * Observe performance entries
     */
    private observePerformanceEntries(entryType: string, callback: (entries: PerformanceEntry[]) => void) {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    callback(list.getEntries())
                })
                observer.observe({ entryTypes: [entryType] })
            } catch (error) {
                console.warn(`Failed to observe ${entryType}:`, error)
            }
        }
    }

    /**
     * Record a performance metric
     */
    public recordMetric(name: string, value: number) {
        const metric: PerformanceMetric = {
            name,
            value: Math.round(value),
            timestamp: Date.now(),
            url: window.location.href
        }

        this.metrics.push(metric)

        // Log in development
        if (!this.isProduction) {
            console.log(`Performance Metric - ${name}: ${value}ms`)
        }

        // Keep only last 100 metrics
        if (this.metrics.length > 100) {
            this.metrics = this.metrics.slice(-50)
        }
    }

    /**
     * Record an error
     */
    private recordError(error: ErrorReport) {
        this.errors.push(error)

        // Log in development
        if (!this.isProduction) {
            console.error('Error recorded:', error)
        }

        // Keep only last 50 errors
        if (this.errors.length > 50) {
            this.errors = this.errors.slice(-25)
        }
    }

    /**
     * Mark a custom performance point
     */
    public mark(name: string) {
        if ('performance' in window && 'mark' in performance) {
            performance.mark(name)
        }
    }

    /**
     * Measure time between two marks
     */
    public measure(name: string, startMark: string, endMark?: string) {
        if ('performance' in window && 'measure' in performance) {
            try {
                if (endMark) {
                    performance.measure(name, startMark, endMark)
                } else {
                    performance.measure(name, startMark)
                }

                const measures = performance.getEntriesByName(name, 'measure')
                const lastMeasure = measures[measures.length - 1]

                if (lastMeasure) {
                    this.recordMetric(name, lastMeasure.duration)
                }
            } catch (error) {
                console.warn(`Failed to measure ${name}:`, error)
            }
        }
    }

    /**
     * Get all collected metrics
     */
    public getMetrics(): PerformanceMetric[] {
        return [...this.metrics]
    }

    /**
     * Get all collected errors
     */
    public getErrors(): ErrorReport[] {
        return [...this.errors]
    }

    /**
     * Send metrics to analytics service
     */
    private async sendMetrics() {
        if (this.metrics.length === 0 && this.errors.length === 0) return

        try {
            // In production, send to your analytics service
            // Example: Google Analytics, DataDog, New Relic, etc.

            const payload = {
                metrics: this.getMetrics(),
                errors: this.getErrors(),
                timestamp: Date.now(),
                url: window.location.href,
                userAgent: navigator.userAgent
            }

            // Replace with your actual analytics endpoint
            // await fetch('/api/analytics', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(payload)
            // })

            console.log('Metrics would be sent:', payload)

            // Clear sent metrics
            this.metrics = []
            this.errors = []
        } catch (error) {
            console.warn('Failed to send metrics:', error)
        }
    }

    /**
     * Get performance summary
     */
    public getSummary() {
        const recentMetrics = this.metrics.filter(m =>
            Date.now() - m.timestamp < 60000 // Last minute
        )

        const summary = {
            totalMetrics: this.metrics.length,
            recentMetrics: recentMetrics.length,
            totalErrors: this.errors.length,
            averageValues: {} as Record<string, number>
        }

        // Calculate averages for each metric type
        const metricGroups = recentMetrics.reduce((groups, metric) => {
            if (!groups[metric.name]) groups[metric.name] = []
            groups[metric.name].push(metric.value)
            return groups
        }, {} as Record<string, number[]>)

        Object.entries(metricGroups).forEach(([name, values]) => {
            summary.averageValues[name] = Math.round(
                values.reduce((sum, value) => sum + value, 0) / values.length
            )
        })

        return summary
    }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

/**
 * React Hook for performance monitoring
 */
export const usePerformanceMonitoring = () => {
    const mark = (name: string) => performanceMonitor.mark(name)
    const measure = (name: string, startMark: string, endMark?: string) =>
        performanceMonitor.measure(name, startMark, endMark)
    const recordMetric = (name: string, value: number) =>
        performanceMonitor.recordMetric(name, value)

    return { mark, measure, recordMetric }
}

/**
 * Higher-order component for performance monitoring
 */
export const withPerformanceMonitoring = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    componentName: string
) => {
    const PerformanceMonitoredComponent: React.FC<P> = (props: P) => {
        React.useEffect(() => {
            performanceMonitor.mark(`${componentName}-mount-start`)

            return () => {
                performanceMonitor.mark(`${componentName}-unmount`)
                performanceMonitor.measure(
                    `${componentName}-lifecycle`,
                    `${componentName}-mount-start`,
                    `${componentName}-unmount`
                )
            }
        }, [])

        return React.createElement(WrappedComponent, props)
    }

    PerformanceMonitoredComponent.displayName = `withPerformanceMonitoring(${componentName})`

    return PerformanceMonitoredComponent
}

export default performanceMonitor
