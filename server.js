require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Check API key
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env file");
  process.exit(1);
}

// ✅ Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==============================
// ✅ List Available Models
// ==============================
app.get("/models", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await response.json();

    const models = data.models?.map((m) => ({
      name: m.name,
      methods: m.supportedGenerationMethods,
    }));

    res.json(models);
  } catch (error) {
    console.error("❌ Model Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// ==============================
// ✅ Chat Endpoint
// ==============================
app.post("/chat", async (req, res) => {
  try {
    console.log("📩 Incoming:", req.body);

    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const result = await model.generateContent(message);

    const response = await result.response;
    const reply = response.text();

    console.log("🤖 Reply:", reply);

    res.json({ reply });

  } catch (error) {
    console.error("❌ Chat Error:", error);

    res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});

// ==============================
app.get("/", (req, res) => {
  res.send("🚀 Gemini server running...");
});

// ==============================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});