import React from "react";
import { ContactsCollection } from "../api/ContactsCollection";
import  {useTracker} from 'meteor/react-meteor-data'
export const ContactList = () => {
  const contacts = useTracker( () => ContactsCollection.find({}).fetch());
  return (
    <div>
      <h3>Contact List</h3>
      <ul>
        {contacts.map(({name, email},index) => (
          <li key={index}>{name} - {email}</li>
        ))}
      </ul>
    </div>
  );
};
