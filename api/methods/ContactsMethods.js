import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "../collections/ContactsCollection";
Meteor.methods({
  "contacts.insert"({ name, email, imageUrl }) {
    if (!name) throw new Meteor.Error("Name is required");

    const { userId: loggedUserId } = this;
    if (!loggedUserId) {
      throw new Meteor.Error("ACCESS DENIED");
    }
    const user = Meteor.users.findOne({ email });

    if (!user) throw new Meteor.Error("User does not exist");

    return ContactsCollection.insert({
      name,
      email,
      imageUrl,
      createdAt: new Date(),
      archived: false,
      userId: loggedUserId,
      contactId: user._id,
    });
  },
  "contacts.delete"({ id }) {
    check(id, String);
    return ContactsCollection.remove({ _id: id });
  },
  "contacts.archive"({ id }) {
    check(id, String);
    return ContactsCollection.update(
      { _id: id },
      {
        $set: { archived: true },
      }
    );
  },
});
