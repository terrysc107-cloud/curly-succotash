import { Sparkles } from "lucide-react"

export function Guarantee() {
  return (
    <section className="py-12 px-6 bg-warm border-t border-border">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-4">
          <Sparkles className="w-8 h-8 mx-auto text-gold" />
        </div>
        <h3 className="font-serif text-2xl text-foreground mb-3">
          Built for students. Backed by industry.
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-light">
          Qualified Resume Co. is a Scott Advisory Group product — built by a CRCST-certified sterile processing executive who has trained and placed students across the country. Every resume is reviewed by someone who knows what healthcare hiring managers actually look for.
        </p>
      </div>
    </section>
  )
}
