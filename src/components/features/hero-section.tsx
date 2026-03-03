'use client'

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
  ArrowDown, Github, Linkedin, Mail, Sparkles, Code2,
  Palette,
  Brain,
}
  from 'lucide-react'

import { useEffect, useState, useRef } from 'react'
import RotatingText from '@/components/animations/RotatingText'
import Btnb from '../buttons/btnb'
import Btnd from '../buttons/btnd'

const roles = [
  {
    text: 'UI/UX Designer',
    color: 'from-pink-600 via-rose-500 to-purple-600 dark:from-pink-400 dark:via-rose-400 dark:to-purple-400',
    icon: Palette
  },
  {
    text: 'Frontend Developer',
    color: 'from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400',
    icon: Code2
  },
  {
    text: 'Freelancer',
    color: 'from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400',
    icon: Brain
  }
]

export function HeroDynamic() {
  const [currentRole, setCurrentRole] = useState(0)
  const { scrollY } = useScroll()
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  // Mouse parallax for floating orbs
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  // Typewriter state
  const fullDesc = "B.Tech CSE graduate skilled in software development, web technologies, and UI/UX. Passionate about building innovative, efficient solutions."
  const [typedText, setTypedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  // Role rotation + mouse parallax + typewriter
  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30)
    }
    window.addEventListener('mousemove', handleMouseMove)

    let typeTimer: ReturnType<typeof setInterval>
    const typeTimeout = setTimeout(() => {
      let i = 0
      typeTimer = setInterval(() => {
        if (i < fullDesc.length) {
          setTypedText(fullDesc.slice(0, i + 1))
          i++
        } else {
          clearInterval(typeTimer)
          setTypingDone(true)
        }
      }, 20)
    }, 1800)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(typeTimeout)
      clearInterval(typeTimer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = "/doc/Amanjot_Singh_CV.pdf"; // Path to your CV file in the public folder
    link.download = "Amanjot_Singh_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentRoleData = roles[currentRole]

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center will-change-transform"
    >
      {/* Animated Background with gradient mesh */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-600/5 to-blue-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />

      {/* Floating Orbs with improved animation + mouse parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full blur-3xl"
            animate={{
              x: [0, 100 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, -80 - (i * 10), 0],
              scale: [1, 1.2 + (i * 0.05), 1],
              opacity: 1
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${15 + (i * 8)}%`,
              background: i % 2 === 0
                ? 'linear-gradient(to right, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))'
                : 'linear-gradient(to right, rgba(147, 51, 234, 0.15), rgba(59, 130, 246, 0.15))'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
          />
        ))}
        </motion.div>
      </div>

      {/* Animated particles with fixed positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          // Use index-based seeded positioning to ensure consistency
          const leftPos = ((i * 17 + 23) % 100);
          const topPos = ((i * 31 + 41) % 100);
          const yOffset = 20 + ((i * 7) % 30);
          const duration = 3 + ((i * 3) % 5);
          const delay = (i * 0.2) % 5;

          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              animate={{
                y: [0, -yOffset, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              }}
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
            />
          )
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div style={{ y: textY }} className="space-y-6">

          {/* Greeting with sparkle icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center text-xl text-muted-foreground space-x-3"
          >
            {/* Sparkle icon with rotation */}
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-primary mr-1" />
            </motion.div>

            {/* Rotating greetings */}
            <RotatingText
              texts={[
                'Hello', 'Hi', 'Hey', 'Hola', 'Bonjour', 'Ciao', 'Ola',
                'Namaste', 'Konnichiwa', 'Annyeong', 'Aloha'
              ]}
              mainClassName="text-2xl inline-flex items-center justify-center overflow-hidden"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />

            {/* Fixed apostrophe */}
            <span className="ml-1">, I&apos;m</span>
          </motion.div>


          {/* Name with enhanced gradient and animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Aman
            </span>
          </motion.h1>

          {/* Enhanced rotating role with icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-2xl md:text-4xl text-muted-foreground flex items-center justify-center h-16 gap-3"
          >
            {/* <span className="font-light">A</span> */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 30, rotateX: 90, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, rotateX: -90, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <span className={`font-semibold bg-gradient-to-r ${currentRoleData.color} bg-clip-text text-transparent`}>
                  {currentRoleData.text}
                </span>
                <motion.div
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  {currentRoleData.icon && <currentRoleData.icon className="w-8 h-8" />}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Description with staggered animation for words */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed min-h-[3.5rem]"
          >
            {typedText}
            {!typingDone && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="inline-block ml-0.5 text-primary font-light"
              >|</motion.span>
            )}
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center divide-x divide-border/60 rounded-xl border border-border/30 bg-muted/20 backdrop-blur-sm w-fit mx-auto"
          >
            {[
              { value: '10+', label: 'Projects' },
              { value: '15+', label: 'Technologies' },
              { value: '2+', label: 'Years Exp.' },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-3 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Buttons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <Btnb label="About Me" href="/about" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-2 bg-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <Btnd onClick={handleDownload} />
            </motion.div>
          </motion.div>

          {/* Social Links with improved animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 justify-center pt-4"
          >
            {[
              { icon: Github, href: "https://github.com/LuciF3r946", color: "hover:text-gray-800 dark:hover:text-gray-200", bg: "hover:bg-gray-800/10 dark:hover:bg-gray-200/10" },
              { icon: Linkedin, href: "https://linkedin.com/in/amanjot-singh946", color: "hover:text-blue-600", bg: "hover:bg-blue-600/10" },
              { icon: Mail, href: "mailto:amanjot29102003@gmail.com", color: "hover:text-red-500", bg: "hover:bg-red-500/10" }
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground ${social.color} ${social.bg} transition-all duration-300 backdrop-blur-sm relative group`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300, duration: 0.5, delay: 1.4 + (i * 0.1), ease: "easeOut" }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md whitespace-nowrap">
                    {social.href.includes('github') ? 'GitHub' :
                      social.href.includes('linkedin') ? 'LinkedIn' : 'Email'}
                  </span>
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator with improved animation */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}