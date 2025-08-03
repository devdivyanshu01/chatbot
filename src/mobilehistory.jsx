import React, { useState, useEffect } from "react";

const ChatHistoryMobile = ({ chats, currentChatId, onSelect }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showHistory, setShowHistory] = useState(true);

  // Fallback props if none are passed (for testing)
  const fallbackChats = [
    { id: 1, messages: [{ text: "Hi from chat 1" }] },
    { id: 2, messages: [{ text: "Chat 2 is here" }] },
  ];
  const safeChats = chats && chats.length > 0 ? chats : fallbackChats;
  const currentId = currentChatId || 1;
  const handleSelect = onSelect || ((id) => console.log("Selected chat:", id));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return <div style={{ padding: "1rem" }}>Not on a mobile screen.</div>;

  return (
    <>
      {showHistory && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            background: "#222",
            color: "#fff",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            paddingTop: "60px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "1.2rem" }}>Chat History</h2>
            <button
              onClick={() => setShowHistory(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: "0 1rem" }}>
            {safeChats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => {
                  handleSelect(chat.id);
                  setShowHistory(false);
                }}
                style={{
                  padding: "0.6rem",
                  marginBottom: "0.6rem",
                  background: chat.id === currentId ? "#444" : "#333",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  color: "#ccc",
                }}
              >
                {chat.messages?.[0]?.text?.slice(0, 40) || "New Chat"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChatHistoryMobile;
