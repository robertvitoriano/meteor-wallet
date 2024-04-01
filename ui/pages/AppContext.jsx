import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

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
  return (
    <AppContext.Provider value={{ isAdmin }}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("App context not found");
  }

  return context;
}
