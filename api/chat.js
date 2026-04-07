import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Available models
const GEMINI_MODELS = {
  fast: "gemini-2.5-flash",
  balanced: "gemini-1.5-flash",
  pro: "gemini-1.5-pro"
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, mode } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ Decide model priority
    let modelPriority;

    switch (mode) {
      case "pro":
        modelPriority = [GEMINI_MODELS.pro, GEMINI_MODELS.fast];
        break;
      case "balanced":
        modelPriority = [GEMINI_MODELS.balanced, GEMINI_MODELS.fast];
        break;
      default:
        modelPriority = [
          GEMINI_MODELS.fast,
          GEMINI_MODELS.balanced,
          GEMINI_MODELS.pro
        ];
    }

    let reply = null;
    let lastError = null;

    // 🔁 Retry + fallback
    for (let modelName of modelPriority) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          console.log(`🔄 ${modelName} (Attempt ${attempt + 1})`);

          const model = genAI.getGenerativeModel({
            model: modelName,
          });

          const result = await model.generateContent(message);
          const text = result.response.text();

          if (text) {
            reply = text;
            break;
          }

        } catch (err) {
          lastError = err;

          // Retry only for server overload
          if (
            err.message?.includes("503") ||
            err.message?.includes("overloaded")
          ) {
            const delay = 1000 * (attempt + 1);
            console.log(`⏳ Retrying in ${delay}ms`);
            await new Promise(res => setTimeout(res, delay));
          } else {
            break;
          }
        }
      }

      if (reply) break;
    }

    if (!reply) {
      throw lastError || new Error("All Gemini models failed");
    }

    return res.status(200).json({
      reply,
      modelUsed: modelPriority[0],
    });

  } catch (err) {
    console.error("❌ API ERROR:", err);

    let message = "Internal Server Error";

    if (err.message?.includes("503")) {
      message = "Server busy. Try again.";
    } else if (err.message?.includes("API key")) {
      message = "Invalid API key.";
    }

    return res.status(500).json({ error: message });
  }
}