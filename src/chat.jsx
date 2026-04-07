import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      let data;

      // ✅ SAFE JSON PARSE (fixes your error)
      try {
        data = await res.json();
      } catch (err) {
        const text = await res.text();
        throw new Error(text || "Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const botMessage = {
        role: "bot",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "⚠ Server busy, please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      
      {/* Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-msg" : "bot-msg"}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bot-msg">⏳ Thinking...</div>
        )}
      </div>

      {/* Input */}
      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;