import { getCurrentUser } from '../../../../lib/auth'
import { redirect } from 'next/navigation'
import nextDynamic from 'next/dynamic'

const ProfilePreferencesCard = nextDynamic(() => import('../../../../components/profile/ProfilePreferencesCard'), { ssr: false })
const AccountCard = nextDynamic(() => import('../../../../components/profile/AccountCard'), { ssr: false })
const NotificationPreferencesCard = nextDynamic(() => import('../../../../components/profile/NotificationPreferencesCard'), { ssr: false })
const AppearancePreferencesCard = nextDynamic(() => import('../../../../components/profile/AppearancePreferencesCard'), { ssr: false })
const DataPrivacyCard = nextDynamic(() => import('../../../../components/profile/DataPrivacyCard'), { ssr: false })

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/signin')

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,.55),transparent_60%),radial-gradient(circle_at_80%_25%,rgba(236,72,153,.45),transparent_60%),radial-gradient(circle_at_35%_80%,rgba(16,185,129,.40),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />
      <div className="relative px-6 pt-10 pb-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,.08),transparent_70%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,.06),transparent_70%)]" />
  <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 drop-shadow">Profile</h1>
            <p className="text-sm text-indigo-100/80">Manage account details & preferences.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Account Card */}
            <AccountCard email={user.email} name={user.name ?? ''} provider={user?.image ? 'OAuth' : 'Credentials'} />

            {/* Preferences Card */}
            <ProfilePreferencesCard />

            {/* Notifications */}
            <NotificationPreferencesCard />

            {/* Appearance */}
            <AppearancePreferencesCard />

            {/* Security Card */}
            <SecurityCard />

            {/* Data & Privacy */}
            <DataPrivacyCard />
          </div>
        </div>
      </div>
    </div>
  )
}

function SecurityCard() {
  return (
    <div className="relative overflow-hidden rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md md:col-span-2">
      <h2 className="text-sm font-semibold text-indigo-50 mb-3">Security</h2>
      <p className="text-xs text-indigo-100/70 mb-3">Password reset & multi-factor auth features will appear here.</p>
      <div className="flex flex-wrap gap-3 text-[11px]">
        <button className="relative inline-flex items-center px-4 py-2 rounded-full font-medium text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-[length:220%_220%] animate-[pulseGradient_8s_ease_infinite] hover:scale-[1.03] transition">Reset Password</button>
        <button className="rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur text-indigo-50 font-medium">Enable MFA</button>
      </div>
      <div className="absolute right-4 bottom-2 w-20 h-20 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-600/30 blur-2xl" />
    </div>
  )
}
