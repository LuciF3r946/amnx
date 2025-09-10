/**
 * Optimized Professional Navigation Component
 * 
 * Performance optimizations:
 * - Throttled scroll listener for better performance
 * - Memoized components to prevent unnecessary re-renders
 * - Reduced animation complexity
 * - Optimized event handling
 */

'use client'

import { useState, useEffect, useCallback, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home, User, FolderOpen, Award, Mail, ChevronRight, X } from 'lucide-react'
import { Button, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui'
import { ThemeToggle } from '@/components/common'

// Navigation configuration
const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: User },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Skills', href: '/skills', icon: Award },
    { name: 'Contact', href: '/contact', icon: Mail },
]

// Throttle function for scroll events (simplified and type-safe)
function throttle(func: () => void, limit: number): () => void {
    let inThrottle: boolean
    return () => {
        if (!inThrottle) {
            func()
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// Memoized desktop navigation item
const DesktopNavItem = memo(({ item, pathname }: { item: typeof navigation[0], pathname: string }) => {
    const isActive = pathname === item.href

    return (
        <Link
            href={item.href}
            className={`relative text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
        >
            {item.name}
            {isActive && (
                <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
        </Link>
    )
})

DesktopNavItem.displayName = 'DesktopNavItem'

// Memoized mobile navigation item with enhanced touch optimizations and animations
const MobileNavItem = memo(({ item, pathname, onClose }: {
    item: typeof navigation[0],
    pathname: string,
    onClose: () => void
}) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <Link
                href={item.href}
                onClick={onClose}
                className={`group relative flex items-center space-x-4 mobile-nav-item touch-feedback rounded-xl transition-all duration-300 overflow-hidden ${isActive
                    ? 'bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary border border-primary/30 shadow-lg shadow-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent hover:border-border'
                    }`}
            >
                {/* Background gradient animation for active state */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear"
                        }}
                    />
                )}

                {/* Icon with enhanced animation */}
                <motion.div
                    className={`relative z-10 transition-all duration-300 ${isActive ? 'text-primary' : 'group-hover:text-foreground'
                        }`}
                    whileHover={{ rotate: 5 }}
                    whileTap={{ rotate: -5 }}
                >
                    <Icon className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-primary drop-shadow-sm' : 'group-hover:text-foreground'
                        }`} />
                </motion.div>

                {/* Text with better typography */}
                <span className={`font-medium mobile-text-base relative z-10 transition-all duration-300 ${isActive ? 'text-primary font-semibold' : 'group-hover:text-foreground'
                    }`}>
                    {item.name}
                </span>

                {/* Enhanced arrow icon with micro-interaction */}
                <motion.div
                    className="ml-auto relative z-10"
                    animate={{
                        x: isActive ? 4 : 0,
                        opacity: isActive ? 1 : 0.7
                    }}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <ChevronRight className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                        }`} />
                </motion.div>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.div
                        className="absolute left-2 top-1/2 w-1 h-8 bg-primary rounded-full shadow-lg shadow-primary/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        layoutId="mobile-active-indicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                )}

                {/* Ripple effect on tap */}
                <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 0.1 }}
                />
            </Link>
        </motion.div>
    )
})

MobileNavItem.displayName = 'MobileNavItem'

export function Navigation() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // Optimized scroll handler with throttling
    const throttledHandleScroll = useMemo(
        () => throttle(() => {
            setScrolled(window.scrollY > 50)
        }, 16), // ~60fps
        []
    )

    // Memoized close handler with haptic feedback simulation
    const handleClose = useCallback(() => {
        setIsOpen(false)
        // Simulate haptic feedback on mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', throttledHandleScroll, { passive: true })
        return () => window.removeEventListener('scroll', throttledHandleScroll)
    }, [throttledHandleScroll])

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5'
                : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Enhanced Brand Logo with micro-interactions */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Link
                            href="/"
                            className="text-2xl font-bold transition-all duration-300 relative group"
                        >
                            <motion.span
                                className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent hover:from-primary hover:via-foreground hover:to-primary transition-all duration-500 bg-[length:200%_auto] animate-gradient-shift"
                                whileHover={{ scale: 1.1 }}
                            >
                                AS
                            </motion.span>

                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 blur-xl bg-gradient-to-r from-primary/30 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.2 }}
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <DesktopNavItem
                                key={item.name}
                                item={item}
                                pathname={pathname}
                            />
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>

                        {/* Enhanced Mobile Menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden relative overflow-hidden hover:bg-primary/10 transition-all duration-300 touch-target mobile-button group rounded-xl"
                                    aria-label="Open navigation menu"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: isOpen ? 90 : 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="relative"
                                    >
                                        <Menu className="h-6 w-6 transition-colors group-hover:text-primary" />
                                    </motion.div>

                                    {/* Ripple effect background */}
                                    <motion.div
                                        className="absolute inset-0 bg-primary/5 rounded-xl"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileTap={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-full max-w-sm mobile-safe-area bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl overflow-hidden"
                            >
                                {/* Enhanced Close Button */}
                                <SheetClose asChild>
                                    <motion.button
                                        className="absolute top-4 right-4 z-50 p-2.5 rounded-xl bg-accent/50 hover:bg-accent border border-border/50 backdrop-blur-sm transition-all duration-300 group touch-target"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleClose}
                                        aria-label="Close navigation menu"
                                    >
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        </motion.div>

                                        {/* Ripple effect on close button */}
                                        <motion.div
                                            className="absolute inset-0 bg-primary/10 rounded-xl"
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileTap={{ scale: 1.2, opacity: 0.3 }}
                                            transition={{ duration: 0.15 }}
                                        />
                                    </motion.button>
                                </SheetClose>

                                {/* Animated background pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0 bg-grid-pattern animate-pulse" />
                                    <motion.div
                                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-2xl"
                                        animate={{
                                            scale: [1.2, 1, 1.2],
                                            opacity: [0.2, 0.4, 0.2]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                    />
                                </div>

                                {/* Enhanced Header with animated gradient */}
                                <SheetHeader className="pb-8 mobile-xs-padding relative mt-4">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-lg" />
                                    <SheetTitle className="text-left mobile-heading-md relative z-10">
                                        <motion.span
                                            className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-bold animate-gradient-shift bg-[length:200%_auto]"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            Navigation
                                        </motion.span>
                                    </SheetTitle>
                                </SheetHeader>

                                {/* Enhanced Navigation Items with staggered animation */}
                                <motion.div
                                    className="flex flex-col space-y-3 mobile-xs-gap"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    {navigation.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            variants={{
                                                hidden: { opacity: 0, x: 20 },
                                                visible: { opacity: 1, x: 0 }
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 25,
                                                delay: index * 0.05
                                            }}
                                        >
                                            <MobileNavItem
                                                item={item}
                                                pathname={pathname}
                                                onClose={handleClose}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Enhanced Theme Section */}
                                <motion.div
                                    className="mt-8 pt-6 border-t border-border/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="flex items-center justify-between mobile-nav-item rounded-xl bg-accent/30 border border-border/50 backdrop-blur-sm">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-sm font-medium text-foreground">Theme</span>
                                        </div>
                                        <ThemeToggle />
                                    </div>
                                </motion.div>

                                {/* Enhanced Footer */}
                                <motion.div
                                    className="mt-auto pt-6 border-t border-border/50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <div className="mobile-nav-item text-center">
                                        <p className="text-xs text-muted-foreground/60 mt-1">
                                            © 2025 Portfolio. All rights reserved.
                                        </p>
                                    </div>
                                </motion.div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </motion.header>
    )
}
