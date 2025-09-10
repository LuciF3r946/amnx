/**
 * Common Utility Components
 * 
 * Shared components that provide common functionality
 * across multiple features and pages.
 */

// Error handling
export { default as ErrorBoundary, ErrorFallback } from './error-boundary'

// Navigation utilities
export { BackToTop } from './back-to-top'

// Theme management
export { ThemeToggle } from './theme-toggle'

// Loading states
export { LoadingSkeleton, LoadingSpinner } from './loading'

// Interactive elements
export { CustomCursor } from './custom-cursor'

// UI demonstrations
export { ScrollbarShowcase } from './scrollbar-showcase'

// Production monitoring
export { default as NetworkStatus, NetworkStatusIndicator } from './network-status'
export { default as AnalyticsDashboard, AnalyticsWidget } from './analytics-dashboard'
export { default as PerformanceDashboard } from './performance-dashboard'
