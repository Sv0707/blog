import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Posts from './pages/posts/Posts'
import Albums from './pages/albums/Albums'
import '../src/ui-kit/styles/core.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Posts />} path="/posts/:id" />
        <Route element={<Albums />} path="/albums/:id" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
