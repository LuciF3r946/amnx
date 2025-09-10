/**
 * Development vs Production Environment Utilities
 * 
 * Utilities for detecting environment and enabling development features
 * while maintaining production performance and security.
 */

import React from 'react'

export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

/**
 * Development-only console logging
 */
export const devLog = (...args: unknown[]) => {
    if (isDevelopment) {
        console.log('[DEV]', ...args)
    }
}

export const devWarn = (...args: unknown[]) => {
    if (isDevelopment) {
        console.warn('[DEV]', ...args)
    }
}

export const devError = (...args: unknown[]) => {
    if (isDevelopment) {
        console.error('[DEV]', ...args)
    }
}

/**
 * Production-safe feature flags
 */
export const FEATURE_FLAGS = {
    ENABLE_ANALYTICS: isProduction,
    ENABLE_PERFORMANCE_MONITORING: true,
    ENABLE_ERROR_REPORTING: isProduction,
    ENABLE_DEBUG_PANEL: isDevelopment,
    ENABLE_HOT_RELOAD: isDevelopment,
    ENABLE_SERVICE_WORKER: isProduction
} as const

/**
 * Environment-specific configurations
 */
export const ENV_CONFIG = {
    API_BASE_URL: isDevelopment
        ? 'http://localhost:3000/api'
        : 'https://amnx.dev/api',

    ANALYTICS_ID: isProduction
        ? process.env.NEXT_PUBLIC_GA_ID
        : 'dev-analytics',

    ERROR_REPORTING_DSN: isProduction
        ? process.env.NEXT_PUBLIC_SENTRY_DSN
        : undefined,

    PERFORMANCE_SAMPLE_RATE: isProduction ? 0.1 : 1.0,

    LOG_LEVEL: isDevelopment ? 'debug' : 'error'
} as const

interface NetworkConnection {
    effectiveType?: string
    downlink?: number
    rtt?: number
}

interface NavigatorWithConnection extends Navigator {
    connection?: NetworkConnection
}

/**
 * Runtime environment detection
 */
export const getEnvironmentInfo = () => {
    if (typeof window === 'undefined') {
        return {
            isServer: true,
            isClient: false,
            userAgent: 'server',
            platform: 'server'
        }
    }

    const nav = navigator as NavigatorWithConnection

    return {
        isServer: false,
        isClient: true,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        online: navigator.onLine,
        cookieEnabled: navigator.cookieEnabled,
        language: navigator.language,
        languages: navigator.languages,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        screen: {
            width: window.screen.width,
            height: window.screen.height,
            pixelRatio: window.devicePixelRatio
        },
        connection: nav.connection && {
            effectiveType: nav.connection.effectiveType,
            downlink: nav.connection.downlink,
            rtt: nav.connection.rtt
        }
    }
}

/**
 * Performance utilities
 */
export const measurePerformance = (name: string, fn: () => void | Promise<void>) => {
    if (!isDevelopment) return fn()

    const start = performance.now()
    const result = fn()

    if (result instanceof Promise) {
        return result.finally(() => {
            const end = performance.now()
            devLog(`Performance [${name}]: ${(end - start).toFixed(2)}ms`)
        })
    } else {
        const end = performance.now()
        devLog(`Performance [${name}]: ${(end - start).toFixed(2)}ms`)
        return result
    }
}

/**
 * Safe JSON parsing with fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
    try {
        return JSON.parse(json)
    } catch (error) {
        devWarn('Failed to parse JSON:', error)
        return fallback
    }
}

/**
 * Development-only React component wrapper
 */
export const DevOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isDevelopment) return null
    return React.createElement(React.Fragment, null, children)
}

/**
 * Production-only React component wrapper
 */
export const ProdOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isProduction) return null
    return React.createElement(React.Fragment, null, children)
}

/**
 * Conditional component based on feature flag
 */
export const FeatureFlag: React.FC<{
    flag: keyof typeof FEATURE_FLAGS
    children: React.ReactNode
    fallback?: React.ReactNode
}> = ({ flag, children, fallback = null }) => {
    return FEATURE_FLAGS[flag]
        ? React.createElement(React.Fragment, null, children)
        : React.createElement(React.Fragment, null, fallback)
}

const environmentUtils = {
    isDevelopment,
    isProduction,
    isTest,
    devLog,
    devWarn,
    devError,
    FEATURE_FLAGS,
    ENV_CONFIG,
    getEnvironmentInfo,
    measurePerformance,
    safeJsonParse,
    DevOnly,
    ProdOnly,
    FeatureFlag
}

export default environmentUtils
