import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, sanitizeFormData, ContactFormData } from '@/lib/email';
import { validateContactForm } from '@/lib/validation';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Add CORS headers
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200 });
    }

    // Check rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Rate limit exceeded',
          error: rateLimitResult.message
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request body',
          error: 'Request body must be valid JSON'
        },
        { status: 400 }
      );
    }

    // Validate required fields
    const { fullName, company, email, project } = body;

    if (!fullName || !email || !project) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
          error: 'Full name, email, and message are required'
        },
        { status: 400 }
      );
    }

    // Create form data object
    const formData: ContactFormData = {
      fullName: fullName.toString(),
      company: company?.toString() || '',
      email: email.toString(),
      project: project.toString()
    };

    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData);

    // Validate form data
    const validation = validateContactForm(sanitizedData);
    
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendContactEmail(sanitizedData);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email',
          error: emailResult.error || 'Unknown error occurred'
        },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log(`Contact form submission from ${sanitizedData.email} (${sanitizedData.fullName})`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        remainingRequests: rateLimitResult.remaining
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 