import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../collections/ContactsCollection";

Meteor.publish("allContacts", function publishAllContacts() {
  return ContactsCollection.find();
});
Meteor.publish("userContacts", function publishAllContacts() {
  const { userId } = this;
  return ContactsCollection.find({ userId, archived: { $ne: true } });
});
