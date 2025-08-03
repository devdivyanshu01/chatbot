import React, { useState } from "react";
import ChatScreen from "./chat";
import ChatHistory from "./history";
import Messages from "./messages";
import ChatHistoryMobile from "./mobilehistory";

const initialChats = [
  {
    id: 1,
    messages: [
      { sender: "bot", text: "Hello! How can I help you?" },
      { sender: "user", text: "Hi! Tell me a joke." },
      { sender: "bot", text: "Why did the chicken cross the road? To get to the other side!" },
    ],
  },
  {
    id: 2,
    messages: [
      { sender: "bot", text: "Welcome back!" },
      { sender: "user", text: "What's the weather today?" },
      { sender: "bot", text: "It's sunny and warm." },
    ],
  },
];

const Layout = () => {
  const [chats, setChats] = useState(initialChats);
  const [currentChatId, setCurrentChatId] = useState(initialChats[0].id);

  const handleNewChat = () => {
    const newId = chats.length ? chats[chats.length - 1].id + 1 : 1;
    const newChat = {
      id: newId,
      messages: [{ sender: "bot", text: "New chat started!" }],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newId);
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
  };

  const updateChatMessages = (updatedChats) => {
    setChats(updatedChats);
  };

  return (
    <div style={{ display: "flex", height: "100vh", paddingTop: "60px", background: 'none',}}>
      <ChatHistory
        chats={chats}
        currentChatId={currentChatId}
        onSelect={handleSelectChat}
      />
      <ChatScreen
        chats={chats}
        currentChatId={currentChatId}
        setChats={updateChatMessages}
        onNewChat={handleNewChat}
      />
      <ChatHistoryMobile
  chats={chats}
  currentChatId={currentChatId}
  onSelect={setCurrentChatId}
/>

    </div>
  );
};

export default Layout;
