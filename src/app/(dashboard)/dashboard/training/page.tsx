export const metadata = {
  title: 'Training | FitnessMomentum',
  description: 'Membership and Personal Training options'
}

const membershipPlans = [
  {
    name: 'Platinum',
    months: 12,
  priceIndividual: 'Rs 13,499',
  priceCouple: 'Rs 23,999',
    features: [
      'Group Activities / Yoga Sessions',
      'Personalized Diet Consultation',
      'Advanced Body Scan Analysis',
      'Personalized Exercise Counseling',
      'Advanced Guidance',
    ],
    gradient: 'from-indigo-500/30 via-fuchsia-500/30 to-emerald-500/30',
  },
  {
    name: 'Gold',
    months: 6,
  priceIndividual: 'Rs 7,499',
  priceCouple: 'Rs 13,999',
    features: [
      'Group Activities / Yoga Sessions',
      'Personalized Diet Consultation',
      'Body Scan Analysis',
      'Personalized Exercise Counseling',
      'Progressive Guidance',
    ],
    gradient: 'from-amber-400/30 via-orange-500/25 to-rose-500/25',
  },
  {
    name: 'Silver',
    months: 3,
  priceIndividual: 'Rs 5,499',
  priceCouple: 'Rs 9,999',
    features: [
      'Group Activities',
      'General Diet Consultation',
      'Body Scan Analysis',
      'General Exercise Counseling',
      'General Guidance',
    ],
    gradient: 'from-slate-300/30 via-gray-400/25 to-indigo-400/20',
  },
  {
    name: 'Bronze',
    months: 1,
  priceIndividual: 'Rs 2,499',
  priceCouple: 'Rs 4,299',
    features: [
      'Group Activities',
      'General Diet Consultation',
      'General Exercise Counseling',
      'General Guidance',
    ],
    gradient: 'from-amber-700/30 via-orange-700/25 to-rose-700/20',
  },
]

const personalTraining = [
  {
    name: 'Elite',
    tag: 'Big Value Saver',
    months: 12,
  price: 'Rs 64,999',
    audience: 'Individual',
    note: 'Requires an active existing/new basic membership plan with the same validity.',
    gradient: 'from-fuchsia-500/30 to-purple-700/20',
  },
  {
    name: 'Pro',
    months: 6,
  price: 'Rs 34,999',
    audience: 'Individual',
    note: 'Requires an active existing/new basic membership plan with the same validity.',
    gradient: 'from-indigo-500/30 to-blue-700/20',
  },
  {
    name: 'Premium',
    months: 3,
  price: 'Rs 19,999',
    audience: 'Individual',
    note: 'Requires an active existing/new basic membership plan with the same validity.',
    gradient: 'from-emerald-500/30 to-teal-700/20',
  },
  {
    name: 'Plus',
    months: 1,
  price: 'Rs 6,999',
    audience: 'Individual',
    note: 'Requires an active existing/new basic membership plan with the same validity.',
    gradient: 'from-cyan-400/30 to-sky-600/20',
  },
]

export default function TrainingPage() {
  return (
    <div className="relative p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-indigo-50 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400" />
          TRAINING
        </span>
        <h1 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">
          Plans & Coaching
        </h1>
        <p className="mt-2 text-sm text-indigo-100/80 max-w-2xl">
          Choose a membership or work 1:1 with a coach. Scroll to see Personal Training options.
        </p>
      </div>

      {/* Membership section */}
      <section aria-labelledby="membership-heading" className="space-y-4">
        <h2 id="membership-heading" className="text-lg font-semibold text-indigo-50 drop-shadow">Membership</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {membershipPlans.map((p) => (
            <div key={p.name} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 text-indigo-50 shadow-sm hover:shadow-xl transition">
              <div className={`pointer-events-none absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${p.gradient} blur-2xl opacity-60`} />
              <div className="relative z-10 space-y-3">
                <h3 className="text-2xl font-extrabold tracking-tight drop-shadow leading-tight">{p.name} Membership</h3>
                <div className="text-sm md:text-base text-indigo-100/90 space-y-1">
                  <p>
                    x {p.months} {p.months === 1 ? 'month' : 'months'} at {p.priceIndividual} <span className="font-semibold">(Individual)</span>
                  </p>
                  <p>
                    x {p.months} {p.months === 1 ? 'month' : 'months'} at {p.priceCouple} <span className="font-semibold">(Couple)</span>
                  </p>
                </div>
                {p.features?.length ? (
                  <ul className="mt-2 text-[12px] md:text-[13px] text-indigo-100/85 list-disc pl-5 space-y-2">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer to encourage scroll */}
      <div className="h-12" />

      {/* Personal Training section */}
      <section aria-labelledby="pt-heading" className="space-y-4">
        <h2 id="pt-heading" className="text-lg font-semibold text-indigo-50 drop-shadow">Personal Training</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalTraining.map((p) => (
            <div key={p.name} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur p-5 text-indigo-50 shadow-sm hover:shadow-xl transition">
              <div className={`pointer-events-none absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${p.gradient} blur-2xl opacity-60`} />
              <div className="relative z-10 space-y-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="text-2xl font-extrabold tracking-tight drop-shadow leading-none">{p.name}</h3>
                  {p.tag && (
                    <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-indigo-50/90">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-indigo-100/90">
                  x {p.months} {p.months === 1 ? 'month' : 'months'} at {p.price} ({p.audience})
                </p>
                {p.note && (
                  <ul className="mt-2 text-[12px] md:text-[13px] text-indigo-100/80 list-disc pl-5">
                    <li>{p.note}</li>
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
