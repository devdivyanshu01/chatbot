import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    // ✅ Method check
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    // ✅ Validation
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message required" });
    }

    const msg = message.toLowerCase();

    // =========================
    // 🔍 Detect image request
    // =========================
    const isImageRequest =
      msg.includes("generate image") ||
      msg.includes("create image") ||
      msg.includes("draw") ||
      msg.includes("image of") ||
      msg.includes("logo") ||
      msg.includes("art");

    // =========================
    // 🖼 IMAGE GENERATION (OpenAI)
    // =========================
    if (isImageRequest) {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
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
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Image generation failed");
      }

      return res.status(200).json({
        type: "image",
        image: data.data[0].url, // ✅ URL (frontend should use directly)
      });
    }

    // =========================
    // 💬 TEXT GENERATION (Gemini)
    // =========================
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let reply = "";

    // 🔁 Retry logic (handles 503 / overload)
    for (let i = 0; i < 3; i++) {
      try {
        const result = await model.generateContent(message);
        reply = result.response.text();
        break;
      } catch (err) {
        if (i === 2) throw err;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
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