import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main/Main";

import { NotFound } from "./pages/NotFound/NotFound";
import { Access } from "./pages/Access/Access";
import { RoutePaths } from "./RoutePaths";
import { LoggedOnly } from "./pages/LoggedOnly";
import { Home } from "./pages/Home/Home";
import { AnonymousOnly } from "./pages/AnonymousOnly";
import { RemoveTransaction } from "./pages/RemoveTransaction/RemoveTransation";
import { AdminOnly } from "./pages/AdminOnly";
export const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <LoggedOnly>
            <Main />
          </LoggedOnly>
        }
        path={RoutePaths.MAIN}
      />
      <Route
        element={
          <AdminOnly>
            <RemoveTransaction />
          </AdminOnly>
        }
        path={RoutePaths.REMOVE_TRANSACTION}
      />
      <Route
        element={
          <AnonymousOnly>
            <Home />
          </AnonymousOnly>
        }
        path={RoutePaths.HOME}
      />
      <Route
        element={
          <AnonymousOnly>
            <Access />
          </AnonymousOnly>
        }
        path={RoutePaths.ACCESS}
      />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};
