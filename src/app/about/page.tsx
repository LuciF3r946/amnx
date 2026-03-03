'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { PageTransition } from '@/components/animations'
import { MapPin, Calendar, Heart, Award, GraduationCap, Building2, Briefcase, Coffee } from 'lucide-react'
import { useState } from 'react'
import '../../styles/Timeline.css'

import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faDumbbell, faMusic, faBook } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Btna from '@/components/buttons/btna'


// Animation helpers
const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
})

const fadeInView = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as { once: boolean; margin: string },
    transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
})


const educationData = [
    {
        id: 'edu1',
        institution: 'Amity University',
        title: 'Bachelor of Technology',
        date: '2021 - 2025',
        description: 'I graduated with a B.Tech in Computer Science and Engineering from Amity University, Mohali. During my studies, I built a strong foundation in programming languages, algorithms, and data structures, equipping me with the skills to solve complex technical challenges.',
        icon: GraduationCap,
        active: true
    },
    {
        id: 'edu2',
        institution: 'Courses',
        title: 'Design | Web Development',
        date: '2024',
        description: 'I learned web development and UI/UX design through a certified course, where I gained hands-on experience with tools like Figma and built several responsive web projects.',
        icon: Award,
        active: false
    }
]

const experienceData = [
    {
        id: 'exp1',
        company: 'A2IT',
        title: 'Full Stack Developer Intern',
        date: '2024 (3 Months)',
        description: 'Completed a full-stack development internship where I gained practical experience in designing and implementing clone websites. I worked closely with cross-functional teams to develop efficient, scalable solutions and improved my understanding of both frontend and backend technologies.',
        icon: Building2,
        active: false
    },
    {
        id: 'exp2',
        company: 'Playtplus',
        title: 'UI/UX Designer',
        date: '2025 (6 Months)',
        description: 'Worked as a UI/UX Designer, where I became proficient in Figma and applied it to create user-friendly, visually appealing website interfaces. I collaborated with the team, learning prototyping and design systems to deliver best experiences.',
        icon: Briefcase,
        active: false
    },
    {
        id: 'exp3',
        company: 'Scalercell',
        title: 'Software Developer',
        date: 'Current 2026',
        description: 'Development using React, Vue.js, and TypeScript, building scalable component-based architectures, implementing state management solutions, and collaborating on backend development using Swift to design and develop APIs.',
        icon: Briefcase,
        active: false
    }
]


const values = [
    {
        title: 'Clean Code',
        description: 'Code so readable you’ll think it was written by your future self on a good day. Comments included (because we care).'
    },
    {
        title: 'Continuous Learning',
        description: 'Ship, break, learn, fix, repeat. Curiosity never goes out of style—and neither does our roadmap.'
    },
    {
        title: 'Performance & Quality',
        description: 'Blazing fast, rock-solid, and smooth as butter. Lighthouse smiles, users cheer, and nobody’s laptop takes off like a jet.'
    },
    {
        title: 'Innovation',
        description: 'Smart ideas over shiny distractions. Creative solutions with just the right amount of spice. Practical > gimmicky, always.'
    }
]


const interests: { name: string; icon: IconDefinition; color: string }[] = [
    {
        name: "YouTube",
        icon: faYoutube,
        color:
            "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 dark:from-red-600 dark:to-red-700 dark:shadow-red-600/30",
    },
    {
        name: "Fitness",
        icon: faDumbbell,
        color:
            "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 dark:from-green-600 dark:to-emerald-700 dark:shadow-green-600/30",
    },
    {
        name: "Music",
        icon: faMusic,
        color:
            "bg-gradient-to-r from-purple-500 to-violet-600 text-white border-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 dark:from-purple-600 dark:to-violet-700 dark:shadow-purple-600/30",
    },
    {
        name: "Learning",
        icon: faBook,
        color:
            "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 dark:from-blue-600 dark:to-cyan-700 dark:shadow-blue-600/30",
    },
    {
        name: "Reading",
        icon: faBook,
        color:
            "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-500 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 dark:from-amber-600 dark:to-orange-700 dark:shadow-amber-600/30",
    },
];



function ClassicQualificationItem({ item, isActive }: {
    item: typeof educationData[0],
    isActive: boolean
}) {
    const [isExpanded, setIsExpanded] = useState(isActive)

    const handleClick = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={`resume__item ${isExpanded ? 'active' : ''}`}>
            <div className="resume__header" onClick={handleClick}>
                <div>
                    <h3 className="resume__subtitle">{item.institution}</h3>
                </div>
                <div className="resume__icon">
                    {isExpanded ? '-' : '+'}
                </div>
            </div>

            <div className="resume__content">
                <div className="resume__date-title">
                    <h3 className="resume__title">{item.title}</h3>
                    <span className="resume__date">{item.date}</span>
                </div>
                <p className="resume__description">{item.description}</p>
            </div>
        </div>
    )
}

