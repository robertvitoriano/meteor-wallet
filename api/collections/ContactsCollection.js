import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import "meteor/aldeed:collection2/static";

export const ContactsCollection = new Mongo.Collection("contacts");

const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  contactId: {
    type: String,
  },
  imageUrl: {
    type: String,
    optional: true,
  },
  archived: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

ContactsCollection.attachSchema(ContactsSchema);
