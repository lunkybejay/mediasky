import prisma from '../../../lib/prisma'

const FLUTTERWAVE_URL = 'https://api.flutterwave.com/v3'
const FLW_SECRET = process.env.FLUTTERWAVE_SECRET_KEY

export default async function handler(req, res) {
  const { orderId, status } = req.query
  
  if (!orderId) return res.status(400).json({ message: 'Order ID required' })
  
  try {
    // Verify payment with Flutterwave
    const verifyResponse = await fetch(`${FLUTTERWAVE_URL}/transactions/${status}/verify`, {
      headers: { 'Authorization': `Bearer ${FLW_SECRET}` }
    })
    
    const verification = await verifyResponse.json()
    
    if (verification.status === 'success' && verification.data.status === 'successful') {
      // Update order
      await prisma.order.update({
        where: { id: Number(orderId) },
        data: { status: 'paid', paymentId: verification.data.id }
      })
      return res.status(200).json({ success: true, message: 'Payment verified' })
    }
    
    return res.status(400).json({ success: false, message: 'Payment verification failed' })
  } catch (error) {
    console.error('Verification error:', error)
    return res.status(500).json({ message: 'Verification failed', error: error.message })
  }
}
