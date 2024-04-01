import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useChatBox } from "./ChatContext";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Loading } from "/ui/components/Loading";
import { MessagesCollection } from "/api/collections/MessagesCollections";
import { useLoggedUser } from "meteor/quave:logged-user-react";

export const ChatBox = () => {
  const [content, setContent] = useState("");
  const { closeChatBox, receiver, showChatBox } = useChatBox();
  const { loggedUser } = useLoggedUser();

  const isLoadingMessages = useSubscribe("getConversationMessages", {
    receiverId: receiver.contactId,
  });
  const messages = useFind(() => MessagesCollection.find());
  function sendMessage() {
    Meteor.call(
      "messages.send",
      { receiverId: receiver.contactId, content },
      (error) => {
        if (error) {
          console.error(error);
          return;
        }
        setContent("");
      }
    );
  }

  return (
    <>
      {showChatBox && (
        <>
          <div className="bg-white absolute left-0 top-0 flex flex-col gap-8 h-screen w-screen p-4 z-50">
            <div
              className="font-bold text-3xl absolute left-4 top-4 cursor-pointer hover:text-red-500"
              onClick={closeChatBox}
            >
              X
            </div>
            <p className="text-center text-xl">{receiver.name}</p>
            <div className="flex flex-1 flex-col gap-4">
              {!isLoadingMessages() ? (
                <div className=" bg-gray-400 p-4 flex flex-col gap-8 h-half-page overflow-scroll">
                  {messages.map((message) => (
                    <div
                      className={`${
                        message.senderId === loggedUser._id
                          ? "bg-black  text-white"
                          : "bg-white text-black"
                      } p-4 rounded-md flex`}
                      key={message._id}
                    >
                      <p>{message.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <Loading />
              )}
              <div className="flex gap-4">
                <input
                  type="text"
                  id="content"
                  value={content}
                  placeholder="please type your message here"
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  onClick={sendMessage}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
