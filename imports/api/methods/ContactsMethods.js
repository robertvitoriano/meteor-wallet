import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { ContactsCollection } from "../collections/ContactsCollection";
Meteor.methods({
  'contacts.insert'({ name, email, imageUrl, walletId }){
    check(name, String);
    check(email, String);
    check(imageUrl, String);
    check(walletId, String);
    
    if(!name) throw new Meteor.Error("Name is required");
    
    if(!walletId) throw new Meteor.Error("WalletId is required");
    
    return ContactsCollection.insert({ name, email, imageUrl, createdAt: new Date(), archived: false, walletId });
  },
  'contacts.delete'({id}){
    check(id, String)
    return ContactsCollection.remove({_id:id});
  },
  'contacts.archive'({id}){
    check(id, String)
    return ContactsCollection.update({_id:id},{
      $set:{archived: true}
    });
  }
})

