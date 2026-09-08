import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Not authenticated' })
    
    return res.status(200).json({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return res.status(500).json({ message: 'Failed to fetch user' })
  }
}
