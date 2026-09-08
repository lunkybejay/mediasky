export default async function handler(req,res){
  const { method } = req
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()
  if (method === 'GET'){
    const id = req.query.id
    const product = await prisma.product.findUnique({ where: { id: Number(id) } })
    await prisma.$disconnect()
    if (!product) return res.status(404).end()
    return res.status(200).json(product)
  }
  res.setHeader('Allow','GET')
  res.status(405).end('Method not allowed')
}
