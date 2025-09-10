// Core application types
export * from './project.types'
export * from './ui.types'
export * from './navigation.types'

// Common utility types
export interface BaseEntity {
    id: string
    createdAt?: string
    updatedAt?: string
}

export interface APIResponse<T = unknown> {
    data: T
    message?: string
    success: boolean
}

export interface PaginatedResponse<T = unknown> extends APIResponse<T[]> {
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

export interface SEOMetadata {
    title: string
    description: string
    keywords?: string[]
    image?: string
    url?: string
}

export interface AnimationConfig {
    duration?: number
    delay?: number
    ease?: string
    stagger?: number
}
