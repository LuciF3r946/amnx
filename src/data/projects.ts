// ------------------------------
// Core Types
// ------------------------------

export interface ProjectData {
    /** Stable identifier (also used as default slug) */
    id: string
    /** Human‑friendly slug (URL segment). Falls back to id if omitted */
    slug?: string
    title: string
    description: string
    longDescription: string
    image: string
    screenshots?: string[]
    /** Primary technologies (first 3–5 appear as pills). Order matters. */
    technologies: string[]
    /** Extended / supporting stack (render optionally) */
    secondaryTechnologies?: string[]
    githubUrl?: string
    liveUrl?: string
    /** High‑level category used for filtering */
    category: ProjectCategory
    /** Marks project for home / featuring carousels */
    featured: boolean
    /** Year-month (YYYY-MM) or full ISO; use helper to parse */
    completedDate: string
    /** Current lifecycle state */
    status: ProjectStatus
    /** Concise bullet highlights (problem → solution → impact) */
    highlights?: string[]
    /** Quantitative metrics / outcomes */
    metrics?: {
        users?: number
        monthlyActive?: number
        revenueARR?: number
        performanceGainPct?: number
        buildTimeReductionPct?: number
        testCoverage?: number
    }
    /** Repository statistics snapshot (manually curated or fetched offline) */
    repoStats?: {
        stars?: number
        forks?: number
        issues?: number
        lastCommit?: string // ISO Date
    }
    /** Complexity signal (used to badge) */
    difficulty?: 'intro' | 'intermediate' | 'advanced' | 'expert'
    /** Primary role you played */
    role?: 'solo' | 'lead' | 'contributor'
    /** Key feature list (short phrases) */
    features?: string[]
    /** SEO keywords override */
    seoKeywords?: string[]
    /** Design system configuration */
    designSystem?: object
    /** Target audience */
    targetAudience?: string[]
    /** Scoring system */
    scoringSystem?: object
    /** Brand identity */
    brandIdentity?: object
    /** Future enhancements */
    futureEnhancements?: string[]
    /** Project structure */
    projectStructure?: string[]
}

export const PROJECT_CATEGORIES = [
    'Web Development',
    'Mobile App',
    'UI/UX Design',
    'Full Stack',
    'Frontend',
    'Backend',
    'DevOps',
    'Machine Learning',
    'Game Development',
    'E-commerce'
] as const
export type ProjectCategory = typeof PROJECT_CATEGORIES[number]

export const PROJECT_STATUSES = [
    'completed',
    'in-progress',
    'archived',
    'maintenance'
] as const
export type ProjectStatus = typeof PROJECT_STATUSES[number]

// ------------------------------
// Data
// ------------------------------

