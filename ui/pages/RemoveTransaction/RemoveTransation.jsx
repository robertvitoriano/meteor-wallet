import React, { useState } from "react";
export const RemoveTransaction = () => {
  const [transactionId, setTransactionId] = useState("");

  const deleteTransaction = (e) => {
    e.preventDefault();

    Meteor.call("transactions.delete", { transactionId }, (error) => {
      if (error) {
        console.log(error);
        console.error("Error trying to remove a transaction");
        return;
      }
      console.log("Transaction was removed");
    });
  };
  return (
    <div className="h-full-page flex flex-col justify-center items-center gap-2">
      <h1 className="text-black text-3xl font-bold">
        Enter the transaction Id to remove
      </h1>
      <form className="mt-6">
        <div className="flex flex-col gap-4">
          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700"
            >
              Transaction Id
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button
                className="border border-gray rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                onClick={() => setTransactionId("")}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={deleteTransaction}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
