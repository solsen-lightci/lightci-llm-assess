import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = "gpt-4o-mini";

export const chat = async function chat(messages) {
  const chatCompletion = await openaiClient.chat.completions.create({
    messages,
    model,
  });
  return chatCompletion.data.choices[0].message.content;
};
