const { verifyToken } = require('../../../lib/auth')

export default function handler(req,res){
  const cookie = req.headers.cookie
  if (!cookie) return res.status(401).json({ message: 'No cookie' })
  const match = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('ms_token='))
  if (!match) return res.status(401).json({ message: 'No token' })
  const token = match.split('=')[1]
  const payload = verifyToken(token)
  if (!payload) return res.status(401).json({ message: 'Invalid token' })
  return res.status(200).json({ user: payload })
}
