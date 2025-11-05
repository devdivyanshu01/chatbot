import React, { useState, useEffect } from "react";

const ChatHistory = ({ chats, currentChatId, onSelect }) => {
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      style={{
        width: "100%",
        maxWidth: "20vw",
        background: "#222",
        height: "100%",
        overflowY: "auto",
        padding: "1rem",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: "50px",
        borderRight: "1px solid #333",
      }}
    >
      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Chat History</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {chats.length === 0 ? (
          <li style={{ color: "#777", fontSize: "0.85rem" }}>
            No chats yet.
          </li>
        ) : (
          chats.map((chat) => {
            const lastMessage =
              chat.messages?.[chat.messages.length - 1]?.text || "No messages";
            return (
              <li
                key={chat.id}
                onClick={() => onSelect(chat.id)}
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  background: chat.id === currentChatId ? "#444" : "#333",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "#fff",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#555")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    chat.id === currentChatId ? "#444" : "#333")
                }
              >
                <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
                  {lastMessage.length > 40
                    ? lastMessage.slice(0, 40) + "..."
                    : lastMessage}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
};

export default ChatHistory;
