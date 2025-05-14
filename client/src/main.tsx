import './style.scss'
import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";
import { Home } from "./pages/Home";
import { Subscribe } from "./pages/Subscribe";
import { Tos } from "./pages/Tos";
import { Vote } from "./pages/Vote";
import { Voted } from "./pages/Voted";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/404";
import { Destroy } from './pages/Destroy';
import { QA } from './pages/QA';

createRoot(document.getElementById('root')!).render(<StrictMode>
    <div className="warn">警告：現在メンテナンス中です。誤動作やバグがおこる可能性があります。</div>
    <BrowserRouter>
      <HomeButton/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/tos" element={<Tos/>} />
        <Route path="/vote/:token" element={<Vote/>} />
        <Route path="/voted" element={<Voted/>} />
        <Route path="/admin/:token" element={<Admin/>} />
        <Route path="/destroy/:token" element={<Destroy/>} />
        <Route path="/qa" element={<QA/>} />
  
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  )
