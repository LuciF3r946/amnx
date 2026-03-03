"use client"

import { motion } from 'framer-motion'
import LogoLoop from "@/components/animations/LogoLoop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiGit,
    SiGithub,
    SiFramer,
    SiVuedotjs,
    SiSwift,
    SiPython,
    SiFigma,
    SiCanva,
    SiXcode,
    SiOpenai,
} from "react-icons/si";
import FlowingMenu from '@/components/animations/FlowingMenu'

// Animation helper with proper typing
const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
})

const skillCategories = [
    {
        id: 'frontend',
        label: 'Frontend / Backend',
        color: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/30',
        accent: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        dot: 'bg-blue-400',
        skills: [
            { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
            { name: 'React.js',   icon: <SiReact className="text-cyan-400" /> },
            { name: 'Next.js',    icon: <SiNextdotjs /> },
            { name: 'Vue',        icon: <SiVuedotjs className="text-emerald-400" /> },
            { name: 'Swift',      icon: <SiSwift className="text-orange-400" /> },
            { name: 'Vapor',      icon: <SiSwift className="text-teal-400" /> },
            { name: 'Framer',     icon: <SiFramer /> },
        ]
    },
    {
        id: 'uiux',
        label: 'UI / UX',
        color: 'from-pink-500/20 to-rose-500/20',
        border: 'border-pink-500/30',
        accent: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
        dot: 'bg-pink-400',
        skills: [
            { name: 'Figma',          icon: <SiFigma className="text-pink-400" /> },
            { name: 'Canva',          icon: <SiCanva className="text-sky-400" /> },
            { name: 'Wireframing',    icon: null },
            { name: 'Prototyping',    icon: null },
            { name: 'Design Systems', icon: null },
        ]
    },
    {
        id: 'platforms',
        label: 'Platforms / Tools',
        color: 'from-violet-500/20 to-purple-500/20',
        border: 'border-violet-500/30',
        accent: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
        dot: 'bg-violet-400',
        skills: [
            { name: 'VS Code',  icon: null },
            { name: 'Xcode',    icon: <SiXcode className="text-sky-400" /> },
            { name: 'AI Tools', icon: <SiOpenai /> },
        ]
    },
    {
        id: 'other',
        label: 'Other',
        color: 'from-emerald-500/20 to-green-500/20',
        border: 'border-emerald-500/30',
        accent: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        dot: 'bg-emerald-400',
        skills: [
            { name: 'Python',  icon: <SiPython className="text-yellow-400" /> },
            { name: 'Git',     icon: <SiGit className="text-orange-400" /> },
            { name: 'GitHub',  icon: <SiGithub /> },
            { name: 'Node.js', icon: <SiNodedotjs className="text-green-400" /> },
        ]
    },
]

const techLogos = [
    { node: <SiTypescript />,       title: "TypeScript",    href: "https://www.typescriptlang.org" },
    { node: <SiReact />,            title: "React",         href: "https://react.dev" },
    { node: <SiNextdotjs />,        title: "Next.js",       href: "https://nextjs.org" },
    { node: <SiVuedotjs />,         title: "Vue",           href: "https://vuejs.org" },
    { node: <SiSwift />,            title: "Swift",         href: "https://swift.org" },
    { node: <SiFigma />,            title: "Figma",         href: "https://figma.com" },
    { node: <SiCanva />,            title: "Canva",         href: "https://canva.com" },

    { node: <SiXcode />,            title: "Xcode",         href: "https://developer.apple.com/xcode" },
    { node: <SiOpenai />,           title: "AI Tools",      href: "https://openai.com" },
    { node: <SiPython />,           title: "Python",        href: "https://python.org" },
    { node: <SiNodedotjs />,        title: "Node.js",       href: "https://nodejs.org" },
    { node: <SiGit />,              title: "Git",           href: "https://git-scm.com" },
    { node: <SiGithub />,           title: "GitHub",        href: "https://github.com" },
    { node: <SiTailwindcss />,      title: "Tailwind CSS",  href: "https://tailwindcss.com" },
    { node: <SiFramer />,           title: "Framer Motion", href: "https://www.framer.com/motion" },
]

const demoItems = [
    {
        link: '',
        text: 'Frontend',
        hoverText: 'TypeScript • React.js • Next.js • Vue • Swift • Vapor'
    },
    {
        link: '',
        text: 'UI / UX',
        hoverText: 'Figma • Canva • Wireframing • Prototyping • Design Systems'
    },
    {
        link: '',
        text: 'Platforms',
        hoverText: 'VS Code • Xcode • AI Tools • Git • GitHub'
    },
    {
        link: '',
        text: 'Other',
        hoverText: 'Python • Node.js • Git / GitHub'
    }
]

export default function SkillsPage() {
    return (
        <div className="min-h-screen py-8 sm:py-12 pt-24 sm:pt-30 mobile-safe-area">
            <div className="container mx-auto px-4 mobile-container">

                {/* Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-12 sm:mb-16">
                    <h1 className="mobile-heading-xl sm:text-4xl md:text-5xl font-bold mb-4">
                        My <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Skills</span>
                    </h1>
                    <p className="mobile-text-base text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and design capabilities across various domains.
                    </p>
                </motion.div>

                {/* Flowing Menu Categories */}
                <motion.div {...fadeUp(0.1)} className="mb-12 sm:mb-16">
                    <div className="h-auto min-h-[400px] sm:min-h-[500px] md:h-[600px] relative">
                        <FlowingMenu items={demoItems} />
                    </div>
                </motion.div>

                {/* Skills Category Grid */}
                <motion.div {...fadeUp(0.15)} className="mb-12 sm:mb-16">
                    <div className="text-center mb-8">
                        <h2 className="mobile-heading-lg sm:text-3xl font-bold">
                            Skill <span className="text-primary">Breakdown</span>
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                            Technologies and tools I work with across every layer of the stack
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {skillCategories.map((category, catIdx) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 + catIdx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                                className={`rounded-2xl border ${category.border} bg-gradient-to-br ${category.color} backdrop-blur-sm p-6 relative overflow-hidden group`}
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.02] rounded-2xl pointer-events-none" />

                                {/* Category header */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`w-2 h-2 rounded-full ${category.dot} shrink-0`} />
                                    <h3 className="font-semibold text-base sm:text-lg tracking-wide">{category.label}</h3>
                                </div>

                                {/* Skill badges */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <motion.span
                                            key={skill.name}
                                            whileHover={{ scale: 1.05 }}
                                            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full ${category.accent} cursor-default select-none transition-colors`}
                                        >
                                            {skill.icon && (
                                                <span className="text-sm leading-none">{skill.icon}</span>
                                            )}
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Technology Stack Scroll */}
                <motion.div {...fadeUp(0.2)} className="mt-12 sm:mt-16">
                    <div className="text-center mb-4 sm:mb-6">
                        <h2 className="mobile-heading-lg sm:text-3xl font-bold">
                            Technology <span className="text-primary">Stack</span>
                        </h2>
                    </div>

                    <div className="relative h-[120px] sm:h-[160px] md:h-[200px] overflow-hidden rounded-2xl bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 border border-border/50">
                        <LogoLoop
                            logos={techLogos}
                            speed={70}
                            direction="left"
                            logoHeight={48}
                            gap={48}
                            pauseOnHover
                            scaleOnHover
                            fadeOut
                            fadeOutColor="hsl(var(--background))"
                            ariaLabel="Technology stack"
                            className="h-full flex items-center"
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
