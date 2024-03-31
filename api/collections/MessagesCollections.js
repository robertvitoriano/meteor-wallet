import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import "meteor/aldeed:collection2/static";

export const MessagesCollection = new Mongo.Collection("messages");

const MessagesSchema = new SimpleSchema({
  content: {
    type: String,
  },
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

MessagesCollection.attachSchema(MessagesSchema);
