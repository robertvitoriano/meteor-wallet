import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { RoutePaths } from "../RoutePaths";

export const AnonymousOnly = ({ children }) => {
  const location = useLocation();
  const { loggedUser } = useLoggedUser();

  if (loggedUser) {
    return <Navigate to={RoutePaths.MAIN} state={{ from: location }} />;
  }
  return children;
};
