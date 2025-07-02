#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Cloudflare R2 Setup Script ===${NC}"
echo "This script will help you set up AWS CLI and configure it for Cloudflare R2."
echo

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed.${NC}"
    echo "Would you like to install it? (y/n)"
    read -r install_aws
    
    if [[ $install_aws == "y" || $install_aws == "Y" ]]; then
        echo "Installing AWS CLI..."
        
        # Detect OS
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            if command -v brew &> /dev/null; then
                brew install awscli
            else
                echo -e "${RED}Homebrew is not installed. Please install AWS CLI manually:${NC}"
                echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
                exit 1
            fi
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            echo "Downloading AWS CLI..."
            curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
            unzip awscliv2.zip
            sudo ./aws/install
            rm -rf aws awscliv2.zip
        else
            echo -e "${RED}Unsupported OS. Please install AWS CLI manually:${NC}"
            echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
            exit 1
        fi
    else
        echo -e "${RED}AWS CLI is required for Cloudflare R2 uploads. Exiting.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}AWS CLI is already installed.${NC}"
fi

echo
echo -e "${BLUE}=== Cloudflare R2 Configuration ===${NC}"
echo "Please enter your Cloudflare R2 details:"
echo

# Get Cloudflare account ID
echo "Enter your Cloudflare Account ID (found in the dashboard URL):"
read -r account_id

# Get bucket name
echo "Enter your R2 bucket name (e.g., portfolio-images):"
read -r bucket_name

# Get access key details
echo "Enter your R2 Access Key ID:"
read -r access_key_id

echo "Enter your R2 Secret Access Key:"
read -r secret_access_key

# Configure AWS CLI for Cloudflare
echo
echo "Configuring AWS CLI for Cloudflare R2..."
aws configure set aws_access_key_id "$access_key_id" --profile cloudflare
aws configure set aws_secret_access_key "$secret_access_key" --profile cloudflare
aws configure set region auto --profile cloudflare
aws configure set output json --profile cloudflare

echo -e "${GREEN}AWS CLI configured for Cloudflare R2!${NC}"

# Update the upload-to-cloudflare.js file
echo
echo "Updating upload-to-cloudflare.js with your R2 details..."
sed -i.bak "s/const BUCKET_NAME = 'your-r2-bucket-name';/const BUCKET_NAME = '$bucket_name';/" ../scripts/upload-to-cloudflare.js
sed -i.bak "s/const ACCOUNT_ID = 'your-cloudflare-account-id';/const ACCOUNT_ID = '$account_id';/" ../scripts/upload-to-cloudflare.js
rm -f ../scripts/upload-to-cloudflare.js.bak

echo -e "${GREEN}upload-to-cloudflare.js updated successfully!${NC}"

# Get worker or custom domain
echo
echo "Enter your Cloudflare Worker URL or custom domain (e.g., your-worker.your-account.workers.dev):"
read -r cf_domain

# Update next.config.js
echo "Updating next.config.js with your domain..."
sed -i.bak "s|destination: 'https://yourname.cloudflare.com/:path\*'|destination: 'https://$cf_domain/:path*'|" ../next.config.js
rm -f ../next.config.js.bak

echo -e "${GREEN}next.config.js updated successfully!${NC}"

# Set AWS_PROFILE environment variable
echo
echo "Setting AWS_PROFILE environment variable for this session..."
export AWS_PROFILE=cloudflare

echo -e "${GREEN}Setup complete!${NC}"
echo
echo -e "${BLUE}Next steps:${NC}"
echo "1. Run 'npm run optimize-images' to optimize your images"
echo "2. Run 'npm run upload-to-cdn' to upload them to Cloudflare R2"
echo "3. Or run 'npm run deploy-images' to do both steps at once"
echo
echo -e "${RED}Note:${NC} For future terminal sessions, remember to run: export AWS_PROFILE=cloudflare" 