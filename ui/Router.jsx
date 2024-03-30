import React from "react";
import {Routes, Route} from 'react-router-dom'
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";

export const Router = () =>{
  
  return (
    <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<NotFound/>} path="*" />
    </Routes>
  )
}
