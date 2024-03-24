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
  balance: {
    type: Number,
    min: 0,
    required: true,
    defaultValue: 0,
  },
  currency: {
    type: String,
    required: true,
    allowedValues:['USD', 'EUR'],
    defaultValue: 'USD',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

Meteor.startup(async () => {
  if(WalletsCollection.find().count() === 0){
    const walletData = {
      balance: 1400,
      currency: 'USD',
    }
    const cleanWallet = walletSchema.clean(walletData);
    walletSchema.validate(cleanWallet);
    WalletsCollection.insert(cleanWallet)
  }
});
