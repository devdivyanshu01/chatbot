import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message required" });
    }

    // 🔍 Detect image request
    const isImageRequest =
      message.toLowerCase().includes("generate image") ||
      message.toLowerCase().includes("create image") ||
      message.toLowerCase().includes("image of");

    // =========================
    // 🖼 IMAGE GENERATION (OpenAI)
    // =========================
    if (isImageRequest) {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-image-1",
            prompt: message,
            size: "1024x1024",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Image generation failed");
      }

      return res.status(200).json({
        type: "image",
        image: data.data[0].url,
      });
    }

    // =========================
    // 💬 TEXT (Gemini Multi-Model Fallback)
    // =========================
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 🔥 Add multiple models (priority order)
    const models = [
      "gemini-2.5-flash",   // fastest + best
      "gemini-1.5-flash",   // fallback
      "gemini-1.5-pro",     // high quality fallback
    ];

    let reply = null;
    let lastError = null;

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
        });

        const result = await model.generateContent(message);
        reply = result.response.text();

        console.log(`✅ Success with model: ${modelName}`);
        break; // stop when success

      } catch (err) {
        console.warn(`⚠ Model failed: ${modelName}`, err.message);
        lastError = err;
      }
    }

    if (!reply) {
      throw new Error(
        lastError?.message || "All Gemini models failed"
      );
    }

    return res.status(200).json({
      type: "text",
      reply,
    });

  } catch (err) {
    console.error("❌ API ERROR:", err);

    return res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
}