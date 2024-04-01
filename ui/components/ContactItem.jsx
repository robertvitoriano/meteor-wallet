import React, { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChatBox } from "../pages/Main/ChatContext";
import { faComments } from "@fortawesome/free-solid-svg-icons";
export const ContactItem = memo(({ contact, archiveContact }) => {
  const [showArchiveButton, setShowArchiveButton] = useState(false);
  const { openChatBox } = useChatBox();

  return (
    <li
      className="py-4 flex items-center justify-between space-x-3"
      onMouseEnter={() => setShowArchiveButton(true)}
      onMouseLeave={() => setShowArchiveButton(false)}
    >
      <div className="min-w-0 flex-1 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={
              "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/99/993f003e34796a8907961fa4b48c27efc8995a59.jpg"
            }
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {contact.name}
          </p>

          <p className="text-sm font-medium text-gray-500 truncate">
            {contact.email}
          </p>
          <p className="text-sm font-medium text-gray-500 truncate">
            {contact.walletId}
          </p>
        </div>
      </div>
      {showArchiveButton && (
        <div
          className="bg-gray-200 text-white font-bold px-2 py-1 rounded-md cursor-pointer hover:bg-red-500"
          onClick={() => archiveContact(contact._id)}
        >
          Archive
        </div>
      )}
      <FontAwesomeIcon
        icon={faComments}
        onClick={() => openChatBox(contact)}
        className="cursor-pointer text-3xl hover:text-indigo-500 "
      />
    </li>
  );
});
