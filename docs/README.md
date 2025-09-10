# Amanjot Singh - Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS, showcasing professional projects and skills with thoughtful animations and design.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Dark/Light Theme**: System-aware theme switching with smooth transitions
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Interactive Components**: Custom iPhone demo, project showcases, skill visualizations
- **SEO Optimized**: Meta tags, structured data, sitemap generation
- **Performance Focused**: Image optimization, lazy loading, code splitting
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support

## � Tech Stack

### Core Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

### Development Tools

- **Code Quality**: ESLint, Prettier
- **Package Manager**: npm
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   ├── skills/            # Skills overview
│   └── layout.tsx         # Root layout
├── components/            # Reusable components (organized by category)
│   ├── layout/           # Layout components (Navigation, Footer, etc.)
│   ├── common/           # Shared utility components (Theme, Loading, etc.)
│   ├── features/         # Feature-specific components (Hero, ClickSpark, etc.)
│   ├── animations/       # Animation components (ScrollReveal, Transitions)
│   ├── ui/              # UI primitives with index exports (Button, Card, etc.)
│   └── index.ts         # Main component exports
├── config/               # Configuration and constants
│   ├── app.config.ts    # App metadata and animation configs
│   ├── navigation.config.ts # Navigation structure
│   ├── constants.ts     # Site constants and theme colors
│   └── index.ts         # Config exports
├── data/                 # Static data with organized exports
│   ├── projects.ts      # Project portfolio data
│   ├── skills.ts        # Skills and technologies
│   └── index.ts         # Data exports
├── hooks/                # Custom React hooks with exports
│   ├── use-scroll.ts    # Scroll position tracking
│   ├── use-theme.ts     # Theme management
│   ├── use-media-query.ts # Responsive breakpoints
│   ├── use-local-storage.ts # Local storage utilities
│   └── index.ts         # Hook exports
├── lib/                  # Utility functions and helpers
│   ├── utils.ts         # General utilities (cn, etc.)
│   ├── constants.ts     # Library constants
│   ├── animations.ts    # Animation configurations
│   ├── scroll-animations.ts # Scroll-based animations
│   └── index.ts         # Lib exports
├── styles/               # Global styles and CSS
│   └── hero-animations.css # Component-specific styles
└── types/                # TypeScript type definitions
    ├── project.types.ts # Project-related types
    ├── ui.types.ts      # UI component types
    ├── navigation.types.ts # Navigation types
    └── index.ts         # Type exports with common interfaces
