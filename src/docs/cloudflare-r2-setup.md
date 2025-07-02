# Setting Up Cloudflare R2 for Image CDN

This guide will walk you through the process of setting up Cloudflare R2 storage for your images and configuring the AWS CLI to upload files to it.

## Step 1: Install AWS CLI

The AWS CLI is required to upload files to Cloudflare R2 (which uses the S3-compatible API).

### For macOS:

```bash
brew install awscli
```

### For Windows:

Download and run the installer from the [AWS CLI website](https://aws.amazon.com/cli/).

### For Linux:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## Step 2: Create a Cloudflare R2 Bucket

1. Log in to your Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the sidebar, click on "R2"
3. Click "Create bucket"
4. Name your bucket (e.g., "portfolio-images")
5. Click "Create bucket"

## Step 3: Create an API Token for R2

1. In the R2 section of your Cloudflare dashboard, click on "Manage R2 API Tokens"
2. Click "Create API token"
3. Select "R2 Storage" as the permission
4. Set the access level to "Edit" (to allow uploads)
5. Click "Create API token"
6. Copy both the "Access Key ID" and "Secret Access Key" - you'll need these later

## Step 4: Configure AWS CLI for Cloudflare R2

Run the following command to set up a new AWS CLI profile for Cloudflare:

```bash
aws configure --profile cloudflare
```

When prompted, enter:
- AWS Access Key ID: [Your Cloudflare R2 Access Key ID]
- AWS Secret Access Key: [Your Cloudflare R2 Secret Access Key]
- Default region name: auto
- Default output format: json

## Step 5: Update the upload-to-cloudflare.js Script

Open the `scripts/upload-to-cloudflare.js` file and update the following values:

```javascript
const BUCKET_NAME = 'your-r2-bucket-name'; // e.g., 'portfolio-images'
const ACCOUNT_ID = 'your-cloudflare-account-id'; // Find this in your Cloudflare dashboard URL
```

## Step 6: Set Up Access to Your R2 Bucket

You have two main options for accessing your R2 bucket:

### Option 1: Cloudflare Worker (Recommended)

1. In your Cloudflare dashboard, go to "Workers & Pages"
2. Click "Create application" > "Create Worker"
3. Replace the code with the following:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');
    
    // Get the object from R2
    const object = await env.MY_BUCKET.get(path);
    
    if (object === null) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Set cache control headers
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=31536000');
    headers.set('Content-Type', object.httpMetadata.contentType || 'image/webp');
    
    return new Response(object.body, {
      headers
    });
  }
};
```

4. Click "Save and deploy"
5. Go to "Settings" > "Variables" and add an R2 bucket binding:
   - Variable name: MY_BUCKET
   - R2 bucket: [Your bucket name]

6. Note your worker's URL (e.g., your-worker.your-account.workers.dev)

### Option 2: Custom Domain with R2 Public Bucket

1. In your Cloudflare dashboard, go to your R2 bucket
2. Click "Settings" > "Public access"
3. Enable "Public bucket" and save
4. Set up a custom domain in Cloudflare DNS pointing to your R2 bucket

## Step 7: Update next.config.js

Open `next.config.js` and update the destination URL with your Cloudflare domain:

```javascript
async rewrites() {
  return [
    {
      source: '/cdn-images/:path*',
      destination: 'https://your-worker.your-account.workers.dev/:path*', // Your Worker URL
      // OR
      // destination: 'https://your-custom-domain.com/:path*', // Your custom domain
    },
  ];
},
```

## Step 8: Run the Deploy Script

Now you can run the deployment script:

```bash
# Set the AWS profile for this session
export AWS_PROFILE=cloudflare

# Run the deployment script
npm run deploy-images
```

This will:
1. Optimize your images
2. Ask for your Cloudflare domain
3. Upload the images to your Cloudflare R2 bucket

## Troubleshooting

### Permission Denied Errors

If you get permission denied errors when uploading:
1. Check that your API token has the correct permissions
2. Verify that the bucket name is correct
3. Make sure you've set `AWS_PROFILE=cloudflare`

### 404 Errors When Accessing Images

If your images return 404 errors:
1. Check that the files were uploaded successfully
2. Verify that your Worker or public bucket is configured correctly
3. Make sure the paths in your code match the paths on your CDN

### CORS Errors

If you get CORS errors:
1. In your R2 bucket settings, go to "CORS"
2. Add a new rule with:
   - Origin: `*` (or your specific domain)
   - Methods: GET, HEAD
   - Headers: *
   - Max age: 86400 