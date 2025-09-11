import { redirect } from 'next/navigation'

// This route was replaced by /dashboard/metrics/new. Keep as redirect to avoid build errors.
export const dynamic = 'force-dynamic'

export default function MetricsNewRedirect() {
	redirect('/dashboard/metrics/new')
}
