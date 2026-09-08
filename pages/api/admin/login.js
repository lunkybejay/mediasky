const cookie = require('cookie')
const { signToken } = require('../../../lib/auth')

export default function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return res.status(500).json({ message: 'Admin credentials not configured' })
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
    const token = signToken({ role: 'admin', email })
    res.setHeader('Set-Cookie', cookie.serialize('ms_token', token, { httpOnly: true, path: '/', maxAge: 7*24*60*60 }))
    return res.status(200).json({ ok: true })
  }
  return res.status(401).json({ message: 'Invalid credentials' })
}
