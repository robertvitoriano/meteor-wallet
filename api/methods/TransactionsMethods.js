import { Meteor } from "meteor/meteor";
import { TransactionsCollection } from "../collections/TransactionsCollection";
import { SystemRoles } from "/utils/SystemRoles";
import { Roles } from "meteor/alanning:roles";
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
    return TransactionsCollection.insert({
      type: isTransfering ? TransactionTypes.TRANSFER : TransactionTypes.ADD,
      amount,
      sourceWalletId,
      destinationContactId: isTransfering ? destinationContactId : null,
      createdAt: new Date(),
      archived: false,
      userId,
    });
  },
  async "transactions.delete"({ transactionId }) {
    check(transactionId, String);
    const { userId } = this;
    const isUserAdmin = Roles.userIsInRole(userId, SystemRoles.ADMIN);
    if (!isUserAdmin) {
      throw new Meteor.Error("Operation not allowed");
    }
    const transaction = TransactionsCollection.findOne(transactionId);
    const userWallet = WalletsCollection.findOne({ userId });
    if (transaction.type === TransactionTypes.ADD) {
      WalletsCollection.update(userWallet._id, {
        $inc: { balance: -transaction.amount },
      });
    }
    if (transaction.type === TransactionTypes.TRANSFER) {
      WalletsCollection.update(userWallet._id, {
        $inc: { balance: transaction.amount },
      });
    }
    TransactionsCollection.remove(transactionId);
    return;
  },
});
