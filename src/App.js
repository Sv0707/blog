import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './ui-kit/components/loader/Loader'
import '../src/ui-kit/styles/core.scss'

const Home = lazy(() => import('./pages/home/Home'))
const Posts = lazy(() => import('./pages/posts/Posts'))
const Albums = lazy(() => import('./pages/albums/Albums'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
          path="/"
          exact
        />
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Posts />
            </Suspense>
          }
          path="/posts/:id"
        />
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <Albums />
            </Suspense>
          }
          path="/albums/:id"
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
