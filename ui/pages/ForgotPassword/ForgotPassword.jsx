import React, { useState } from "react";
import { RoutePaths } from "/ui/RoutePaths";
import { useNavigate } from "react-router-dom";
import { useAlert } from "meteor/quave:alert-react-tailwind";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { openAlert } = useAlert();
  const [email, setEmail] = useState("");

  const forgotPassword = (e) => {
    e.preventDefault();
    Accounts.forgotPassword(
      {
        email,
      },
      (error) => {
        if (error) {
          console.error(error);
          openAlert(error.reason || "Unknown error");
          return;
        }
        navigate(RoutePaths.HOME);
      }
    );
    setEmail("");
    openAlert("You should receive a reset email shortly");
  };

  return (
    <div className="flex flex-col">
      <h3 className="px-3 py-2 text-lg font-medium">Forgot Password</h3>
      <form className="mt-6">
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

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button
                className="border border-gray rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                onClick={() => navigate(RoutePaths.ACCESS)}
              >
                Back to Sign up
              </button>

              <button
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={forgotPassword}
              >
                Send reset password link
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
