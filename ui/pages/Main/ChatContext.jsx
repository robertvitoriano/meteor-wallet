import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [receiver, setReceiver] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);

  function openChatBox(receiver) {
    setReceiver(receiver);
    setShowChatBox(true);
    console.log("SHow Chat box");
  }
  function closeChatBox() {
    setShowChatBox(false);
  }
  return (
    <ChatContext.Provider
      value={{ receiver, openChatBox, closeChatBox, showChatBox }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChatBox() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("Chat context not found");
  }
  return context;
}
