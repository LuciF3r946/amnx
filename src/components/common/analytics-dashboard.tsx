'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui'
import { TrendingUp, Users, Eye, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnalyticsData {
    pageViews: number
    uniqueVisitors: number
    averageSessionTime: string
    topPages: Array<{ path: string; views: number }>
}

/**
 * Analytics Dashboard Component
 * 
 * Displays basic site analytics and performance metrics.
 * Can be integrated with Google Analytics, Plausible, or custom tracking.
 */
export const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate analytics data loading
        // In production, replace with actual analytics API calls
        const loadAnalytics = async () => {
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Mock data - replace with real analytics integration
                const mockData: AnalyticsData = {
                    pageViews: 12847,
                    uniqueVisitors: 8923,
                    averageSessionTime: '2m 34s',
                    topPages: [
                        { path: '/', views: 4521 },
                        { path: '/projects', views: 3892 },
                        { path: '/about', views: 2103 },
                        { path: '/contact', views: 1876 },
                        { path: '/skills', views: 455 }
                    ]
                }

                setAnalyticsData(mockData)
            } catch (error) {
                console.error('Failed to load analytics:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadAnalytics()
    }, [])

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-8 bg-muted rounded w-1/2"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (!analyticsData) {
        return (
            <Card>
                <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Unable to load analytics data</p>
                </CardContent>
            </Card>
        )
    }

    const metrics = [
        {
            label: 'Page Views',
            value: analyticsData.pageViews.toLocaleString(),
            icon: Eye,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900'
        },
        {
            label: 'Unique Visitors',
            value: analyticsData.uniqueVisitors.toLocaleString(),
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900'
        },
        {
            label: 'Avg. Session Time',
            value: analyticsData.averageSessionTime,
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900'
        },
        {
            label: 'Growth Rate',
            value: '+12.5%',
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900'
        }
    ]

    return (
        <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {metric.label}
                                        </p>
                                        <p className="text-2xl font-bold">{metric.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-full ${metric.bgColor}`}>
                                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Top Pages */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
                    <div className="space-y-3">
                        {analyticsData.topPages.map((page, index) => (
                            <div key={page.path} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                    <span className="font-medium">{page.path}</span>
                                </div>
                                <span className="text-muted-foreground">
                                    {page.views.toLocaleString()} views
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

/**
 * Simple Analytics Widget
 * For use in admin panels or dashboards
 */
export const AnalyticsWidget = () => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Analytics</span>
                </div>
                <div className="text-2xl font-bold">8.9K</div>
                <p className="text-sm text-muted-foreground">Total visitors this month</p>
            </CardContent>
        </Card>
    )
}

export default AnalyticsDashboard
