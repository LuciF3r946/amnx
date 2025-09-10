'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { PageTransition } from '@/components/animations'
import {
    Mail,
    Linkedin
} from 'lucide-react'
import { toast } from 'sonner'
import Btns from '@/components/buttons/btns'
import { sendEmail, initEmailJS } from '@/lib/emailjs'

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        value: 'Amanjot29102003@gmail.com',
        link: 'mailto:Amanjot29102003@gmail.com'
    },
]

const socialLinks = [
    {
        icon: Linkedin,
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/amanjot-singh946',
        handle: '/in/amanjot-singh946'
    },
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Initialize EmailJS on component mount
    useEffect(() => {
        initEmailJS()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Validate form data before sending
            if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                toast.error("Please fill in all required fields.")
                return
            }

            // Send email using the configured EmailJS service
            await sendEmail(formData)

            toast.success("Message sent successfully! I'll get back to you soon.", {
                description: "Thank you for reaching out."
            })

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
        } catch (error) {
            console.error('Failed to send message:', error)

            let errorMessage = "Failed to send message. Please try again later."

            if (error instanceof Error) {
                if (error.message.includes('configuration')) {
                    errorMessage = "Email service configuration error. Please contact the administrator."
                } else if (error.message.includes('network') || error.message.includes('fetch')) {
                    errorMessage = "Network error. Please check your connection and try again."
                } else if (error.message.includes('Required')) {
                    errorMessage = error.message
                }
            }

            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

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
        <PageTransition>
            <div className="min-h-screen py-12 pt-30">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Contact <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Me</span>
                        </h1>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-1 space-y-8"
                        >
                            {/* Contact Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                    <CardDescription>
                                        Here&apos;s how you can reach me
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <motion.div
                                            key={info.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                                                <info.icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{info.title}</p>
                                                {info.link ? (
                                                    <a
                                                        href={info.link}
                                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">{info.value}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Connect With Me</CardTitle>
                                    <CardDescription>
                                        Follow my journey and latest updates
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors group"
                                        >
                                            <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{social.name}</p>
                                                <p className="text-xs text-muted-foreground">{social.handle}</p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </CardContent>

                                <CardHeader>
                                    <CardTitle>Current Availability</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <Badge variant="secondary" className="text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900">
                                            Available
                                        </Badge>
                                    </div>
                                </CardContent>

                            </Card>

                            {/* Availability */}

                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-2"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send Me a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and I&apos;ll get back to you as soon as possible
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6 justify-center items-center">
                                        {/* Name and Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                                    Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                                placeholder="What's this about?"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                                                placeholder="Tell me about your project, goals, and how I can help..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-center">
                                            <Btns isSubmitting={isSubmitting} disabled={isSubmitting} />
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                </div>
            </div>
        </PageTransition>
    )
}