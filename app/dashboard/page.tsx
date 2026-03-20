'use client'

// Dashboard - certification selector
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Certification {
  id: string
  name: string
  fullName: string
  description: string
  questionCount: number
  color: string
  bgGradient: string
  href: string
}

const certifications: Certification[] = [
  {
    id: 'crcst',
    name: 'CRCST',
    fullName: 'Certified Registered Central Service Technician',
    description: 'Master sterile processing fundamentals, decontamination, sterilization, and instrument handling',
    questionCount: 400,
    color: 'text-teal',
    bgGradient: 'from-teal to-teal-2',
    href: '/crcst',
  },
  {
    id: 'chl',
    name: 'CHL',
    fullName: 'Certified Healthcare Leader',
    description: 'Master leadership, management, communication, and human resources in sterile processing',
    questionCount: 240,
    color: 'text-amber',
    bgGradient: 'from-amber to-yellow-500',
    href: '/chl',
  },
  {
    id: 'cer',
    name: 'CER',
    fullName: 'Certified Endoscope Reprocessor',
    description: 'Master endoscope anatomy, reprocessing procedures, microbiology, and quality assurance',
    questionCount: 360,
    color: 'text-blue-500',
    bgGradient: 'from-blue-500 to-blue-600',
    href: '/cer',
  },
]

const totalQuestions = 400 + 240 + 360

export default function DashboardPage() {
  const router = useRouter()
  const [earnedCerts, setEarnedCerts] = useState<{cert: string}[]>([])

  useEffect(() => {
    async function loadCerts() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from("certified_users")
        .select("cert")
        .eq("user_id", user.id)
        .order("claimed_at", { ascending: true })
      if (data) setEarnedCerts(data)
    }
    loadCerts()
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center font-serif text-xl font-bold">
              SP
            </div>
            <div>
              <div className="font-serif text-lg font-bold">SPD Cert Companion</div>
              <div className="text-xs text-teal-3">Sterile Processing Certification Prep</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-navy to-navy-2 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs tracking-widest text-teal-3 mb-4">
            STERILE PROCESSING DEPARTMENT
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Pass your <em className="text-amber">certification exam</em> with confidence.
          </h1>
          <p className="text-teal-3 max-w-xl mx-auto mb-8">
            Comprehensive question banks, practice quizzes, and mock exams for CRCST, CHL, and CER certifications.
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="font-serif text-3xl text-amber">
                {totalQuestions}+
              </div>
              <div className="text-xs text-teal-3 uppercase tracking-wider">Questions</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-amber">3</div>
              <div className="text-xs text-teal-3 uppercase tracking-wider">Certifications</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-amber">4</div>
              <div className="text-xs text-teal-3 uppercase tracking-wider">Study Modes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Cards */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Earned Certifications */}
        {earnedCerts.length > 0 && (
          <div style={{
            background: "rgba(20,189,172,0.06)",
            border: "1px solid rgba(20,189,172,0.2)",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            marginBottom: "1rem",
          }}>
            <p style={{
              color: "#14BDAC",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              fontFamily: "monospace",
              marginBottom: "0.6rem",
            }}>
              YOUR CERTIFICATIONS
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {earnedCerts.map((c, i) => (
                <span key={i} style={{
                  background: "rgba(20,189,172,0.12)",
                  border: "1px solid #14BDAC",
                  borderRadius: "100px",
                  padding: "0.25rem 0.75rem",
                  color: "#14BDAC",
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  fontFamily: "monospace",
                }}>
                  {c.cert} ✓
                </span>
              ))}
            </div>
          </div>
        )}

        {/* I Passed Button */}
        <Link href="/passed">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.85rem 1.4rem",
              borderRadius: "12px",
              border: "2px solid #DAA520",
              background: "rgba(218,165,32,0.08)",
              color: "#DAA520",
              fontSize: "0.95rem",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "monospace",
              letterSpacing: "0.02em",
              width: "100%",
              marginBottom: "1.5rem",
              justifyContent: "center",
            }}
          >
            I Passed My Exam - Claim Your Badge
          </button>
        </Link>

        <div className="text-xs tracking-widest text-text-3 mb-6 text-center">
          SELECT YOUR CERTIFICATION
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.href}
              className="group bg-white border-2 border-cream-2 rounded-xl overflow-hidden hover:border-teal hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${cert.bgGradient} p-6 text-white`}>
                <div className="font-serif text-3xl font-bold mb-1">{cert.name}</div>
                <div className="text-sm opacity-90">{cert.fullName}</div>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <p className="text-sm text-text-3 mb-4 leading-relaxed">
                  {cert.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-serif text-2xl font-bold ${cert.color}`}>
                      {cert.questionCount}
                    </div>
                    <div className="text-xs text-text-3">Questions</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cream-2 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-cream-2 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs tracking-widest text-text-3 mb-6 text-center">
            STUDY FEATURES
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: '1', title: 'Practice Quiz', desc: 'Instant feedback on 20 questions' },
              { icon: '2', title: 'Flashcards', desc: 'Flip through cards to memorize' },
              { icon: '3', title: 'Mock Exam', desc: 'Timed simulation of real exam' },
              { icon: '4', title: 'Custom Quiz', desc: 'Build your own by domain' },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-teal/10 text-teal rounded-full flex items-center justify-center font-serif text-xl font-bold mx-auto mb-3">
                  {feature.icon}
                </div>
                <div className="font-serif font-bold text-navy mb-1">{feature.title}</div>
                <div className="text-xs text-text-3">{feature.desc}</div>
              </div>
            ))}
          </div>

          {/* Situational Judgment Card */}
          <div
            onClick={() => router.push("/quiz/scenarios")}
            style={{
              background: "rgba(232,160,32,0.05)",
              border: "2px solid rgba(232,160,32,0.25)",
              borderRadius: "16px",
              padding: "1.5rem",
              cursor: "pointer",
              transition: "all 0.2s",
              maxWidth: "400px",
              margin: "0 auto",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#E8A020";
              e.currentTarget.style.background = "rgba(232,160,32,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(232,160,32,0.25)";
              e.currentTarget.style.background = "rgba(232,160,32,0.05)";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🧠</div>
            <h3 style={{ color: "#E8A020", fontFamily: "DM Mono, monospace", fontSize: "0.8rem", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              SITUATIONAL JUDGMENT
            </h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 300, marginBottom: "0.75rem" }}>
              Real-world scenarios. Build decision-making skills beyond the exam.
            </p>
            <div style={{ color: "#E8A020", fontSize: "0.72rem", fontFamily: "DM Mono, monospace", opacity: 0.8 }}>
              30 scenarios · All domains
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-serif text-lg mb-2">SPD Cert Companion</div>
          <div className="text-xs text-teal-3">
            Helping sterile processing professionals pass their certification exams
          </div>
        </div>
      </footer>
    </div>
  )
}
