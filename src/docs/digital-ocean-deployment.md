# Digital Ocean Deployment Guide

This guide explains how to deploy your Next.js portfolio to Digital Ocean App Platform with CDN-served images.

## Overview

The deployment strategy uses:
1. **jsDelivr CDN** for serving optimized images
2. **Digital Ocean App Platform** for hosting the Next.js application
3. **GitHub** as the repository for both code and images

## Step 1: Prepare Your Project

Run the preparation script:

```bash
npm run prepare-for-digitalocean
```

This script will:
1. Optimize your images (convert to WebP/AVIF and create responsive sizes)
2. Push the optimized images to your GitHub repository
3. Build the project for deployment

## Step 2: Deploy to Digital Ocean

1. **Sign up for Digital Ocean**
   - Create an account at [digitalocean.com](https://www.digitalocean.com/)

2. **Create a new App**
   - Go to the App Platform section
   - Click "Create App"
   - Connect your GitHub account
   - Select your repository (`tgen16mgc/tienduongtheportfolio`)

3. **Configure the App**
   - **Type**: Web Service
   - **Source Directory**: `/`
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`

4. **Resource Plan**
   - Choose the Basic plan ($5/month) or Pro plan ($12/month) depending on your needs

5. **Finalize and Launch**
   - Review your settings
   - Click "Launch App"

## Step 3: Configure Your Domain (Optional)

1. **Add Your Domain**
   - Go to the "Domains" tab in your app settings
   - Click "Add Domain"
   - Enter your domain name
   - Follow the instructions to configure DNS

2. **Set Up SSL**
   - Digital Ocean will automatically provision an SSL certificate for your domain

## How It Works

### Image Loading

The application uses a custom `CdnImage` component that:
1. Converts local image paths to jsDelivr CDN URLs
2. Serves images in WebP and AVIF formats for better performance
3. Provides responsive image sizes based on the device

### Next.js Configuration

The `next.config.js` file is configured for Digital Ocean deployment:
1. `output: 'standalone'` for better compatibility with App Platform
2. `unoptimized: true` in production to use our custom CDN solution
3. Allowed domains for external images

## Updating Images

When you need to update your images:

1. Add new images to the `/public/images` directory
2. Run the preparation script:
   ```bash
   npm run prepare-for-digitalocean
   ```
3. Redeploy your app on Digital Ocean (can be set to auto-deploy on GitHub push)

## Purging the CDN Cache

If you update an image and need to purge the jsDelivr cache:

1. Visit [jsdelivr.com/tools/purge](https://www.jsdelivr.com/tools/purge)
2. Enter the URL of the image you updated
3. Click "Purge"

## Troubleshooting

### Images Not Loading

1. Check if the images are properly pushed to GitHub
2. Verify the CDN URLs are correct
3. Try purging the jsDelivr cache
4. Check the browser console for errors

### Deployment Failures

1. Check if the build process completes successfully locally
2. Review the build logs on Digital Ocean
3. Ensure all environment variables are set correctly
4. Try increasing the resources for your app if it's running out of memory 