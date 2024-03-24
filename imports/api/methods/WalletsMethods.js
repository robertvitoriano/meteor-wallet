import { Meteor } from "meteor/meteor";
import { walletSchema } from "../schemas/WalletSchema";
import { WalletsCollection } from "../collections/WalletsCollection";
Meteor.methods({
  "wallets.insert"(walletData) {
    const cleanWallet = walletSchema.clean(walletData);
    walletSchema.validate(cleanWallet);

    return WalletsCollection.insert(cleanWallet);
  },
});
