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

const specialMemberships = [
  {
    name: 'Student Pass',
    prices: [
      { months: 6, price: 'Rs 7,499', audience: 'Individual' },
      { months: 3, price: 'Rs 5,499', audience: 'Individual' },
    ],
    bullets: [
      'Made for college/school students only.',
      'Requires an active student ID card and Aadhar.',
      'Applicable for new members only.',
      'Valid for individuals aged up to 15 – 25 years only.',
      'No coaching/exam admit cards are applicable.',
      'No part payments are applicable.',
    ],
    gradient: 'from-emerald-400/40 via-green-500/25 to-emerald-700/20',
    icon: '🎓',
  },
  {
    name: 'Corporate Pass',
    highlights: [
      { lead: 'No Cost EMI', tail: ' applicable for ', value: '3/6 months' },
      { lead: 'EMI', tail: ' applicable upto ', value: '24 months' },
    ],
    bullets: [
      'Made for corporate professionals only.',
      'Requires an active employee ID card and Aadhar.',
      'Applicable for new members only.',
      'Valid for individuals aged above 24 years only.',
      'No job offer/ appointment letters are applicable.',
      'No part payments are applicable.',
    ],
    gradient: 'from-lime-400/35 via-emerald-500/25 to-teal-700/20',
    icon: '💼',
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
        {/* Quick actions / jump links */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a href="#membership" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50">Membership</a>
          <a href="#personal-training" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50">Personal Training</a>
          <a href="#special" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50">Special</a>
          <a href="#faqs" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50">FAQs</a>
          <div className="mx-2 h-6 w-px bg-white/15" />
          <a href="/dashboard/workouts/new" className="text-[11px] rounded-full px-3 py-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 hover:brightness-110 text-white shadow">Start a workout</a>
          <a href="/dashboard/workouts" className="text-[11px] rounded-full px-3 py-1 bg-white/10 hover:bg-white/20 transition backdrop-blur text-indigo-50">View workouts</a>
        </div>
      </div>

      {/* Membership section */}
      <section aria-labelledby="membership-heading" className="space-y-4" id="membership">
        <h2 id="membership-heading" className="text-lg font-semibold text-indigo-50 drop-shadow">Membership</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {membershipPlans.map((p) => (
            <div key={p.name} className={`group relative rounded-2xl p-[1px] bg-gradient-to-br ${p.gradient} shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_35px_-8px_rgba(0,0,0,0.6)] transition-transform will-change-transform`}> 
              <div className="relative rounded-2xl h-full w-full bg-white/5 backdrop-blur-md border border-white/10 p-5 text-indigo-50 group-hover:scale-[1.01] transition">
                <div className={`pointer-events-none absolute -right-8 -top-10 w-32 h-32 rounded-full bg-gradient-to-br blur-3xl opacity-40 ${p.gradient}`} />
                <div className="relative z-10 space-y-3">
                  <h3 className="text-2xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-emerald-200 drop-shadow">{p.name} Membership</h3>
                  <div className="text-sm md:text-base text-indigo-50/95 space-y-1">
                    <p>
                      x {p.months} {p.months === 1 ? 'month' : 'months'} at {p.priceIndividual} <span className="font-semibold">(Individual)</span>
                    </p>
                    <p>
                      x {p.months} {p.months === 1 ? 'month' : 'months'} at {p.priceCouple} <span className="font-semibold">(Couple)</span>
                    </p>
                  </div>
                  {p.features?.length ? (
                    <ul className="mt-2 text-[12px] md:text-[13px] text-indigo-100/90 list-disc pl-5 space-y-2">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer to encourage scroll */}
      <div className="h-12" />

      {/* Personal Training section */}
      <section aria-labelledby="pt-heading" className="space-y-4" id="personal-training">
        <h2 id="pt-heading" className="text-lg font-semibold text-indigo-50 drop-shadow">Personal Training</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personalTraining.map((p) => (
            <div key={p.name} className={`group relative rounded-2xl p-[1px] bg-gradient-to-br ${p.gradient} shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_35px_-8px_rgba(0,0,0,0.6)] transition-transform will-change-transform`}>
              <div className="relative rounded-2xl h-full w-full bg-white/5 backdrop-blur-md border border-white/10 p-5 text-indigo-50 group-hover:scale-[1.01] transition">
                <div className={`pointer-events-none absolute -right-8 -top-10 w-32 h-32 rounded-full bg-gradient-to-br blur-3xl opacity-40 ${p.gradient}`} />
                <div className="relative z-10 space-y-2">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-2xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-emerald-200 drop-shadow">{p.name}</h3>
                    {p.tag && (
                      <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-white/15 border border-white/20 text-indigo-50/90">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-indigo-50/95">
                    x {p.months} {p.months === 1 ? 'month' : 'months'} at {p.price} ({p.audience})
                  </p>
                  {p.note && (
                    <ul className="mt-2 text-[12px] md:text-[13px] text-indigo-100/90 list-disc pl-5">
                      <li>{p.note}</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />

      {/* Special Memberships */}
      <section aria-labelledby="special-heading" className="space-y-4" id="special">
        <h2 id="special-heading" className="text-lg font-semibold text-indigo-50 drop-shadow">Special Memberships</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {specialMemberships.map((p) => (
            <div key={p.name} className={`group relative rounded-2xl p-[1px] bg-gradient-to-br ${p.gradient} shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_35px_-8px_rgba(0,0,0,0.6)] transition-transform will-change-transform`}>
              <div className="relative rounded-2xl h-full w-full bg-transparent backdrop-blur-0 border border-white/10 p-5 text-indigo-50 group-hover:scale-[1.01] transition">
                <div className={`pointer-events-none absolute -right-8 -top-10 w-32 h-32 rounded-full bg-gradient-to-br blur-3xl opacity-40 ${p.gradient}`} />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    {p.icon && (
                      <span aria-hidden className="text-xl" title={p.name}>{p.icon}</span>
                    )}
                    <h3 className="text-2xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-emerald-200 drop-shadow">{p.name}</h3>
                  </div>

                  {p.prices && (
                    <div className="text-sm md:text-base text-indigo-50/95 space-y-1">
                      {p.prices.map((l) => (
                        <p key={`${l.months}-${l.audience}`}>
                          x {l.months} {l.months === 1 ? 'month' : 'months'} at {l.price} <span className="font-semibold">({l.audience})</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {p.highlights && (
                    <div className="text-sm md:text-base text-indigo-50/95 space-y-0.5">
                      {p.highlights.map((h) => (
                        <p key={h.lead}>
                          <span className="font-semibold">{h.lead}</span>
                          {h.tail}
                          <span className="font-bold">{h.value}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {p.bullets?.length ? (
                    <ul className="mt-2 text-[12px] md:text-[13px] text-indigo-100/90 list-disc pl-5 space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <div className="h-12" />
      <section aria-labelledby="faqs-heading" id="faqs" className="space-y-4">
        <h2 id="faqs-heading" className="text-lg font-semibold text-indigo-50 drop-shadow">FAQs</h2>
        <div className="grid gap-3">
          <details className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
            <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-indigo-50">Do I need a basic membership to purchase Personal Training?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-indigo-100">Policy</span>
            </summary>
            <p className="mt-3 text-sm text-indigo-100/85">Yes. Personal Training requires an active existing/new basic membership with the same validity.</p>
          </details>
          <details className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
            <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-indigo-50">Can I pause or transfer my membership?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-indigo-100">Flexibility</span>
            </summary>
            <p className="mt-3 text-sm text-indigo-100/85">Pauses and transfers may be available on select plans. Please check at the front desk for current terms.</p>
          </details>
          <details className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
            <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-indigo-50">Do you offer EMI or installment options?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-indigo-100">Payments</span>
            </summary>
            <p className="mt-3 text-sm text-indigo-100/85">No-cost and standard EMI options may be available for eligible plans. Availability can vary.</p>
          </details>
          <details className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
            <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-indigo-50">What’s included in the Body Scan Analysis?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-indigo-100">Assessment</span>
            </summary>
            <p className="mt-3 text-sm text-indigo-100/85">A guided measurement of key metrics like body weight, estimated body fat, and circumferences to help track progress.</p>
          </details>
        </div>
      </section>
    </div>
  )
}
