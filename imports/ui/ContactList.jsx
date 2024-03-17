import React from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { ContactItem } from "./components/ContactItem";
import { Loading } from "./components/Loading";
export const ContactList = () => {
  const isLoading = useSubscribe("contacts");
  const contacts = useFind(() =>
    ContactsCollection.find({archived: {$ne: true}}, { sort: { createdAt: -1 } })
  );

  function archiveContact(id) {
    Meteor.call("contacts.archive", { id: id });
  }

  return (
    <div>
      {isLoading()&& <Loading/>}
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {contacts.map((contact) => (
            <ContactItem
              key={contact._id}
              contact={contact}
              archiveContact={archiveContact}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