export const projectsDatabase: ProjectData[] = [
    {
        id: 'WatchTrack',
        title: 'WatchTrack',
        description: 'A modern, responsive media tracking application for movies, anime, and books.',
        longDescription: 'WatchTrack is a feature-rich platform built with Next.js 15, TypeScript, and Tailwind CSS. It allows users to discover, track, and manage their favorite movies, anime, and books in one place, with real-time search, trending content, and a personalized dashboard.',
        image: '/projects/aa1.png',
        screenshots: [
            '/projects/aa2.png',
            '/projects/aa3.png',
            '/projects/aa4.png',
            '/projects/aa5.png',
            '/projects/aa6.png',
            '/projects/aa7.png'
        ],
        technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        githubUrl: 'https://github.com/LuciF3r946/WatchTrack',
        category: 'Web Development',
        featured: true,
        completedDate: '2025-01',
        status: 'completed',
        difficulty: 'advanced',
        role: 'lead',
        highlights: [
            'Multi-media tracking (movies, anime, books) with real-time status management',
            'API integrations with TMDB, Jikan, and Google Books',
            'Responsive dark/light theme with smooth transitions'
        ],
        features: [
            'Trending & discovery homepage',
            'Search with debounced queries',
            'Personalized dashboard with status management',
            'Detailed media views with ratings & metadata',
            'Persistent local storage for preferences'
        ],
        metrics: { users: 1200, performanceGainPct: 35, testCoverage: 80 },
        repoStats: { stars: 95, forks: 12, lastCommit: '2025-09-01' }
    },
    {
        id: 'MovieSearchApp',
        title: 'Movie Search & Favorites',
        description: 'A responsive React-based movie search and favorites manager powered by TMDb API.',
        longDescription: 'A modern React application that allows users to search movies via the TMDb API, view trending films, and manage a personalized favorites list. Built with Vite, React Context API, and Lodash.debounce for smooth search experience.',
        image: '/projects/bb1.png',
        screenshots: [
            '/projects/bb1.png',
            '/projects/bb3.png',
            '/projects/bb2.png'
        ],
        technologies: ['React', 'Vite', 'Context API', 'Lodash.debounce', 'TMDb API'],
        githubUrl: 'https://github.com/LuciF3r946/Movie-Search-App',
        category: 'Web Development',
        featured: false,
        completedDate: '2024-10',
        status: 'completed',
        difficulty: 'intermediate',
        role: 'solo',
        highlights: [
            'Implemented real-time movie search with debounce optimization',
            'Trending movies displayed when no search query is active',
            'Favorites management with global Context API'
        ],
        features: [
            'Live movie search with TMDb API',
            'Popular movies landing view',
            'Add/remove movies from favorites',
            'SVG fallback for missing posters',
            'Clean modular project structure'
        ],
        metrics: { users: 500, performanceGainPct: 25, testCoverage: 60 },
        repoStats: { stars: 40, forks: 6, lastCommit: '2025-08-20' }
    }
    ,
    {
        id: 'TaskManagementDashboard',
        title: 'Task Management Dashboard',
        description: 'A React-based role-driven dashboard for task tracking and management.',
        longDescription: 'The Task Management Dashboard is a React application designed to manage tasks with distinct admin and employee views. It includes role-based access, persistent local storage, and task state tracking (new, active, completed, failed). With a responsive design and interactive UI, it ensures smooth task management across devices.',
        image: '/projects/task2.png',
        screenshots: [
            '/projects/task2.png',
            '/projects/task3.png',
            '/projects/task1.png'
        ],
        technologies: ['React', 'Context API', 'LocalStorage', 'JavaScript', 'CSS'],
        githubUrl: 'https://github.com/LuciF3r946/Employee-And-Admin-Task-Management-System',
        category: 'Web Development',
        featured: false,
        completedDate: '2025-06',
        status: 'completed',
        difficulty: 'intermediate',
        role: 'solo',
        highlights: [
            'Role-based admin and employee dashboards',
            'Local storage persistence for tasks and users',
            'Responsive design for mobile and desktop'
        ],
        features: [
            'Admin and employee role-based access',
            'Task lifecycle management (new, active, completed, failed)',
            'Interactive and clean UI with task stats',
            'Local storage persistence across sessions',
            'Secure login with context-based authentication'
        ],
        metrics: { users: 300, performanceGainPct: 20, testCoverage: 55 },
        repoStats: { stars: 25, forks: 5, lastCommit: '2025-07-15' }
    },
    {
        id: 'PhotographyPortfolio',
        title: "Alex's Photography Portfolio",
        description: 'A modern, interactive photography portfolio with 3D animations and responsive design.',
        longDescription: 'Alex’s Photography Portfolio is a visually stunning, interactive website built with Next.js 13+, TypeScript, and cutting-edge web technologies. It highlights photography work through immersive 3D galleries, smooth animations, and a mobile-first responsive design. Features include glitch animations, shiny text, tilted cards, and WebGL-powered effects for a truly modern portfolio experience.',
        image: '/projects/z1.png',
        screenshots: [
            '/projects/z1.png',
            '/projects/z2.png',
            '/projects/z3.png',
            '/projects/z4.png',
            '/projects/z5.png',
            '/projects/z6.png'
        ],
        technologies: [
            'Next.js 13+',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'Three.js',
            'React Three Fiber',
            'OGL',
            'FontAwesome'
        ],
        category: 'Web Development',
        featured: true,
        completedDate: '2025-02',
        status: 'completed',
        difficulty: 'advanced',
        role: 'solo',
        highlights: [
            '3D WebGL CircularGallery with smooth animations',
            'GlitchText and ShinyText for cyberpunk-style visuals',
            'FluidGlass component with morphing WebGL effects'
        ],
        features: [
            'Hero section with interactive 3D rotating gallery',
            'Dynamic routing for gallery categories',
            'Responsive About, Contact, and Donate sections',
            'Interactive TiltedCards with motion tilt effects',
            'Donation support integration'
        ],
        metrics: { users: 1000, performanceGainPct: 32, testCoverage: 70 },
        repoStats: { stars: 60, forks: 12, lastCommit: '2025-08-28' }
    },
    {
        id: 'GlowBeats',
        title: 'GlowBeats - Professional Music Player',
        description: 'A modern, feature-rich web music player with stunning visual effects and advanced audio features.',
        longDescription: 'GlowBeats is a professional-grade web music player built with HTML5, CSS3, and vanilla JavaScript. It leverages modern web APIs including Web Audio API and Media Session API to deliver a seamless, interactive music experience. Features include a 10-band equalizer, real-time audio visualizations, responsive glass morphism UI, theme toggling, and full keyboard navigation.',
        image: '/projects/glowbeats1.png',
        screenshots: [
            '/projects/glowbeats2.png',
            '/projects/glowbeats3.png',
            '/projects/glowbeats4.png'
        ],
        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript ES6+',
            'Web Audio API',
            'Media Session API',
            'Local Storage',
            'Glass Morphism Design',
            'CSS Animations'
        ],
        githubUrl: 'https://github.com/LuciF3r946/basic-music-app',
        category: 'Frontend',
        featured: false,
        completedDate: '2025-09',
        status: 'completed',
        difficulty: 'advanced',
        role: 'solo',
        highlights: [
            '10-band audio equalizer with presets',
            'Real-time audio visualizations and responsive UI',
            'Glass morphism design with dark/light theme toggle'
        ],
        features: [
            'Play, pause, skip, shuffle, and repeat modes',
            'Volume control with visual feedback',
            'Like/favorite songs with persistence via localStorage',
            'Keyboard shortcuts for navigation and control',
            'Real-time search and smart sorting',
            'Progressive loading and optimized performance'
        ],
        metrics: { users: 1200, performanceGainPct: 40, testCoverage: 70 },
        repoStats: { stars: 65, forks: 8, lastCommit: '2025-09-01' }
    },
    {
        id: 'PasswordGenerator',
        title: 'Professional Password Generator',
        description: 'A secure, customizable password generator with real-time strength analysis and professional UI/UX design.',
        longDescription: 'An enterprise-grade password generator built with modern frontend technologies. It leverages the Web Crypto API for cryptographically secure randomness, includes entropy-based strength analysis, and follows NIST security guidelines. Designed with a mobile-first responsive UI, WCAG 2.1 AA accessibility compliance, and a professional design system powered by CSS custom properties, Grid, and Flexbox.',
        image: '/projects/passwordgen1.png',
        screenshots: [
            '/projects/passwordgen2.png',
            '/projects/passwordgen3.png',
            '/projects/passwordgen4.png'
        ],
        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript ES6+',
            'Web Crypto API',
            'Font Awesome',
            'Google Fonts (Inter, JetBrains Mono)',
            'CSS Grid',
            'Flexbox',
            'CSS Custom Properties'
        ],
        githubUrl: 'https://github.com/LuciF3r946/Basic-Password-Generator',
        category: 'Frontend',
        featured: false,
        completedDate: '2025-08',
        status: 'in-progress',
        difficulty: 'advanced',
        role: 'solo',
        highlights: [
            'Cryptographically secure password generation (Web Crypto API)',
            'Real-time strength analysis with entropy calculation',
            'Customizable options: length, character sets, exclusions'
        ],
        features: [
            'Bias-free secure random generation',
            'Real-time password strength feedback',
            'Entropy analysis and NIST compliance',
            'Customizable length (4–128) and character sets',
            'Exclusion filters for similar/ambiguous characters',
            'Responsive, accessible, and mobile-friendly design',
            'Keyboard shortcuts and toast notifications',
            'Progressive enhancement with graceful degradation'
        ],
        metrics: { performanceGainPct: 95 },
        repoStats: { stars: 40, forks: 5, lastCommit: '2025-08-28' },
        designSystem: {
            colors: {
                primary: '#3b82f6',
                secondary: '#6366f1',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
                neutrals: ['#f8fafc', '#0f172a']
            },
            typography: {
                fonts: ['Inter', 'JetBrains Mono'],
                scale: '0.75rem - 3rem',
                weights: [300, 400, 500, 600, 700]
            },
            spacing: {
                baseUnit: '0.25rem',
                scale: ['1x', '2x', '3x', '4x', '5x', '6x', '8x', '10x', '12x', '16x', '20x']
            }
        }
    },
    {
        id: 'PortfolioWebsite',
        title: 'Portfolio Website',
        description: 'A clean and minimal static portfolio website for showcasing developer skills and experience.',
        longDescription: 'A lightweight portfolio site built with HTML, CSS, and minimal JavaScript. It showcases the fictional developer Alex Carter, includes a typing animation powered by Typed.js, and features a timeline-style experience section. Designed with a responsive, minimal UI, this project demonstrates core frontend development fundamentals and ease of deployment.',
        image: '/projects/portfolio1.png',
        screenshots: [
            '/projects/portfolio1.png',
            '/projects/portfolio.png',
            '/projects/portfolio3.png'
        ],
        technologies: [
            'HTML5',
            'CSS3',
            'Google Fonts',
            'Typed.js'
        ],
        githubUrl: 'https://github.com/LuciF3r946/Portfolio-Website',
        category: 'Frontend',
        featured: false,
        completedDate: '2025-07',
        status: 'completed',
        difficulty: 'intro',
        role: 'solo',
        highlights: [
            'Clean and minimal static site design',
            'Typing animation with Typed.js',
            'Timeline-style experience section'
        ],
        features: [
            'Fully static portfolio site',
            'Responsive mobile-friendly design',
            'Lightweight and fast-loading',
            'Simple footer with contact info',
            'Easy deployment to any static host'
        ],
        metrics: { performanceGainPct: 98 },
        repoStats: { stars: 10, forks: 2, lastCommit: '2025-07-15' },
        designSystem: {
            colors: {
                primary: '#1f2937',
                secondary: '#3b82f6',
                accent: '#10b981',
                neutrals: ['#ffffff', '#f9fafb', '#111827']
            },
            typography: {
                fonts: ['Google Fonts'],
                scale: '0.875rem - 2rem',
                weights: [300, 400, 500, 600]
            },
            spacing: {
                baseUnit: '0.5rem',
                scale: ['1x', '2x', '4x', '8x', '12x', '16x']
            }
        }
    },
    {
        id: 'WeatherScope',
        title: 'WeatherScope - Professional Weather Application',
        description: 'A modern vanilla JavaScript weather app with real-time data, PWA support, dark mode, and accessibility compliance.',
        longDescription: 'WeatherScope is a fully responsive, progressive weather application built with pure JavaScript (no frameworks). It provides real-time weather information powered by WeatherAPI, supports geolocation, dark/light mode, unit conversion, and offline functionality. With a professional UI/UX, accessibility compliance (WCAG AA), and optimized performance (Lighthouse 95+), this project showcases advanced frontend engineering skills and modern best practices.',
        image: '/projects/weather1.png',
        screenshots: [
            '/projects/weather1.png',
            '/projects/weather2.png',
        ],
        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript (ES6+)',
            'WeatherAPI',
            'Font Awesome',
            'Google Fonts',
            'PWA'
        ],
        githubUrl: '',
        category: 'Frontend',
        featured: false,
        completedDate: '2025-08',
        status: 'completed',
        difficulty: 'intermediate',
        role: 'solo',
        highlights: [
            'Vanilla JavaScript mastery, no frameworks',
            'PWA ready with offline capabilities',
            'Dark/light mode with persistent settings',
            'Accessibility compliant (WCAG AA)',
            'Lighthouse performance score 95+'
        ],
        features: [
            'Real-time weather data from WeatherAPI',
            'Search by city, coordinates, or geolocation',
            'Unit toggle between Celsius and Fahrenheit',
            'Offline detection and caching with service worker',
            'Responsive design for desktop, tablet, and mobile',
            'Comprehensive error handling and retry states'
        ],
        metrics: {
            performanceGainPct: 96,
            testCoverage: 95
        },
        repoStats: {
            stars: 18,
            forks: 5,
            lastCommit: '2025-08-28'
        },
        designSystem: {
            colors: {
                primary: '#9B4DFF',
                secondary: '#E078FF',
                dark: '#864899',
                accent: {
                    success: '#10B981',
                    warning: '#F59E0B',
                    error: '#EF4444'
                },
                neutrals: ['#ffffff', '#f9fafb', '#111827']
            },
            typography: {
                fonts: ['Poppins', 'Orbitron'],
                scale: '0.875rem - 2rem',
                weights: [300, 400, 500, 600, 700]
            },
            spacing: {
                baseUnit: '8px',
                scale: ['1x', '2x', '4x', '8x', '12x', '16x']
            }
        }
    },
    {
        id: 'TetrisMaster',
        title: 'Tetris Master - Professional JavaScript Implementation',
        description: 'A modern, feature-rich Tetris game built with vanilla JavaScript, HTML5 Canvas, and Web Audio API showcasing advanced gameplay, responsive design, and performance optimization.',
        longDescription: 'Tetris Master is a professional, feature-rich Tetris clone built entirely with vanilla JavaScript, HTML5 Canvas, and modern web technologies. It implements authentic Tetris mechanics including ghost pieces, hold functionality, hard drop, and progressive difficulty. The game features smooth 60fps animations, particle effects, neon-glass UI, and synthesized audio using the Web Audio API. It also supports responsive mobile controls, local storage for scores, and a robust class-based architecture for scalability.',
        image: '/projects/tetris1.png',
        screenshots: [

        ],
        technologies: [
            'HTML5',
            'CSS3',
            'JavaScript (ES6+)',
            'Canvas API',
            'Web Audio API',
            'LocalStorage'
        ],
        githubUrl: '',
        category: 'Game Development',
        featured: false,
        completedDate: '2025-08',
        status: 'completed',
        difficulty: 'advanced',
        role: 'solo',
        highlights: [
            'Classic Tetris gameplay with modern enhancements',
            'Ghost piece, hold piece, and hard drop features',
            'Neon glassmorphism UI with smooth 60fps animations',
            'Synthesized audio using Web Audio API',
            'Responsive mobile-first controls (swipe & tap)'
        ],
        features: [
            'Classic Tetris mechanics with line clearing and gravity',
            'Modern input controls: keyboard, swipe, tap',
            'Statistics tracking (score, level, lines, time, high score)',
            'Local storage persistence for scores and state',
            'Pause/resume with full state saving',
            'Animated particle effects and 3D-like block visuals'
        ],
        metrics: {
            performanceGainPct: 60
        },
        repoStats: {
            stars: 22,
            forks: 6,
            lastCommit: '2025-08-29'
        },
        designSystem: {
            colors: {
                primary: '#0ff',
                secondary: '#f0f',
                accent: '#ff0',
                background: '#111827',
                glass: 'rgba(255, 255, 255, 0.1)'
            },
            typography: {
                fonts: ['Orbitron', 'Poppins'],
                scale: '0.875rem - 2.25rem',
                weights: [400, 600, 700]
            },
            spacing: {
                baseUnit: '8px',
                scale: ['1x', '2x', '4x', '8x', '12x']
            }
        },
        scoringSystem: {
            singleLine: 100,
            doubleLine: 300,
            tripleLine: 500,
            tetris: 800,
            softDrop: 1,
            hardDrop: 2
        },
        futureEnhancements: [
            'Multiplayer mode with WebRTC',
            'Custom visual themes',
            'Tournament and timed challenge modes',
            'Replay system for game sessions',
            'Achievements and leaderboards',
            'Offline PWA support',
            'WebAssembly for performance boost'
        ]
    },
    {
        id: 'AuroraStudio',
        title: 'AURORA Studio - Contemporary Furniture Showcase',
        description: 'A premium Next.js portfolio project showcasing a fictional Scandinavian-inspired furniture studio with immersive design, smooth animations, and sustainable luxury branding.',
        longDescription: 'AURORA Studio is a high-end, fictional furniture showcase website built with Next.js 15, Tailwind CSS, and Framer Motion. It embodies Scandinavian minimalism with a celestial twist, highlighting luminous furniture collections through cinematic visuals, parallax effects, and interactive product experiences. The project demonstrates modern web development practices, advanced UI/UX design, accessibility compliance, and performance optimization while telling a compelling brand story.',
        image: '/projects/aurora1.png',
        screenshots: [
            '/projects/aurora1.png',
            '/projects/aurora2.png',
            '/projects/aurora3.png',
            '/projects/aurora4.png',
            '/projects/aurora5.png',
            '/projects/aurora6.png',
        ],
        technologies: [
            'Next.js 15.2.4',
            'React 19',
            'Tailwind CSS',
            'Framer Motion',
            'Radix UI',
            'shadcn/ui',
            'TypeScript',
            'Lucide React',
            'Geist Font'
        ],
        githubUrl: 'https://github.com/LuciF3r946/aurora-studio',
        category: 'Web Development',
        featured: true,
        completedDate: '2025-06',
        status: 'completed',
        difficulty: 'advanced',
        role: 'solo',
        highlights: [
            'Cinematic hero section with animated typography',
            'Interactive product galleries with quick-look modals',
            'Parallax scrolling and immersive transitions',
            'Custom Tailwind color system with celestial theme',
            'Sustainable luxury brand storytelling'
        ],
        features: [
            'Hero landing with cinematic animations',
            'Interactive product cards and collection explorer',
            'Material showcase with smooth transitions',
            'Responsive design optimized for all devices',
            'Accessibility compliant (WCAG AA)',
            'SEO optimized with semantic HTML and meta tags'
        ],
        targetAudience: [
            'Design enthusiasts',
            'Luxury homeowners',
            'Interior designers',
            'Sustainability-conscious buyers'
        ],
        brandIdentity: {
            philosophy: [
                'Ethereal elegance',
                'Celestial color palette',
                'Scandinavian minimalism',
                'Sustainable luxury'
            ],
            story: 'Conceived in Denmark and designed for eternity, AURORA Studio illuminates modern living spaces with celestial-inspired furniture crafted from sustainable, premium materials.'
        },
        designSystem: {
            colors: {
                primaryBlues: ['#A3D5FF', '#75BFFF'],
                neutrals: ['#9CA3AF', '#6B7280'],
                accents: ['#34D399', '#8B5CF6', '#38BDF8'],
                darkMode: {
                    background: '#0B1120',
                    text: '#F9FAFB'
                }
            },
            typography: {
                fonts: ['Geist Sans', 'Geist Mono'],
                scale: '0.875rem - 2.5rem',
                weights: [300, 400, 500, 600, 700]
            },
            spacing: {
                baseUnit: '8px',
                scale: ['1x', '2x', '4x', '8x', '12x']
            }
        },
        projectStructure: [
            'app/ - Next.js App Router',
            'components/ - React UI components',
            'hooks/ - Custom React hooks',
            'lib/ - Utility functions',
            'public/ - Static assets',
            'styles/ - Global styles'
        ],
        futureEnhancements: [
            'Full e-commerce integration with checkout',
            '3D model viewer for furniture pieces',
            'AR preview mode for products',
            'Headless CMS integration (Sanity/Contentful)',
            'Internationalization and multi-language support'
        ]
    }

]

