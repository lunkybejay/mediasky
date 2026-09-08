export default async function handler(req, res){
  const { method } = req
  if (method === 'GET'){
    // simple DB via Prisma
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    const products = await prisma.product.findMany({orderBy:{id:'asc'}})
    await prisma.$disconnect()
    return res.status(200).json(products)
  }
  if (method === 'POST'){
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    const body = req.body
    const p = await prisma.product.create({data: body})
    await prisma.$disconnect()
    return res.status(201).json(p)
  }
  res.setHeader('Allow','GET,POST')
  res.status(405).end('Method not allowed')
}
