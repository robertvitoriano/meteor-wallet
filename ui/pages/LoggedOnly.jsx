import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { RoutePaths } from "../RoutePaths";

export const LoggedOnly = ({ children }) => {
  const location = useLocation();
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  if (!isLoadingLoggedUser && !loggedUser) {
    return <Navigate to={RoutePaths.HOME} state={{ from: location }} />;
  }
  return children;
};
