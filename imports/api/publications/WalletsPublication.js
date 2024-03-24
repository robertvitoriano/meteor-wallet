import { Meteor } from 'meteor/meteor'
import { ContactsCollection } from "../collections/ContactsCollection"
import { WalletsCollection } from '../collections/WalletsCollection'

Meteor.publish("wallets", function publishAllContacts(){
  return WalletsCollection.find();
})
