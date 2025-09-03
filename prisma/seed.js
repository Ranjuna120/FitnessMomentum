const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.exercise.count()
  if (existing > 0) {
    console.log('Exercises already seeded.')
    return
  }
  await prisma.exercise.createMany({
    data: [
      { name: 'Back Squat', category: 'STRENGTH', primaryMuscle: 'Quads' },
      { name: 'Bench Press', category: 'STRENGTH', primaryMuscle: 'Chest' },
      { name: 'Deadlift', category: 'STRENGTH', primaryMuscle: 'Posterior Chain' },
      { name: 'Overhead Press', category: 'STRENGTH', primaryMuscle: 'Shoulders' },
      { name: 'Pull Up', category: 'STRENGTH', primaryMuscle: 'Lats' },
      { name: 'Plank', category: 'MOBILITY', primaryMuscle: 'Core' }
    ]
  })
  console.log('Seeded default exercises.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
