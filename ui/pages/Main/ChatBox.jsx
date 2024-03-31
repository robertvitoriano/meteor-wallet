import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useChatBox } from "./ChatContext";
export const ChatBox = () => {
  const [content, setContent] = useState("");
  const { closeChatBox, receiver, showChatBox } = useChatBox();

  function sendMessage() {
    Meteor.call(
      "messages.send",
      { receiverId: receiver._id, content },
      (error) => {
        if (error) {
          console.error(error);
          return;
        }
        setContent("");
      }
    );
  }
  function getUserMessagesByContact() {}
  return (
    <>
      {showChatBox && (
        <>
          <div className="bg-white absolute left-0 top-0 flex flex-col gap-8 h-screen w-screen p-4 z-50">
            <div
              className="font-bold text-3xl absolute left-4 top-4"
              onClick={closeChatBox}
            >
              X
            </div>
            <p className="text-center text-xl">{receiver.name}</p>
            <div className="flex flex-1 flex-col gap-4">
              <div className=" bg-gray-400 p-4 flex flex-col gap-8 h-half-page overflow-scroll">
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
                <div className="bg-black p-4 text-white rounded-md flex ">
                  <p>asdamdsoiapdmsapodmas</p>
                </div>
              </div>
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
