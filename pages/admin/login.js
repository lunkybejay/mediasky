import { useState } from 'react'
import Router from 'next/router'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    if (res.ok) { Router.push('/admin/products') }
    else { const j = await res.json(); setError(j.message || 'Login failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Admin login</h1>
      <form onSubmit={submit} style={{maxWidth:400}}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8,margin:'8px 0'}} />
        <button style={{padding:10,background:'#ff3b30',color:'#fff',border:0,borderRadius:6}}>Login</button>
        {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
      </form>
    </div>
  )
}
