'use client'

import { motion } from 'framer-motion'
import { useScrollbarClass } from '@/lib/scrollbar'
import { Card } from '@/components/ui'

/**
 * ScrollbarShowcase Component
 * 
 * Demonstrates all available custom scrollbar variants in your project.
 * Use this component to preview and test different scrollbar styles.
 */

interface ScrollbarDemoProps {
    title: string
    description: string
    variant: 'default' | 'premium' | 'thin' | 'custom' | 'invisible'
    content: string[]
}

function ScrollbarDemo({ title, description, variant, content }: ScrollbarDemoProps) {
    const scrollbarClass = useScrollbarClass(variant)

    return (
        <Card className="p-6 space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                    className=&ldquo;{scrollbarClass || 'default'}&rdquo;
                </code>
            </div>

            <div
                className={`h-32 overflow-auto border border-border/50 rounded-lg p-4 ${scrollbarClass}`}
            >
                <div className="space-y-2">
                    {content.map((item, index) => (
                        <div
                            key={index}
                            className="p-2 bg-muted/30 rounded text-sm"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export function ScrollbarShowcase() {
    const demoContent = [
        "This is scrollable content to demonstrate the custom scrollbar styling.",
        "Each scrollbar variant has different visual characteristics.",
        "The premium variant features gradient colors and hover effects.",
        "The thin variant is minimal and space-efficient.",
        "The default variant balances aesthetics with functionality.",
        "Custom scrollbar maintains the original styling approach.",
        "Invisible scrollbar hides the visual indicator while keeping functionality.",
        "All variants respect your theme's color system.",
        "Dark mode automatically adjusts scrollbar colors.",
        "Hover effects provide visual feedback for better UX.",
        "Smooth transitions enhance the overall feel.",
        "The scrollbar design matches your project's premium aesthetic."
    ]

    const demos: ScrollbarDemoProps[] = [
        {
            title: "Default Scrollbar",
            description: "Premium gradient scrollbar with theme integration",
            variant: "default",
            content: demoContent
        },
        {
            title: "Premium Scrollbar",
            description: "Enhanced styling with shadows and advanced hover effects",
            variant: "premium",
            content: demoContent
        },
        {
            title: "Thin Scrollbar",
            description: "Minimal design for compact spaces",
            variant: "thin",
            content: demoContent
        },
        {
            title: "Custom Scrollbar",
            description: "Original implementation for backwards compatibility",
            variant: "custom",
            content: demoContent
        },
        {
            title: "Invisible Scrollbar",
            description: "Hidden scrollbar while maintaining scroll functionality",
            variant: "invisible",
            content: demoContent
        }
    ]

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold gradient-text">
                    Custom Scrollbar Showcase
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Your project now includes premium custom scrollbars that match the design system.
                    All variants support both light and dark themes with smooth transitions.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {demos.map((demo, index) => (
                    <motion.div
                        key={demo.variant}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ScrollbarDemo {...demo} />
                    </motion.div>
                ))}
            </div>

            <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                <h3 className="text-xl font-semibold text-foreground">Usage Examples</h3>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-foreground mb-2">React Component</h4>
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto custom-scrollbar">
                            {`import { useScrollbarClass } from '@/lib/scrollbar'

function MyComponent() {
  const scrollbarClass = useScrollbarClass('premium')
  
  return (
    <div className={\`overflow-auto \${scrollbarClass}\`}>
      {/* Your scrollable content */}
    </div>
  )
}`}
                        </pre>
                    </div>

                    <div>
                        <h4 className="font-medium text-foreground mb-2">Direct CSS Classes</h4>
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto custom-scrollbar">
                            {`<!-- Default premium scrollbar -->
<div class="overflow-auto">Content</div>

<!-- Premium variant with enhanced styling -->
<div class="overflow-auto premium-scrollbar">Content</div>

<!-- Thin minimal scrollbar -->
<div class="overflow-auto thin-scrollbar">Content</div>

<!-- Invisible scrollbar -->
<div class="overflow-auto invisible-scrollbar">Content</div>`}
                        </pre>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ScrollbarShowcase
