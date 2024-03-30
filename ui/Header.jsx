import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { RoutePaths } from "./RoutePaths";
export const Header = () => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  console.log({ loggedUser, isLoadingLoggedUser });
  const navigate = useNavigate();
  return (
    <header className="bg-indigo-600">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex justify-between items-center w-full">
            <div>
              <button onClick={() => navigate("/")}>
                <span className="sr-only">Meteor Wallet</span>
                <h1 className="text-md text-white font-bold">Meteor Wallet</h1>
              </button>
            </div>
            <div>
              {!loggedUser && !isLoadingLoggedUser && (
                <button
                  className="text-white hover:underline"
                  onClick={() => navigate(RoutePaths.ACCESS)}
                >
                  Sign up
                </button>
              )}
              {loggedUser && !isLoadingLoggedUser && (
                <button
                  className="text-white hover:underline"
                  onClick={() => navigate(RoutePaths.ACCESS)}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
