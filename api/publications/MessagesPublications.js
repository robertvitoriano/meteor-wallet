import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../collections/MessagesCollections";

Meteor.publish(
  "getConversationMessages",
  function getUserMessages({ receiverId }) {
    return MessagesCollection.find({ senderId: this.userId, receiverId });
  }
);
