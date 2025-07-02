#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== GitHub Pages + jsDelivr CDN Setup (Existing Repository) ===${NC}"
echo "This script will help you set up jsDelivr CDN with your existing GitHub repository."
echo

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git first.${NC}"
    exit 1
fi

# GitHub repository information
GITHUB_USER="tgen16mgc"
GITHUB_REPO="tienduongtheportfolio"
GITHUB_BRANCH="main"

echo -e "Using GitHub repository: ${GREEN}https://github.com/${GITHUB_USER}/${GITHUB_REPO}${NC}"
echo

# Check if the repository exists locally or clone it
if [ -d "$GITHUB_REPO" ]; then
    echo "Repository already exists locally. Updating..."
    cd "$GITHUB_REPO" || exit
    git pull origin "$GITHUB_BRANCH"
else
    echo "Cloning repository..."
    git clone "https://github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
    cd "$GITHUB_REPO" || exit
fi

# Create images directory if it doesn't exist
echo "Creating images directory..."
mkdir -p "public/images"

# Check if optimized images exist
if [ -d "../public/images/optimized" ]; then
    # Copy optimized images to the repository
    echo "Copying optimized images to the repository..."
    cp -r ../public/images/optimized/* public/images/ 2>/dev/null || :
else
    # Copy regular images if optimized ones don't exist
    echo "Optimized images not found. Copying regular images..."
    cp -r ../public/images/*.webp public/images/ 2>/dev/null || :
    cp -r ../public/images/*.avif public/images/ 2>/dev/null || :
    cp -r ../public/images/*.png public/images/ 2>/dev/null || :
    cp -r ../public/images/*.jpg public/images/ 2>/dev/null || :
fi

# Add files to git
echo "Adding files to git..."
git add public/images
git commit -m "Add optimized images for jsDelivr CDN"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin "$GITHUB_BRANCH"

# Return to original directory
cd ..

echo -e "${GREEN}Setup complete!${NC}"
echo
echo -e "${BLUE}Next steps:${NC}"
echo "1. Wait a few minutes for jsDelivr to cache your files"
echo "2. Test your website to ensure images are loading from the CDN"
echo
echo -e "Your jsDelivr CDN URL is: ${GREEN}https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/public/images/${NC}"
echo
echo "To purge the jsDelivr cache after updates, visit:"
echo -e "${GREEN}https://www.jsdelivr.com/tools/purge${NC}"
echo "and enter the URL of any file you've updated." 