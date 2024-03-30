// @ts-nocheck
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

import { RoutePaths } from "/ui/RoutePaths";
import { SuccessAlert } from "../../components/SuccessAlert";
import { ErrorAlert } from "../../components/ErrorAlert";

export const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    Accounts.createUser(
      {
        email,
        password,
      },
      (error) => {
        if (error) {
          setErrorMessage(error.reason || "Unknown error");
          console.error("Error creating user:", error);
          return;
        }
        setSuccessMessage("User successfully created");
        navigate("/");
        setErrorMessage("");
      }
    );
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex flex-col">
      <h3 className="px-3 py-2 text-lg font-medium">Sign Up</h3>
      <form className="mt-6">
        {errorMessage && <ErrorAlert message={errorMessage} />}
        {successMessage && <SuccessAlert message={successMessage} />}

        <div className="flex flex-col gap-4">
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex gap-4">
            <button
              className="border border-gray rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
              onClick={() => navigate(RoutePaths.HOME)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={signUp}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
