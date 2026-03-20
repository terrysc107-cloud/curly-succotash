import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { Ticker } from "@/components/ticker"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { PricingSectionNew } from "@/components/pricing-section-new"
import { TestimonialsSection } from "@/components/testimonials-section"
import { IntakeSection } from "@/components/intake-section"
import { FooterNew } from "@/components/footer-new"

// Qualified Resume Co. — Resume Builder Landing Page
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Ticker />
      <HowItWorksSection />
      <PricingSectionNew />
      <TestimonialsSection />
      <IntakeSection />
      <FooterNew />
    </main>
  )
}
