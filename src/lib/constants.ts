// Portfolio Configuration
export const PORTFOLIO_CONFIG = {
    // Personal Information
    name: 'Alex Johnson',
    title: 'UI/UX Designer & Frontend Developer',
    tagline: 'Crafting Digital Experiences',
    description: 'Passionate about creating beautiful, accessible, and user-centered digital experiences. I blend creativity with technical expertise to bring innovative ideas to life.',

    // Contact Information
    email: 'hello@alexjohnson.dev',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',

    // Social Links
    social: {
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        twitter: 'https://twitter.com/alexjohnson',
        dribbble: 'https://dribbble.com/alexjohnson',
        behance: 'https://behance.net/alexjohnson'
    },

    // Site Configuration
    site: {
        url: 'https://alexjohnson.dev',
        title: 'Alex Johnson - Portfolio',
        description: 'A premium portfolio showcasing creative design skills and technical expertise in UI/UX design and frontend development.',
        keywords: ['UI/UX Designer', 'Frontend Developer', 'Portfolio', 'Web Design', 'React', 'Next.js'],
        author: 'Alex Johnson',
        ogImage: '/og-image.jpg'
    },

    // Professional Stats
    stats: {
        projectsCompleted: '50+',
        happyClients: '30+',
        yearsExperience: '5+',
        linesOfCode: '100K+',
        designAwards: '5+',
        coffeeCupsPerDay: '∞'
    },

    // Skills & Technologies
    skills: {
        frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
        styling: ['Tailwind CSS', 'Styled Components', 'SASS/SCSS', 'CSS Modules'],
        design: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Framer', 'Principle'],
        tools: ['Git', 'VS Code', 'Docker', 'Webpack', 'Vite', 'ESLint'],
        backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase'],
        animation: ['Framer Motion', 'GSAP', 'Lottie', 'CSS Animations']
    },

    // Current Status
    status: {
        available: true,
        availabilityText: 'Available for new projects',
        responseTime: 'Within 24 hours',
        currentFocus: 'Building exceptional digital experiences',
        workingOn: 'Exciting new projects'
    },

    // Navigation
    navigation: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/skills', label: 'Skills' },
        { href: '/contact', label: 'Contact' }
    ],

    // Theme Configuration
    theme: {
        colors: {
            primary: 'hsl(280, 65%, 60%)',
            secondary: 'hsl(260, 55%, 65%)',
            accent: 'hsl(300, 70%, 55%)'
        }
    }
}

// Animation Configuration
export const ANIMATION_CONFIG = {
    // Duration presets
    duration: {
        fast: 0.3,
        medium: 0.6,
        slow: 1.0,
        verySlow: 1.5
    },

    // Easing presets
    easing: {
        smooth: [0.25, 0.46, 0.45, 0.94],
        bounce: [0.68, -0.55, 0.265, 1.55],
        elastic: [0.25, 0.46, 0.45, 0.94]
    },

    // Stagger delays
    stagger: {
        fast: 0.05,
        medium: 0.1,
        slow: 0.2
    },

    // Spring configurations
    spring: {
        soft: { type: "spring", stiffness: 100, damping: 15 },
        medium: { type: "spring", stiffness: 300, damping: 25 },
        firm: { type: "spring", stiffness: 500, damping: 30 }
    }
}

// Viewport configuration for scroll animations
export const VIEWPORT_CONFIG = {
    once: true,
    margin: "-100px 0px -100px 0px",
    amount: 0.3
}

export default PORTFOLIO_CONFIG
