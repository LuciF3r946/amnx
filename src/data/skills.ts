/**
 * Skills Data Management System
 * 
 * Comprehensive skill tracking and categorization system featuring:
 * - Hierarchical skill organization by categories
 * - Detailed proficiency tracking with levels and experience
 * - Project-based skill validation and metrics
 * - Core skill identification for highlighting
 * - Experience timeline and progression tracking
 * 
 * Data Structure:
 * - Skills organized into logical categories (Frontend, Backend, Design, Tools)
 * - Each skill includes proficiency level, experience duration, and project count
 * - Color-coded categories for visual organization
 * - Icon associations for enhanced UI presentation
 * 
 * Proficiency Levels:
 * - 90-100: Expert level (5+ years, extensive project experience)
 * - 80-89: Advanced level (3-4 years, solid project portfolio)
 * - 70-79: Intermediate level (1-2 years, practical experience)
 * - 60-69: Beginner level (< 1 year, learning phase)
 * - < 60: Learning phase (new to the technology)
 * 
 * Usage:
 * - Skills page displays categorized skill sets
 * - Homepage highlights core skills
 * - Project pages reference related skills
 * - Resume generation uses skill data
 */

/**
 * Skill Category Interface
 * 
 * Defines the structure for skill categories with:
 * - Unique identification and naming
 * - Descriptive information for context
 * - Visual elements (icon, color) for UI consistency
 * - Associated skills collection
 * 
 * Categories serve as logical groupings that help users
 * understand different areas of expertise and technical focus.
 */
export interface SkillCategory {
    /** Unique identifier for the category */
    id: string
    /** Display name for the category */
    name: string
    /** Brief description of the category's focus */
    description: string
    /** Collection of skills in this category */
    skills: Skill[]
    /** Icon name for visual representation */
    icon: string
    /** Hex color code for category theming */
    color: string
}

/**
 * Individual Skill Interface
 * 
 * Comprehensive skill definition including:
 * - Proficiency measurement and experience tracking
 * - Project-based validation of expertise
 * - Optional certifications and additional context
 * - Core skill flagging for prominence
 * - Category association for organization
 * 
 * Skills represent specific technologies, tools, or methodologies
 * with quantified proficiency levels and real-world application metrics.
 */
export interface Skill {
    /** Unique identifier for the skill */
    id: string
    /** Display name of the technology/skill */
    name: string
    /** Proficiency level (0-100) */
    level: number
    /** Optional detailed description of expertise */
    description?: string
    /** Years of professional experience */
    yearsOfExperience?: number
    /** Number of projects using this skill */
    projects?: number
    /** Professional certifications or credentials */
    certifications?: string[]
    /** Flag to mark as core/primary skill */
    isCore?: boolean
    /** Parent category identifier */
    category: string
}

/**
 * Skills Database
 * 
 * Centralized collection of all skills organized by categories:
 * 
 * 1. Frontend Development:
 *    - Modern JavaScript frameworks and libraries
 *    - UI/UX implementation technologies
 *    - Responsive design and styling systems
 * 
 * 2. UI/UX Design:
 *    - Design tools and prototyping platforms
 *    - User research and testing methodologies
 *    - Design system creation and maintenance
 * 
 * 3. Backend Development:
 *    - Server-side programming languages
 *    - Database management systems
 *    - API design and implementation
 * 
 * 4. Tools & Technologies:
 *    - Development environment and workflow tools
 *    - Version control and collaboration platforms
 *    - Deployment and containerization technologies
 * 
 * Each skill includes:
 * - Quantified proficiency levels based on real experience
 * - Project counts validating practical application
 * - Years of experience for context
 * - Core skill flags for highlighting most important technologies
 */
