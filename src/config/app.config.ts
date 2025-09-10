/**
 * Application Configuration
 * 
 * Central configuration file containing all app-wide constants and settings.
 * This file includes personal information, social links, SEO metadata,
 * animation configurations, and layout specifications.
 */

/**
 * Personal and Contact Information
 * 
 * Core application configuration including personal details,
 * contact information, and social media links.
 * Update this section with your personal information.
 */
export const APP_CONFIG = {
    // Personal information
    name: 'Amanjot Singh',
    title: 'Developer & UI/UX Designer',
    description: 'Crafting digital experiences with modern technologies and thoughtful design',

    // Contact and web presence
    url: 'https://amnx.dev',
    email: 'amanjot29102003@gmail.com',
    location: 'Chandigarh, India',

    // Social media links
    github: 'https://github.com/LuciF3r946',
    linkedin: 'https://linkedin.com/in/amanjot-singh946'
} as const

/**
 * SEO and Social Media Metadata
 * 
 * Comprehensive metadata configuration for:
 * - Search engine optimization (SEO)
 * - Open Graph tags for social media sharing
 * - Twitter Card optimization
 * - Site identification and branding
 */
export const SITE_METADATA = {
    // Dynamic title configuration
    title: {
        default: APP_CONFIG.name,
        template: `%s | ${APP_CONFIG.name}` // Page title | Site name
    },

    // SEO fundamentals
    description: APP_CONFIG.description,
    keywords: [
        'Full Stack Developer',
        'Frontend Developer',
        'React',
        'Next.js',
        'TypeScript',
        'UI/UX Designer',
        'Web Development',
        'Portfolio'
    ],

    // Author attribution
    authors: [{ name: APP_CONFIG.name }],
    creator: APP_CONFIG.name,

    // Open Graph for Facebook, LinkedIn, etc.
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: APP_CONFIG.url,
        title: APP_CONFIG.name,
        description: APP_CONFIG.description,
        siteName: APP_CONFIG.name
    },

    // Twitter Card optimization
    twitter: {
        card: 'summary_large_image',
        title: APP_CONFIG.name,
        description: APP_CONFIG.description,
        creator: '@amanjot'
    }
} as const

/**
 * Animation System Configuration
 * 
 * Standardized animation timing and easing functions
 * to ensure consistent motion design throughout the app.
 * Used by Framer Motion components for smooth transitions.
 */
export const ANIMATION_CONFIG = {
    // Standard animation durations in seconds
    duration: {
        fast: 0.2,    // Quick interactions (button hovers)
        normal: 0.3,  // Standard transitions
        slow: 0.5     // Emphasis animations
    },

    // Easing curve presets for natural motion
    ease: {
        out: 'easeOut',      // Deceleration (most common)
        inOut: 'easeInOut',  // Smooth acceleration/deceleration
        spring: 'spring'     // Bouncy, energetic feel
    },

    // Stagger timing for sequential animations
    stagger: {
        children: 0.1, // Delay between child elements
        items: 0.05    // Delay between list items
    }
} as const

/**
 * Layout and Responsive Design Configuration
 * 
 * Design system specifications for consistent spacing,
 * container widths, and responsive breakpoints.
 * Aligns with Tailwind CSS defaults for seamless integration.
 */
export const LAYOUT_CONFIG = {
    // Container max-widths for different screen sizes
    maxWidth: {
        sm: '640px',   // Small screens
        md: '768px',   // Medium screens  
        lg: '1024px',  // Large screens
        xl: '1280px',  // Extra large screens
        '2xl': '1536px' // 2X large screens
    },

    // Responsive padding system
    padding: {
        mobile: '1rem',   // 16px - Compact spacing for mobile
        tablet: '1.5rem', // 24px - Comfortable spacing for tablets
        desktop: '2rem'   // 32px - Generous spacing for desktop
    }
} as const
