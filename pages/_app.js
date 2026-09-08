import '../styles/globals.css'
import Link from 'next/link'

export default function App({ Component, pageProps }) {
  return (
    <>
      <header style={{padding:20,background:'#0a0a0a',color:'#fff',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:700}}>MEDIA SKY — shoppingsnx</div>
        <nav style={{display:'flex',gap:12}}>
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/wholesalers">Wholesalers</Link>
        </nav>
      </header>
      <Component {...pageProps} />
      <footer style={{padding:20,textAlign:'center',color:'#777'}}>© MEDIA sky</footer>
    </>
  )
}
