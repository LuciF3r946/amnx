# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality

- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build passes without errors (`npm run build`)
- [ ] Performance optimizations applied
- [ ] Error boundaries implemented

### ✅ Production Configuration

- [ ] Environment variables configured
- [ ] EmailJS credentials set up
- [ ] Analytics tracking configured
- [ ] SEO meta tags optimized
- [ ] Sitemap and robots.txt generated

### ✅ Performance & Security

- [ ] Images optimized and compressed
- [ ] Bundle size analyzed
- [ ] Security headers configured
- [ ] HTTPS enabled
- [ ] Error monitoring set up

## Deployment Platforms

### 🌟 Vercel (Recommended)

#### Prerequisites

- GitHub repository
- Vercel account

#### Steps

1. **Connect Repository**

   ```bash
   # Push to GitHub
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Environment Variables**
   Add in Vercel dashboard:

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Custom Domain (Optional)**
   - Add custom domain in Vercel settings
   - Configure DNS records

#### Build Commands

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### 🚀 Netlify

#### Steps

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - New site from Git
   - Select repository

2. **Build Settings**

   ```
   Build command: npm run build && npm run export
   Publish directory: out
   ```

3. **Environment Variables**
   Add in Netlify dashboard under Site settings > Environment variables

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_ENV = "production"
```

### ☁️ AWS Amplify

#### Steps

1. **Connect Repository**
   - AWS Amplify Console
   - Connect app > GitHub
   - Select repository

2. **Build Settings**

   ```yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### 🌐 Digital Ocean App Platform

#### Steps

1. **Create App**
   - Digital Ocean Apps
   - Create from GitHub
   - Select repository

2. **App Configuration**

   ```yaml
   name: portfolio
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/portfolio
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
   ```

## Build Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Alternative analysis
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer .next/static/chunks/
```

### Performance Optimization

```bash
# Check Core Web Vitals
npm run build
npm run start
# Test with Lighthouse
```

### Image Optimization

```bash
# Optimize images before deployment
npm install -g imagemin-cli
imagemin public/projects/*.{jpg,png} --out-dir=public/projects/optimized
```

## Post-Deployment Steps

### 🔍 Monitoring Setup

1. **Google Analytics**

   ```tsx
   // Add to layout.tsx
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout() {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
         </body>
       </html>
     )
   }
   ```

2. **Error Monitoring**

   ```bash
   # Install Sentry
   npm install @sentry/nextjs
   
   # Configure in next.config.js
   const { withSentryConfig } = require('@sentry/nextjs')
   ```

3. **Performance Monitoring**
   - Web Vitals tracking already implemented
   - Analytics dashboard available
   - Custom performance metrics collection

### 🛡️ Security Headers

Create `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

### 📊 SEO Verification

1. **Google Search Console**
   - Add and verify your domain
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Social Media Meta Tags**
   - Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Troubleshooting

### Common Issues

1. **Build Fails**

   ```bash
   # Clear cache and rebuild
   rm -rf .next
   rm -rf node_modules
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Restart development server after changes
   - Check deployment platform environment settings

3. **Images Not Loading**
   - Verify image paths are correct
   - Check Next.js Image optimization settings
   - Ensure images are in `public` directory

4. **EmailJS Not Working**
   - Verify service ID, template ID, and public key
   - Check CORS settings in EmailJS dashboard
   - Test with simplified payload first

### Performance Issues

1. **Slow Load Times**
   - Analyze bundle size
   - Implement code splitting
   - Optimize images and fonts
   - Enable compression

2. **Poor Core Web Vitals**
   - Use Next.js Image component
   - Minimize layout shifts
   - Optimize third-party scripts
   - Implement proper loading states

## Domain & SSL

### Custom Domain Setup

1. **Purchase Domain**
   - Namecheap, GoDaddy, or CloudFlare

2. **DNS Configuration**

   ```
   Type: CNAME
   Name: www
   Value: your-app.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   ```

3. **SSL Certificate**
   - Automatically provided by most platforms
   - Verify HTTPS redirect is working

## Maintenance

### Regular Updates

- Update dependencies monthly
- Monitor security vulnerabilities
- Review performance metrics
- Update content and projects

### Backup Strategy

- Regular GitHub commits
- Database backups (if applicable)
- Environment variables backup
- Asset backups

Your portfolio is now production-ready! 🎉
