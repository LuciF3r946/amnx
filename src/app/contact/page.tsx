'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui'
import { PageTransition } from '@/components/animations'
import { Mail, Clock, Copy, Check, ExternalLink } from 'lucide-react'
import { SiLinkedin, SiGithub } from 'react-icons/si'
import { toast } from 'sonner'
import Btns from '@/components/buttons/btns'
import { sendEmail, initEmailJS } from '@/lib/emailjs'

const EMAIL = 'Amanjot29102003@gmail.com'

const socialLinks = [
    {
        Icon: SiLinkedin,
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/amanjot-singh946',
        handle: '/in/amanjot-singh946',
        color: 'group-hover:text-[#0A66C2]',
        bg: 'group-hover:bg-[#0A66C2]/10',
    },
    {
        Icon: SiGithub,
        name: 'GitHub',
        url: 'https://github.com/LuciF3r946',
        handle: '@LuciF3r946',
        color: 'group-hover:text-foreground',
        bg: 'group-hover:bg-foreground/10',
    },
]

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
})

const inputClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 hover:border-border/80'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => { initEmailJS() }, [])

    const handleCopyEmail = async () => {
        await navigator.clipboard.writeText(EMAIL)
        setCopied(true)
        toast.success('Email copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                toast.error('Please fill in all required fields.')
                return
            }
            await sendEmail(formData)
            toast.success("Message sent! I'll get back to you soon.", { description: 'Thank you for reaching out.' })
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            console.error('Failed to send message:', error)
            let msg = 'Failed to send message. Please try again later.'
            if (error instanceof Error) {
                if (error.message.includes('configuration')) msg = 'Email service configuration error.'
                else if (error.message.includes('network') || error.message.includes('fetch')) msg = 'Network error. Check your connection.'
                else if (error.message.includes('Required')) msg = error.message
            }
            toast.error(msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <PageTransition>
            <div className="min-h-screen py-12 pt-28 sm:pt-32">
                <div className="container mx-auto px-4 max-w-6xl">

                    {/* Header */}
                    <motion.div {...fadeUp(0)} className="text-center mb-14">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="text-muted-foreground text-base max-w-xl mx-auto">
                            Have a project in mind or just want to say hi? My inbox is always open.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                        {/* ── Left sidebar ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="lg:col-span-2 flex flex-col gap-5"
                        >
                            {/* Email card */}
                            <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-purple-500/5 p-5 space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    <Mail className="h-4 w-4 text-primary" />
                                    Email
                                </div>
                                <div className="flex items-center justify-between gap-2 bg-background/60 border border-border rounded-xl px-4 py-3">
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="text-sm font-medium hover:text-primary transition-colors truncate"
                                    >
                                        {EMAIL}
                                    </a>
                                    <button
                                        onClick={handleCopyEmail}
                                        className="shrink-0 p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                                        aria-label="Copy email"
                                    >
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Availability card */}
                            <div className="rounded-2xl border border-border bg-gradient-to-br from-green-500/5 to-emerald-500/5 p-5 space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    <Clock className="h-4 w-4 text-green-500" />
                                    Availability
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                                    <Badge variant="secondary" className="text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/40 border border-green-500/20">
                                        Open to opportunities
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Usually responds within <span className="text-foreground font-medium">24 hours</span>
                                </p>
                            </div>

                            {/* Social links card */}
                            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Connect</p>
                                <div className="space-y-2">
                                    {socialLinks.map((social, i) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl border border-border/60 hover:border-border transition-colors duration-200 ${social.bg}`}
                                        >
                                            <social.Icon className={`h-5 w-5 text-muted-foreground transition-colors duration-200 ${social.color}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium leading-none mb-0.5">{social.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{social.handle}</p>
                                            </div>
                                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Contact Form ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="lg:col-span-3"
                        >
                            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold mb-1">Send a Message</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Fill out the form below and I&apos;ll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Name <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                Email <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Subject <span className="text-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    {/* Message + char count */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="message" className="text-sm font-medium">
                                                Message <span className="text-primary">*</span>
                                            </label>
                                            <span className={`text-xs tabular-nums transition-colors ${formData.message.length > 800 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                {formData.message.length} / 1000
                                            </span>
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={6}
                                            maxLength={1000}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`${inputClass} resize-none`}
                                            placeholder="Tell me about your project, goals, and how I can help..."
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="flex justify-end pt-1">
                                        <Btns isSubmitting={isSubmitting} disabled={isSubmitting} />
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </PageTransition>
    )
}