# Deployment Guide

This document provides comprehensive instructions for deploying the Product Manager Portfolio application to production.

## Quick Start

```bash
# Build and validate for production
npm run pre-deploy

# Deploy to Vercel
npm run deploy:vercel

# Deploy to Netlify  
npm run deploy:netlify
```

## Build Configuration

The application is optimized for production with the following features:

- **Code Splitting**: Vendor libraries are separated into chunks for better caching
- **Minification**: JavaScript and CSS are minified using Terser
- **Asset Optimization**: Images and static assets are optimized and cached
- **PWA Support**: Service worker for offline functionality
- **Security Headers**: CSP, XSS protection, and other security measures
- **Environment-specific builds**: Different configurations for development, staging, and production

## Environment Configuration

### Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Available Environments

- **Development** (`.env.development`): Local development with debugging enabled
- **Production** (`.env.production`): Production optimizations and analytics enabled

### Key Environment Variables

```bash
# Application Configuration
VITE_APP_TITLE="Product Manager Portfolio"
VITE_APP_DESCRIPTION="Results-driven Product Manager portfolio"

# Performance Monitoring
VITE_ENABLE_PERFORMANCE_MONITORING="true"

# Social Media Links
VITE_LINKEDIN_URL="https://linkedin.com/in/your-profile"
VITE_GITHUB_URL="https://github.com/your-username"
```

## Deployment Options

### Option 1: Vercel (Recommended)

#### Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Create account at [vercel.com](https://vercel.com)

#### Quick Deploy
```bash
# Login and deploy
vercel login
npm run deploy:vercel
```

#### Manual Setup
1. **Connect Repository**:
   ```bash
   vercel --prod
   ```

2. **Environment Variables**:
   Set in Vercel dashboard under Project Settings > Environment Variables

3. **Custom Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain (e.g., `sarahjohnson.pm`)
   - Follow DNS configuration instructions

4. **SSL Certificate**:
   - Automatically provisioned by Vercel
   - Supports custom domains with Let's Encrypt

#### Automated Deployment
- Pushes to `main` branch trigger production deployments
- Pull requests create preview deployments
- GitHub Actions workflow handles CI/CD

### Option 2: Netlify

#### Prerequisites
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create account at [netlify.com](https://netlify.com)

#### Quick Deploy
```bash
# Login and deploy
netlify login
npm run deploy:netlify
```

#### Manual Setup
1. **Connect Repository**:
   ```bash
   netlify init
   netlify deploy --prod
   ```

2. **Environment Variables**:
   Set in Netlify dashboard under Site Settings > Environment Variables

3. **Custom Domain**:
   - Go to Site Settings > Domain Management
   - Add custom domain
   - Configure DNS records as instructed

4. **SSL Certificate**:
   - Automatically provisioned by Netlify
   - Free Let's Encrypt certificates

## Build Scripts

### Production Build
```bash
npm run build:production        # Build for production
npm run build:staging          # Build for staging
npm run validate-build         # Validate build output
npm run validate-deployment    # Full deployment validation
```

### Development & Testing
```bash
npm run preview:production     # Preview production build
npm run performance-test       # Run performance tests
npm run build:analyze         # Analyze bundle size
```

### Deployment
```bash
npm run pre-deploy            # Lint, test, build, and validate
npm run deploy:vercel         # Deploy to Vercel
npm run deploy:netlify        # Deploy to Netlify
npm run deploy:preview:vercel # Create Vercel preview
npm run deploy:preview:netlify # Create Netlify preview
```

## CI/CD Pipeline

### GitHub Actions Workflow

The project includes automated CI/CD with the following stages:

1. **Test**: Runs linting, unit tests, and accessibility tests
2. **Build**: Creates production build and uploads artifacts
3. **Deploy**: Deploys to both Vercel and Netlify on main branch
4. **Preview**: Creates preview deployments for pull requests

### Required Secrets

Add these secrets to your GitHub repository:

```bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

## Domain and SSL Configuration

### Custom Domain Setup

#### For Vercel:
1. **Add Domain**: In Vercel dashboard, go to Project > Settings > Domains
2. **DNS Configuration**:
   - Add CNAME record: `www.yourdomain.com` → `cname.vercel-dns.com`
   - Add A record: `yourdomain.com` → `76.76.19.61`
3. **Verification**: Domain will be verified automatically

#### For Netlify:
1. **Add Domain**: In Netlify dashboard, go to Site Settings > Domain Management
2. **DNS Configuration**:
   - Add CNAME record: `www.yourdomain.com` → `your-site-name.netlify.app`
   - Add A record: `yourdomain.com` → `75.2.60.5`
3. **Verification**: Domain will be verified automatically

### SSL Certificate

Both Vercel and Netlify provide:
- **Automatic SSL**: Free Let's Encrypt certificates
- **Auto-renewal**: Certificates renew automatically
- **HTTPS Redirect**: Automatic HTTP to HTTPS redirection
- **HSTS**: HTTP Strict Transport Security headers

## Performance Optimization

### Build Optimizations
- **Tree Shaking**: Unused code is eliminated
- **Code Splitting**: Vendor and feature-based chunks
- **Asset Compression**: Gzip/Brotli compression
- **Image Optimization**: WebP format with fallbacks
- **CSS Optimization**: Critical CSS inlining
- **Bundle Size Warnings**: Alerts for chunks over 500KB

### Caching Strategy
- **Static Assets**: 1 year cache with immutable headers
- **HTML**: No cache to ensure updates
- **Service Worker**: Offline functionality and caching

### Performance Monitoring
- **Lighthouse**: Automated performance audits
- **Web Vitals**: Core Web Vitals tracking
- **Bundle Analysis**: Chunk size monitoring

## Security Configuration

### Content Security Policy (CSP)
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self'
```

### Security Headers
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin

## Monitoring and Analytics

### Performance Monitoring
- Enable with `VITE_ENABLE_PERFORMANCE_MONITORING=true`
- Tracks Core Web Vitals and user interactions

### Error Tracking
- Configure error boundary for React components
- Monitor build and deployment errors

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (requires 18+)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Verify environment variables
   - Run `npm run validate-build` to check build output

2. **Deployment Issues**:
   - Check build output in `dist/` directory
   - Verify deployment configuration files (`vercel.json`, `netlify.toml`)
   - Check environment variable settings in hosting platform
   - Review deployment logs in platform dashboard

3. **Domain Issues**:
   - Verify DNS propagation (can take 24-48 hours)
   - Check domain configuration in hosting platform
   - Ensure SSL certificate is active
   - Test with `dig yourdomain.com` or online DNS tools

4. **Performance Issues**:
   - Run `npm run build:analyze` to check bundle sizes
   - Use `npm run performance-test` to identify bottlenecks
   - Check Lighthouse scores in browser dev tools

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)

## Maintenance

### Regular Tasks
- Monitor performance metrics weekly
- Update dependencies monthly: `npm update`
- Review security headers quarterly
- Check SSL certificate status (auto-renewed)
- Analyze bundle sizes after major updates

### Updates
- Test in staging environment first
- Use preview deployments for validation: `npm run deploy:preview:netlify`
- Monitor error rates after deployment
- Rollback if issues detected using platform dashboards

### Health Checks
```bash
# Validate current build
npm run validate-deployment

# Check for security vulnerabilities
npm audit

# Update dependencies
npm update && npm audit fix
```