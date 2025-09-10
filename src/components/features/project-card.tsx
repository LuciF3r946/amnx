'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Badge, Button } from '@/components/ui'
import { ExternalLink, Github, Trophy, Code } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import type { ProjectData } from '@/types/project.types'

/**
 * ProjectCard Component
 * 
 * A card component that displays project information with tilt effects,
 * hover animations, and optional click handling.
 * 
 * @example
 * // Basic usage (original behavior - opens live URL on click)
 * <ProjectCard project={projectData} index={0} />
 * 
 * // With custom click handler (e.g., to open modal)
 * <ProjectCard 
 *   project={projectData} 
 *   index={0} 
 *   onClick={() => handleProjectClick(projectData)}
 * />
 */

interface ProjectCardProps {
    /** The project data to display */
    project: ProjectData
    /** Index for staggered animations */
    index: number
    /** Layout variant (currently unused, for future extensions) */
    layout?: 'grid' | 'list'
    /** Optional click handler. If provided, overrides default behavior */
    onClick?: () => void
    /** Whether this is the first/priority image for LCP optimization */
    priority?: boolean
}

export function ProjectCard({ project, index, onClick, priority = false }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Motion values for 3D tilt effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Transform mouse position to rotation values
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

    // Calculate mouse position relative to card center for tilt effect
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(event.clientX - centerX)
        mouseY.set(event.clientY - centerY)
    }

    // Handle card click - either custom onClick or default behavior
    const handleCardClick = () => {
        if (onClick) {
            // Use custom click handler (e.g., open modal)
            onClick()
        } else if (project.liveUrl) {
            // Default behavior: open live URL in new tab
            window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            className="group relative h-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative bg-card border border-border/50 overflow-hidden cursor-pointer h-full transition-all duration-300"
                onClick={handleCardClick}
            >
                {/* Animated gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Featured project badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-lg">
                            <Trophy className="w-3 h-3 mr-1" />
                            Featured
                        </Badge>
                    </div>
                )}

                {/* Project image or placeholder */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            priority={priority}
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Code className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}

                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick action buttons (appear on hover) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                        className="absolute top-4 right-4 flex gap-2"
                    >
                        {project.githubUrl && (
                            <Button
                                size="icon"
                                variant="secondary"
                                className="w-8 h-8 bg-background/80 backdrop-blur-sm"
                                onClick={(e) => {
                                    e.stopPropagation() // Prevent card click when clicking button
                                    window.open(project.githubUrl, '_blank')
                                }}
                            >
                                <Github className="w-4 h-4" />
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button
                                size="icon"
                                variant="secondary"
                                className="w-8 h-8 bg-background/80 backdrop-blur-sm"
                                onClick={(e) => {
                                    e.stopPropagation() // Prevent card click when clicking button
                                    window.open(project.liveUrl, '_blank')
                                }}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        )}
                    </motion.div>
                </div>

                {/* Card content section */}
                <div className="p-6 space-y-5">
                    {/* Project title */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                            {project.title}
                        </h3>
                    </div>

                    {/* Project description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.longDescription || project.description}
                    </p>

                    {/* Key highlights (show on hover) */}
                    {project.highlights && project.highlights.length > 0 && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: isHovered ? 'auto' : 0,
                                opacity: isHovered ? 1 : 0
                            }}
                            className="overflow-hidden space-y-2"
                        >
                            <p className="text-xs font-medium text-foreground uppercase tracking-wide">Key Achievements</p>
                            <ul className="space-y-1">
                                {/* Show only first 2 highlights to avoid overcrowding */}
                                {project.highlights.slice(0, 2).map((highlight, idx) => (
                                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}


                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </motion.div>
    )
}

/**
 * Usage Notes:
 * 
 * 1. Basic ProjectCard (original behavior):
 *    - Clicking the card opens project.liveUrl in a new tab
 *    - Quick action buttons for GitHub and live demo
 *    - Hover effects and animations
 * 
 * 2. ProjectCard with Modal Integration:
 *    - Pass an onClick prop to override default behavior
 *    - Usually used to open a detailed modal instead
 * 
 * @example
 * // Without modal (default behavior)
 * <ProjectCard project={projectData} index={0} />
 * 
 * // With modal integration
 * <ProjectCard 
 *   project={projectData} 
 *   index={0} 
 *   onClick={() => openProjectModal(projectData)}
 * />
 */

export default ProjectCard