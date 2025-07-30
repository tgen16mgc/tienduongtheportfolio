"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Who am I?",
    answer:
      "I'm Duong Ngoc Tien, a marketing undergraduate with a strategic mindset, creative skills, and a passion for meaningful storytelling in branding and communication.",
  },
  {
    question: "What are my core strengths?",
    answer:
      "My strengths include strategic planning, consumer insight research, creative execution (graphic design and copywriting), and effective storytelling that translates into measurable business impact.",
  },
  {
    question: "What notable projects have I worked on?",
    answer:
      'Strategy Lead for Kingsport Gen02 at Digital Creatory 2025 (1st runner-up, 1200+ contestants). Vuver.vn\'s Valentine Sweater Campaign (doubled average revenue). Leader of "Tò Tí Te" business project (550 followers, 100 orders, 50% profit margin).',
  },
  {
    question: "What marketing roles am I looking for?",
    answer:
      "I'm actively seeking internships or part-time positions in strategic planning, brand strategy, or account management, ideally in agency environments in Hanoi.",
  },
  {
    question: "Am I open to freelance projects?",
    answer:
      "Yes. I've handled freelance marketing and design projects for clients including Deloitte (via 5S Media & Consulting Agency), Anpeco, AIESEC, etc.",
  },
  {
    question: "What tools and skills am I proficient in?",
    answer:
      "Adobe Photoshop/Illustrator, Canva, CapCut, Google Analytics (GA4), Buzzmetrics, Excel/SPSS, project coordination, and qualitative consumer research.",
  },
  {
    question: "What's my career plan over the next few years?",
    answer:
      "Within 3 years, I aim to hold a senior strategic planning or account planning role at a marketing agency. By year 5, I plan to advance into management-level roles or potentially transition to client-side marketing roles.",
  },
  {
    question: "How can you contact me?",
    answer:
      "Feel free to reach out via email at tiendn.fw@gmail.com or connect on my LinkedIn at linkedin.com/in/tienduongngoc/. Also, feel free to leave a message above!",
  },
]

export default function Component() {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [cardGlows, setCardGlows] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setCardGlows((prev) => ({ ...prev, [index]: { x, y } }))
  }

  return (
    <div className="min-h-screen text-white py-16 px-4 relative overflow-hidden">
      <style jsx global>{`
        :root {
          --faq-transition-fast: 200ms;
          --faq-transition-medium: 300ms;
          --faq-card-bg: rgba(20, 20, 30, 0.6);
          --faq-card-border: rgba(255, 255, 255, 0.1);
          --faq-hover-bg: rgba(255, 255, 255, 0.05);
          --faq-text-primary: #F5F5F7;
          --faq-text-secondary: #EEE;
          --faq-text-muted: #DDD;
        }

        .faq-spotlight {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .faq-card {
          background: var(--faq-card-bg);
          backdrop-filter: blur(15px);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          border: 1px solid var(--faq-card-border);
          transition: all var(--faq-transition-fast) ease;
          position: relative;
          overflow: hidden;
        }

        .faq-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
        }

        .faq-question-row {
          cursor: pointer;
          transition: background var(--faq-transition-fast) ease;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-question-row:hover {
          background: var(--faq-hover-bg);
        }

        .faq-question-row:focus {
          outline: 2px solid #FFF;
          outline-offset: 2px;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--faq-transition-medium) ease-in-out;
        }

        .faq-answer.expanded {
          max-height: 500px;
        }

        .faq-answer-content {
          padding: 1rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--faq-text-secondary);
          line-height: 1.6;
        }

        .faq-icon {
          transition: transform var(--faq-transition-fast) ease;
        }

        .faq-icon.rotated {
          transform: rotate(180deg);
        }

        @media (max-width: 767px) {
          .faq-heading {
            font-size: 2.5rem !important;
          }
          
          .faq-card {
            margin-bottom: 0.75rem;
          }
          
          .faq-question-row {
            padding: 0.75rem 1rem;
          }
          
          .faq-answer-content {
            padding: 0.75rem 1rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .faq-heading {
            font-size: 3rem !important;
          }
        }
      `}</style>

      {/* Background Spotlight */}
      <div className="faq-spotlight"></div>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="faq-heading text-6xl md:text-7xl font-semibold text-white mb-4 pt-12">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[var(--faq-text-muted)] font-normal">
            If you can't find an answer here, feel free to reach out via{" "}
            <a href="mailto:tiendn.fw@gmail.com" className="text-white hover:underline transition-all duration-200">
              tiendn.fw@gmail.com
            </a>{" "}
            or connect on{" "}
            <a href="https://linkedin.com/in/tienduongngoc/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all duration-200">
              LinkedIn
            </a>
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="faq-card max-w-2xl mx-auto w-full"
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={
                hoveredCard === index && cardGlows[index]
                  ? {
                      background: `radial-gradient(circle at ${cardGlows[index].x}% ${cardGlows[index].y}%, rgba(255, 255, 255, 0.1) 0%, var(--faq-card-bg) 50%)`,
                      boxShadow: `0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.1)`,
                    }
                  : {}
              }
            >
              <div
                className="faq-question-row"
                onClick={() => toggleExpanded(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleExpanded(index)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={expandedItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-medium text-[var(--faq-text-primary)] pr-4">{item.question}</h3>
                <div className={`faq-icon ${expandedItems.includes(index) ? "rotated" : ""}`}>
                  {expandedItems.includes(index) ? (
                    <Minus className="w-5 h-5 text-[var(--faq-text-primary)]" strokeWidth={2} />
                  ) : (
                    <Plus className="w-5 h-5 text-[var(--faq-text-primary)]" strokeWidth={2} />
                  )}
                </div>
              </div>

              <div
                id={`faq-answer-${index}`}
                className={`faq-answer ${expandedItems.includes(index) ? "expanded" : ""}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="faq-answer-content">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-[var(--faq-text-muted)] mb-6">Still have questions? Let's connect!</p>
          <a
            href="mailto:tiendn.fw@gmail.com"
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white/40 text-white rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 font-medium"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
