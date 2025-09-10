'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Clock, CheckCircle, Instagram } from 'lucide-react'
import { Button } from '@/components/ui'

const footerLinks = {
    portfolio: [
        { name: 'Projects', href: '/projects' },
        { name: 'Skills', href: '/skills' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ],
    connect: [
        { name: 'GitHub', href: 'https://github.com/LuciF3r946', icon: Github },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/amanjot-singh946', icon: Linkedin },
        { name: 'Instagram', href: 'https://www.instagram.com/_amanjot_29', icon: Instagram }
    ]
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative border-t bg-background/95 backdrop-blur-sm">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

            <div className="container mx-auto px-6 py-16 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            className="inline-block text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-200 mb-4"
                        >
                            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                                AS
                            </span>
                        </Link>

                        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                            Crafting exceptional digital experiences through innovative design and cutting-edge technology.
                            <span className="text-foreground font-medium"> Let's build something extraordinary together.</span>
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mb-8">
                            {footerLinks.connect.map((link) => (
                                <Button
                                    key={link.name}
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                    className="rounded-md hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.name}
                                    >
                                        <link.icon className="h-5 w-5" />
                                    </a>
                                </Button>
                            ))}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <p className="mb-2">
                                © {currentYear} <span className="font-medium text-foreground">Portfolio.</span> All rights reserved.
                            </p>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                        <h3 className="font-semibold mb-8 flex items-center gap-2 text-lg">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            Quick Links
                        </h3>
                        <nav className="space-y-4">
                            {footerLinks.portfolio.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 hover:font-medium"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h3 className="font-semibold mb-8 flex items-center gap-2 text-lg">
                            <Mail className="w-5 h-5 text-primary" />
                            Let’s Connect
                        </h3>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <Mail className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <a
                                            href="mailto:hello@yourname.com"
                                            className="text-primary hover:underline transition-all duration-300 font-medium"
                                        >
                                            amanjot29102003@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-sm font-medium">Available for projects</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Get Back to you</p>
                                        <span className="text-sm font-medium">Within 24 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
