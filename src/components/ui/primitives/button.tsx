/**
 * Button Component System
 * 
 * A comprehensive button component built with:
 * - Multiple variant styles (default, destructive, outline, secondary, ghost, link)
 * - Size variations (default, sm, lg, icon)
 * - Class variance authority for type-safe variant management
 * - Enhanced accessibility with focus rings and ARIA support
 * - Support for both button and anchor elements via Slot composition
 * 
 * Features:
 * - Advanced focus states with custom ring styling
 * - Smooth transitions and hover effects
 * - Icon-only button support with proper sizing
 * - Dark mode optimized styling
 * - Automatic icon sizing and positioning
 * - Error state styling with aria-invalid support
 * 
 * Usage:
 * <Button variant="default" size="lg">Click me</Button>
 * <Button variant="outline" size="icon"><Icon /></Button>
 * <Button asChild><Link href="/path">Navigate</Link></Button>
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button Variant Configuration
 * 
 * Uses class-variance-authority to create type-safe variants with:
 * 
 * Base styles:
 * - Inline flex layout with center alignment and gap
 * - Enhanced focus management with custom ring styling
 * - Smooth transitions for all interactive states
 * - Automatic SVG icon handling and sizing
 * - ARIA invalid state styling for form validation
 * - Dark mode optimized color schemes
 * 
 * Variants:
 * - default: Primary brand colored button with shadow
 * - destructive: Red warning/danger button with enhanced focus
 * - outline: Border-only with background hover effects
 * - secondary: Muted background alternative with shadow
 * - ghost: Transparent with accent hover effects
 * - link: Text-only link styling with underline
 * 
 * Sizes:
 * - default: Standard button dimensions (36px height)
 * - sm: Compact size for tight layouts (32px height)
 * - lg: Large size for emphasis (40px height)
 * - icon: Square button optimized for icons (36x36px)
 * 
 * Advanced Features:
 * - has-[>svg] selector for dynamic padding with icons
 * - Custom focus ring colors per variant
 * - Shadow system for depth and hierarchy
 * - Responsive icon sizing with size constraints
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button Component
 * 
 * Flexible button component that can render as:
 * - Standard HTML button element (default)
 * - Composition slot for complex patterns (asChild=true)
 * 
 * The component automatically applies the correct variant styles,
 * handles disabled states, focus management, accessibility, and
 * provides advanced features like dynamic padding for icons.
 * 
 * Key Features:
 * - Type-safe variant and size props
 * - Automatic icon detection and padding adjustment
 * - Enhanced focus states with custom ring styling
 * - Full keyboard navigation support
 * - ARIA attributes for screen readers
 * - Dark mode optimized styling
 * 
 * @param className - Additional CSS classes to merge with variants
 * @param variant - Visual style variant to apply
 * @param size - Size variant to apply  
 * @param asChild - When true, renders as Slot for composition
 * @param props - Standard button HTML attributes
 * @returns Styled button component with data-slot attribute
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
