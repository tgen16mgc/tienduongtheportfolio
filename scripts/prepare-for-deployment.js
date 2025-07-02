/**
 * This script prepares the project for deployment to Digital Ocean
 * It optimizes images and pushes them to GitHub for CDN delivery
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { exit } = require('process');

// Configuration
const GITHUB_USER = 'tgen16mgc';
const GITHUB_REPO = 'tienduongtheportfolio';
const GITHUB_BRANCH = 'main';

// Paths
const REPO_PATH = path.join(__dirname, '..', GITHUB_REPO);
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const TARGET_IMAGES_DIR = path.join(REPO_PATH, 'public', 'images');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

/**
 * Log a message with color
 * @param {string} message - The message to log
 * @param {string} color - The color to use
 */
function logWithColor(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Run a command and log the output
 * @param {string} command - The command to run
 * @param {string} errorMessage - The error message to display if the command fails
 */
function runCommand(command, errorMessage) {
  try {
    logWithColor(`Running: ${command}`, colors.blue);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    logWithColor(errorMessage, colors.red);
    logWithColor(error.message, colors.red);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  logWithColor('Preparing project for Digital Ocean deployment...', colors.blue);
  
  // Step 1: Optimize images
  logWithColor('\nStep 1: Optimizing images...', colors.yellow);
  if (!runCommand('npm run optimize-images', 'Failed to optimize images')) {
    exit(1);
  }
  
  // Step 2: Clone or update the GitHub repository
  logWithColor('\nStep 2: Preparing GitHub repository...', colors.yellow);
  if (fs.existsSync(REPO_PATH)) {
    logWithColor('Repository already exists locally. Updating...', colors.blue);
    process.chdir(REPO_PATH);
    if (!runCommand(`git pull origin ${GITHUB_BRANCH}`, 'Failed to pull from repository')) {
      exit(1);
    }
  } else {
    logWithColor('Cloning repository...', colors.blue);
    if (!runCommand(`git clone https://github.com/${GITHUB_USER}/${GITHUB_REPO}.git`, 'Failed to clone repository')) {
      exit(1);
    }
    process.chdir(REPO_PATH);
  }
  
  // Step 3: Copy optimized images to the repository
  logWithColor('\nStep 3: Copying optimized images to repository...', colors.yellow);
  if (!fs.existsSync(path.join(REPO_PATH, 'public'))) {
    fs.mkdirSync(path.join(REPO_PATH, 'public'), { recursive: true });
  }
  if (!fs.existsSync(TARGET_IMAGES_DIR)) {
    fs.mkdirSync(TARGET_IMAGES_DIR, { recursive: true });
  }
  
  // Copy from optimized directory if it exists, otherwise from regular images directory
  const sourceDir = path.join(IMAGES_DIR, 'optimized');
  const sourcePath = fs.existsSync(sourceDir) ? sourceDir : IMAGES_DIR;
  
  logWithColor(`Copying images from ${sourcePath} to ${TARGET_IMAGES_DIR}`, colors.blue);
  
  // Copy all image files
  const imageExtensions = ['.webp', '.avif', '.png', '.jpg', '.jpeg', '.gif'];
  fs.readdirSync(sourcePath).forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      fs.copyFileSync(path.join(sourcePath, file), path.join(TARGET_IMAGES_DIR, file));
    }
  });
  
  // Step 4: Commit and push changes to GitHub
  logWithColor('\nStep 4: Committing and pushing changes to GitHub...', colors.yellow);
  if (!runCommand('git add public/images', 'Failed to add images to git')) {
    exit(1);
  }
  if (!runCommand('git commit -m "Update optimized images for CDN delivery"', 'Failed to commit changes')) {
    logWithColor('No changes to commit or commit failed. Continuing...', colors.yellow);
  }
  if (!runCommand(`git push origin ${GITHUB_BRANCH}`, 'Failed to push changes to GitHub')) {
    exit(1);
  }
  
  // Step 5: Return to project directory
  process.chdir(path.join(__dirname, '..'));
  
  // Step 6: Build the project
  logWithColor('\nStep 6: Building the project...', colors.yellow);
  if (!runCommand('npm run build', 'Failed to build the project')) {
    exit(1);
  }
  
  logWithColor('\nProject prepared successfully for Digital Ocean deployment!', colors.green);
  logWithColor('\nNext steps:', colors.blue);
  logWithColor('1. Deploy the project to Digital Ocean App Platform', colors.reset);
  logWithColor('2. Set the NODE_ENV environment variable to "production" in Digital Ocean', colors.reset);
  logWithColor('3. Configure your domain and SSL certificate in Digital Ocean', colors.reset);
  
  logWithColor('\nYour images are now served from jsDelivr CDN:', colors.blue);
  logWithColor(`https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/images/`, colors.green);
}

// Run the main function
main().catch(error => {
  logWithColor('Error: ' + error.message, colors.red);
  exit(1);
}); 