// Clean, minimal animation utilities for smooth user experience

// Simple fade in animation
export const fadeIn = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
}

// Subtle slide up animation
export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
}

// Gentle stagger for grouped elements
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.08
        }
    }
}

// Minimal hover effect for interactive elements
export const gentleHover = {
    whileHover: {
        y: -2,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    }
}

// Subtle button press feedback
export const buttonPress = {
    whileTap: { scale: 0.98 }
}

// Clean page transition
export const pageTransition = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
}
