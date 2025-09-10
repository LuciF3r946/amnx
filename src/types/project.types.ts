// Project-related type definitions
export type ProjectCategory =
    | 'Web Development'
    | 'Mobile App'
    | 'UI/UX Design'
    | 'Full Stack'
    | 'Frontend'
    | 'Backend'
    | 'DevOps'
    | 'Machine Learning'
    | 'Game Development'
    | 'E-commerce'


export interface ProjectMetrics {
    users?: number
    monthlyActive?: number
    revenueARR?: number
    performanceGainPct?: number
    buildTimeReductionPct?: number
    testCoverage?: number
}

export interface RepoStats {
    stars?: number
    forks?: number
    issues?: number
    lastCommit?: string
}

export interface ProjectData {
    id: string
    slug?: string
    title: string
    description: string
    longDescription: string
    image: string
    screenshots?: string[]
    technologies: string[]
    secondaryTechnologies?: string[]
    githubUrl?: string
    liveUrl?: string
    category: ProjectCategory
    featured: boolean
    completedDate: string
    highlights?: string[]
    metrics?: ProjectMetrics
    repoStats?: RepoStats
    features?: string[]
    seoKeywords?: string[]
}
