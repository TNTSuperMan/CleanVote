import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";

export const Root = Promise.all([
  import("./pages/Home.tsx"),
  import("./pages/Subscribe.tsx"),
  import("./pages/Tos.tsx"),
  import("./pages/Vote.tsx"),
  import("./pages/Voted.tsx"),
  import("./pages/Admin.tsx"),
  import("./pages/404.tsx")
]).then(([{Home},{Subscribe},{Tos},{Vote},{Voted},{Admin},{NotFound}])=><StrictMode>
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
  </StrictMode>)
