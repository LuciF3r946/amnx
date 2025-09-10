/**
 * Scrollbar Utility Classes
 * 
 * Provides utility functions and constants for applying custom scrollbar styles
 * that match the project's design system.
 */

export const SCROLLBAR_CLASSES = {
    /**
     * Default premium scrollbar with gradient and hover effects
     * Best for: Main content areas, project listings
     */
    default: '',

    /**
     * Premium scrollbar with enhanced styling and animations
     * Best for: Modal content, important sections
     */
    premium: 'premium-scrollbar',

    /**
     * Thin minimal scrollbar for compact spaces
     * Best for: Sidebars, small content areas
     */
    thin: 'thin-scrollbar',

    /**
     * Legacy custom scrollbar (original implementation)
     * Best for: Backwards compatibility
     */
    custom: 'custom-scrollbar',

    /**
     * Invisible scrollbar while maintaining scroll functionality
     * Best for: Clean designs where scrollbar should be hidden
     */
    invisible: 'invisible-scrollbar'
} as const

export type ScrollbarVariant = keyof typeof SCROLLBAR_CLASSES

/**
 * Get scrollbar class name for a given variant
 */
export function getScrollbarClass(variant: ScrollbarVariant = 'default'): string {
    return SCROLLBAR_CLASSES[variant]
}

/**
 * Apply scrollbar styling to an element programmatically
 */
export function applyScrollbarStyle(
    element: HTMLElement,
    variant: ScrollbarVariant = 'default'
): void {
    // Remove any existing scrollbar classes
    Object.values(SCROLLBAR_CLASSES).forEach(className => {
        if (className) element.classList.remove(className)
    })

    // Apply new scrollbar class
    const className = getScrollbarClass(variant)
    if (className) {
        element.classList.add(className)
    }
}

/**
 * Hook for React components to get scrollbar class
 */
export function useScrollbarClass(variant: ScrollbarVariant = 'default'): string {
    return getScrollbarClass(variant)
}

/**
 * CSS-in-JS styles for programmatic application
 */
export const SCROLLBAR_STYLES = {
    default: {
        scrollbarWidth: 'thin' as const,
        scrollbarColor: 'oklch(60% 0.18 280 / 0.8) hsl(var(--muted) / 0.3)'
    },

    premium: {
        scrollbarWidth: 'auto' as const,
        scrollbarColor: 'oklch(60% 0.18 280 / 0.9) hsl(var(--card) / 0.5)'
    },

    thin: {
        scrollbarWidth: 'thin' as const,
        scrollbarColor: 'oklch(60% 0.18 280 / 0.6) transparent'
    },

    invisible: {
        scrollbarWidth: 'none' as const,
        msOverflowStyle: 'none' as const
    }
} as const

/**
 * Component props interface for scrollbar styling
 */
export interface ScrollbarProps {
    /** Scrollbar variant to apply */
    scrollbarVariant?: ScrollbarVariant
    /** Additional CSS classes */
    className?: string
}

/**
 * Utility to merge scrollbar props with existing className
 */
export function mergeScrollbarProps(
    props: ScrollbarProps,
    existingClassName?: string
): { className: string } {
    const scrollbarClass = getScrollbarClass(props.scrollbarVariant)
    const classNames = [existingClassName, scrollbarClass, props.className]
        .filter(Boolean)
        .join(' ')

    return { className: classNames }
}

/**
 * Example usage patterns
 */
export const SCROLLBAR_EXAMPLES = {
    // React component with custom scrollbar
    component: `
// In your component
import { useScrollbarClass } from '@/lib/scrollbar'

function MyComponent() {
  const scrollbarClass = useScrollbarClass('premium')
  
  return (
    <div className={\`overflow-auto \${scrollbarClass}\`}>
      {/* scrollable content */}
    </div>
  )
}
  `,

    // Programmatic application
    programmatic: `
// Apply to existing element
import { applyScrollbarStyle } from '@/lib/scrollbar'

const element = document.getElementById('my-scrollable-content')
applyScrollbarStyle(element, 'premium')
  `,

    // Props merging
    propsPattern: `
// Component with scrollbar props
import { mergeScrollbarProps, ScrollbarProps } from '@/lib/scrollbar'

interface MyComponentProps extends ScrollbarProps {
  children: React.ReactNode
}

function MyComponent({ children, ...scrollbarProps }: MyComponentProps) {
  const { className } = mergeScrollbarProps(scrollbarProps, 'my-base-class')
  
  return (
    <div className={\`overflow-auto \${className}\`}>
      {children}
    </div>
  )
}
  `
} as const
