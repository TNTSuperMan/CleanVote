import './style.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
</StrictMode>,
)
