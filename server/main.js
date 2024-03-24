import { Meteor } from 'meteor/meteor';
import '../imports/api/ContactsCollection';
import '../imports/api/TransactionsCollection';
import '../imports/api/TransactionsMethods';
import '../imports/api/WalletsCollection';
import '../imports/api/ContactsMethods';
import '../imports/api/ContactsPublications'
import '../imports/api/WalletsPublication';
import { WalletsCollection } from '../imports/api/WalletsCollection';

Meteor.startup(async () => {
  if(WalletsCollection.find().count() === 0){
    WalletsCollection.insert({
      balance: 15,
      currency: 'USD',
      createdAt: new Date(),
    })
  }
});
