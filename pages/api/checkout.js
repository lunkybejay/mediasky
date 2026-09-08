const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '')

export default async function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  const { productId } = req.body
  // fetch product from DB
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()
  const product = await prisma.product.findUnique({ where: { id: Number(productId) } })
  await prisma.$disconnect()
  if (!product) return res.status(404).json({ message: 'Product not found' })

  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ message: 'Stripe not configured' })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'XAF', product_data: { name: product.name }, unit_amount: product.price * 1 }, quantity: 1 }],
    mode: 'payment',
    success_url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/?success=1',
    cancel_url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/?canceled=1'
  })

  return res.status(200).json({ url: session.url })
}
