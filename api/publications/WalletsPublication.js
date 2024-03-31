import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../collections/WalletsCollection";

Meteor.publish("wallets", function publishAllContacts() {
  return WalletsCollection.find();
});
Meteor.publish("userWallet", function publishUserWallet() {
  return WalletsCollection.find();
});
