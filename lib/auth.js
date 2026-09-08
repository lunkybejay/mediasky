const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret'

function signToken(payload, opts = {}){
  return jwt.sign(payload, SECRET, { expiresIn: opts.expiresIn || '7d' })
}

function verifyToken(token){
  try{
    return jwt.verify(token, SECRET)
  }catch(e){
    return null
  }
}

module.exports = { signToken, verifyToken }
