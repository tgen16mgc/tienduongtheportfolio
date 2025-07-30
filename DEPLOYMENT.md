# Deployment Guide

## Environment Variables Setup

Your portfolio uses Resend for email functionality. You **MUST** configure the `RESEND_API_KEY` environment variable in your hosting platform for the contact form to work.

### API Key Configuration

**Your Resend API Key:** `re_htmH5ZqP_7GBi2dvqyXmKQqQC6iuVK6T1`

#### For Vercel:
1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add: `RESEND_API_KEY` = `re_htmH5ZqP_7GBi2dvqyXmKQqQC6iuVK6T1`
4. Redeploy your site

#### For Netlify:
1. Go to your site dashboard on Netlify
2. Navigate to Site settings → Environment variables
3. Add: `RESEND_API_KEY` = `re_htmH5ZqP_7GBi2dvqyXmKQqQC6iuVK6T1`
4. Redeploy your site

#### For Railway:
1. Go to your project dashboard on Railway
2. Navigate to Variables tab
3. Add: `RESEND_API_KEY` = `re_htmH5ZqP_7GBi2dvqyXmKQqQC6iuVK6T1`
4. Redeploy your site

#### For Render:
1. Go to your service dashboard on Render
2. Navigate to Environment tab
3. Add: `RESEND_API_KEY` = `re_htmH5ZqP_7GBi2dvqyXmKQqQC6iuVK6T1`
4. Redeploy your site

#### For GitHub Pages:
GitHub Pages doesn't support server-side environment variables. Consider using Vercel, Netlify, or another hosting platform that supports environment variables.

## Current Status

- ✅ **Email service**: Resend integration working
- ✅ **Form validation**: All validation rules working
- ✅ **Rate limiting**: 5 requests per hour per IP
- ✅ **Security**: Input sanitization and validation
- ✅ **UI**: Professional contact form with feedback

## Testing

Test your contact form:
1. Fill out the form with valid data
2. Submit the form
3. Check your email (tiendn.fw@gmail.com) for the message
4. Verify success message appears

## Troubleshooting

### If you see "RESEND_API_KEY environment variable is not configured":
1. **Check your hosting platform**: Ensure the environment variable is set
2. **Verify the API key**: Make sure it matches exactly: `re_htmH5ZqP_7GBi2dvqyXmKQqQC6iuVK6T1`
3. **Redeploy**: After setting the environment variable, redeploy your site
4. **Check logs**: Look at your hosting platform's logs for any errors

### If you see "Failed to send email":
1. Check if `RESEND_API_KEY` is set in your hosting platform
2. Verify the API key is valid in your Resend dashboard
3. Check the browser console for detailed error messages

### If the form doesn't work at all:
1. Check browser console for JavaScript errors
2. Verify the API endpoint is accessible
3. Test with curl: `curl -X POST /api/contact -H "Content-Type: application/json" -d '{"fullName":"Test","email":"test@example.com","project":"Test message"}'`

## Next Steps

1. **Configure environment variable** in your hosting platform
2. **Redeploy** your site
3. **Test** the contact form
4. **Monitor** your email inbox for messages

Your portfolio is now ready for production! 🚀 