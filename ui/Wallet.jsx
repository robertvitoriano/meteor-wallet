// @ts-nocheck
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";

import { Modal } from "./components/Modal";
import { SelectContact } from "./components/SelectContact";
import { ContactsCollection } from "../api/collections/ContactsCollection";
import { Loading } from "./components/Loading";
import { WalletsCollection } from "../api/collections/WalletsCollection";
import { useLoggedUser } from "meteor/quave:logged-user-react";

export const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [isTransferingMoney, setIsTransferingMoney] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationContact, setDestinationContact] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const isLoadingContacts = useSubscribe("userContacts");
  const isLoadingWallets = useSubscribe("userWallet");
  const { loggedUser } = useLoggedUser();
  console.log({ loggedUser });
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );
  const [wallet] = useFind(() => WalletsCollection.find());

  function addTransaction() {
    Meteor.call(
      "transactions.insert",
      {
        isTransfering: isTransferingMoney,
        sourceWalletId: wallet._id,
        destinationContactId: destinationContact?._id || "",
        amount: Number(amount),
      },
      (error) => {
        if (error) {
          setErrorMessage(error.message);
        } else {
          setOpen(false);
          setDestinationContact({});
          setAmount(0);
          setErrorMessage("");
        }
      }
    );
  }
  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-700">
              Email:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {loggedUser.email}
            </h1>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Wallet ID:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            <div className="text-lg font-semibold text-gray-700">
              {wallet.balance} - ${wallet.currency}
            </div>
          </div>

          <div className="flex space-x-4  text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferingMoney(false);
                  setErrorMessage("");
                  setOpen(true);
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="bg-white border border-indigo-600 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-indigo-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferingMoney(true);
                  setOpen(true);
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          isTransferingMoney
            ? "Transfer money to other wallet"
            : "Add money to your wallet"
        }
        body={
          <>
            {isTransferingMoney && (
              <div className="mt-2">
                <SelectContact
                  title="Destination Contact"
                  contacts={contacts}
                  contact={destinationContact}
                  setContact={setDestinationContact}
                  open={open}
                />
              </div>
            )}
            <div className="mt-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                min={0}
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
        footer={
          <button
            type="button"
            className="bg-white border border-indigo-600 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-indigo-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={addTransaction}
          >
            {isTransferingMoney ? "Transfer money" : "Add money"}
          </button>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};