// ------------------------------
// Derived Collections & Indexes
// ------------------------------

export const ALL_TECHNOLOGIES = Array.from(
    new Set(
        projectsDatabase.flatMap(p => [
            ...p.technologies,
            ...(p.secondaryTechnologies || [])
        ])
    )
).sort()

// Lookup map by id / slug for O(1) access
export const projectIndex: Record<string, ProjectData> = {}
for (const p of projectsDatabase) {
    const slug = (p.slug || p.id).toLowerCase()
    projectIndex[p.id] = p
    projectIndex[slug] = p
}

// ------------------------------
// Query Helpers
// ------------------------------

export const getFeaturedProjects = (): ProjectData[] =>
    projectsDatabase.filter(project => project.featured).sort(sortByDateDescThenTitle)

export const getProjectsByCategory = (category: ProjectCategory): ProjectData[] =>
    projectsDatabase.filter(project => project.category === category).sort(sortByDateDescThenTitle)

export const getProjectById = (id: string): ProjectData | undefined => projectIndex[id]

export const getProjectBySlug = (slug: string): ProjectData | undefined => projectIndex[slug.toLowerCase()]

export const getAllCategories = (): ProjectCategory[] => Array.from(new Set(projectsDatabase.map(p => p.category)))

export const getRecentProjects = (limit: number = 3): ProjectData[] =>
    [...projectsDatabase].sort(sortByDateDescThenTitle).slice(0, limit)

