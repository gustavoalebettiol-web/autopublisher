import React from 'react'

export default function PostList(){
  // Placeholder: en el futuro traer desde API /api/posts
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(()=>{
    const token = localStorage.getItem('auth_token')
    if(!token) return
    setLoading(true)
    fetch('/api/posts', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(r=>r.json())
      .then(data=> setPosts(data))
      .catch(err=> console.error(err))
      .finally(()=> setLoading(false))
  }, [])

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-medium mb-4">Publicaciones programadas</h3>
      {loading && <div className="text-sm text-gray-500">Cargando...</div>}
      <ul>
        {posts.map(p => (
          <li key={p._id} className="border-b py-2">
            <div className="font-semibold">{p.texto}</div>
            <div className="text-sm text-gray-500">{new Date(p.fechaProgramada).toLocaleString()}</div>
            <div className="text-xs mt-1">{p.publicado ? 'Publicado' : 'Pendiente'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