export const skillsDatabase: SkillCategory[] = [
    {
        id: 'frontend-development',
        name: 'Frontend Development',
        description: 'Building responsive and interactive user interfaces',
        icon: 'Code',
        color: '#3B82F6',
        skills: [
            {
                id: 'react',
                name: 'React.js',
                level: 95,
                description: 'Building complex SPAs with hooks, context, and modern patterns',
                yearsOfExperience: 4,
                projects: 25,
                isCore: true,
                category: 'frontend-development'
            },
            {
                id: 'nextjs',
                name: 'Next.js',
                level: 90,
                description: 'Full-stack React framework with SSR, SSG, and API routes',
                yearsOfExperience: 3,
                projects: 18,
                isCore: true,
                category: 'frontend-development'
            },
            {
                id: 'typescript',
                name: 'TypeScript',
                level: 88,
                description: 'Type-safe JavaScript development for scalable applications',
                yearsOfExperience: 3,
                projects: 20,
                isCore: true,
                category: 'frontend-development'
            },
            {
                id: 'tailwindcss',
                name: 'Tailwind CSS',
                level: 92,
                description: 'Utility-first CSS framework for rapid UI development',
                yearsOfExperience: 2,
                projects: 15,
                isCore: true,
                category: 'frontend-development'
            },
            {
                id: 'javascript',
                name: 'JavaScript ES6+',
                level: 93,
                description: 'Modern JavaScript including async/await, modules, and more',
                yearsOfExperience: 5,
                projects: 30,
                isCore: true,
                category: 'frontend-development'
            }
        ]
    },
    {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        description: 'Creating beautiful and intuitive user experiences',
        icon: 'Palette',
        color: '#EC4899',
        skills: [
            {
                id: 'figma',
                name: 'Figma',
                level: 85,
                description: 'Professional design tool for UI/UX and prototyping',
                yearsOfExperience: 3,
                projects: 12,
                isCore: true,
                category: 'ui-ux-design'
            },
            {
                id: 'user-research',
                name: 'User Research',
                level: 78,
                description: 'Understanding user needs through research and testing',
                yearsOfExperience: 2,
                projects: 8,
                category: 'ui-ux-design'
            },
            {
                id: 'prototyping',
                name: 'Prototyping',
                level: 82,
                description: 'Creating interactive prototypes for user testing',
                yearsOfExperience: 3,
                projects: 10,
                category: 'ui-ux-design'
            },
            {
                id: 'design-systems',
                name: 'Design Systems',
                level: 80,
                description: 'Building scalable design systems and component libraries',
                yearsOfExperience: 2,
                projects: 6,
                category: 'ui-ux-design'
            }
        ]
    },
    {
        id: 'backend-development',
        name: 'Backend Development',
        description: 'Server-side development and API design',
        icon: 'Database',
        color: '#10B981',
        skills: [
            {
                id: 'nodejs',
                name: 'Node.js',
                level: 85,
                description: 'Server-side JavaScript runtime for scalable applications',
                yearsOfExperience: 3,
                projects: 12,
                isCore: true,
                category: 'backend-development'
            },
            {
                id: 'python',
                name: 'Python',
                level: 75,
                description: 'Versatile programming language for web and data science',
                yearsOfExperience: 2,
                projects: 8,
                category: 'backend-development'
            },
            {
                id: 'postgresql',
                name: 'PostgreSQL',
                level: 80,
                description: 'Advanced relational database management system',
                yearsOfExperience: 2,
                projects: 10,
                category: 'backend-development'
            },
            {
                id: 'rest-apis',
                name: 'REST APIs',
                level: 88,
                description: 'Designing and implementing RESTful web services',
                yearsOfExperience: 3,
                projects: 15,
                isCore: true,
                category: 'backend-development'
            }
        ]
    },
    {
        id: 'tools-technologies',
        name: 'Tools & Technologies',
        description: 'Development tools and modern technologies',
        icon: 'Settings',
        color: '#8B5CF6',
        skills: [
            {
                id: 'git',
                name: 'Git & GitHub',
                level: 90,
                description: 'Version control and collaborative development',
                yearsOfExperience: 4,
                projects: 30,
                isCore: true,
                category: 'tools-technologies'
            },
            {
                id: 'docker',
                name: 'Docker',
                level: 70,
                description: 'Containerization for consistent deployment environments',
                yearsOfExperience: 1,
                projects: 5,
                category: 'tools-technologies'
            },
            {
                id: 'vscode',
                name: 'VS Code',
                level: 95,
                description: 'Primary development environment with extensive customization',
                yearsOfExperience: 4,
                projects: 30,
                category: 'tools-technologies'
            },
            {
                id: 'vercel',
                name: 'Vercel',
                level: 85,
                description: 'Modern deployment platform for frontend applications',
                yearsOfExperience: 2,
                projects: 12,
                category: 'tools-technologies'
            }
        ]
    }
]

