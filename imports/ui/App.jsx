import React from "react";
import { ContactForm } from "./ContactForm";
import { ContactList } from "./ContactList";
export const App = () => (
  <div>
    <h1 className="text-blue-500">Welcome Deployed Meteor Wallet</h1>
    <ContactForm/>
    <ContactList/>
  </div>
);
