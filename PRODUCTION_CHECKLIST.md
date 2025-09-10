# 🚀 Production Deployment Checklist for amnx.dev

## ✅ Pre-Deployment Configuration

### Domain Configuration

- [x] Updated `app.config.ts` with domain: `https://amnx.dev`
- [x] Updated `sitemap.ts` with correct base URL
- [x] Updated `robots.ts` with correct sitemap URL
- [x] Updated `package.json` homepage field
- [x] Updated `environment.ts` API base URL

### Security & Performance

- [x] Security headers configured in `next.config.ts`
- [x] CSP policies implemented
- [x] Image optimization settings configured
- [x] Bundle analysis tools available (`npm run analyze`)

### Monitoring & Error Handling

- [x] Error boundaries implemented
- [x] Performance monitoring system active
- [x] Analytics dashboard ready
- [x] Network status monitoring
- [x] Development vs production environment detection

## 📋 Deployment Steps

### 1. Environment Variables Setup

Create `.env.local` file with:

```env
# EmailJS Configuration (Required)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_cuev5bg
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xm2vceb
NEXT_PUBLIC_EMAILJS_USER_ID=OQqwdnWq06LMPdNbX

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Error Reporting (Optional)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### 2. Build & Test

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint

# Build production bundle
npm run build

# Test production build locally
npm run start
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Configure custom domain
# Go to Vercel dashboard → Project → Settings → Domains
# Add: amnx.dev
```

### 4. Domain Configuration

1. Point your domain DNS to Vercel:
   - Type: CNAME
   - Name: @
   - Value: cname.vercel-dns.com

2. Configure SSL certificate (automatic with Vercel)

## 🔍 Post-Deployment Verification

### Functionality Tests

- [ ] Homepage loads correctly
- [ ] Navigation works (desktop & mobile)
- [ ] Project pages load without errors
- [ ] Project modal and lightbox function
- [ ] Contact form sends emails via EmailJS
- [ ] Theme toggle works
- [ ] All animations are smooth

### Performance Tests

- [ ] Lighthouse score > 90 for all metrics
- [ ] Core Web Vitals are green
- [ ] Images load in WebP/AVIF format
- [ ] Bundle size is optimized

### SEO & Technical

- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Meta tags are correct
- [ ] Social sharing cards work
- [ ] Analytics tracking active

### Security Tests

- [ ] Security headers present (check with securityheaders.com)
- [ ] No console errors in production
- [ ] Error boundaries catch and display errors gracefully
- [ ] No sensitive data exposed in client bundle

## 📊 Monitoring Setup

### Analytics Integration

1. Add Google Analytics ID to environment variables
2. Verify tracking in GA dashboard
3. Set up conversion goals

### Performance Monitoring

- Built-in performance dashboard at `/dev/performance` (dev only)
- Monitor Core Web Vitals
- Set up alerts for performance regressions

### Error Tracking

1. Configure Sentry DSN (optional)
2. Monitor error reports
3. Set up alerting for critical errors

## 🔧 Maintenance

### Regular Tasks

- Monitor performance metrics
- Update dependencies monthly
- Review error logs weekly
- Backup project data

### Updates

- Test all functionality after Next.js updates
- Verify EmailJS service remains active
- Check domain renewal dates

## 📞 Support Contacts

### Services Used

- **Domain**: amnx.dev
- **Hosting**: Vercel
- **Email Service**: EmailJS (service_cuev5bg)
- **Analytics**: Google Analytics (if configured)

### Emergency Contacts

- Vercel Support: <support@vercel.com>
- Domain Provider: (your domain registrar)
- EmailJS Support: <support@emailjs.com>

---

**🎉 Congratulations! Your portfolio is production-ready and configured for <https://amnx.dev>**

All features implemented:

- ✅ Responsive navigation with mobile animations
- ✅ Project showcase with working filters
- ✅ Professional image lightbox
- ✅ Working contact form with EmailJS
- ✅ Performance monitoring
- ✅ Error handling
- ✅ SEO optimization
- ✅ Security headers
- ✅ Production analytics ready
