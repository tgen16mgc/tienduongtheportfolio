import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export interface FeedbackMessage {
  type: 'success' | 'error' | 'info';
  message: string;
  details?: string;
}

interface ContactFeedbackProps {
  feedback: FeedbackMessage | null;
  onClose?: () => void;
}

export function ContactFeedback({ feedback, onClose }: ContactFeedbackProps) {
  if (!feedback) return null;

  const getIcon = () => {
    switch (feedback.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (feedback.type) {
      case 'success':
        return 'bg-green-900/20 border-green-500/30';
      case 'error':
        return 'bg-red-900/20 border-red-500/30';
      case 'info':
        return 'bg-blue-900/20 border-blue-500/30';
    }
  };

  const getTextColor = () => {
    switch (feedback.type) {
      case 'success':
        return 'text-green-100';
      case 'error':
        return 'text-red-100';
      case 'info':
        return 'text-blue-100';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-[999999] max-w-md w-full p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${getBackgroundColor()} ${getTextColor()}`}
      role="alert"
      aria-live="polite"
      style={{ zIndex: 999999 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-5">
            {feedback.message}
          </p>
          {feedback.details && (
            <p className="mt-1 text-xs opacity-80">
              {feedback.details}
            </p>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close notification"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Loading spinner component
export function ContactLoading() {
  return (
    <div className="fixed bottom-4 right-4 z-[999999] max-w-md w-full p-4 rounded-lg border bg-blue-900/20 border-blue-500/30 backdrop-blur-sm" style={{ zIndex: 999999 }}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-100">
            Sending your message...
          </p>
        </div>
      </div>
    </div>
  );
} 