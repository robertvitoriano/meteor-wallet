import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Access } from "./pages/Access/Access";
import { RoutePaths } from "./RoutePaths";
export const Router = () => {
  return (
    <Routes>
      <Route element={<Home />} path={RoutePaths.HOME} />
      <Route element={<Access />} path={RoutePaths.ACCESS} />
      <Route element={<NotFound />} path="*" />
      <Route element={<ForgotPassword />} path={RoutePaths.FORGOT_PASSWORD} />
    </Routes>
  );
};
