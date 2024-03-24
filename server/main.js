import { Meteor } from "meteor/meteor";
import "../imports/api/collections/ContactsCollection";
import "../imports/api/collections/TransactionsCollection";
import "../imports/api/collections/WalletsCollection";
import "../imports/api/methods/TransactionsMethods";
import "../imports/api/methods/ContactsMethods";
import "../imports/api/publications/ContactsPublications";
import "../imports/api/publications/WalletsPublication";
import { walletSchema } from "/imports/api/schemas/WalletSchema";
import { WalletsCollection } from "../imports/api/collections/WalletsCollection";

Meteor.startup(async () => {
  if (WalletsCollection.find().count() === 0) {
    const walletData = {
      balance: 150,
    };
    const cleanWallet = walletSchema.clean(walletData);
    walletSchema.validate(cleanWallet);
    WalletsCollection.insert(cleanWallet);
  } 
});
