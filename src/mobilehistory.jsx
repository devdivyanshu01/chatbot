import React, { useState, useEffect } from "react";

const ChatHistoryMobile = ({
  chats = [],
  currentChatId,
  onSelect = (id) => console.log("Selected chat:", id),
  showHistory,
  setShowHistory,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Logging for debugging
  useEffect(() => {
    console.log("ChatHistoryMobile mounted");
    console.log("isMobile:", isMobile);
    console.log("showHistory:", showHistory);
    console.log("chats:", chats);
  }, [isMobile, showHistory, chats]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile || showHistory !== true) {
    return null; // Don't render on desktop or if hidden
  }

  return (
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
          borderBottom: "1px solid #444",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", margin: 0 }}>Chat History</h2>
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

      <ul style={{ listStyle: "none", padding: "0 1rem", margin: 0 }}>
        {chats.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "1rem" }}>
            No chats available.
          </p>
        ) : (
          chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => {
                onSelect(chat.id);
                setShowHistory(false);
              }}
              style={{
                padding: "0.6rem",
                marginBottom: "0.6rem",
                background: chat.id === currentChatId ? "#444" : "#333",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                color: "#ccc",
              }}
            >
              {chat.messages?.[0]?.text?.slice(0, 40) || `Chat ${chat.id}`}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatHistoryMobile;
