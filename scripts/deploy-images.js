const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const CLOUDFLARE_DOMAIN = 'yourname.cloudflare.com'; // Replace with your actual Cloudflare domain

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to update next.config.js with the correct Cloudflare domain
function updateNextConfig(domain) {
  const configPath = path.join(__dirname, '../next.config.js');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Replace the Cloudflare domain in the config
  configContent = configContent.replace(
    /(destination: ['"])https:\/\/.*?\.cloudflare\.com\/(.*?)(['"])/,
    `$1https://${domain}/$2$3`
  );
  
  fs.writeFileSync(configPath, configContent);
  console.log(`✓ Updated next.config.js with domain: ${domain}`);
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization and deployment process...\n');
  
  // Step 1: Optimize images
  console.log('Step 1: Optimizing images...');
  try {
    execSync('npm run optimize-images', { stdio: 'inherit' });
    console.log('✓ Image optimization completed\n');
  } catch (error) {
    console.error('❌ Image optimization failed');
    process.exit(1);
  }
  
  // Step 2: Ask for Cloudflare domain
  rl.question(`Step 2: Enter your Cloudflare domain (default: ${CLOUDFLARE_DOMAIN}): `, (domain) => {
    const cfDomain = domain || CLOUDFLARE_DOMAIN;
    
    // Update next.config.js with the provided domain
    try {
      updateNextConfig(cfDomain);
    } catch (error) {
      console.error('❌ Failed to update next.config.js:', error);
      rl.close();
      process.exit(1);
    }
    
    // Step 3: Upload images to Cloudflare R2
    console.log('\nStep 3: Uploading images to Cloudflare R2...');
    try {
      execSync('npm run upload-to-cdn', { stdio: 'inherit' });
      console.log('✓ Image upload completed\n');
    } catch (error) {
      console.error('❌ Image upload failed');
      rl.close();
      process.exit(1);
    }
    
    // Step 4: Provide next steps
    console.log('🎉 Deployment process completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Make sure your Cloudflare R2 bucket is properly configured');
    console.log('2. Verify that your Cloudflare worker is set up correctly');
    console.log('3. Test your website to ensure images are loading from the CDN');
    console.log('\nFor more information, refer to src/docs/cloudflare-cdn-setup.md');
    
    rl.close();
  });
}

// Start the process
main(); 