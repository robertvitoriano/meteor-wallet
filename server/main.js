import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import '../imports/api/collections/ContactsCollection';
import '../imports/api/collections/TransactionsCollection';
import '../imports/api/methods/TransactionsMethods';
import '../imports/api/collections/WalletsCollection';
import '../imports/api/methods/ContactsMethods';
import '../imports/api/publications/ContactsPublications'
import '../imports/api/publications/WalletsPublication';

import { WalletsCollection } from '../imports/api/collections/WalletsCollection';
const currencySchema = new SimpleSchema({
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
})
const walletSchema = new SimpleSchema({
  currencies:{
    type: Array
  },
  "currencies.$":currencySchema,
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

Meteor.startup(async () => {
  if(WalletsCollection.find().count() === 0){
    const walletData = {
      currencies:[
        {balance: 58, currency: 'USD'},
        {balance: 12, currency: 'EUR'}
      ],
    }
    const cleanWallet = walletSchema.clean(walletData);
    walletSchema.validate(cleanWallet);
    WalletsCollection.insert(cleanWallet)
  }
});