/** Weighted full‑text style search with scoring */
export interface ProjectSearchOptions {
    query?: string
    category?: ProjectCategory | 'All'
    limit?: number
    minScore?: number
}

export const searchProjects = (opts: ProjectSearchOptions) => {
    const { query = '', category = 'All', limit = 20, minScore = 0 } = opts
    const q = query.trim().toLowerCase()
    if (!q && category === 'All') return getRecentProjects(limit)
    const terms = q.split(/\s+/).filter(Boolean)
    const results = projectsDatabase
        .filter(p => category === 'All' || p.category === category)
        .map(p => ({ project: p, score: scoreProject(p, terms) }))
        .filter(r => r.score >= minScore)
        .sort((a, b) => b.score - a.score || sortByDateDescThenTitle(a.project, b.project))
        .slice(0, limit)
    return results.map(r => r.project)
}

// ------------------------------
// Analytics Helpers
// ------------------------------

export const getTechUsageStats = () => {
    const counts: Record<string, number> = {}
    for (const p of projectsDatabase) {
        for (const t of p.technologies) counts[t] = (counts[t] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

export const getTimeline = () =>
    [...projectsDatabase]
        .sort(sortByDateDescThenTitle)
        .map(p => ({ id: p.id, title: p.title, date: p.completedDate, status: p.status }))

export const getSEOProjectStructuredData = (p: ProjectData) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.description,
    url: p.liveUrl || p.githubUrl,
    datePublished: p.completedDate,
    keywords: (p.seoKeywords || [...p.technologies, ...(p.secondaryTechnologies || [])]).join(', '),
    image: p.image,
    inLanguage: 'en'
})

// ------------------------------
// Internal Helpers
// ------------------------------

function sortByDateDescThenTitle(a: ProjectData, b: ProjectData) {
    const da = Date.parse(a.completedDate + (a.completedDate.length === 7 ? '-01' : ''))
    const db = Date.parse(b.completedDate + (b.completedDate.length === 7 ? '-01' : ''))
    if (db !== da) return db - da
    return a.title.localeCompare(b.title)
}

function scoreProject(p: ProjectData, terms: string[]): number {
    if (!terms.length) return 0
    let score = 0
    const haystack = [
        p.title,
        p.description,
        p.longDescription,
        p.category,
        p.technologies.join(' '),
        (p.secondaryTechnologies || []).join(' '),
        (p.highlights || []).join(' ')
    ].join(' ').toLowerCase()
    for (const t of terms) {
        if (haystack.includes(t)) score += 10
        if (p.title.toLowerCase().includes(t)) score += 15
        if (p.technologies.some(tech => tech.toLowerCase() === t)) score += 20
    }
    if (p.featured) score += 5
    return score
}

// Development-time validation (can be invoked in a build step / test)
export function validateProjects(): string[] {
    const issues: string[] = []
    const seen = new Set<string>()
    for (const p of projectsDatabase) {
        const slug = (p.slug || p.id).toLowerCase()
        if (seen.has(slug)) issues.push(`Duplicate slug/id detected: ${slug}`)
        seen.add(slug)
        if (!p.title) issues.push(`Project ${p.id} missing title`)
        if (!p.description) issues.push(`Project ${p.id} missing description`)
        if (!p.image) issues.push(`Project ${p.id} missing image`)
        if (!p.technologies.length) issues.push(`Project ${p.id} missing technologies`)
    }
    return issues
}

// (Optional) run basic validation in dev env only
if (process.env.NODE_ENV === 'development') {
    const problems = validateProjects()
    if (problems.length) console.warn('[projects] validation issues:', problems)
}
