import React, { useState, useEffect, useRef } from "react";

const ChatScreen = ({ chats, currentChatId, setChats, onNewChat }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [animatePlane, setAnimatePlane] = useState(false);
  const messagesEndRef = useRef(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading || !currentChat) return;

    setAnimatePlane(true);

    const userMessage = { sender: "user", text: input };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Server error");
      }

      let botReply;

      // ✅ IMAGE RESPONSE
      if (data.type === "image") {
        botReply = {
          sender: "bot",
          image: data.image,
        };
      } else {
        // ✅ TEXT RESPONSE
        botReply = {
          sender: "bot",
          text: data?.reply || "⚠ No reply from server",
        };
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botReply] }
            : chat
        )
      );
    } catch (err) {
      console.error("API error:", err);

      const botReply = {
        sender: "bot",
        text: `⚠ ${err.message || "Error contacting server"}`,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botReply] }
            : chat
        )
      );
    }

    setTimeout(() => {
      setAnimatePlane(false);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const screenWidth = windowWidth <= 768 ? "100%" : "77.4%";

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .chat-header { height: 50px; padding: 0 8px; font-size: 0.9rem; display: flex; align-items: center; }
          .chat-header h1 { font-size: 1rem; font-weight: 500; margin: 0; }
          .chat-header button { padding: 0.2rem 0.6rem; font-size: 1.2rem; margin-right: 0.5rem; }
          .chat-input { padding: 0.4rem 0.6rem !important; max-height: 50px; }
          .chat-input input { padding: 0.4rem 0.6rem !important; font-size: 0.85rem; max-height: 30px; }
          .chat-input button { padding: 0.4rem 0.6rem !important; font-size: 0.85rem; margin-right: 1rem !important; max-height: 30px; }
        }

        @keyframes planeFly {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translate(40px, -30px) rotate(20deg) scale(1.1); opacity: 0.8; }
          100% { transform: translate(120px, -80px) rotate(45deg) scale(1.2); opacity: 0; }
        }
        .plane-fly {
          animation: planeFly 0.9s ease-in-out forwards;
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
          <h1 style={{ fontSize: "1.4rem", fontWeight: "600", marginLeft: "1rem" }}>
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
              fontSize: "1rem",
              maxHeight: "40px",
            }}
          >
            +
          </button>
        </div>

        <div
          className="msgs"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            color: "#fff",
            backgroundColor: "#222",
            marginTop: "50px",
            marginBottom: "70px",
            maxHeight: "80%",
          }}
        >
          {currentChat?.messages?.map((msg, idx) => (
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
                  whiteSpace: "pre-wrap",
                }}
              >
                {/* ✅ SHOW IMAGE IF EXISTS */}
                {msg.image ? (
                  // <img
                  //   src={`data:image/png;base64,${msg.image}`}
                  //   alt="AI generated"
                  //   style={{
                  //     maxWidth: "100%",
                  //     borderRadius: "10px",
                  //   }}
                  // />
                  <img src={msg.image} 
                  alt="AI generated"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  msg.text
                )}
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
            placeholder={
              loading ? "Wait for bot reply..." : "Type your message..."
            }
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#1a1a1a",
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
              border: "1px solid #444",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              marginRight: "2rem",
              opacity: loading ? 0.6 : 1,
              overflow: "hidden",
            }}
          >
            ✈
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;