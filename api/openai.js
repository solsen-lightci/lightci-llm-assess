require("dotenv").config();
const OpenAI = require("openai");

const openaiClient = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });

module.exports.chat = async function chat(messages) {
  const chatCompletion = await openaiClient.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  return chatCompletion.data.choices[0].message.content;
};
