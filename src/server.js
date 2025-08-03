/// <reference types="node" />

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

console.log("📦 Starting Gemini API server...");

// Load .env
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Your Vite frontend port
app.use(express.json());

// Load your Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing. Did you forget to create .env?");
  process.exit(1); // Stop server if key is missing
}

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: "❌ No message provided." });
  }

  try {
    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    });

    const data = await geminiResponse.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 No reply received from Gemini.";
    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    res.status(500).json({ reply: "Gemini API call failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Gemini API Server running at http://localhost:${PORT}`);
});
