"use client"

export function PricingSectionNew() {
  const packages = [
    {
      tag: "",
      name: "Starter",
      price: 29,
      desc: "Perfect for career changers and entry-level professionals getting back into the market.",
      features: [
        "1 resume variation",
        "ATS keyword optimization",
        "Job description analysis",
        "Expert review",
        "48-hour delivery",
        "2 revision rounds"
      ],
      featured: false,
      squareLink: "https://square.link/u/j7Ky4isi"
    },
    {
      tag: "Most Popular",
      name: "Standard",
      price: 49,
      desc: "The complete package for mid-career professionals targeting a specific role.",
      features: [
        "2 resume variations",
        "ATS keyword optimization",
        "Custom cover letter",
        "Company research included",
        "Expert review",
        "48-hour delivery",
        "3 revision rounds"
      ],
      featured: true,
      squareLink: "https://square.link/u/Jbn6uVYr"
    },
    {
      tag: "Full Package",
      name: "Premium",
      price: 79,
      desc: "Everything you need for a complete job search including LinkedIn optimization.",
      features: [
        "3 resume variations",
        "ATS keyword optimization",
        "Custom cover letter",
        "LinkedIn summary rewrite",
        "Company + role research",
        "24-hour delivery",
        "3 revision rounds"
      ],
      featured: false,
      squareLink: "https://square.link/u/UtQ7nKp3"
    }
  ]

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-ink">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-end mb-14 gap-6">
          <div>
            <div className="text-[9px] tracking-[0.22em] uppercase text-gold2 mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold2" />
              Pricing
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              Invest in your <em className="text-gold2 italic">next opportunity</em>
            </h2>
          </div>
          <p className="text-[10px] text-white/25 tracking-wide max-w-[280px] leading-[1.7] text-right">
            All packages include AI research, expert human review, and delivery to your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`p-9 md:p-11 transition-colors ${
                pkg.featured 
                  ? 'bg-[#0f0e00] border-t-2 border-gold -mt-0.5' 
                  : 'bg-ink2 hover:bg-[#111108]'
              }`}
            >
              <div className="text-[8px] tracking-[0.18em] uppercase text-gold h-3.5 mb-5">
                {pkg.tag}
              </div>
              <div className="font-serif text-2xl font-light text-white mb-2">{pkg.name}</div>
              <div className="font-serif text-5xl font-light text-gold2 leading-none mb-1.5">
                <sub className="text-lg text-white/30 font-sans align-super mr-1">$</sub>
                {pkg.price}
              </div>
              <p className="text-[10px] text-white/30 leading-[1.75] tracking-wide mb-8 min-h-12">
                {pkg.desc}
              </p>
              <div className="h-px bg-white/[0.06] mb-7" />
              <ul className="mb-9 space-y-0">
                {pkg.features.map((feature, j) => (
                  <li 
                    key={j} 
                    className="flex items-start gap-2.5 py-2.5 border-b border-white/[0.04] text-[10px] text-white/50 tracking-wide leading-relaxed last:border-b-0"
                  >
                    <span className="text-gold flex-shrink-0 text-[11px]">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={pkg.squareLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3.5 text-[9px] tracking-[0.18em] uppercase transition-colors ${
                  pkg.featured 
                    ? 'bg-gold border border-gold text-ink font-medium hover:bg-gold2' 
                    : 'bg-transparent border border-white/10 text-white/50 hover:border-gold2 hover:text-gold2'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
