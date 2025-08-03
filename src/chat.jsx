import React, { useState, useEffect, useRef } from "react";

const ChatScreen = ({ chats, currentChatId, setChats, onNewChat }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const messagesEndRef = useRef(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };

    const updatedChats = chats.map((chat) =>
      chat.id === currentChatId
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    );
    setChats(updatedChats);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botReply = { sender: "bot", text: data.reply };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botReply] }
            : chat
        )
      );
    } catch (error) {
      console.error("Error from API:", error);
      const errorReply = { sender: "bot", text: "❌ Gemini API error. Try again later." };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, errorReply] }
            : chat
        )
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const screenWidth = windowWidth <= 768 ? "100%" : "77.4%";

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .chat-header {
            height: 50px;
            padding: 0 8px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
          }
          .chat-header h1 {
            font-size: 1rem;
            font-weight: 500;
            margin: 0;
          }
          .chat-header button {
            padding: 0.2rem 0.6rem;
            font-size: 1.2rem;
            margin-right: 0.5rem;
          }
          .chat-input {
            padding: 0.4rem 0.6rem !important;
            max-height: 50px;
          }
          .chat-input input {
            padding: 0.4rem 0.6rem !important;
            font-size: 0.85rem;
            max-height: 30px;
          }
          .chat-input button {
            padding: 0.4rem 0.6rem !important;
            font-size: 0.85rem;
            margin-right: 1rem !important;
            max-height: 30px;
          }
        }
      `}</style>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          top: "50px",
          position: "absolute",
          right: 0,
          width: screenWidth,
        }}
      >
        <div
          className="chat-header"
          style={{
            padding: "5px",
            backgroundColor: "#111",
            color: "#fff",
            borderBottom: "1px solid #333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: "50px",
            height: "100%",
            maxHeight: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              marginLeft: "1rem",
            }}
          >
            Kya haal hai?
          </h1>
          <button
            onClick={onNewChat}
            style={{
              backgroundColor: "#111",
              border: "none",
              borderRadius: "6px",
              padding: "0.4rem 1rem",
              color: "#fff",
              cursor: "pointer",
              marginRight: "1rem",
              fontSize: "2rem",
              maxHeight: "40px",
            }}
          >
            +
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            color: "#fff",
            backgroundColor: "#222",
            height: "fit-content",
            top: "200px",
            minHeight: "100vh",
          }}
        >
          {currentChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "bot" ? "flex-start" : "flex-end",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "0.7rem 1rem",
                  borderRadius: "16px",
                  backgroundColor:
                    msg.sender === "bot" ? "#2c2c2c" : "#000000ff",
                  border: "1px solid #333",
                  fontSize: "0.95rem",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div
          className="chat-input"
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            padding: "1rem",
            borderTop: "1px solid #333",
            backgroundColor: "none",
            backdropFilter: "blur(10px)",
            position: "fixed",
            bottom: 0,
            width: screenWidth,
          }}
        >
          <input
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={loading ? "Wait for bot reply..." : "Type your message..."}
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#1a1a1a",
              backdropFilter: "blur(10px)",
              color: "#fff",
              opacity: loading ? 0.6 : 1,
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "8px",
              backgroundColor: "#222",
              backdropFilter: "blur(10px)",
              border: "1px solid #444",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              marginRight: "2rem",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
