import { Meteor } from 'meteor/meteor'
import { WalletsCollection } from '../collections/WalletsCollection'

Meteor.publish("wallets", function publishAllContacts(){
  return WalletsCollection.find();
})
