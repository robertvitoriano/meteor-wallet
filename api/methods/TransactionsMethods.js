import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { TransactionsCollection } from "../collections/TransactionsCollection";
import { SystemRoles } from "/utils/SystemRoles";
import { check } from "meteor/check";
import { TransactionTypes } from "/utils/TransactionTypes;";
import { WalletsCollection } from "../collections/WalletsCollection";
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
    const destinationWallet = WalletsCollection.findOne({
      userId: destinationContactId,
    });
    return TransactionsCollection.insert({
      type: isTransfering ? TransactionTypes.TRANSFER : TransactionTypes.ADD,
      amount,
      sourceWalletId,
      destinationWalletId: isTransfering ? destinationWallet._id : null,
      createdAt: new Date(),
      archived: false,
      userId,
    });
  },
  "transactions.delete"({ transactionId }) {
    check(transactionId, String);
    const { userId } = this;
    if (!Roles.userIsInRole(userId, SystemRoles.ADMIN)) {
      throw new Meteor.Error("Operation not allowed");
    }
    TransactionsCollection.remove(transactionId);
  },
});
