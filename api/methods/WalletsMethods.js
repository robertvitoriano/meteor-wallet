import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../collections/WalletsCollection";
Meteor.methods({
  "wallets.insert"(walletData) {
    return WalletsCollection.insert(walletData);
  },
});
