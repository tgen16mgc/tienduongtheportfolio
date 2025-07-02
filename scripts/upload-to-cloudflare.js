const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mime = require('mime-types');

// Configuration
const IMAGE_DIR = path.join(__dirname, '../public/images');

// TODO: Replace these values with your actual Cloudflare R2 information
// You can find these in your Cloudflare dashboard under R2 > Settings
const BUCKET_NAME = 'your-r2-bucket-name'; // e.g., 'portfolio-images'
const ACCOUNT_ID = 'your-cloudflare-account-id'; // e.g., '1a2b3c4d5e6f7g8h9i0j'
const ENDPOINT_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Before running this script:
// 1. Create an R2 bucket in your Cloudflare dashboard
// 2. Create an API token with read/write permissions
// 3. Configure AWS CLI with your R2 credentials:
//    aws configure --profile cloudflare
//    AWS Access Key ID: <your-access-key-id>
//    AWS Secret Access Key: <your-secret-access-key>
//    Default region name: auto
//    Default output format: json
// 4. Set the AWS_PROFILE environment variable:
//    export AWS_PROFILE=cloudflare

// Function to upload a file to Cloudflare R2
function uploadFile(filePath, destinationPath) {
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  const command = `aws s3 cp "${filePath}" "s3://${BUCKET_NAME}/${destinationPath}" --endpoint-url ${ENDPOINT_URL} --content-type "${contentType}" --cache-control "public, max-age=31536000"`;
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error uploading ${filePath}: ${error.message}`);
        reject(error);
        return;
      }
      
      if (stderr) {
        console.warn(`Warning: ${stderr}`);
      }
      
      console.log(`✓ Uploaded: ${destinationPath}`);
      resolve(stdout);
    });
  });
}

// Function to recursively scan directory and upload files
async function uploadDirectory(directory, baseDir = '') {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    // Skip .DS_Store files
    if (file === '.DS_Store') continue;
    
    if (stats.isDirectory()) {
      // Recursively upload subdirectories
      await uploadDirectory(filePath, path.join(baseDir, file));
    } else {
      // Upload file
      const relativePath = path.relative(IMAGE_DIR, filePath);
      await uploadFile(filePath, relativePath);
    }
  }
}

// Main function
async function main() {
  console.log('Starting upload to Cloudflare R2...');
  
  try {
    await uploadDirectory(IMAGE_DIR);
    console.log('Upload completed successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

// Check if AWS CLI is installed
exec('aws --version', async (error) => {
  if (error) {
    console.error('AWS CLI is not installed. Please install it first:');
    console.error('npm install -g aws-cli');
    console.error('or download from https://aws.amazon.com/cli/');
    process.exit(1);
  }
  
  // Start the upload process
  main();
}); 