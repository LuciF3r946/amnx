'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { ProjectData } from '@/types/project.types'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

/**
 * ProjectModal Component
 * 
 * A modal component that displays detailed information about a project.
 * This modal is designed to work with the existing ProjectCard component
 * without modifying it.
 * 
 * @example
 * ```tsx
 * const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
 * const [isModalOpen, setIsModalOpen] = useState(false)
 * 
 * const handleProjectClick = (project: ProjectData) => {
 *   setSelectedProject(project)
 *   setIsModalOpen(true)
 * }
 * 
 * const handleCloseModal = () => {
 *   setIsModalOpen(false)
 *   setSelectedProject(null)
 * }
 * 
 * return (
 *   <>
 *     <ProjectCard onClick={() => handleProjectClick(project)} />
 *     {selectedProject && (
 *       <ProjectModal
 *         project={selectedProject}
 *         isOpen={isModalOpen}
 *         onClose={handleCloseModal}
 *       />
 *     )}
 *   </>
 * )
 * ```
 */

interface ProjectModalProps {
    /** The project data to display in the modal */
    project: ProjectData
    /** Whether the modal is currently open/visible */
    isOpen: boolean
    /** Callback function to close the modal */
    onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    // State for image lightbox
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)
    const [lightboxIndex, setLightboxIndex] = useState<number>(0)

    // Image navigation functions
    const openLightbox = (imageSrc: string, index: number) => {
        setLightboxImage(imageSrc)
        setLightboxIndex(index)
    }

    const closeLightbox = () => {
        setLightboxImage(null)
    }

    const navigateImage = useCallback((direction: 'prev' | 'next') => {
        if (!project.screenshots) return

        const newIndex = direction === 'next'
            ? (lightboxIndex + 1) % project.screenshots.length
            : (lightboxIndex - 1 + project.screenshots.length) % project.screenshots.length

        setLightboxIndex(newIndex)
        setLightboxImage(project.screenshots[newIndex])
    }, [lightboxIndex, project.screenshots])

    // Prevent body scroll when modal is open to avoid background scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup: restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Close modal when Escape key is pressed (accessibility feature)
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (lightboxImage) {
                    setLightboxImage(null)
                } else {
                    onClose()
                }
            }
            // Navigation with arrow keys in lightbox
            if (lightboxImage && project.screenshots) {
                if (e.key === 'ArrowLeft') {
                    navigateImage('prev')
                } else if (e.key === 'ArrowRight') {
                    navigateImage('next')
                }
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose, lightboxImage, lightboxIndex, project.screenshots, navigateImage])

    // Animation variants for smooth transitions
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    }

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1,
                staggerChildren: 0.05 // Animate child elements with slight delay
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose} // Close modal when clicking outside (on backdrop)
                >
                    {/* Backdrop with blur effect */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                    {/* Modal Content Container */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative bg-background border border-border/50 rounded-xl shadow-2xl shadow-black/20 max-w-4xl w-full max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        {/* Close Button (X) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 border border-border/50"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        {/* Scrollable Content Area */}
                        <div className="overflow-y-auto max-h-[90vh] premium-scrollbar">
                            <motion.div
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                className="p-6 md:p-8 space-y-6"
                            >
                                {/* Project Title and Description */}
                                <motion.div variants={itemVariants} className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                        {project.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {project.longDescription}
                                    </p>
                                </motion.div>

                                {/* Screenshots Grid - Only shows if project has screenshots */}
                                {project.screenshots && project.screenshots.length > 0 && (
                                    <motion.div variants={itemVariants} className="space-y-4">
                                        <h3 className="text-xl font-semibold text-foreground">Screenshots</h3>
                                        {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
                                        <div className={`grid gap-4 ${project.screenshots.length === 1
                                            ? 'grid-cols-1'
                                            : project.screenshots.length === 2
                                                ? 'grid-cols-1 md:grid-cols-2'
                                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                            }`}>
                                            {project.screenshots.map((screenshot, index) => (
                                                <motion.div
                                                    key={index}
                                                    variants={itemVariants}
                                                    className="relative aspect-video bg-muted rounded-lg overflow-hidden group cursor-pointer"
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2 }}
                                                    onClick={() => openLightbox(screenshot, index)}
                                                >
                                                    <Image
                                                        src={screenshot}
                                                        alt={`${project.title} screenshot ${index + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                    {/* Click indicator overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="bg-black/60 rounded-full p-2 backdrop-blur-sm">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Technology Stack Display */}
                                <motion.div variants={itemVariants} className="space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Primary technologies (highlighted) */}
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {/* Secondary technologies (muted) */}
                                        {project.secondaryTechnologies?.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Key Features List - Only shows if features exist */}
                                {project.features && project.features.length > 0 && (
                                    <motion.div variants={itemVariants} className="space-y-4">
                                        <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
                                        <ul className="grid gap-2 md:grid-cols-2">
                                            {project.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {/* Project Highlights/Achievements - Only shows if highlights exist */}
                                {project.highlights && project.highlights.length > 0 && (
                                    <motion.div variants={itemVariants} className="space-y-4">
                                        <h3 className="text-xl font-semibold text-foreground">Key Achievements</h3>
                                        <ul className="space-y-2">
                                            {project.highlights.map((highlight, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {/* Modal Footer */}
                                <motion.div variants={itemVariants} className="pt-6 border-t border-border/50 space-y-6">
                                    {/* Personal Touch - Motivational Quote */}
                                    <div className="text-center">
                                        <p className="text-muted-foreground italic flex items-center justify-center gap-2">
                                            <Heart className="w-4 h-4 text-red-500" />
                                            &ldquo;If you like this, I can still go better &mdash; there&rsquo;s always room to grow &rdquo;
                                        </p>
                                    </div>

                                    {/* Action Buttons - Only show if URLs exist */}
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        {project.githubUrl && (
                                            <Button
                                                variant="outline"
                                                className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50 transition-colors"
                                                onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                                            >
                                                <Github className="w-4 h-4" />
                                                View Source Code
                                            </Button>
                                        )}
                                        {project.liveUrl && (
                                            <Button
                                                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                                                onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Image Lightbox Modal */}
            {lightboxImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    {/* Darker backdrop for lightbox */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

                    {/* Lightbox Content */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border-none"
                            onClick={closeLightbox}
                        >
                            <X className="h-5 w-5" />
                        </Button>

                        {/* Navigation Buttons - Only show if multiple screenshots */}
                        {project.screenshots && project.screenshots.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border-none"
                                    onClick={() => navigateImage('prev')}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border-none"
                                    onClick={() => navigateImage('next')}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </>
                        )}

                        {/* Main Image */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={lightboxImage}
                                alt={`${project.title} screenshot ${lightboxIndex + 1}`}
                                width={1920}
                                height={1080}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                priority
                            />
                        </div>

                        {/* Image Counter */}
                        {project.screenshots && project.screenshots.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                                {lightboxIndex + 1} / {project.screenshots.length}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/**
 * How to add screenshots to your projects:
 * 
 * 1. Add your screenshot images to the public/projects/ folder
 * 2. In your project data (src/data/projects.ts), add the screenshots array:
 * 
 * @example
 * ```tsx
 * {
 *   id: 'my-project',
 *   title: 'My Awesome Project',
 *   // ... other project data
 *   screenshots: [
 *     '/projects/my-project-screenshot-1.png',
 *     '/projects/my-project-screenshot-2.png',
 *     '/projects/my-project-screenshot-3.png'
 *   ]
 * }
 * ```
 * 
 * Note: Screenshots are optional. If a project has no screenshots,
 * the screenshots section won't be displayed in the modal.
 */

export default ProjectModal
