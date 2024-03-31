import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider, Alert } from "meteor/quave:alert-react-tailwind";
import { Header } from "./Header";
import { Router } from "./Router";
import { ChatBox } from "./pages/Main/ChatBox";
import { ChatProvider } from "./pages/Main/ChatContext";
export const App = () => (
  <BrowserRouter>
    <AlertProvider>
      <ChatProvider>
        <ChatBox />
        <div>
          <Header />
          <Alert />
          <div className="min-h-full">
            <div className="max-w-4xl mx-auto p-2">
              <Router />
            </div>
          </div>
        </div>
      </ChatProvider>
    </AlertProvider>
  </BrowserRouter>
);
