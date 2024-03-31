import React from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "/ui/RoutePaths";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full-page flex flex-col justify-center items-center gap-2">
      <h1 className="text-black text-3xl font-bold">
        Welcome to Meteor Wallet
      </h1>
      <p className="text-black bold tex-md">
        <span
          className="text-blue-500 cursor-pointer underline hover:no-underline hove:text-blue-300"
          onClick={() => navigate(RoutePaths.ACCESS)}
        >
          Sign up{" "}
        </span>
        and start to transfer
      </p>
    </div>
  );
};
