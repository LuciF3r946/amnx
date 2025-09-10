/**
 * Card Component System
 * 
 * A flexible and accessible card component system built with:
 * - Semantic HTML structure using data-slot attributes
 * - Tailwind CSS for styling with design system tokens
 * - Compound component pattern for maximum flexibility
 * - Support for various card layouts and configurations
 * 
 * Usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *     <CardAction>Action buttons</CardAction>
 *   </CardHeader>
 *   <CardContent>Main content</CardContent>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Main Card Container
 * 
 * The root card component that provides the base styling and structure.
 * Features rounded corners, shadow, and responsive padding.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Styled card container
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Header Component
 * 
 * Container for card title, description, and optional action elements.
 * Uses CSS Grid for flexible layout with automatic action positioning.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Styled card header with grid layout
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Title Component
 * 
 * Primary heading element for the card.
 * Optimized typography with semibold weight and tight line-height.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Styled card title
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Card Description Component
 * 
 * Secondary text element providing additional context.
 * Uses muted foreground color for visual hierarchy.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Styled card description
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Card Action Component
 * 
 * Container for action buttons or interactive elements.
 * Automatically positions in the top-right corner of the header.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Positioned action container
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card Content Component
 * 
 * Main content area of the card with consistent padding.
 * Ideal for paragraphs, lists, forms, or other primary content.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Styled content container
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Card Footer Component
 * 
 * Bottom section of the card for actions, metadata, or supplementary info.
 * Includes automatic border-top spacing when used with dividers.
 * 
 * @param className - Additional CSS classes to apply
 * @param props - Standard div props
 * @returns Styled card footer
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
