import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chat = async function chat(messages) {
  const chatCompletion = await openaiClient.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  return chatCompletion.data.choices[0].message.content;
};
