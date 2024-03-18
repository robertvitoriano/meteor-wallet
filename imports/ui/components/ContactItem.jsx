import React, { memo } from "react";

export const ContactItem = memo(({contact, archiveContact}) => {
  return (
    <li
      className="py-4 flex items-center justify-between space-x-3"
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
      <div
        className="bg-gray-200 text-white font-bold px-2 py-1 rounded-md cursor-pointer"
        onClick={() => archiveContact(contact._id)}
      >
        Archive
      </div>
    </li>
  );
});
