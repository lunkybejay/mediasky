export default async function handler(req,res){
  const { method, body } = req
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()
  if (method === 'GET'){
    const list = await prisma.wholesaler.findMany()
    await prisma.$disconnect()
    return res.status(200).json(list)
  }
  if (method === 'POST'){
    const record = await prisma.wholesaler.create({ data: body })
    await prisma.$disconnect()
    return res.status(201).json(record)
  }
  res.setHeader('Allow','GET,POST')
  res.status(405).end('Method not allowed')
}
