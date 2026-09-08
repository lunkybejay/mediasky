import prisma from '../../../lib/prisma'

const FLUTTERWAVE_URL = 'https://api.flutterwave.com/v3'
const FLW_SECRET = process.env.FLUTTERWAVE_SECRET_KEY
const WEBHOOK_SECRET = process.env.FLUTTERWAVE_WEBHOOK_SECRET

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Webhook from Flutterwave
    const payload = req.body
    const signature = req.headers['verificationhash']
    
    // Verify webhook signature
    if (signature !== generateHash(JSON.stringify(payload))) {
      return res.status(401).json({ message: 'Invalid signature' })
    }
    
    // Handle payment callback
    if (payload.status === 'successful') {
      // Update order status
      const tx_ref = payload.tx_ref
      await prisma.order.update({
        where: { id: parseInt(tx_ref.split('_')[1]) },
        data: { status: 'paid', paymentId: payload.id, paymentMethod: 'momo' }
      })
      return res.status(200).json({ message: 'Payment confirmed' })
    }
    return res.status(200).json({ message: 'Webhook processed' })
  }
  
  if (req.method === 'GET') {
    // Initiate MoMo payment
    const { productId } = req.query
    
    try {
      const product = await prisma.product.findUnique({ where: { id: Number(productId) } })
      if (!product) return res.status(404).json({ message: 'Product not found' })
      
      // Create order
      const order = await prisma.order.create({
        data: {
          productId: product.id,
          quantity: 1,
          status: 'pending',
          paymentMethod: 'momo'
        }
      })
      
      // Initialize Flutterwave payment
      const paymentResponse = await fetch(`${FLUTTERWAVE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FLW_SECRET}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tx_ref: `order_${order.id}`,
          amount: product.price / 100, // Convert to decimal
          currency: 'XAF',
          redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment-status?orderId=${order.id}`,
          meta: { productId: product.id },
          customer: {
            email: 'customer@example.com',
            phonenumber: '237670000000',
            name: 'Customer'
          },
          payment_options: 'ussd,mobile_money_cameroon'
        })
      })
      
      const paymentData = await paymentResponse.json()
      if (paymentData.status === 'success') {
        return res.status(200).json({ link: paymentData.data.link, orderId: order.id })
      }
      return res.status(400).json({ message: 'Failed to initialize payment' })
    } catch (error) {
      console.error('MoMo payment error:', error)
      return res.status(500).json({ message: 'Payment initialization failed', error: error.message })
    }
  }
  
  res.status(405).end()
}

function generateHash(data) {
  const crypto = require('crypto')
  return crypto.createHmac('sha256', WEBHOOK_SECRET).update(data).digest('hex')
}
