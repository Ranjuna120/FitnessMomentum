// import { redirect } from 'next/navigation'
// import { getCurrentUser } from '../../../../lib/auth'
// import { prisma } from '../../../../lib/prisma'

// export const dynamic = 'force-dynamic'

// async function createMetric(userId: string, formData: FormData) {
//   const weight = formData.get('weightKg')?.toString();
//   const bodyFat = formData.get('bodyFatPct')?.toString();
//   const waist = formData.get('waistCm')?.toString();
//   await prisma.bodyMetric.create({
//     data: {
//       userId,
//       weightKg: weight ? parseFloat(weight) : null,
//       bodyFatPct: bodyFat ? parseFloat(bodyFat) : null,
//       waistCm: waist ? parseFloat(waist) : null
//     }
//   })
// }

// export default async function NewMetricPage() {
//   const user = await getCurrentUser()
//   if (!user) redirect('/auth/signin')
//   async function action(data: FormData) {
//     'use server'
//     await createMetric((user as any).id, data)
//     redirect('/dashboard/metrics')
//   }
//   return (
//     <div className="p-6 space-y-6 max-w-xl">
//       <h1 className="text-2xl font-semibold">Add Body Metric</h1>
//       <form action={action} className="space-y-4 card">
//         <div className="grid gap-3 md:grid-cols-3">
//           <label className="space-y-1 text-sm">
//             <span>Weight (kg)</span>
//             <input name="weightKg" type="number" step="0.1" />
//           </label>
//           <label className="space-y-1 text-sm">
//             <span>Body Fat %</span>
//             <input name="bodyFatPct" type="number" step="0.1" />
//           </label>
//           <label className="space-y-1 text-sm">
//             <span>Waist (cm)</span>
//             <input name="waistCm" type="number" step="0.1" />
//           </label>
//         </div>
//         <div className="flex gap-3">
//           <button className="btn-brand" type="submit">Save</button>
//           <button formAction="/dashboard/metrics" formMethod="get" className="btn-outline" type="submit">Cancel</button>
//         </div>
//       </form>
//     </div>
//   )
// }
