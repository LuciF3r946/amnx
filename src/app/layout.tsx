/**
 * Root Layout Component
 * 
 * This is the main layout component that wraps all pages in the application.
 * It handles:
 * - SEO metadata configuration
 * - Font loading and optimization
 * - Global theme provider setup
 * - Common layout elements (navigation, footer, etc.)
 * - Interactive features (click spark effects, toast notifications)
 */

import type { Metadata } from "next";
import { Inter, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";
import { Navigation } from "@/components/layout";
import { Footer } from "@/components/layout";
import { BackToTop } from "@/components/common";
import { Toaster } from "@/components/ui";
import { ClickSpark } from "@/components/animations";
import StyledComponentsRegistry from "@/lib/registry";

/**
 * Font Configuration
 * 
 * Premium typography system using Google Fonts with:
 * - Inter: Primary UI font with excellent readability
 * - Manrope: Display font for headings and emphasis
 * - Poppins: Accent font for special elements
 * 
 * All fonts use 'swap' display for better performance
 * and include multiple weights for design flexibility
 */

// Primary UI font - Modern and highly readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Display font - Clean and professional for headings
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Accent font - Geometric and friendly for special elements
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

/**
 * SEO Metadata Configuration
 * 
 * Comprehensive metadata setup for:
 * - Search engine optimization
 * - Social media sharing (Open Graph, Twitter)
 * - Web app manifest compatibility
 * - Author and creator attribution
 */
export const metadata: Metadata = {
  // Basic SEO
  title: "Designer | Developer",
  description: "A premium portfolio showcasing creative design skills and technical expertise in UI/UX design and frontend development.",
  keywords: ["UI/UX Designer", "Frontend Developer", "Portfolio", "Web Design", "React", "Next.js"],

  // Author information
  authors: [{ name: "Aman" }],
  creator: "Portfolio Owner",

  // Open Graph for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Amnx.Dev",
    title: "Designer | Developer",
    description: "Portfolio showcasing creative design skills and technical expertise.",
    siteName: "Portfolio",
  },

  icons: {
    icon: "/img/a1.png", // <- place your favicon in the public folder
  },
};

/**
 * Root Layout Component
 * 
 * The main layout wrapper that provides:
 * - HTML document structure with proper lang attribute
 * - Theme provider for dark/light mode switching
 * - Navigation and footer components
 * - Interactive click spark effects
 * - Toast notification system
 * - Scroll-to-top functionality
 * 
 * @param children - The page content to be rendered
 * @returns Complete HTML document structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} ${poppins.variable} font-sans antialiased`}>
        <StyledComponentsRegistry>
          {/* Theme Provider - Handles dark/light mode with system preference support */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Main Navigation - Fixed header with responsive menu */}
            <Navigation />

            {/* Interactive Click Effects - Adds spark animations on user clicks */}
            <ClickSpark sparkSize={10} sparkRadius={20} sparkCount={8} duration={500}>
              {/* Main Content Area - Where all page content is rendered */}
              <main className="min-h-screen">
                {children}
              </main>
            </ClickSpark>

            {/* Site Footer - Contact info and links */}
            <Footer />

            {/* Back to Top Button - Appears when user scrolls down */}
            <BackToTop />

            {/* Toast Notifications - For user feedback and alerts */}
            <Toaster />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

