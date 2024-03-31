import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../collections/WalletsCollection";

Meteor.publish("wallets", function publishAllContacts() {
  return WalletsCollection.find();
});
Meteor.publish("userWallet", function publishUserWallet() {
  const { userId } = this;
  if (!userId) {
    throw new Meteor.Error("ACCESS DENIED");
  }
  return WalletsCollection.find({ userId }, { sort: { createdAt: -1 } });
});
