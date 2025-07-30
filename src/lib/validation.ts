import { ContactFormData } from './email';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate full name
  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.push({
      field: 'fullName',
      message: 'Full name is required'
    });
  } else if (data.fullName.trim().length < 2) {
    errors.push({
      field: 'fullName',
      message: 'Full name must be at least 2 characters long'
    });
  } else if (data.fullName.trim().length > 100) {
    errors.push({
      field: 'fullName',
      message: 'Full name must be less than 100 characters'
    });
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.push({
      field: 'email',
      message: 'Email address is required'
    });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push({
        field: 'email',
        message: 'Please enter a valid email address'
      });
    }
  }

  // Validate company (optional but if provided, should be reasonable)
  if (data.company && data.company.trim().length > 100) {
    errors.push({
      field: 'company',
      message: 'Company name must be less than 100 characters'
    });
  }

  // Validate project/message
  if (!data.project || data.project.trim().length === 0) {
    errors.push({
      field: 'project',
      message: 'Message is required'
    });
  } else if (data.project.trim().length < 10) {
    errors.push({
      field: 'project',
      message: 'Message must be at least 10 characters long'
    });
  } else if (data.project.trim().length > 2000) {
    errors.push({
      field: 'project',
      message: 'Message must be less than 2000 characters'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get field-specific error message
 */
export function getFieldError(field: string, errors: ValidationError[]): string | null {
  const error = errors.find(err => err.field === field);
  return error ? error.message : null;
}

/**
 * Check if a specific field has an error
 */
export function hasFieldError(field: string, errors: ValidationError[]): boolean {
  return errors.some(err => err.field === field);
}

/**
 * Validate individual field
 */
export function validateField(field: string, value: string): string | null {
  switch (field) {
    case 'fullName':
      if (!value || value.trim().length === 0) {
        return 'Full name is required';
      }
      if (value.trim().length < 2) {
        return 'Full name must be at least 2 characters long';
      }
      if (value.trim().length > 100) {
        return 'Full name must be less than 100 characters';
      }
      break;

    case 'email':
      if (!value || value.trim().length === 0) {
        return 'Email address is required';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address';
      }
      break;

    case 'company':
      if (value && value.trim().length > 100) {
        return 'Company name must be less than 100 characters';
      }
      break;

    case 'project':
      if (!value || value.trim().length === 0) {
        return 'Message is required';
      }
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters long';
      }
      if (value.trim().length > 2000) {
        return 'Message must be less than 2000 characters';
      }
      break;
  }

  return null;
} 