import React from 'react'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login'

export default function App(){
  return (
    <AuthProvider>
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Autopublisher-AI</h1>
          <Login />
        </div>
      </header>
      <main className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Dashboard />
        </div>
      </main>
    </div>
    </AuthProvider>
  )
}
