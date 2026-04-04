import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA20-qt2T0yQt6Y7AD2WH6MeLhczPBpZ1A");

async function test() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent("Say hello");
    console.log(result.response.text());
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();