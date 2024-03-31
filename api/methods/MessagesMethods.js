import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../collections/MessagesCollections";
Meteor.methods({
  "messages.send"({ content, receiverId }) {
    if (!content) throw new Meteor.Error("content is required");

    if (!receiverId) throw new Meteor.Error("receiverId is required");

    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error("user not found");
    }
    return MessagesCollection.insert({
      content,
      receiverId,
      senderId: userId,
      createdAt: new Date(),
    });
  },
});
