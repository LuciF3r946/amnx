/**
 * Homepage Component
 * 
 * The main landing page of the portfolio website featuring:
 * - Dynamic hero section with animated elements
 * - Featured projects showcase
 * - Call-to-action section
 * - Interactive animations and micro-interactions
 * 
 * This is a client component due to interactive animations and state management
 */

'use client'

// Component imports
import { HeroDynamic } from '@/components/features/hero-section'
import { ProjectCard, ProjectModal } from '@/components/features'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations'
import { ScrollVelocity } from '@/components/animations/ScrollVelocity';
import Btna from '../components/buttons/btna';
import { getFeaturedProjects } from '@/data/projects'

// UI components
import { Badge } from '@/components/ui'

// Icons for decorative elements
import { Zap, Sparkles, Code, Palette, Cpu, Database } from 'lucide-react'

// Next.js and animation libraries
import { motion } from 'framer-motion'
import Btnc from '@/components/buttons/btnc';
import { useState, useCallback } from 'react'
import type { ProjectData } from '@/types/project.types'

/**
 * Home Page Component
 * 
 * Main landing page that showcases:
 * 1. Hero section with personal branding
 * 2. Featured projects grid
 * 3. Call-to-action section
 * 
 * @returns JSX element containing the complete homepage
 */
export default function Home() {
  // Get the top 3 featured projects for homepage display
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  // Modal state management
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Memoized callbacks to prevent unnecessary re-renders
  const handleProjectClick = useCallback((project: ProjectData) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  return (
    <main className="relative">
      {/* Hero Section - Main landing area with personal branding */}
      <HeroDynamic />

      {/* Featured Projects Section - Showcase of best work */}
      <section className="py-20 relative overflow-hidden">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs for visual depth */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>

          {/* Animated floating tech icons for visual interest */}
          {[Code, Palette, Cpu, Database, Zap].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 8 + i * 2, // Staggered animation durations
                repeat: Infinity,
                delay: i * 1.5, // Staggered start times
              }}
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 5)}%`,
              }}
            >
              <Icon size={48} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-4 relative z-10">

          {/* Section Header with Animation */}
          <ScrollReveal>
            <div className="text-center mb-16">

              {/* Badge with featured work indicator */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Badge
                  variant="secondary"
                  className="mb-6 py-2 px-4 text-sm font-semibold bg-primary/10 hover:bg-primary/15 transition-colors duration-300 border border-primary/20"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                  </motion.div>
                  Featured Projects
                </Badge>
              </motion.div>

              {/* Main section heading with gradient text */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Showcasing Digital <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Mastery</span>
              </motion.h2>

              {/* Section description */}
              <motion.p
                className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                of my work.
              </motion.p>

              {/* Animated Shimmer Underline */}
              <motion.div
                className="relative mx-auto h-1 w-24 rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ originX: 0 }}
              >
                {/* Base gradient line */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-purple-600" />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

            </div>
          </ScrollReveal>

          {/* Featured Projects Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <StaggerItem key={project.id} direction="up">
                {/* Individual project card with hover animation */}
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    priority={index === 0} // First project gets priority loading for LCP
                    onClick={() => handleProjectClick(project)} // Open modal instead of redirecting
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* View All Projects Button */}
          <ScrollReveal>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Btnc label="Explore All Projects" href="/projects" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action Section - Encourage user engagement */}
      <section className="w-full py-20 bg-gradient-to-r from-primary/10 via-purple-600/5 to-primary/10 relative overflow-hidden">
        {/* Background Pattern for texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Background Elements for Visual Appeal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          {/* Primary floating orb with pulsing animation */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          ></motion.div>

          {/* Secondary floating orb with offset animation */}
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 2,
            }}
          ></motion.div>
        </div>

        {/* CTA Content Container */}
        <div className="container  mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <motion.div
              className="max-w-screen mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >

              <ScrollVelocity
                texts={[
                  'React.js ✦ Next.js ✦ JavaScript ES6+ ✦ TypeScript',
                  'Figma ✦ User Research ✦ Prototyping ✦ UI/UX Design'
                ]}
                velocity={100}
                className="custom-scroll-text"
              />


              {/* CTA Description text */}
              <p className="text-muted-foreground pt-2 mb-8 text-lg">
                Let&apos;s collaborate and create something amazing together.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Btnc label="My Skills?" href="/skills" />
                <Btna label="Lets Start a Project" href="/contact" />
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </main>
  )
}