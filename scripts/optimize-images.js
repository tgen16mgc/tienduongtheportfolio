const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define image sizes for responsive images
const SIZES = [
  { width: 640, suffix: 'sm' },
  { width: 1024, suffix: 'md' },
  { width: 1920, suffix: 'lg' },
];

// Define formats to convert to
const FORMATS = ['webp', 'avif'];

// Process all images in the input directory
async function processImages() {
  try {
    const files = fs.readdirSync(INPUT_DIR);
    
    for (const file of files) {
      // Skip directories and non-image files
      const filePath = path.join(INPUT_DIR, file);
      if (fs.statSync(filePath).isDirectory()) continue;
      
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
      
      // Skip already processed files
      if (file.includes('-sm.') || file.includes('-md.') || file.includes('-lg.')) continue;
      
      const filename = path.basename(file, ext);
      
      console.log(`Processing ${file}...`);
      
      // Original image optimization
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(OUTPUT_DIR, `${filename}.webp`));
      
      // Generate responsive versions in different formats
      for (const size of SIZES) {
        const image = sharp(filePath).resize({ width: size.width, withoutEnlargement: true });
        
        for (const format of FORMATS) {
          const outputPath = path.join(OUTPUT_DIR, `${filename}-${size.suffix}.${format}`);
          
          if (format === 'webp') {
            await image.clone().webp({ quality: 80 }).toFile(outputPath);
          } else if (format === 'avif') {
            await image.clone().avif({ quality: 70 }).toFile(outputPath);
          }
        }
      }
      
      console.log(`✓ ${file} processed successfully`);
    }
    
    console.log('All images processed successfully!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages(); 