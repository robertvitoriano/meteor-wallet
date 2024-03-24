import { Meteor } from "meteor/meteor";
import { TransactionsCollection } from "../collections/TransactionsCollection";
import { WalletsCollection } from "../collections/WalletsCollection";
import { ContactsCollection } from "../collections/ContactsCollection";

Meteor.methods({
  async "transactions.insert"(transactionData) {

    const {sourceWalletId, isTransfering, amount, destinationWalletId} = transactionData;
    
    if (!sourceWalletId) throw new Meteor.Error("Source Wallet is required");

    if (isTransfering && !destinationWalletId) throw new Meteor.Error("Destination wallet is required");

    if (!amount || amount <= 0) throw new Meteor.Error("provided amount is invalid");
    
    const contact = await ContactsCollection.findOneAsync({walletId:destinationWalletId});
    
    if(!contact) throw new Meteor.Error("Contact not valid");
    
    const sourceWallet = await WalletsCollection.findOneAsync({_id: sourceWalletId})
    
    if(sourceWallet.balance < amount) throw new Meteor.Error("not enough balance for this transaction");
    
    await WalletsCollection.updateAsync({_id: sourceWalletId},{
      $set:{
        balance: sourceWallet.balance - amount 
      }
    })
    await TransactionsCollection.insertAsync({
      type: isTransfering ? 'TRANSFER' : 'ADD',
      amount,
      sourceWalletId,
      destinationWalletId: isTransfering ? destinationWalletId: null,
      createdAt: new Date(),
      archived: false,
    });
  },
});
