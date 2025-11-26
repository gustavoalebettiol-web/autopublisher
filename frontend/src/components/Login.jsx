import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Login(){
  const { token, login, register, logout } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState(null)

  async function doLogin(e){
    e.preventDefault(); setError(null)
    try{ await login(email, password) }catch(err){ setError(err.message) }
  }

  async function doRegister(e){
    e.preventDefault(); setError(null)
    try{ await register(email, password, nombre); alert('Usuario creado, ya podés entrar') }catch(err){ setError(err.message) }
  }

  if(token) return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-gray-700">Autenticado</div>
      <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
    </div>
  )

  return (
    <form className="flex gap-2 items-center" onSubmit={doLogin}>
      <input className="border rounded px-2 py-1" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border rounded px-2 py-1" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={doLogin} className="bg-green-600 text-white px-3 py-1 rounded">Login</button>
      <button onClick={doRegister} className="bg-blue-600 text-white px-3 py-1 rounded">Register</button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  )
}
