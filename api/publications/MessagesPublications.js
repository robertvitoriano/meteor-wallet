import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../collections/MessagesCollections";

Meteor.publish(
  "getConversationMessages",
  function getUserMessages({ receiverId }) {
    return MessagesCollection.find({
      $or: [
        { senderId: this.userId, receiverId },
        { receiverId: this.userId, senderId: receiverId },
      ],
    });
  }
);
