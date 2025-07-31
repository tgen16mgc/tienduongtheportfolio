# Tasks: Web Performance Optimization

## Relevant Files

- `src/components/ui/ResponsivePicture.tsx` - Main image optimization component that needs CDN integration
- `src/components/ui/OptimizedImage.tsx` - Next.js Image component wrapper for optimization
- `src/app/layout.tsx` - Root layout where font loading and resource hints will be optimized
- `src/app/page.tsx` - Main page component that needs code splitting and lazy loading
- `src/components/sections/Hero.tsx` - Hero section that needs critical image preloading
- `src/components/sections/Projects.tsx` - Projects section that needs lazy loading optimization
- `src/components/ui/Carousel.tsx` - Carousel component that needs intersection observer optimization
- `src/hooks/useParallax.ts` - Parallax hook that needs performance optimization
- `next.config.js` - Next.js configuration for image domains and build optimizations
- `package.json` - Dependencies and build scripts for optimization
- `src/app/globals.css` - Global styles that need critical CSS extraction
- `scripts/optimize-images.js` - Image optimization script that needs enhancement
- `src/components/ui/ProfileCard.tsx` - Profile card component that needs React.memo optimization
- `src/components/ui/GlassmorphicContact.tsx` - Contact form component that needs lazy loading
- `src/components/ui/ContactFeedback.tsx` - Feedback component that needs optimization
- `src/components/ui/CustomCursor.tsx` - Custom cursor component that needs passive event listeners
- `src/components/ui/Header.tsx` - Header component that needs optimization
- `src/components/ui/faq-section.tsx` - FAQ section that needs lazy loading
- `src/components/ui/button.tsx` - Button component that needs optimization
- `src/components/ui/input.tsx` - Input component that needs optimization
- `src/components/ui/textarea.tsx` - Textarea component that needs optimization
- `src/components/ui/checkbox.tsx` - Checkbox component that needs optimization
- `src/components/ui/SectionDivider.tsx` - Section divider component that needs optimization
- `src/components/ui/ClientWrapper.tsx` - Client wrapper component that needs optimization
- `src/components/ui/TitleSection.tsx` - Title section component that needs optimization
- `src/components/FullScreenMenu.tsx` - Full screen menu component that needs lazy loading
- `src/components/HamburgerMenu.tsx` - Hamburger menu component that needs optimization
- `src/components/Navigation.tsx` - Navigation component that needs optimization
- `src/components/sections/About.tsx` - About section that needs lazy loading
- `src/components/sections/Contact.tsx` - Contact section that needs lazy loading
- `src/components/sections/Skills.tsx` - Skills section that needs lazy loading
- `src/app/contact/page.tsx` - Contact page that needs lazy loading
- `src/app/faq/page.tsx` - FAQ page that needs lazy loading
- `src/app/api/contact/route.ts` - API route that needs optimization
- `src/lib/email.ts` - Email utility that needs optimization
- `src/lib/rateLimit.ts` - Rate limiting utility that needs optimization
- `src/lib/validation.ts` - Validation utility that needs optimization
- `src/lib/utils.ts` - Utility functions that need optimization
- `tailwind.config.js` - Tailwind configuration that needs optimization
- `postcss.config.js` - PostCSS configuration that needs optimization

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npm test` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Image Optimization and CDN Implementation
  - [x] 1.1 Audit current image usage and identify optimization opportunities
- [x] 1.2 Enhance ResponsivePicture component with better CDN integration
- [x] 1.3 Implement critical image preloading for hero section
  - [ ] 1.4 Optimize image formats (WebP/AVIF) for all images
  - [ ] 1.5 Implement lazy loading for below-the-fold images
  - [ ] 1.6 Configure proper image caching headers
  - [ ] 1.7 Test and validate 846 KiB savings target

- [ ] 2.0 JavaScript Bundle Optimization
  - [x] 2.1 Implement dynamic imports for heavy libraries (Three.js, GSAP)
  - [x] 2.2 Add code splitting for non-critical components
  - [x] 2.3 Optimize parallax effects with requestAnimationFrame
  - [x] 2.4 Implement passive event listeners for scroll performance
  - [x] 2.5 Remove unused JavaScript and legacy code
  - [x] 2.6 Optimize React components with React.memo where beneficial
  - [x] 2.7 Implement intersection observers for animations
  - [x] 2.8 Test and validate 23 KiB JavaScript savings

- [ ] 3.0 CSS and Font Loading Optimization
  - [x] 3.1 Extract and inline critical CSS
- [x] 3.2 Implement font display swap for Google Fonts
- [x] 3.3 Preload critical fonts
  - [x] 3.4 Defer non-critical CSS loading
  - [x] 3.5 Optimize Tailwind CSS purging
  - [x] 3.6 Implement CSS minification and compression
  - [x] 3.7 Test font loading performance improvements

- [ ] 4.0 Component-Level Performance Optimization
  - [ ] 4.1 Optimize ProfileCard component with React.memo
  - [ ] 4.2 Implement lazy loading for Contact and FAQ sections
  - [ ] 4.3 Optimize Carousel component with intersection observer
  - [ ] 4.4 Enhance CustomCursor with passive event listeners
  - [ ] 4.5 Optimize navigation components for performance
  - [ ] 4.6 Implement proper loading states for async components
  - [ ] 4.7 Test component-level performance improvements

- [ ] 5.0 Build and Delivery Optimization
  - [ ] 5.1 Configure proper cache headers for static assets
  - [ ] 5.2 Implement resource hints (preconnect, prefetch, preload)
  - [ ] 5.3 Optimize bundle splitting and tree shaking
  - [ ] 5.4 Configure compression (gzip/brotli) settings
  - [ ] 5.5 Implement HTTP/2 optimizations
  - [ ] 5.6 Test build optimization improvements
  - [ ] 5.7 Validate 90+ PageSpeed score achievement 