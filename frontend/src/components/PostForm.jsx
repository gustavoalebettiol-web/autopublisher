import React, { useState } from 'react'

export default function PostForm(){
  const [texto, setTexto] = useState('')
  const [fecha, setFecha] = useState('')
  const [redes, setRedes] = useState({ facebook: false, instagram: false, telegram: false, whatsapp: false })

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      texto,
      fechaProgramada: fecha ? new Date(fecha).toISOString() : null,
      redes: Object.keys(redes).filter(k=>redes[k])
    }
    // POST a /api/posts usando token desde localStorage
    const token = localStorage.getItem('auth_token')
    if(!token){ alert('Necesitás autenticarte (login) antes de crear una publicación'); return }
    fetch('/api/posts', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(payload)
    }).then(async res=>{
      if(!res.ok) throw new Error('Error creando post')
      const data = await res.json()
      alert('Publicación creada')
      setTexto('')
      setFecha('')
      setRedes({ facebook: false, instagram: false, telegram: false, whatsapp: false })
    }).catch(err=>{
      console.error(err); alert('Error: ' + err.message)
    })
    setTexto('')
    setFecha('')
    setRedes({ facebook: false, instagram: false, telegram: false, whatsapp: false })
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Crear publicación</h2>
      <textarea className="w-full border p-2 rounded mb-3" rows="4" value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Texto de la publicación" />
      <input type="datetime-local" className="w-full border p-2 rounded mb-3" value={fecha} onChange={e=>setFecha(e.target.value)} />

      <div className="mb-3">
        <label className="block mb-1 font-medium">Redes destino</label>
        {Object.keys(redes).map(key => (
          <label key={key} className="inline-flex items-center mr-3">
            <input type="checkbox" checked={redes[key]} onChange={() => setRedes({...redes, [key]: !redes[key]})} className="mr-1" />
            <span className="capitalize">{key}</span>
          </label>
        ))}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Programar publicación</button>
    </form>
  )
}
