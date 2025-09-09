import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
    {/* Global full-page background image (above base gradient, below overlays) */}
    <div className="absolute inset-0 -z-30">
        <Image
          src="/images/loading2.jpg"
          alt="Site background"
          fill
          sizes="100vw"
          priority
      className="object-cover object-center opacity-30 mix-blend-overlay"
        />
      </div>
    {/* Layered vibrant background */}
    <div className="absolute inset-0 -z-40 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_15%_18%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,.55),transparent_60%),radial-gradient(circle_at_45%_85%,rgba(16,185,129,.50),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 backdrop-blur-[2px]" />
      <div className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.08)_50%,rgba(255,255,255,.08)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />

  <section className="container pt-14 md:pt-16 pb-28 flex flex-col items-center text-center gap-14 fade-in relative">
        {/* Hero */}
  {/* Background image now applied globally above; removed hero-specific layer */}
        <div className="relative w-full max-w-6xl grid grid-cols-1 gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-indigo-50 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 animate-pulse" />
            ALPHA PREVIEW
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,#a5b4fc_0%,#f5a2ff_40%,#6ee7b7_80%)] bg-[length:200%_200%] animate-[pulseGradient_10s_ease_infinite] drop-shadow">
            Build strength & track progress with clarity & momentum
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed max-w-3xl mx-auto">
            Log workouts fast, visualize performance trends, and stay consistent. Your training data becomes an evolving story you can act on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/auth/signup" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.04] transition">
              Get Started
            </Link>
            <Link href="/pricing" className="text-sm rounded-full px-6 py-3 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50 font-medium shadow">
              Pricing
            </Link>
          </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="w-full max-w-6xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <FeatureCard title="Structured Logging" accent="from-indigo-500/30 to-indigo-700/30">
            Fast set entry, exercise templates, and smart defaults designed to keep you moving.
          </FeatureCard>
          <FeatureCard title="Progress Insights" accent="from-fuchsia-500/30 to-purple-700/30">
            Volume, PRs, and movement trends surfaced automatically as you train.
          </FeatureCard>
          <FeatureCard title="Extensible Core" accent="from-emerald-500/30 to-teal-700/30">
            Clean data model ready for custom metrics, mobility tracking, and more.
          </FeatureCard>
          <FeatureCard title="Macro & Metrics" accent="from-rose-500/30 to-pink-700/30">
            Track body composition & nutrition together for contextual performance.
          </FeatureCard>
          <FeatureCard title="Adaptive Goals" accent="from-amber-500/30 to-orange-700/30">
            Dynamic targets adjust as you improve—keep momentum without burnout.
          </FeatureCard>
          <FeatureCard title="Privacy First" accent="from-sky-500/30 to-cyan-700/30">
            Your data stays yours—export any time, self-host options coming.
          </FeatureCard>
        </div>

        {/* Bottom CTA */}
        <div className="relative w-full max-w-5xl mt-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 backdrop-blur-md px-8 py-10 flex flex-col items-center gap-6">
            <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/25 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">
              Ready to build momentum?
            </h2>
            <p className="text-sm md:text-base text-indigo-100/80 max-w-xl">Start logging today—your first training week can be set up in minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.04] transition">Create Free Account</Link>
              <Link href="/auth/signin" className="text-sm rounded-full px-6 py-3 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50 font-medium shadow">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-left text-indigo-50 shadow-sm hover:shadow-xl transition">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br ${accent} blur-2xl opacity-60 group-hover:opacity-80 transition`} />
      <h3 className="text-base font-semibold mb-2 tracking-wide drop-shadow">{title}</h3>
      <p className="text-[13px] leading-relaxed text-indigo-100/80 relative z-10">{children}</p>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white/40 to-transparent transition" />
    </div>
  )
}
