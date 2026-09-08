import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials || {}
        if (!email || !password) return null
        
        // Allow demo admin via env vars
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
          if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let user = await prisma.user.findUnique({ where: { email: process.env.ADMIN_EMAIL } })
            if (!user) {
              user = await prisma.user.create({
                data: { email: process.env.ADMIN_EMAIL, name: 'Admin' }
              })
            }
            return { id: user.id, email: user.email, name: user.name }
          }
        }
        
        // Check database users (implement bcrypt password hashing in production)
        const user = await prisma.user.findUnique({ where: { email } })
        if (user) {
          // TODO: Implement bcryptjs.compare(password, user.passwordHash) for production
          return { id: user.id, email: user.email, name: user.name }
        }
        
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'dev-secret-change-in-production',
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id
      return session
    }
  },
  pages: {
    signIn: '/admin/login'
  }
})