/**
 * Core Skills Retrieval
 * 
 * Extracts and sorts skills marked as core/primary technologies.
 * These represent the most important and frequently used skills
 * in professional work, sorted by proficiency level.
 * 
 * Used for:
 * - Homepage skill highlights
 * - Resume summary sections
 * - Quick skill overviews
 * 
 * @returns Array of core skills sorted by proficiency level (highest first)
 */
export const getCoreSkills = (): Skill[] => {
    return skillsDatabase
        .flatMap(category => category.skills)
        .filter(skill => skill.isCore)
        .sort((a, b) => b.level - a.level)
}

/**
 * Category-Specific Skill Retrieval
 * 
 * Fetches all skills within a specific category for focused displays.
 * Useful for category-specific pages or filtered skill views.
 * 
 * @param categoryId - The unique identifier of the skill category
 * @returns Array of skills in the specified category, or empty array if not found
 */
export const getSkillsByCategory = (categoryId: string): Skill[] => {
    const category = skillsDatabase.find(cat => cat.id === categoryId)
    return category ? category.skills : []
}

/**
 * Individual Skill Lookup
 * 
 * Retrieves a specific skill by its unique identifier.
 * Useful for skill detail pages or specific skill references.
 * 
 * @param skillId - The unique identifier of the skill
 * @returns The skill object if found, undefined otherwise
 */
export const getSkillById = (skillId: string): Skill | undefined => {
    return skillsDatabase
        .flatMap(category => category.skills)
        .find(skill => skill.id === skillId)
}

/**
 * Complete Skill Collection
 * 
 * Retrieves all skills across all categories as a flat array.
 * Useful for search functionality, skill counts, or comprehensive listings.
 * 
 * @returns Array containing all skills from all categories
 */
export const getAllSkills = (): Skill[] => {
    return skillsDatabase.flatMap(category => category.skills)
}

/**
 * Skill Level Classification
 * 
 * Converts numeric proficiency levels into human-readable labels.
 * Provides consistent skill level terminology across the application.
 * 
 * Level Ranges:
 * - 90-100: Expert (Extensive experience, can teach others)
 * - 80-89: Advanced (Strong practical knowledge, few gaps)
 * - 70-79: Intermediate (Solid foundation, some advanced features)
 * - 60-69: Beginner (Basic understanding, limited practical use)
 * - < 60: Learning (Currently studying or new to the technology)
 * 
 * @param level - Numeric proficiency level (0-100)
 * @returns Descriptive label for the skill level
 */
export const getSkillLevelLabel = (level: number): string => {
    if (level >= 90) return 'Expert'
    if (level >= 80) return 'Advanced'
    if (level >= 70) return 'Intermediate'
    if (level >= 60) return 'Beginner'
    return 'Learning'
}

/**
 * Professional Experience Calculator
 * 
 * Calculates total years of professional development experience.
 * Used for resume headers, about page content, and experience metrics.
 * 
 * Note: Update the startYear constant when the professional journey began
 * to ensure accurate experience calculation across the portfolio.
 * 
 * @returns Number of years since starting professional development
 */
export const getExperienceYears = (): number => {
    const currentYear = new Date().getFullYear()
    const startYear = 2020 // When professional development career began
    return currentYear - startYear
}
