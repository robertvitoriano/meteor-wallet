import { ContactsCollection } from "./ContactsCollection";
Meteor.methods({
  'contacts.insert'({ name, email, imageUrl }){
    
    if(!name) throw new Meteor.Error("Name is required");
    
    return ContactsCollection.insert({ name, email, imageUrl, createdAt: new Date() });
  },
  'contacts.delete'({id}){
    ContactsCollection.remove({_id:id});
  }
})

