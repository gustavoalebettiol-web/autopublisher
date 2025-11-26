import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'))

  useEffect(()=>{
    if(token) localStorage.setItem('auth_token', token)
    else localStorage.removeItem('auth_token')
  }, [token])

  const apiBase = '' // same origin; when running dev, configure proxy or full URL

  async function login(email, password){
    const res = await fetch((apiBase||'') + '/api/auth/login', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    })
    if(!res.ok) throw new Error('Login failed')
    const data = await res.json()
    setToken(data.token)
    return data
  }

  async function register(email, password, nombre){
    const res = await fetch((apiBase||'') + '/api/auth/register', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password, nombre })
    })
    if(!res.ok) {
      const txt = await res.text()
      throw new Error(txt || 'Register failed')
    }
    return true
  }

  function logout(){ setToken(null) }

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
