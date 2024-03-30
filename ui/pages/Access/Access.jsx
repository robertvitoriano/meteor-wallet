// @ts-nocheck
import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

import { RoutePaths } from "/ui/RoutePaths";
import { SuccessAlert } from "../../components/SuccessAlert";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Meteor } from "meteor/meteor";
export const Access = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
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
  const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        setErrorMessage(error.reason || "Unknown error");
        console.error("Error signing in user:", error);
        return;
      }
      setSuccessMessage("User logged in");
      navigate("/");
      setErrorMessage("");
    });
    setEmail("");
    setPassword("");
  };
  const toggleAccessForm = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <div className="flex flex-col">
      <h3 className="px-3 py-2 text-lg font-medium">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h3>
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
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button
                className="border border-gray rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                onClick={() => navigate(RoutePaths.HOME)}
              >
                Cancel
              </button>
              {isSignUp && (
                <button
                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  onClick={signUp}
                >
                  Sign up
                </button>
              )}

              {!isSignUp && (
                <button
                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  onClick={signIn}
                >
                  Sign in
                </button>
              )}
            </div>
            {isSignUp && (
              <p
                onClick={toggleAccessForm}
                className="underline text-blue-600 cursor-pointer hover:no-underline hover:text-blue-400"
              >
                Already have an account ? click here to sign in!
              </p>
            )}
            {!isSignUp && (
              <p
                onClick={toggleAccessForm}
                className="underline text-blue-600 cursor-pointer hover:no-underline hover:text-blue-400"
              >
                Don't have an account yet ? click here to sign up!
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
