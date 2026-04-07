import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // ✅ correct
      "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("❌ API ERROR:", err);
    return res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
}