import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About | FitnessMomentum Gym',
  description: 'Learn about our mission, coaches, and facilities.'
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background layers (match landing/pricing) */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_15%_18%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,.55),transparent_60%),radial-gradient(circle_at_45%_85%,rgba(16,185,129,.50),transparent_60%)]" />
      <div className="absolute inset-0 -z-20 backdrop-blur-[2px]" />
      <div className="absolute inset-0 -z-10 opacity-25 mix-blend-overlay bg-[linear-gradient(120deg,rgba(255,255,255,.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.08)_50%,rgba(255,255,255,.08)_75%,transparent_75%,transparent)] bg-[length:32px_32px]" />
      <div className="absolute inset-0 -z-30">
        <Image src="/images/loading3.jpg" alt="Gym background" fill sizes="100vw" className="object-cover opacity-20 mix-blend-overlay" priority />
      </div>

      <section className="container pt-16 pb-28 flex flex-col items-center gap-16 text-center relative">
        {/* Hero */}
        <header className="max-w-4xl space-y-5 fade-in">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-indigo-50 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 animate-pulse" />
            ABOUT US
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,#a5b4fc_0%,#f5a2ff_40%,#6ee7b7_80%)] bg-[length:200%_200%] animate-[pulseGradient_10s_ease_infinite] drop-shadow">
            FitnessMomentum Gym
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed">
            We help everyday people get stronger, fitter, and more confident with smart coaching, clean facilities, and flexible hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/dashboard/training" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.04] transition">
              View Memberships
            </Link>
            <Link href="/#timing" className="text-sm rounded-full px-6 py-3 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50 font-medium shadow">
              See Opening Hours
            </Link>
          </div>
        </header>

        {/* Quick stats */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Years Serving" value="7+" />
          <StatCard label="Active Members" value="1,200+" />
          <StatCard label="Certified Coaches" value="8" />
          <StatCard label="Classes / Week" value="30+" />
        </div>

        {/* Mission & values */}
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 text-left text-indigo-100/85">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-600/25 blur-3xl" />
            <h2 className="text-2xl font-bold text-indigo-50 mb-2 drop-shadow">Our Mission</h2>
            <p className="text-sm leading-relaxed">
              Make strength training simple, welcoming, and sustainable. We combine evidence-based programming with a community-first mindset so you can keep momentum—no matter your starting point.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-600/25 blur-3xl" />
            <h2 className="text-2xl font-bold text-indigo-50 mb-2 drop-shadow">What We Value</h2>
            <ul className="text-sm leading-relaxed space-y-2">
              <FeatureItem text="Coaching that meets you where you are" />
              <FeatureItem text="Clean, safe, and well-maintained facilities" />
              <FeatureItem text="Flexible hours with ladies-only timing" />
              <FeatureItem text="Progress you can see and celebrate" />
            </ul>
          </div>
        </div>

        {/* Why choose us */}
        <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
          <InfoCard title="Certified Coaches" desc="Personal training and small-group sessions tailored to your goals." gradient="from-indigo-500/30 to-indigo-700/20" />
          <InfoCard title="Flexible Hours" desc="Open mornings and evenings with ladies-only hours midday." gradient="from-fuchsia-500/30 to-purple-700/20" />
          <InfoCard title="Holistic Support" desc="Nutrition guidance, habit tracking, and progress reviews." gradient="from-emerald-500/30 to-teal-700/20" />
        </div>

        {/* Trainers preview */}
        <div className="w-full max-w-6xl text-left">
          <h2 className="text-2xl font-bold text-indigo-50 mb-4 drop-shadow text-center md:text-left">Meet Our Coaches</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Ravi', role: 'Head Coach' },
              { name: 'Nisha', role: 'Strength Coach' },
              { name: 'Amal', role: 'Mobility & Rehab' },
              { name: 'Sasha', role: 'Ladies Coach' }
            ].map((t) => (
              <div key={t.name} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-indigo-50">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-emerald-400" />
                  <div>
                    <p className="font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-indigo-100/70">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div className="w-full max-w-6xl text-left">
          <h2 className="text-2xl font-bold text-indigo-50 mb-4 drop-shadow text-center md:text-left">Facilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Strength Area', desc: 'Racks, barbells, dumbbells up to 50kg' },
              { title: 'Conditioning Zone', desc: 'Rowers, bikes, sled, kettlebells' },
              { title: 'Mobility Corner', desc: 'Bands, blocks, mats, foam rollers' },
              { title: 'Ladies-Only Hours', desc: '10:30 AM – 5:00 PM with ladies staff' },
              { title: 'Showers & Lockers', desc: 'Clean, secure, well-maintained' },
              { title: 'Nutrition Desk', desc: 'Guidance for fueling your training' }
            ].map((f) => (
              <div key={f.title} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl opacity-50" />
                <p className="font-semibold text-indigo-50 mb-1 drop-shadow">{f.title}</p>
                <p className="text-sm text-indigo-100/80">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 backdrop-blur-md px-8 py-12 flex flex-col items-center gap-6">
            <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/25 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/25 to-teal-500/25 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Train with us</h2>
            <p className="text-sm md:text-base text-indigo-100/80 max-w-xl text-center">Start now and keep momentum. Drop in for a free tour and consultation.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard/training" className="relative text-sm shadow-lg inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:300%_300%] animate-[pulseGradient_6s_ease_infinite] hover:scale-[1.04] transition">See Plans</Link>
              <Link href="/#timing" className="text-sm rounded-full px-6 py-3 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50 font-medium shadow">View Hours</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-left text-indigo-50">
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br from-white/25 to-transparent blur-2xl opacity-50" />
      <div className="text-3xl font-bold tracking-tight drop-shadow-sm">{value}</div>
      <div className="text-xs text-indigo-100/75">{label}</div>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 shadow" />
      <span>{text}</span>
    </li>
  )
}

function InfoCard({ title, desc, gradient }: { title: string; desc: string; gradient: string }) {
  return (
    <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-left text-indigo-50 shadow-sm hover:shadow-xl transition">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-60 group-hover:opacity-80 transition`} />
      <h3 className="text-base font-semibold mb-2 tracking-wide drop-shadow">{title}</h3>
      <p className="text-[13px] leading-relaxed text-indigo-100/80 relative z-10">{desc}</p>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white/40 to-transparent transition" />
    </div>
  )
}
