import { Meteor } from 'meteor/meteor'
import { ContactsCollection } from "./ContactsCollection"
import { WalletsCollection } from './WalletsCollection'

Meteor.publish("wallets", function publishAllContacts(){
  return WalletsCollection.find();
})
