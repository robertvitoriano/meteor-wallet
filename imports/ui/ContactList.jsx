import React from "react";
import {ContactsCollection} from "../api/ContactsCollection";
import {useTracker} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
export const ContactList = () => {
  const contacts = useTracker(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 }}).fetch();
  });
  function deleteContact(id){
    Meteor.call("contacts.delete",{id:id})
  }
  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((person, personIdx) => (
            <li key={personIdx} className="py-4 flex items-center justify-between space-x-3">
              <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={"https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/99/993f003e34796a8907961fa4b48c27efc8995a59.jpg" } alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{person.email}</p>
                </div>
              </div>
              <div className="bg-red-500 text-white font-bold px-2 py-1 rounded-md cursor-pointer" onClick={()=>deleteContact(person._id)}>Remove</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
