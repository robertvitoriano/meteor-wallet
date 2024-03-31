import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "../collections/ContactsCollection";
Meteor.methods({
  "contacts.insert"({ name, email, imageUrl, walletId }) {
    if (!name) throw new Meteor.Error("Name is required");

    if (!walletId) throw new Meteor.Error("WalletId is required");

    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error("ACCESS DENIED");
    }
    return ContactsCollection.insert({
      name,
      email,
      imageUrl,
      createdAt: new Date(),
      archived: false,
      walletId,
      userId,
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
