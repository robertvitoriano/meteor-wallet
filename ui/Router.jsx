import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { SignUp } from "./pages/SIgnUp/SIgnUp";
import { RoutePaths } from "./RoutePaths";
export const Router = () => {
  return (
    <Routes>
      <Route element={<Home />} path={RoutePaths.HOME} />

      <Route element={<SignUp />} path={RoutePaths.SIGN_UP} />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};
