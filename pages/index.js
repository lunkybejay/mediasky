import Head from 'next/head'
import Link from 'next/link'

export async function getServerSideProps(){
  const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products')
  const products = await res.json()
  return { props: { products } }
}

export default function Home({ products }){
  return (
    <div style={{padding:20}}>
      <Head>
        <title>MEDIA sky - shoppingsnx</title>
      </Head>
      <main>
        <h1>shoppingsnx — Marketplace (demo)</h1>
        <p>Sample products. Wholesalers can accept bookings; admin can edit products.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:20}}>
          {products.map(p=> (
            <div key={p.id} style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
              <img src={p.image} alt={p.name} style={{width:'100%',height:140,objectFit:'cover',borderRadius:6}}/>
              <h3>{p.name}</h3>
              <div style={{color:'#f33',fontWeight:700}}>{p.price} FCFA</div>
              <div style={{marginTop:8}}>Category: {p.category}</div>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <Link href={`/product/${p.id}`}><a style={{padding:'8px 12px',background:'#ff3b30',color:'#fff',borderRadius:6}}>View</a></Link>
                <a href={`https://wa.me/237670915949?text=I%20want%20to%20buy%20${encodeURIComponent(p.name)}`} style={{padding:'8px 12px',background:'#25D366',color:'#fff',borderRadius:6}}>WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
