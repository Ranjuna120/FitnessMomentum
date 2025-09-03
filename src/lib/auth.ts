import { getServerSession, type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const providers: any[] = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  )
}

providers.push(
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null
      const user = await prisma.user.findUnique({ where: { email: credentials.email } })
      if (!user || !user.passwordHash) return null
      const valid = await bcrypt.compare(credentials.password, user.passwordHash)
      if (!valid) return null
      return { id: user.id, email: user.email, name: user.name }
    }
  })
)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'database' },
  providers,
  callbacks: {
    async session({ session, token }: any) {
      if (token?.sub) (session.user as any).id = token.sub
      return session
    }
  }
}

export function getCurrentUser() {
  return getServerSession(authOptions).then((s: any) => s?.user)
}
