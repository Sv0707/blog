import React from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Posts from './pages/posts/Posts'
import Albums from './pages/albums/Albums'
import '../src/ui-kit/styles/core.scss'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Home />} path="blog/" exact />
        <Route element={<Posts />} path="blog/posts/:id" />
        <Route element={<Albums />} path="blog/albums/:id" />
      </Routes>
    </HashRouter>
  )
}

export default App
