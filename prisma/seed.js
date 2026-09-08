const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  await prisma.product.deleteMany()
  await prisma.wholesaler.deleteMany()

  const items = [
    { name: 'Modern Men Shirt', slug: 'modern-men-shirt', description: 'Stylish modern shirt for men', price: 12000, category: 'men', image: 'https://images.unsplash.com/photo-1520975683579-8f4d19a50b1b?w=800&q=80' },
    { name: 'Women Casual Dress', slug: 'women-casual-dress', description: 'Comfortable casual dress', price: 15000, category: 'women', image: 'https://images.unsplash.com/photo-1520975683579-8f4d19a50b1b?w=800&q=80' },
    { name: 'Kids Sneakers', slug: 'kids-sneakers', description: 'Durable kicks for kids', price: 8000, category: 'kids', image: 'https://images.unsplash.com/photo-1528701800484-5d2d77e8a7a5?w=800&q=80' },
    { name: 'Boys T-Shirt', slug: 'boys-tshirt', description: 'Everyday boys t-shirt', price: 6000, category: 'boys', image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80' },
    { name: 'Girls Skirt', slug: 'girls-skirt', description: 'Cute skirt for girls', price: 7000, category: 'girls', image: 'https://images.unsplash.com/photo-1520975683579-8f4d19a50b1b?w=800&q=80' },
    { name: 'Leather Shoes', slug: 'leather-shoes', description: 'Classic leather shoes', price: 22000, category: 'shoes', image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&q=80' }
  ]

  for(const it of items){
    await prisma.product.create({ data: it })
  }

  await prisma.wholesaler.create({ data: { name: 'Sample Wholesaler', phone: '670000000', email: 'wh@sample.com', notes: 'Ready to ship' } })

  console.log('Seed finished')
}

main()
  .catch(e=>{ console.error(e); process.exit(1) })
  .finally(()=>{})
