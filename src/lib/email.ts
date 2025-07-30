import { Resend } from 'resend';

// Initialize Resend with API key (only when needed)
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Return a mock client for development/production without API key
      console.warn('RESEND_API_KEY not configured - using mock email service');
      return {
        emails: {
          send: async () => ({ error: null })
        }
      } as any;
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  project: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Send contact form email using Resend
 */
export async function sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // Get Resend client
    const resendClient = getResendClient();

    // Create email content
    const emailContent = createEmailContent(formData);

    // Check if we're using mock client (no API key)
    const isMockClient = !process.env.RESEND_API_KEY;
    
    if (isMockClient) {
      // Log the email content for development/debugging
      console.log('Mock email service - would send:', {
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['tiendn.fw@gmail.com'],
        subject: `New Contact Form Submission from ${formData.fullName}`,
        content: emailContent.text
      });
      
      return {
        success: true,
        message: 'Message received (mock mode - no email sent)'
      };
    }

    // Send email
    const result = await resendClient.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['tiendn.fw@gmail.com'],
      subject: `New Contact Form Submission from ${formData.fullName}`,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (result.error) {
      console.error('Resend API error:', result.error);
      return {
        success: false,
        message: 'Failed to send email',
        error: result.error.message || 'Unknown error occurred'
      };
    }

    return {
      success: true,
      message: 'Email sent successfully'
    };

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Create email content from form data
 */
function createEmailContent(formData: ContactFormData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2c3e50; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
      </div>
      
      <div style="background: #fff; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0;">
        <h3 style="color: #2c3e50; margin-top: 0;">Message</h3>
        <p style="white-space: pre-wrap;">${formData.project}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        <p>This message was sent from your portfolio contact form.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
  `;

  const text = `
New Contact Form Submission

Contact Information:
- Name: ${formData.fullName}
- Company: ${formData.company || 'Not provided'}
- Email: ${formData.email}

Message:
${formData.project}

---
This message was sent from your portfolio contact form.
Time: ${new Date().toLocaleString()}
  `;

  return { html, text };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize form data to prevent injection attacks
 */
export function sanitizeFormData(data: ContactFormData): ContactFormData {
  return {
    fullName: data.fullName.trim().replace(/[<>]/g, ''),
    company: data.company.trim().replace(/[<>]/g, ''),
    email: data.email.trim().toLowerCase(),
    project: data.project.trim().replace(/[<>]/g, ''),
  };
} 