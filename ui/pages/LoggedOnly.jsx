import React from "react";

import { Navigate } from "react-router-dom";
import { useLoggedUser } from "meteor/quave:logged-user-react";

export const LoggedOnly = ({ children }) => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  if (!isLoadingLoggedUser && !loggedUser) {
    return <Navigate to={"/access"} />;
  }
  return children;
};
