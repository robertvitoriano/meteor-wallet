import { Meteor } from "meteor/meteor";
import { TransactionsCollection } from "../collections/TransactionsCollection";

Meteor.methods({
  async "transactions.insert"(transactionData) {
    const { sourceWalletId, isTransfering, amount, destinationContactId } =
      transactionData;
    if (isTransfering && !destinationContactId)
      throw new Meteor.Error("destination wallet is required");

    if (!amount || amount <= 0)
      throw new Meteor.Error("provided amount is invalid");

    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error("ACCESS DENIED");
    }
    return TransactionsCollection.insert({
      type: isTransfering ? "TRANSFER" : "ADD",
      amount,
      sourceWalletId,
      destinationContactId: isTransfering ? destinationContactId : null,
      createdAt: new Date(),
      archived: false,
      userId,
    });
  },
});