// Component implementation starts here
const About = () => {
    return (
        <PageTransition>
            <div className="min-h-screen py-12 pt-30">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div {...fadeUp(0)} className="text-center mb-16 space-y-3">
                        {/* <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, delay: 0.05 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Available for opportunities
                        </motion.div> */}
                        <h1 className="text-4xl md:text-5xl font-bold">
                            About <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Me</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-muted-foreground text-lg max-w-xl mx-auto"
                        >
                            Developer · Designer · Creative Thinker
                        </motion.p>
                    </motion.div>

                    {/* Main */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
                        {/* Profile */}
                        <motion.div {...fadeUp(0.1)} className="lg:col-span-1">
                            <Card className="sticky top-24 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                                <CardHeader className="text-center">
                                    {/* Avatar */}
                                    <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full grid place-items-center text-3xl font-bold text-primary shadow-md overflow-hidden">
                                        <img
                                            src="/img/a3.png" // Change this to your actual image path
                                            alt=""
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>

                                    <CardTitle className="text-2xl font-semibold tracking-tight">
                                        Amanjot Singh
                                    </CardTitle>
                                    <CardDescription className="text-base text-muted-foreground">
                                        Developer &amp; Tech Enthusiast
                                    </CardDescription>
                                    <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                        </span>
                                        Open to Work
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4 pt-6">

                                    <motion.div
                                        className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                                        whileHover={{
                                            x: 5,
                                            backgroundColor: "rgba(0,0,0,0.03)",
                                            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                            <MapPin className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-muted-foreground text-sm">Chandigarh, India</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                                        whileHover={{
                                            x: 5,
                                            backgroundColor: "rgba(0,0,0,0.03)",
                                            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                            <Calendar className="h-4 w-4 text-purple-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-muted-foreground text-sm">22 years old</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                                        whileHover={{
                                            x: 5,
                                            backgroundColor: "rgba(0,0,0,0.03)",
                                            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                            <Coffee className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-muted-foreground text-sm">Not a bug, it&apos;s an undocumented feature</p>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>


                        {/* Content */}
                        <motion.div {...fadeUp(0.15)} className="lg:col-span-2 space-y-8">
                            {/* Intro */}
                            <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.03] to-purple-500/[0.03]">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 rounded-l-xl" />
                                <CardContent className="prose prose-neutral dark:prose-invert max-w-none pl-8">
                                    <p className="text-muted-foreground leading-relaxed">
                                        Building polished web experiences with React, Next.js, and Node.js—because users deserve fast, delightful, and reliable apps. Also because slow UIs raise blood pressure.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Believes in shipping early, iterating responsibly, and writing microcopy that helps, not hurdles. Expect tasteful motion, clear language, and zero lorem ipsum. Promise.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Values */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Heart className="h-5 w-5 text-red-500" />
                                        What I Believe In
                                    </CardTitle>
                                    <CardDescription>Principles that keep code calm and users happy</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    {values.map((v, i) => (
                                        <motion.div
                                            key={v.title}
                                            {...fadeInView(i * 0.07)}
                                            whileHover={{ y: -3 }}
                                            className="p-4 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/[0.04] to-purple-500/[0.02] hover:border-primary/30 transition-colors duration-300 cursor-default"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center mb-2">
                                                <span className="text-primary font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
                                            </div>
                                            <h3 className="font-semibold mb-1">{v.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Interests */}
                            <motion.div {...fadeInView(0.1)}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                                                <Coffee className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            When I&apos;m Not Coding
                                        </CardTitle>
                                        <CardDescription>Activities that fuel creativity and keep me inspired</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-3">
                                            {interests.map((interest, i) => (
                                                <motion.div
                                                    key={interest.name}
                                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 18 }}
                                                    whileHover={{ y: -5, scale: 1.06 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <div
                                                        className={`inline-flex items-center text-sm px-5 py-3 font-semibold rounded-full border-2 transition-all duration-300 cursor-default transform ${interest.color}`}
                                                    >
                                                        {/* Render the FA icon */}
                                                        <FontAwesomeIcon icon={interest.icon} className="mr-2 text-base" />
                                                        {interest.name}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* My Journey - Qualification Timeline */}
                    <motion.div {...fadeInView(0)} className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                My <span className="text-primary">Journey</span>
                            </h2>
                            <p className="text-muted-foreground text-lg">Education, Experience & Growth</p>
                        </div>
                        <div className="qualification">
                            <div className="resume__container">
                                <div className="resume__group">
                                    <h3 className="resume__heading">Education</h3>
                                    <div className="resume__items">
                                        {educationData.map((item) => (
                                            <ClassicQualificationItem
                                                key={item.id}
                                                item={item}
                                                isActive={item.active}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="resume__group">
                                    <h3 className="resume__heading">Experience</h3>
                                    <div className="resume__items">
                                        {experienceData.map((item) => (
                                            <ClassicQualificationItem
                                                key={item.id}
                                                item={{ ...item, institution: item.company }}
                                                isActive={item.active}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-center mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-border mobile-container"
                    >
                        <h3 className="mobile-heading-lg sm:text-3xl font-bold mb-4 text-foreground">Interested?</h3>
                        <p className="mobile-text-sm text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
                            I&apos;m always open to discussing new opportunities and exciting projects.
                        </p>
                        <div className="mobile-button-container">
                            <Btna label="My Work" href="/projects" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}

export default About
