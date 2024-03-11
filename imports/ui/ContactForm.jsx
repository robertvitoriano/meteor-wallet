import React, {useState} from "react";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const saveContact = async(e) =>{
    e.preventDefault()
   await ContactsCollection.insertAsync({name, imageUrl, email})
    setEmail('')
    setImageUrl('')
    setName('')
  }
  
  return (
    <form>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="imageUrl">image url</label>
          <input type="text" id="imageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
        </div>
        <div>
          <button onClick={saveContact}>Save Contact</button>
        </div>
      </div>
    </form>
  );
};
