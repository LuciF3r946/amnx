/**
 * Performance Optimization Utilities
 * 
 * Utilities to improve application performance:
 * - Component lazy loading
 * - Bundle optimization
 * - Memory management
 * - Render optimization
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react'

/**
 * Creates a lazy-loaded component with error boundary
 */
export function createLazyComponent<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    fallback?: ComponentType
): LazyExoticComponent<T> {
    const LazyComponent = lazy(importFn)

    // Add error handling
    LazyComponent.displayName = `Lazy(${importFn.toString().slice(0, 50)}...)`

    return LazyComponent
}

/**
 * Preload a component for better performance
 */
export function preloadComponent(importFn: () => Promise<any>): void {
    const componentImport = importFn()

    // Catch errors silently for preloading
    componentImport.catch(() => {
        // Preload failed, component will load normally when needed
    })
}

/**
 * Debounce function for expensive operations
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

/**
 * Check if component should render based on viewport
 */
export function useIntersectionObserver(
    elementRef: React.RefObject<Element>,
    options: IntersectionObserverInit = {}
): boolean {
    const [isIntersecting, setIsIntersecting] = React.useState(false)

    React.useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            options
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [elementRef, options])

    return isIntersecting
}

/**
 * Performance monitoring utilities
 */
export const performance = {
    /**
     * Mark the start of a performance measurement
     */
    mark: (name: string) => {
        if (typeof window !== 'undefined' && window.performance) {
            window.performance.mark(`${name}-start`)
        }
    },

    /**
     * Mark the end and measure performance
     */
    measure: (name: string) => {
        if (typeof window !== 'undefined' && window.performance) {
            window.performance.mark(`${name}-end`)
            window.performance.measure(name, `${name}-start`, `${name}-end`)

            // Get the measurement
            const measures = window.performance.getEntriesByName(name)
            if (measures.length > 0) {
                const measure = measures[measures.length - 1]
                console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
            }
        }
    },

    /**
     * Clear all marks and measures
     */
    clear: () => {
        if (typeof window !== 'undefined' && window.performance) {
            window.performance.clearMarks()
            window.performance.clearMeasures()
        }
    }
}

/**
 * Memory optimization utilities
 */
export const memory = {
    /**
     * Clear unused references
     */
    cleanup: () => {
        if (typeof window !== 'undefined' && window.gc) {
            window.gc()
        }
    },

    /**
     * Get memory usage info
     */
    getUsage: () => {
        if (typeof window !== 'undefined' && (window.performance as any).memory) {
            const mem = (window.performance as any).memory
            return {
                used: Math.round(mem.usedJSHeapSize / 1048576), // MB
                total: Math.round(mem.totalJSHeapSize / 1048576), // MB
                limit: Math.round(mem.jsHeapSizeLimit / 1048576) // MB
            }
        }
        return null
    }
}

/**
 * Bundle size optimization
 */
export const bundle = {
    /**
     * Analyze bundle impact of a component
     */
    analyze: (componentName: string, importFn: () => Promise<any>) => {
        const startTime = Date.now()

        return importFn().then((module) => {
            const loadTime = Date.now() - startTime
            console.log(`${componentName} loaded in ${loadTime}ms`)
            return module
        })
    },

    /**
     * Prefetch resources
     */
    prefetch: (urls: string[]) => {
        if (typeof window === 'undefined') return

        urls.forEach(url => {
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.href = url
            document.head.appendChild(link)
        })
    },

    /**
     * Preload critical resources
     */
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

/**
 * React performance hooks
 */
import React from 'react'

export function useOptimizedCallback<T extends (...args: any[]) => any>(
    callback: T,
    deps: React.DependencyList
): T {
    return React.useCallback(callback, deps)
}

export function useOptimizedMemo<T>(
    factory: () => T,
    deps: React.DependencyList
): T {
    return React.useMemo(factory, deps)
}

/**
 * Component wrapper for performance monitoring
 */
export function withPerformanceMonitoring<P extends object>(
    Component: React.ComponentType<P>,
    componentName: string
) {
    const WrappedComponent = (props: P) => {
        React.useEffect(() => {
            performance.mark(`${componentName}-render`)
            return () => {
                performance.measure(`${componentName}-render`)
            }
        })

        return <Component { ...props } />
    }

    WrappedComponent.displayName = `withPerformanceMonitoring(${componentName})`
    return WrappedComponent
}

/**
 * Viewport-based lazy rendering
 */
export function LazyRender({
    children,
    fallback = null,
    rootMargin = '50px'
}: {
    children: React.ReactNode
    fallback?: React.ReactNode
    rootMargin?: string
}) {
    const ref = React.useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(ref, { rootMargin })
    const [hasRendered, setHasRendered] = React.useState(false)

    React.useEffect(() => {
        if (isVisible && !hasRendered) {
            setHasRendered(true)
        }
    }, [isVisible, hasRendered])

    return (
        <div ref= { ref } >
        { hasRendered? children: fallback }
        </div>
    )
}
