import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Access } from "./pages/Access/Access";
import { RoutePaths } from "./RoutePaths";
import { LoggedOnly } from "./pages/LoggedOnly";
export const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <LoggedOnly>
            <Home />
          </LoggedOnly>
        }
        path={RoutePaths.HOME}
      />
      <Route element={<Access />} path={RoutePaths.ACCESS} />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};
