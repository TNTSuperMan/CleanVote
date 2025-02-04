import { lazy, StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";

export const Root = () => {
  const Home = lazy(()=>import("./pages/Home.tsx").then(e=>({"default":e.Home})));
  const Subscribe = lazy(()=>import("./pages/Subscribe.tsx").then(e=>({"default":e.Subscribe})));
  const Tos = lazy(()=>import("./pages/Tos.tsx").then(e=>({"default":e.Tos})));
  const Vote = lazy(()=>import("./pages/Vote.tsx").then(e=>({"default":e.Vote})));
  const Voted = lazy(()=>import("./pages/Voted.tsx").then(e=>({"default":e.Voted})));
  const Admin = lazy(()=>import("./pages/Admin.tsx").then(e=>({"default":e.Admin})));
  const NotFound = lazy(()=>import("./pages/404.tsx").then(e=>({"default":e.NotFound})));

  return <StrictMode>
    <BrowserRouter>
      <HomeButton/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/tos" element={<Tos/>} />
        <Route path="/vote/:token" element={<Vote/>} />
        <Route path="/voted" element={<Voted/>} />
        <Route path="/admin/:token" element={<Admin/>} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
}
