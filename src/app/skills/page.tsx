"use client"

import { motion } from 'framer-motion'


import LogoLoop from "@/components/animations/LogoLoop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiAmazon,
    SiDocker,
    SiKubernetes,
    SiGit,
    SiGithub,
    SiFramer,
} from "react-icons/si";
import FlowingMenu from '@/components/animations/FlowingMenu'

export default function SkillsPage() {

    const techLogos = [
        { node: <SiReact />, title: "React", href: "https://react.dev" },
        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
        { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
        { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
        { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
        { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
        { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
        { node: <SiAmazon />, title: "AWS", href: "https://aws.amazon.com" },
        { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
        { node: <SiKubernetes />, title: "Kubernetes", href: "https://kubernetes.io" },
        { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
        { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
        { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
    ];

    const demoItems = [
        {
            link: '',
            text: 'UI UX',
            hoverText: 'Figma • Wireframing • Prototyping • User Research • Design Systems'
        },
        {
            link: '',
            text: 'FrontEnd',
            hoverText: 'React • NextJS • TypeScript • TailwindCSS • GSAP • ThreeJS'
        },
        {
            link: '',
            text: 'BackEnd',
            hoverText: 'Node.js • Express • MongoDB • PostgreSQL • REST APIs • GraphQL'
        },
        {
            link: '',
            text: 'Tools',
            hoverText: 'Docker • Git • VSCode • ChatGPT • VibeCode • Webpack • Vite'
        }
    ];
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

                {/* Skills Categories - Responsive container */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="mb-12 sm:mb-16"
                >
                    <div className="h-auto min-h-[400px] sm:min-h-[500px] md:h-[600px] relative">
                        <FlowingMenu items={demoItems} />
                    </div>
                </motion.div>

                {/* Technology Stack */}
                <motion.div
                    {...fadeUp(0.2)}
                    className="mt-12 sm:mt-16"
                >
                    <div className="text-center mb-4 sm:mb-1">
                        <h2 className="mobile-heading-lg sm:text-3xl font-bold">
                            Technology <span className="text-primary">Stack</span>
                        </h2>
                    </div>

                    {/* Mobile-optimized logo container */}
                    <div className="relative h-[120px] sm:h-[160px] md:h-[200px] overflow-hidden rounded-2xl bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 border border-border/50">
                        <LogoLoop
                            logos={techLogos}
                            speed={80} // Slower on mobile for better readability
                            direction="left"
                            logoHeight={48} // Smaller on mobile
                            gap={48} // Reduced gap for mobile
                            pauseOnHover
                            scaleOnHover
                            fadeOut
                            fadeOutColor="hsl(var(--background))"
                            ariaLabel="Technology partners"
                            className="h-full flex items-center"
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
