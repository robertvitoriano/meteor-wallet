import { Meteor } from "meteor/meteor";
import { TransactionsCollection } from "../collections/TransactionsCollection";
import { WalletsCollection } from "../collections/WalletsCollection";
import { ContactsCollection } from "../collections/ContactsCollection";

Meteor.methods({
  async "transactions.insert"(transactionData) {

    const {sourceWalletId, isTransfering, amount, destinationWalletId} = transactionData;
    if (isTransfering && !destinationWalletId) throw new Meteor.Error("destination wallet is required");

    if (!amount || amount <= 0) throw new Meteor.Error("provided amount is invalid");
    
    return TransactionsCollection.insert({
      type: isTransfering ? "TRANSFER" : "ADD",
      amount,
      sourceWalletId,
      destinationWalletId: isTransfering ? destinationWalletId: null,
      createdAt: new Date(),
      archived: false,
    });
  },
});
