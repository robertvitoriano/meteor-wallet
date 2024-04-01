import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { Loading } from "../components/Loading";
import { useAppContext } from "./AppContext";
export const AdminOnly = ({ children }) => {
  const { isAdmin } = useAppContext();
  const location = useLocation();

  if (isAdmin === null) return <Loading />;

  if (!isAdmin) {
    return <Navigate to={RoutePaths.MAIN} state={{ from: location }} />;
  }
  return children;
};
