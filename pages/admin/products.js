import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ProductsAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', slug: '', price: 0, category: 'men', image: '', description: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchProducts()
    }
  }, [status, router])

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch products')
      setLoading(false)
    }
  }

  async function create(e) {
    e.preventDefault()
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        const p = await res.json()
        setProducts(prev => [...prev, p])
        setForm({ name: '', slug: '', price: 0, category: 'men', image: '', description: '' })
      } else {
        setError('Failed to create product')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (status === 'loading' || loading) return <div style={{ padding: 20 }}>Loading...</div>
  if (!session) return null

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin — Products</h1>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Create Product</h3>
          <form onSubmit={create}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: 8, margin: '6px 0' }} />
            <input placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} style={{ width: '100%', padding: 8, margin: '6px 0' }} />
            <input placeholder="Price (XAF)" type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} style={{ width: '100%', padding: 8, margin: '6px 0' }} />
            <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: 8, margin: '6px 0' }} />
            <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={{ width: '100%', padding: 8, margin: '6px 0' }} />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', padding: 8, margin: '6px 0' }} />
            <button style={{ padding: 10, background: '#000', color: '#fff', border: 0, borderRadius: 6 }}>Create</button>
          </form>
        </div>
        <div style={{ flex: 2 }}>
          <h3>Existing Products</h3>
          {loading ? <div>Loading...</div> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
              {products.map(p => (
                <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                  <div style={{ fontWeight: 700, marginTop: 8 }}>{p.name}</div>
                  <div style={{ color: '#f33', fontWeight: 700 }}>{p.price} XAF</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
