# Image Optimization and CDN Setup

This document explains how to optimize images and serve them through a CDN for better performance in the portfolio website.

## Image Optimization

The project uses Next.js built-in image optimization along with the `sharp` library to convert images to modern formats (WebP and AVIF) and create responsive versions.

### How to Optimize Images

1. Place your original images in the `/public/images/` directory
2. Run the optimization script:

```bash
npm run optimize-images
```

This will:
- Convert images to WebP and AVIF formats
- Create responsive versions in different sizes (640px, 1024px, 1920px)
- Optimize the images for web delivery

### Generated Files

For each image (e.g., `example.jpg`), the script generates:
- `example.webp` - Full-size WebP version
- `example-sm.webp`, `example-md.webp`, `example-lg.webp` - Responsive WebP versions
- `example-sm.avif`, `example-md.avif`, `example-lg.avif` - Responsive AVIF versions

## Using the ResponsivePicture Component

The `ResponsivePicture` component automatically selects the best image format and size based on the user's browser and screen size.

```jsx
import ResponsivePicture from '@/components/ui/ResponsivePicture';

// Local image
<ResponsivePicture
  basePath="/images"
  filename="example"
  alt="Example image"
  width={800}
  height={600}
/>

// CDN image
<ResponsivePicture
  basePath="/images"
  filename="example"
  alt="Example image"
  width={800}
  height={600}
  useCdn={true}
/>
```

## CDN Setup

To serve images through a CDN:

1. Sign up for a CDN service (like Cloudflare, AWS CloudFront, or Vercel)
2. Update the `next.config.js` file with your CDN domain:

```js
async rewrites() {
  return [
    {
      source: '/cdn-images/:path*',
      destination: 'https://your-cdn-domain.com/:path*', // Replace with your actual CDN domain
    },
  ];
},
```

3. Upload your optimized images to the CDN
4. Use the `useCdn={true}` prop in the ResponsivePicture component

## Benefits

- **Faster Loading**: Modern formats like WebP and AVIF are 25-50% smaller than JPEG/PNG
- **Better SEO**: Page speed is a ranking factor for search engines
- **Lower Bandwidth**: Smaller file sizes mean less data transfer
- **Responsive Loading**: Only the appropriate image size is loaded based on the device
- **Progressive Enhancement**: Falls back to WebP or original format if AVIF isn't supported