```

## 🎨 Customization

### 1. Personal Information

Update the following files with your information:

- `src/app/layout.tsx` - Meta tags and site title
- `src/app/page.tsx` - Hero section content
- `src/app/about/page.tsx` - Personal bio and timeline
- `src/components/footer.tsx` - Contact information

### 2. Projects Data

Edit `src/app/projects/page.tsx` to add your projects:

```typescript
const projects = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    category: 'UI/UX Design',
    tech: ['React', 'TypeScript'],
    // ... other fields
  }
]
```

### 3. Skills & Experience

Update `src/app/skills/page.tsx` with your skills and proficiency levels.

### 4. Styling

- Colors: Modify `src/app/globals.css` CSS variables
- Components: Customize in `components.json` for ShadCN UI
- Typography: Update font in `src/app/layout.tsx`

### 5. Contact Form

The contact form currently shows success messages. To make it functional:

1. Add your preferred form handling service (Formspree, Resend, etc.)
2. Update the `handleSubmit` function in `src/app/contact/page.tsx`

## 📈 Performance

This portfolio is optimized for performance:

- ✅ **Core Web Vitals** - Excellent scores across all metrics
- ✅ **Image Optimization** - Next.js Image component with lazy loading
- ✅ **Code Splitting** - Automatic code splitting by Next.js
- ✅ **SEO** - Complete meta tags, structured data, and sitemap

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms

The project can be deployed to:

- Netlify
- AWS Amplify
- Azure Static Web Apps
- Any platform supporting Node.js

### Build Command

```bash
npm run build
```

## 🎯 Features to Add (Optional)

### Phase 2 Enhancements

- [ ] **Blog Section** - MDX-powered blog
- [ ] **CMS Integration** - Headless CMS for easy content updates
- [ ] **Analytics** - Google Analytics or Vercel Analytics
- [ ] **Newsletter** - Email subscription integration
- [ ] **3D Elements** - Three.js interactive backgrounds
- [ ] **Multi-language** - i18n support with next-intl

### AI-Powered Features (Bonus Challenge)

- [ ] **Project Recommender** - AI suggestions based on user behavior
- [ ] **Career Summary Generator** - Dynamic pitch generation
- [ ] **Smart Contact Form** - AI-enhanced auto-replies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [ShadCN UI](https://ui.shadcn.com/) - Component library
- [Lucide](https://lucide.dev/) - Icon library

---

**Made with ❤️ using Next.js & Tailwind CSS**


# Components Architecture

This directory contains all React components organized following enterprise-level patterns and best practices.

## Directory Structure

```
components/
├── ui/                    # Base design system components
│   ├── primitives/       # Fundamental UI building blocks
│   ├── forms/            # Form-related components
│   └── navigation/       # Navigation-specific UI components
├── layout/               # Page layout and structure components
├── features/             # Feature-specific business logic components
├── common/               # Shared utility components
├── animations/           # Animation and motion components
├── providers/            # Context providers and wrappers
└── index.ts             # Barrel exports for clean imports
```

## Component Categories

### 🎨 UI Components (`ui/`)

Base design system components that are reusable across the entire application:

- **Primitives**: Button, Card, Badge, Separator, etc.
- **Forms**: Input, Textarea, Select, Checkbox, etc.
- **Navigation**: NavigationMenu, DropdownMenu, Sheet, etc.
- **Feedback**: Progress, Sonner (toasts), Dialog, etc.

### 🏗️ Layout Components (`layout/`)

Components that handle page structure and organization:

- **Navigation**: Main navigation, mobile menu
- **Footer**: Site footer with links and information
- **PageLayout**: Main page wrapper with consistent spacing
- **Section**: Reusable section container with styling

### ⚡ Feature Components (`features/`)

Business logic components specific to application features:

- **Hero**: Landing page hero sections
- **Projects**: Project cards, galleries, and displays
- **Skills**: Skill cards and visualizations
- **Contact**: Contact forms and information

### 🔧 Common Components (`common/`)

Shared utility components used across multiple features:

- **ThemeToggle**: Dark/light mode switcher
- **BackToTop**: Scroll-to-top functionality
- **Loading**: Loading states and skeletons

### ✨ Animation Components (`animations/`)

Motion and animation-related components:

- **ScrollReveal**: Scroll-triggered animations
- **PageTransition**: Route change animations
- **ClickSpark**: Interactive click effects

### 🎯 Providers (`providers/`)

React context providers and application-wide wrappers:

- **ThemeProvider**: Theme and dark mode context
- **MotionProvider**: Framer Motion configuration

## Import Patterns

### ✅ Recommended

```typescript
// Use barrel exports for clean imports
import { Button, Card, Badge } from '@/components/ui'
import { Navigation, Footer } from '@/components/layout'
import { HeroSection, ProjectCard } from '@/components/features'
```

### ❌ Avoid

```typescript
// Avoid deep imports
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
```

## Component Guidelines

### 1. **Naming Convention**

- Use PascalCase for component names
- Use kebab-case for file names
- Match file name with default export

### 2. **Component Structure**

```typescript
// ComponentName.tsx
interface ComponentNameProps {
  // Props interface
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Component implementation
}

// Alternative export pattern for complex components
export { ComponentName }
export type { ComponentNameProps }
```

### 3. **Documentation**

- Add JSDoc comments for complex components
- Include usage examples in component files
- Document prop interfaces thoroughly

### 4. **Testing**

- Co-locate test files: `ComponentName.test.tsx`
- Use descriptive test names
- Test both happy path and edge cases

## Architecture Principles

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Favor component composition patterns
3. **Props Interface**: Always define TypeScript interfaces for props
4. **Accessibility**: Ensure all components follow WCAG guidelines
5. **Performance**: Use React.memo, useMemo, and useCallback when appropriate
6. **Consistency**: Follow established patterns across all components
