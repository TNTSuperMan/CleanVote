import './style.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Subscribe } from './pages/Subscribe.tsx'
import { About } from './pages/About.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>
</StrictMode>,
)
