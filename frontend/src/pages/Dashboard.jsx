import React from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

export default function Dashboard(){
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <PostForm />
      </div>
      <aside className="lg:col-span-1">
        <PostList />
      </aside>
    </div>
  )
}
