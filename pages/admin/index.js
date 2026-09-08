import { useEffect } from 'react'
import Router from 'next/router'

export default function AdminIndex(){
  useEffect(()=>{ Router.replace('/admin/products') },[]) 
  return <div>Redirecting...</div>
}
