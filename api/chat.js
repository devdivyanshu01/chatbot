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

    // 🔁 Retry function
    const generateWithRetry = async (modelName, retries = 3) => {
      const model = genAI.getGenerativeModel({ model: modelName });

      for (let i = 0; i < retries; i++) {
        try {
          const result = await model.generateContent(message);
          return result.response.text();
        } catch (err) {
          console.log(`Retry ${i + 1} failed for ${modelName}`);

          if (i === retries - 1) throw err;

          // wait before retry
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    };

    let reply;

    try {
      // ✅ Primary (your original model)
      reply = await generateWithRetry("gemini-2.5-flash");
    } catch (err) {
      console.log("⚠ Switching to fallback model...");

      // 🔁 Fallback (more stable)
      reply = await generateWithRetry("gemini-1.5-flash");
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("❌ API ERROR:", err);

    return res.status(500).json({
      error: "Server busy, try again later",
    });
  }
}