'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

/**
 * Production Error Boundary Component
 * 
 * Catches JavaScript errors in the component tree and displays
 * a fallback UI instead of crashing the entire application.
 * Essential for production stability.
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to monitoring service in production
        console.error('Error Boundary caught an error:', error, errorInfo)

        // In production, you might want to send this to an error reporting service
        // Example: Sentry.captureException(error, { contexts: { errorInfo } })
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <Card className="max-w-md w-full">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
                                <AlertTriangle className="h-8 w-8 text-destructive" />
                            </div>
                            <CardTitle className="text-xl">Something went wrong</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <p className="text-muted-foreground">
                                We encountered an unexpected error. Please try refreshing the page.
                            </p>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="text-left bg-muted p-4 rounded-lg">
                                    <summary className="cursor-pointer font-medium">Error Details</summary>
                                    <pre className="mt-2 text-xs overflow-auto">
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            )}
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={this.handleReset}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Try Again
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                                >
                                    Refresh Page
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}

/**
 * Simple Error Fallback Component
 * For use in smaller sections where a full-page error is too much
 */
export const ErrorFallback: React.FC<{ error?: Error; reset?: () => void }> = ({
    error,
    reset
}) => (
    <div className="p-6 text-center space-y-4 border border-destructive/20 rounded-lg bg-destructive/5">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
        <div>
            <h3 className="font-semibold">Something went wrong</h3>
            <p className="text-sm text-muted-foreground mt-1">
                {error?.message || 'An unexpected error occurred'}
            </p>
        </div>
        {reset && (
            <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
                <RefreshCw className="h-3 w-3" />
                Try Again
            </button>
        )}
    </div>
)

export default ErrorBoundary
