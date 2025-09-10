/**
 * Performance Optimization Utilities
 * 
 * Clean, type-safe utilities to improve application performance
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react'

/**
 * Creates a lazy-loaded component
 */
export function createLazyComponent<T extends ComponentType<unknown>>(
    importFn: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
    return lazy(importFn)
}

/**
 * Preload a component for better performance
 */
export function preloadComponent(importFn: () => Promise<unknown>): void {
    const componentImport = importFn()
    componentImport.catch(() => {
        // Preload failed silently
    })
}

/**
 * Debounce function for expensive operations
 */
export function debounce(func: () => void, delay: number): () => void {
    let timeoutId: NodeJS.Timeout

    return () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(), delay)
    }
}

/**
 * Throttle function for scroll events
 */
export function throttle(func: () => void, limit: number): () => void {
    let inThrottle: boolean
    return () => {
        if (!inThrottle) {
            func()
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

/**
 * Performance monitoring utilities
 */
export const performanceMonitor = {
    mark: (name: string) => {
        if (typeof window !== 'undefined' && window.performance) {
            window.performance.mark(`${name}-start`)
        }
    },

    measure: (name: string) => {
        if (typeof window !== 'undefined' && window.performance) {
            window.performance.mark(`${name}-end`)
            window.performance.measure(name, `${name}-start`, `${name}-end`)

            const measures = window.performance.getEntriesByName(name)
            if (measures.length > 0) {
                const measure = measures[measures.length - 1]
                console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
            }
        }
    }
}

/**
 * Bundle optimization utilities
 */
export const bundleOptimizer = {
    prefetch: (urls: string[]) => {
        if (typeof window === 'undefined') return

        urls.forEach(url => {
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.href = url
            document.head.appendChild(link)
        })
    },

    preload: (urls: string[], as: string = 'script') => {
        if (typeof window === 'undefined') return

        urls.forEach(url => {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.href = url
            link.as = as
            document.head.appendChild(link)
        })
    }
}
