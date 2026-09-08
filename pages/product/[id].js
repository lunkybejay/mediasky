import { useRouter } from 'next/router'

export async function getServerSideProps(ctx){
  const { id } = ctx.params
  const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products/' + id)
  if (res.status !== 200) return { notFound: true }
  const product = await res.json()
  return { props: { product } }
}

export default function ProductPage({ product }){
  return (
    <div style={{padding:20}}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{width:400,maxWidth:'100%'}}/>
      <p style={{color:'#f33',fontWeight:700}}>{product.price} FCFA</p>
      <p>{product.description}</p>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <a href={`https://wa.me/237670915949?text=I%20want%20to%20buy%20${encodeURIComponent(product.name)}`} style={{padding:'8px 12px',background:'#25D366',color:'#fff',borderRadius:6}}>Order on WhatsApp</a>
        <button style={{padding:'8px 12px',background:'#000',color:'#fff',borderRadius:6}}>Add to Cart (demo)</button>
      </div>
    </div>
  )
}
