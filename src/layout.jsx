import React, { useState } from "react";
import ChatScreen from "./chat";
import ChatHistory from "./history";
import ChatHistoryMobile from "./mobilehistory";

const initialChats = [
  {
    id: 1,
    messages: [
      { sender: "bot", text: "Hello! How can I help you?" }
    ],
  }
];


const Layout = () => {
  const [chats, setChats] = useState(initialChats);
  const [currentChatId, setCurrentChatId] = useState(initialChats[0].id);
  const [showHistory, setShowHistory] = useState(false);


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
   showHistory={showHistory}
  setShowHistory={setShowHistory}
/>

    </div>
  );
};

export default Layout;
