import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminLogin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (status === 'authenticated') {
    router.push('/admin/products')
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    setLoading(false)
    if (result?.ok) {
      router.push('/admin/products')
    } else {
      setError(result?.error || 'Login failed')
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - MediaSky</title>
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <div style={{
          background: '#fff',
          padding: 40,
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 400
        }}>
          <h1 style={{ marginBottom: 30, textAlign: 'center' }}>Admin Login</h1>
          {error && <div style={{
            background: '#ffe0e0',
            color: '#c00',
            padding: 10,
            borderRadius: 4,
            marginBottom: 15
          }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: 10,
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 14,
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 12,
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ marginTop: 20, textAlign: 'center', color: '#666', fontSize: 12 }}>
            Demo credentials: admin@mediasky.com / password (from .env)
          </p>
        </div>
      </div>
    </>
  )
}
