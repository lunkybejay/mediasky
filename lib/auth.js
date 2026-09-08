import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'

export async function getServerSessionWithAuth(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)
    return session
  } catch (error) {
    console.error('Session retrieval error:', error)
    return null
  }
}

export function isAdminAuthenticated(session) {
  return session?.user?.email === process.env.ADMIN_EMAIL
}
