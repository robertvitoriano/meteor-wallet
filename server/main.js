import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import '../imports/api/ContactsCollection';
import '../imports/api/TransactionsCollection';
import '../imports/api/TransactionsMethods';
import '../imports/api/WalletsCollection';
import '../imports/api/ContactsMethods';
import '../imports/api/ContactsPublications'
import '../imports/api/WalletsPublication';
import { WalletsCollection } from '../imports/api/WalletsCollection';

const walletSchema = new SimpleSchema({
  balance: Number,
  currency: String,
  createdAt: Date,
});

Meteor.startup(async () => {
  if(WalletsCollection.find().count() === 0){
    const walletData = {
      balance: 15,
      currency: 'USD',
      createdAt: new Date(),
    }
    walletSchema.validate(walletData);
    WalletsCollection.insert(walletData)
  }
});
