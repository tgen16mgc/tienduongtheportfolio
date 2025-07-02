#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== GitHub Pages + jsDelivr CDN Setup ===${NC}"
echo "This script will help you set up a GitHub repository for your images and configure jsDelivr CDN."
echo

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git first.${NC}"
    exit 1
fi

# Get GitHub username
echo "Enter your GitHub username:"
read -r github_username

# Get repository name
echo "Enter the repository name (default: portfolio-images):"
read -r repo_name
repo_name=${repo_name:-portfolio-images}

# Get branch name
echo "Enter the branch name (default: main):"
read -r branch_name
branch_name=${branch_name:-main}

# Create a temporary directory for the repository
temp_dir=$(mktemp -d)
echo "Creating a temporary directory for the repository..."

# Copy images to the temporary directory
echo "Copying optimized images to the repository..."
mkdir -p "$temp_dir/images"
cp -r public/images/*.webp "$temp_dir/images/"
cp -r public/images/*.avif "$temp_dir/images/"
cp -r public/images/*.png "$temp_dir/images/"
cp -r public/images/*.jpg "$temp_dir/images/" 2>/dev/null || :

# Initialize git repository
echo "Initializing git repository..."
cd "$temp_dir" || exit
git init
git branch -M "$branch_name"

# Create README
cat > README.md << EOF
# Portfolio Images

This repository contains optimized images for my portfolio website.

## CDN Usage

These images can be accessed via jsDelivr CDN using the following URL pattern:

\`\`\`
https://cdn.jsdelivr.net/gh/${github_username}/${repo_name}@${branch_name}/images/filename.ext
\`\`\`

## Available Formats

- WebP: Modern format with good compression
- AVIF: Next-gen format with excellent compression
- PNG/JPG: Original formats for fallback

## Responsive Sizes

- Original: Full size
- sm: 640px width
- md: 1024px width
- lg: 1920px width
EOF

# Add files to git
git add .
git commit -m "Initial commit with optimized images"

# Ask if the user wants to create the repository on GitHub
echo
echo "Would you like to create the repository on GitHub now? (y/n)"
read -r create_repo

if [[ $create_repo == "y" || $create_repo == "Y" ]]; then
    # Check if GitHub CLI is installed
    if command -v gh &> /dev/null; then
        echo "Creating repository on GitHub using GitHub CLI..."
        gh repo create "$repo_name" --public --description "Portfolio images for CDN delivery" --source=. --remote=origin --push
    else
        echo "GitHub CLI not installed. Please create the repository manually on GitHub and run:"
        echo -e "${BLUE}git remote add origin https://github.com/${github_username}/${repo_name}.git${NC}"
        echo -e "${BLUE}git push -u origin ${branch_name}${NC}"
    fi
else
    echo "Please create the repository manually on GitHub and run:"
    echo -e "${BLUE}git remote add origin https://github.com/${github_username}/${repo_name}.git${NC}"
    echo -e "${BLUE}git push -u origin ${branch_name}${NC}"
fi

# Update ResponsivePicture.tsx with the correct GitHub information
echo
echo "Updating ResponsivePicture.tsx with your GitHub information..."
sed -i.bak "s/const GITHUB_USER = 'yourusername';/const GITHUB_USER = '$github_username';/" ../src/components/ui/ResponsivePicture.tsx
sed -i.bak "s/const GITHUB_REPO = 'portfolio-images';/const GITHUB_REPO = '$repo_name';/" ../src/components/ui/ResponsivePicture.tsx
sed -i.bak "s/const GITHUB_BRANCH = 'main';/const GITHUB_BRANCH = '$branch_name';/" ../src/components/ui/ResponsivePicture.tsx
rm -f ../src/components/ui/ResponsivePicture.tsx.bak

echo -e "${GREEN}Setup complete!${NC}"
echo
echo -e "${BLUE}Next steps:${NC}"
echo "1. Push your repository to GitHub (if not done automatically)"
echo "2. Wait a few minutes for jsDelivr to cache your files"
echo "3. Test your website to ensure images are loading from the CDN"
echo
echo -e "Your jsDelivr CDN URL will be: ${GREEN}https://cdn.jsdelivr.net/gh/${github_username}/${repo_name}@${branch_name}/images/${NC}" 