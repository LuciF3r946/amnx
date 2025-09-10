import { Home, User, Briefcase, Code, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import type { NavItem, SocialLink } from '@/types/navigation.types'

// Main navigation items
export const MAIN_NAVIGATION: NavItem[] = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: Home
    },
    {
        id: 'about',
        label: 'About',
        href: '/about',
        icon: User
    },
    {
        id: 'projects',
        label: 'Projects',
        href: '/projects',
        icon: Briefcase
    },
    {
        id: 'skills',
        label: 'Skills',
        href: '/skills',
        icon: Code
    },
    {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        icon: Mail
    }
]

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
    {
        platform: 'GitHub',
        url: 'https://github.com/amanjot',
        icon: Github,
        label: 'View GitHub profile'
    },
    {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/amanjot',
        icon: Linkedin,
        label: 'Connect on LinkedIn'
    },
    {
        platform: 'Twitter',
        url: 'https://twitter.com/amanjot',
        icon: Twitter,
        label: 'Follow on Twitter'
    }
]

// Footer navigation
export const FOOTER_NAVIGATION = {
    main: MAIN_NAVIGATION.slice(1), // Exclude home from footer
    social: SOCIAL_LINKS
}
