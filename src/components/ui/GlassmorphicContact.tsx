"use client"

import type React from "react"

import { Button } from "./button"
import { ArrowRight, Mail } from "lucide-react"
import { useState, useRef } from "react"
import { ContactFeedback, ContactLoading, FeedbackMessage } from "./ContactFeedback"

export default function Component() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    project: "",
  })

  const [submitButtonGlow, setSubmitButtonGlow] = useState({ x: 50, y: 50 })
  const [emailButtonGlow, setEmailButtonGlow] = useState({ x: 50, y: 50 })
  const [isSubmitHovered, setIsSubmitHovered] = useState(false)
  const [isEmailHovered, setIsEmailHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null)

  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const emailButtonRef = useRef<HTMLAnchorElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!submitButtonRef.current) return
    const rect = submitButtonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSubmitButtonGlow({ x, y })
  }

  const handleEmailMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!emailButtonRef.current) return
    const rect = emailButtonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setEmailButtonGlow({ x, y })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return

    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.project.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please fill in all required fields',
        details: 'Full name, email, and message are required'
      })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setFeedback({
          type: 'success',
          message: 'Message sent successfully!',
          details: 'I\'ll get back to you soon.'
        })
        // Reset form
        setFormData({
          fullName: "",
          company: "",
          email: "",
          project: "",
        })
      } else {
        setFeedback({
          type: 'error',
          message: result.message || 'Failed to send message',
          details: result.error || 'Please try again later'
        })
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Network error',
        details: 'Please check your connection and try again'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearFeedback = () => {
    setFeedback(null)
  }

  const EmailButton = ({ className = "", id = "" }: { className?: string; id?: string }) => (
    <Button
      variant="outline"
      className={`bg-transparent border-[var(--glass-border)] text-white hover:bg-[var(--button-hover-bg)] rounded-full px-4 py-2 text-sm transition-all duration-300 ${className}`}
      asChild
    >
      <a
        href="mailto:tiendn.fw@gmail.com"
        ref={id === "desktop" ? emailButtonRef : undefined}
        onMouseMove={id === "desktop" ? handleEmailMouseMove : undefined}
        onMouseEnter={() => setIsEmailHovered(true)}
        onMouseLeave={() => setIsEmailHovered(false)}
        style={
          id === "desktop" && isEmailHovered
            ? {
                background: `radial-gradient(circle at ${emailButtonGlow.x}% ${emailButtonGlow.y}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)`,
                boxShadow: `0 0 30px rgba(255, 255, 255, 0.3), ${emailButtonGlow.x}% ${emailButtonGlow.y}% 20px rgba(255, 255, 255, 0.4)`,
              }
            : {}
        }
      >
        <Mail className="w-3 h-3 mr-2" />
        tiendn.fw@gmail.com
        {id === "desktop" && <ArrowRight className="w-3 h-3 ml-2" />}
      </a>
    </Button>
  )

  return (
    <div className="min-h-screen text-white">
      <style jsx global>{`
        :root {
          --transition-fast: 150ms;
          --transition-medium: 300ms;
          --glass-bg: rgba(0, 0, 0, 0.15);
          --glass-border: rgba(255, 255, 255, 0.15);
          --input-bg: rgba(40, 40, 55, 0.6);
          --input-border: rgba(255, 255, 255, 0.15);
          --input-focus-border: rgba(255, 255, 255, 0.3);
          --button-border: rgba(255, 255, 255, 0.4);
          --button-hover-border: rgba(255, 255, 255, 0.6);
          --button-hover-bg: rgba(255, 255, 255, 0.1);
        }

        .glass-panel {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 
            inset 0 0 30px rgba(0, 0, 0, 0.8),
            0 10px 40px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            inset 0 0 30px rgba(0, 0, 0, 0.8),
            0 10px 40px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(255, 255, 255, 0.1);
        }

        .hero-text {
          font-size: 6rem;
          font-weight: 800;
          background: linear-gradient(90deg, #FFF, #E0E0E0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .form-input {
          background: var(--input-bg);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1rem;
          height: 3.5rem;
          color: white;
          transition: all var(--transition-medium) ease;
        }

        .form-input:focus {
          border-color: var(--input-focus-border);
          transform: scale(1.02);
          box-shadow: 
            0 0 0 3px rgba(255, 255, 255, 0.1),
            0 0 20px rgba(255, 255, 255, 0.15);
          outline: none;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-textarea {
          background: var(--input-bg);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1rem;
          height: 8rem;
          color: white;
          resize: none;
          transition: all var(--transition-medium) ease;
        }

        .form-textarea:focus {
          border-color: var(--input-focus-border);
          transform: scale(1.02);
          box-shadow: 
            0 0 0 3px rgba(255, 255, 255, 0.1),
            0 0 20px rgba(255, 255, 255, 0.15);
          outline: none;
        }

        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .submit-button {
          width: 100%;
          height: 3.75rem;
          border-radius: 30px;
          border: 2px solid var(--button-border);
          background: transparent;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          transition: all var(--transition-medium) ease;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover {
          border-color: var(--button-hover-border);
          transform: translateY(-3px);
        }

        .submit-button:active {
          transform: scale(0.98);
        }

        .info-link:hover {
          text-decoration: underline;
          color: #FFF;
        }

        @media (max-width: 1023px) {
          .hero-text {
            font-size: 4rem;
          }
        }

        @media (max-width: 767px) {
          .hero-text {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:min-h-screen lg:items-center">
          {/* Left Column - Hero */}
          <div className="glass-panel p-16 flex flex-col justify-center">
            <div className="text-right mb-8">
              <h1 className="hero-text">
                <div>just</div>
                <div>send it.</div>
              </h1>
            </div>

            {/* Info Blocks */}
            <div className="mt-8 space-y-4">
              <div className="text-left">
                <h3 className="text-xs text-[#AAA] mb-2 tracking-wide">You don't like forms?</h3>
                <p className="text-sm text-[#CCC] mb-3 leading-relaxed">
                  Hit me up if you're looking for a wild potential who can bring the craziest yet actionable ideas to
                  life.
                </p>
                <EmailButton id="desktop" />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-panel p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm text-[#BBB] tracking-wide mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-input w-full"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm text-[#BBB] tracking-wide mb-1">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-[#BBB] tracking-wide mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm text-[#BBB] tracking-wide mb-1">
                  Message
                </label>
                <textarea
                  id="project"
                  name="project"
                  className="form-textarea w-full"
                  placeholder="Leave me a message"
                  value={formData.project}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                ref={submitButtonRef}
                className="submit-button"
                disabled={isSubmitting}
                onMouseMove={handleSubmitMouseMove}
                onMouseEnter={() => setIsSubmitHovered(true)}
                onMouseLeave={() => setIsSubmitHovered(false)}
                style={
                  isSubmitHovered
                    ? {
                        background: `radial-gradient(circle at ${submitButtonGlow.x}% ${submitButtonGlow.y}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)`,
                        boxShadow: `0 0 40px rgba(255, 255, 255, 0.4), ${submitButtonGlow.x}% ${submitButtonGlow.y}% 30px rgba(255, 255, 255, 0.6)`,
                      }
                    : {}
                }
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="glass-panel p-12 text-right">
              <h1 className="hero-text mb-8">
                <div>just</div>
                <div>send it.</div>
              </h1>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-left">
                  <h3 className="text-xs text-[#AAA] mb-2 tracking-wide">You don't like forms?</h3>
                  <p className="text-sm text-[#CCC] mb-3 leading-relaxed">
                    Hit me up if you're looking for a wild potential who can bring the craziest yet actionable ideas to
                    life.
                  </p>
                  <EmailButton />
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="glass-panel p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName-tablet" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName-tablet"
                    name="fullName"
                    type="text"
                    className="form-input w-full"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="company-tablet" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Company
                  </label>
                  <input
                    id="company-tablet"
                    name="company"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="email-tablet" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Email Address
                  </label>
                  <input
                    id="email-tablet"
                    name="email"
                    type="email"
                    className="form-input w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="project-tablet" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Message
                  </label>
                  <textarea
                    id="project-tablet"
                    name="project"
                    className="form-textarea w-full"
                    placeholder="Leave me a message"
                    value={formData.project}
                    onChange={handleInputChange}
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="space-y-8 py-8">
            {/* Hero Section */}
            <div className="glass-panel p-8 text-right">
              <h1 className="hero-text mb-6">
                <div>just</div>
                <div>send it.</div>
              </h1>

              <div className="space-y-6 mt-6">
                <div className="text-center">
                  <h3 className="text-xs text-[#AAA] mb-2 tracking-wide">You don't like forms?</h3>
                  <p className="text-sm text-[#CCC] mb-3 leading-relaxed">
                    Hit me up if you're looking for a wild potential who can bring the craziest yet actionable ideas to
                    life.
                  </p>
                  <EmailButton />
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="glass-panel p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName-mobile" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName-mobile"
                    name="fullName"
                    type="text"
                    className="form-input w-full"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="company-mobile" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Company
                  </label>
                  <input
                    id="company-mobile"
                    name="company"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="email-mobile" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Email Address
                  </label>
                  <input
                    id="email-mobile"
                    name="email"
                    type="email"
                    className="form-input w-full"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="project-mobile" className="block text-sm text-[#BBB] tracking-wide mb-1">
                    Message
                  </label>
                  <textarea
                    id="project-mobile"
                    name="project"
                    className="form-textarea w-full"
                    placeholder="Leave me a message"
                    value={formData.project}
                    onChange={handleInputChange}
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Components */}
      {isSubmitting && <ContactLoading />}
      <ContactFeedback feedback={feedback} onClose={clearFeedback} />
    </div>
  )
}
