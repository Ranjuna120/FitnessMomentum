import Link from 'next/link'

export const dynamic = 'force-dynamic'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    tagline: 'Core logging & basic stats',
    features: [
      'Unlimited workout logs',
      'Basic volume stats',
      'Body metrics tracking',
      'Export data (CSV)',
      'Community roadmap access'
    ],
    cta: 'Start Free',
    href: '/auth/signup',
    gradient: 'from-indigo-500/25 to-fuchsia-600/25'
  },
  {
    name: 'Pro',
    price: '$7',
    period: '/mo',
    tagline: 'Deep insights & automation',
    popular: true,
    features: [
      'Everything in Free',
      'Advanced progress charts',
      'PR timeline & highlight feed',
      'Adaptive goal suggestions',
      'Exercise template library',
      'Macro & habit tracking (upcoming)',
      'Priority feature voting'
    ],
    cta: 'Go Pro',
    href: '/auth/signup?plan=pro',
    gradient: 'from-fuchsia-500/30 via-indigo-500/30 to-emerald-500/30'
  },
  {
    name: 'Coach',
    price: '$19',
    period: '/mo',
    tagline: 'Tools for trainers & teams',
    features: [
      'Everything in Pro',
      'Client program sharing',
      'Multi-athlete dashboards',
      'Progress reports export',
      'Private coach portal',
      'Early API access'
    ],
    cta: 'Join Waitlist',
    href: '/auth/signup?plan=coach',
    gradient: 'from-emerald-500/25 to-teal-600/25'
  }
]

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_15%_18%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,.55),transparent_60%),radial-gradient(circle_at_45%_85%,rgba(16,185,129,.50),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 backdrop-blur-[2px]" />
      <div className="absolute inset-0 -z-10 opacity-25 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.08)_50%,rgba(255,255,255,.08)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />

  <section className="container mx-auto px-6 pt-16 pb-32 flex flex-col items-center gap-16 text-center relative">
        <header className="space-y-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,#a5b4fc_0%,#f5a2ff_40%,#6ee7b7_80%)] bg-[length:200%_200%] animate-[pulseGradient_10s_ease_infinite] drop-shadow">Pricing</h1>
          <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed max-w-3xl mx-auto">Start free. Upgrade only when you want deeper analytics, automation, and coaching features.</p>
        </header>

        <div className="w-full max-w-7xl grid md:grid-cols-3 gap-8 auto-rows-fr">
          {plans.map(p => (
            <div
              key={p.name}
              className={`relative group rounded-2xl border border-white/10 bg-gradient-to-br ${p.popular ? 'from-white/10 via-white/5 to-white/0' : 'from-white/5 to-white/0'} backdrop-blur-xl p-6 flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_8px_30px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1`}
            >
              <div className={`pointer-events-none absolute -right-10 -top-14 w-56 h-56 rounded-full bg-gradient-to-br ${p.gradient} blur-3xl opacity-50 group-hover:opacity-70 transition`} />
              {p.popular && (
                <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 text-white shadow ring-1 ring-white/20">
                  MOST POPULAR
                </span>
              )}
              <div className="relative space-y-1 text-left">
                <h3 className="text-xl font-bold text-indigo-50 drop-shadow-sm">{p.name}</h3>
                <p className="text-[13px] text-indigo-100/70 leading-relaxed">{p.tagline}</p>
              </div>
              <div className="relative text-left pt-2 pb-2">
                <span className="text-4xl font-bold tracking-tight text-indigo-50">{p.price}</span>
                <span className="text-indigo-100/60 ml-1 align-top text-sm font-medium">{p.period}</span>
              </div>
              <ul className="relative space-y-2 text-left text-[13px] text-indigo-100/80 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex gap-2 items-start">
                    <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 shadow" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="relative pt-5 mt-auto">
                <Link
                  href={p.href}
                  className={`group/btn w-full inline-flex justify-center items-center rounded-full font-semibold text-sm px-6 py-2.5 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition
                    ${p.popular
                      ? 'text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.02] active:scale-[0.99]'
                      : 'text-indigo-50 bg-white/15 hover:bg-white/25 active:bg-white/30'}
                  `}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-8 text-indigo-100/70 text-sm">
          <h2 className="text-indigo-50 font-semibold text-lg tracking-wide">FAQ</h2>
          <div className="grid gap-6 text-left">
            <div>
              <p className="font-medium text-indigo-50 mb-1">When will Pro launch?</p>
              <p>Targeting late Q4. Early adopters may get discounted lifetime pricing.</p>
            </div>
            <div>
              <p className="font-medium text-indigo-50 mb-1">Can I export my data?</p>
              <p>Yes. CSV export is included in Free; richer export formats coming for Pro/Coach.</p>
            </div>
            <div>
              <p className="font-medium text-indigo-50 mb-1">Will there be a lifetime plan?</p>
              <p>Possibly during early launch waves if there is interest—join the roadmap updates.</p>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-5xl mt-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 backdrop-blur-md px-8 py-12 flex flex-col items-center gap-6">
            <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/25 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Ready to train smarter?</h2>
            <p className="text-sm md:text-base text-indigo-100/80 max-w-xl text-center">Join now and be part of shaping the future of the platform.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.04] transition">Get Started Free</Link>
              <Link href="/auth/signin" className="text-sm rounded-full px-6 py-3 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50 font-medium shadow">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
