const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Replace with your real API key
const genAI = new GoogleGenerativeAI("AIzaSyA20-qt2T0yQt6Y7AD2WH6MeLhczPBpZ1A");

// ✅ 1. List all available models
app.get("/models", async (req, res) => {
  try {
    const models = await genAI.listModels();

    const modelNames = models.map((m) => m.name);
    res.json(modelNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 2. Simple chatbot endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // ✅ safe model
    });

    const result = await model.generateContent(message);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 3. Test route
app.get("/", (req, res) => {
  res.send("🚀 Gemini Server Running");
});

// 🚀 Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});