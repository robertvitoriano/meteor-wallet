import { Meteor } from "meteor/meteor";
import "../api/collections/ContactsCollection";
import "../api/collections/TransactionsCollection";
import "../api/collections/WalletsCollection";
import "../api/methods/TransactionsMethods";
import "../api/methods/ContactsMethods";
import "../api/publications/ContactsPublications";
import "../api/publications/WalletsPublication";
import "../infra/CustomError";
import { WalletsCollection } from "../api/collections/WalletsCollection";

Meteor.startup(async () => {
  if (WalletsCollection.find().count() === 0) {
    const walletData = {
      balance: 150,
      createdAt: new Date(),
      userId:'TESTE USER'
    };
    WalletsCollection.insert(walletData);
  } 
});
