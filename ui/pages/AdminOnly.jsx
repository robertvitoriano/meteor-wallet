import React, { useEffect, useState } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { RoutePaths } from "../RoutePaths";
import { Loading } from "../components/Loading";

export const AdminOnly = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();
  useEffect(() => {
    Meteor.call("roles.isAdmin", (error, isAdminReturn) => {
      if (error) {
        setIsAdmin(false);
        console.error(error);
        return;
      }
      setIsAdmin(isAdminReturn);
    });
  }, []);

  if (isAdmin === null) return <Loading />;

  if (!isAdmin) {
    return <Navigate to={RoutePaths.MAIN} state={{ from: location }} />;
  }
  return children;
};
