import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import "meteor/aldeed:collection2/static";

import { WalletsCollection } from "./WalletsCollection";
import { Meteor } from "meteor/meteor";
import { TransactionTypes } from "/utils/TransactionTypes;";

export const TransactionsCollection = new Mongo.Collection("transactions");

TransactionsCollection.before.insert(function (userId, transactionDocument) {
  if (transactionDocument.type === TransactionTypes.TRANSFER) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    const destintationWallet = WalletsCollection.findOne(
      transactionDocument.destinationWalletId
    );
    if (!sourceWallet) throw new Meteor.Error("Source wallet not found");

    if (!destintationWallet)
      throw new Meteor.Error("Destination wallet not found");

    if (sourceWallet.balance < transactionDocument.amount)
      throw new Meteor.Error("Insufficient funds");

    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });
    WalletsCollection.update(transactionDocument.destinationWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
  if (transactionDocument.type === TransactionTypes.ADD) {
    const sourceWallet = WalletsCollection.findOne({
      _id: transactionDocument.sourceWalletId,
    });

    if (!sourceWallet) throw new Meteor.Error("Source wallet not found");

    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
  }
});
TransactionsCollection.before.remove(function (userId, transactionDocument) {
  if (transactionDocument.type === TransactionTypes.TRANSFER) {
    const sourceWallet = WalletsCollection.findOne(
      transactionDocument.sourceWalletId
    );
    const destintationWallet = WalletsCollection.findOne(
      transactionDocument.destinationWalletId
    );
    if (!sourceWallet) throw new Meteor.Error("Source wallet not found");

    if (!destintationWallet)
      throw new Meteor.Error("Destination wallet not found");

    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: transactionDocument.amount },
    });
    WalletsCollection.update(transactionDocument.destinationWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });
  }
  if (transactionDocument.type === TransactionTypes.ADD) {
    const sourceWallet = WalletsCollection.findOne({
      _id: transactionDocument.sourceWalletId,
    });

    if (!sourceWallet) throw new Meteor.Error("Source wallet not found");

    WalletsCollection.update(transactionDocument.sourceWalletId, {
      $inc: { balance: -transactionDocument.amount },
    });
  }
});
const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TransactionTypes.TRANSFER, TransactionTypes.ADD],
  },
  sourceWalletId: {
    type: String,
  },
  destinationWalletId: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
    min: 1,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

TransactionsCollection.attachSchema(TransactionsSchema);
