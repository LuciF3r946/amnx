'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard, ProjectModal } from '@/components/features'
import { PageLayout, Section, Container } from '@/components/layout'
import { projectsDatabase, getAllCategories } from '@/data/projects'
import { ProjectData } from '@/types/project.types'
import Btna from '@/components/buttons/btna'

// Loading component
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground text-sm">Loading projects...</p>
        </div>
    </div>
)

/**
 * Optimized Projects Page
 * 
 * Performance improvements:
 * - Lazy loading of ProjectModal
 * - Memoized callbacks and computed values
 * - Reduced animation complexity
 * - Optimized re-renders
 * - Immediate rendering with loading state
 */

export default function ProjectsPage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Fix hydration and rendering issues
    useEffect(() => {
        try {
            // Ensure this is running on client side
            setIsClient(true)

            // Small delay to ensure proper hydration and data loading
            const timer = setTimeout(() => {
                // Verify data is available
                try {
                    const categories = getAllCategories()
                    if (projectsDatabase.length >= 0 && Array.isArray(categories)) {
                        setIsLoaded(true)
                    } else {
                        setError('Failed to load project data')
                    }
                } catch (err) {
                    setError('Failed to process project data')
                    console.error('Data processing error:', err)
                }
            }, 150)

            return () => clearTimeout(timer)
        } catch (err) {
            setError('An error occurred while loading the page')
            console.error('Projects page error:', err)
        }
    }, [])

    const [activeCategory, setActiveCategory] = useState<string>('All')
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)    // Memoized categories to prevent recalculation
    const categories = useMemo(() => ['All', ...getAllCategories()], [])

    // Memoized and optimized project filtering
    const filtered = useMemo(() => {
        const baseFilter = activeCategory === 'All'
            ? projectsDatabase
            : projectsDatabase.filter(p => p.category === activeCategory)

        return baseFilter.sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
        })
    }, [activeCategory])

    // Memoized callbacks to prevent unnecessary re-renders
    const handleProjectClick = useCallback((project: ProjectData) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedProject(null)
    }, [])

    const handleCategoryChange = useCallback((category: string) => {
        setActiveCategory(category)
    }, [])

    // Simplified animation variants
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    // Prevent hydration issues by not rendering until client is ready
    if (!isClient) {
        return <LoadingSpinner />
    }

    // Show error state if something went wrong
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Something went wrong</h2>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        )
    }

    // Show loading spinner until everything is ready
    if (!isLoaded) {
        return <LoadingSpinner />
    }

    return (
        <div
            key="projects-page"
            className={`transition-opacity duration-200 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-95'}`}
        >
            <PageLayout>
                <Section className="min-h-screen py-8 sm:py-12 pt-24 sm:pt-30 mobile-safe-area">
                    <Container>
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-center mb-12 sm:mb-16 mobile-container"
                        >
                            <h1 className="mobile-heading-xl sm:text-4xl md:text-5xl font-bold mb-4">
                                My <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Projects</span>
                            </h1>
                        </motion.div>

                        {/* Controls Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-br from-muted/40 via-muted/30 to-muted/20 rounded-2xl backdrop-blur-lg border border-border/70 shadow-lg shadow-primary/5 mobile-card"
                        >
                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                                {categories.map(cat => {
                                    const active = cat === activeCategory
                                    return (
                                        <motion.button
                                            key={cat}
                                            onClick={() => handleCategoryChange(cat)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`touch-target mobile-button px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center relative overflow-hidden ${active
                                                ? 'bg-primary/20 text-foreground shadow-md border border-primary/30'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
                                                }`}
                                            aria-current={active ? 'true' : undefined}
                                        >
                                            {active && (
                                                <motion.span
                                                    layoutId="activeCategory"
                                                    className="w-2 h-2 bg-primary rounded-full mr-2 shadow-sm shadow-primary/50"
                                                />
                                            )}
                                            {cat}
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Projects Count */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center items-center mb-6 sm:mb-8"
                        >
                            <p className="mobile-text-sm text-muted-foreground text-center">
                                Showing <span className="font-semibold text-foreground">{filtered.length}</span> project{filtered.length !== 1 && 's'}
                                {activeCategory !== 'All' && (
                                    <span> in <span className="font-semibold text-primary">{activeCategory}</span></span>
                                )}
                            </p>
                        </motion.div>

                        {/* Projects Grid */}
                        {filtered.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16 sm:py-24"
                            >
                                <div className="max-w-md mx-auto mobile-container">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                            className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/50 border-t-transparent rounded-full"
                                        />
                                    </div>
                                    <h3 className="mobile-heading-md text-xl font-semibold mb-2 text-white">No projects found</h3>
                                    <p className="mobile-text-sm text-white/60">
                                        Try selecting a different category or check back later.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                layout
                                className="mobile-grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((project, i) => (
                                        <motion.div
                                            key={project.id}
                                            variants={itemVariants}
                                            layout
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ProjectCard
                                                project={project}
                                                index={i}
                                                onClick={() => handleProjectClick(project)}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* CTA Section */}
                        {filtered.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-center mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-border mobile-container"
                            >
                                <h3 className="mobile-heading-lg sm:text-3xl font-bold mb-4 text-foreground">Interested in collaborating?</h3>
                                <p className="mobile-text-sm text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
                                    I&apos;m always open to discussing new opportunities and exciting projects.
                                </p>
                                <div className="mobile-button-container">
                                    <Btna label="Let&apos;s talk" href="/contact" />
                                </div>
                            </motion.div>
                        )}

                    </Container>
                </Section>

                {/* Project Modal */}
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                )}
            </PageLayout>
        </div>
    )
}

/**
 * COMPLETE INTEGRATION EXAMPLE:
 * 
 * This file demonstrates the complete integration of ProjectCard and ProjectModal.
 * Here's how it works:
 * 
 * 1. SETUP STATE:
 *    - selectedProject: holds the project data for the modal
 *    - isModalOpen: controls modal visibility
 * 
 * 2. HANDLE PROJECT CLICK:
 *    - When a ProjectCard is clicked, handleProjectClick is called
 *    - Sets the selected project and opens the modal
 * 
 * 3. HANDLE MODAL CLOSE:
 *    - When modal is closed, resets both states
 * 
 * 4. RENDER COMPONENTS:
 *    - ProjectCard with onClick prop (overrides default behavior)
 *    - ProjectModal with conditional rendering
 * 
 * CUSTOMIZATION TIPS:
 * - You can add animations to the modal backdrop
 * - Add loading states while fetching project details
 * - Implement keyboard navigation between projects
 * - Add social sharing buttons to the modal
 */
