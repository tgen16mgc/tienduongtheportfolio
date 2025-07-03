import React from 'react';

interface ImageSize {
  width: number;
  suffix: string;
}

interface ResponsivePictureProps {
  basePath: string;
  filename: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  useCdn?: boolean;
  cdnType?: 'cloudflare' | 'jsdelivr' | 'cloudinary' | 'vercel' | 'github';
}

const SIZES: ImageSize[] = [
  { width: 640, suffix: 'sm' },
  { width: 1024, suffix: 'md' },
  { width: 1920, suffix: 'lg' },
];

// GitHub username and repository name for jsDelivr CDN
const GITHUB_USER = 'tgen16mgc';
const GITHUB_REPO = 'tienduongtheportfolio';
const GITHUB_BRANCH = 'main';

/**
 * ResponsivePicture component that uses the picture element with multiple sources
 * for different formats and sizes
 */
export default function ResponsivePicture({
  basePath,
  filename,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy',
  priority = false,
  useCdn = false,
  cdnType = 'github',
}: ResponsivePictureProps) {
  // Determine loading attribute
  const loadingAttr = priority ? 'eager' : loading;
  
  // Determine base URL based on CDN type
  let baseUrl = basePath;
  
  if (useCdn) {
    switch (cdnType) {
      case 'cloudflare':
        baseUrl = '/cdn-images';
        break;
      case 'jsdelivr':
        // Use jsDelivr CDN
        baseUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/public${basePath}`;
        break;
      case 'github':
        // Use GitHub raw content directly
        baseUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public${basePath}`;
        break;
      case 'cloudinary':
        baseUrl = `https://res.cloudinary.com/your-cloud-name/image/upload`;
        break;
      case 'vercel':
        // Vercel uses the default path
        break;
      default:
        baseUrl = basePath;
    }
  }
  
  // Generate paths for different formats and sizes
  const generateSrcSet = (format: string) => {
    if (cdnType === 'cloudinary' && useCdn) {
      // Cloudinary format
      return SIZES.map(size => 
        `${baseUrl}/w_${size.width},f_${format}/v1/portfolio/${filename} ${size.width}w`
      ).join(', ');
    }
    
    return SIZES.map(size => 
      `${baseUrl}/${filename}-${size.suffix}.${format} ${size.width}w`
    ).join(', ');
  };
  
  return (
    <div className={className}>
      <picture>
        {/* AVIF format - best compression, modern browsers */}
        <source
          type="image/avif"
          srcSet={generateSrcSet('avif')}
          sizes={sizes}
        />
        
        {/* WebP format - good compression, wide support */}
        <source
          type="image/webp"
          srcSet={generateSrcSet('webp')}
          sizes={sizes}
        />
        
        {/* Fallback image */}
        <img
          src={`${baseUrl}/${filename}.webp`}
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttr}
          className={`max-w-full h-auto ${imgClassName}`}
        />
      </picture>
    </div>
  );
} 