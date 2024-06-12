import { useState } from "react";
import { Message } from "./App";

export default function useAPI() {
  const [loading, setLoading] = useState(false);

  const sendMessages = async (messages: Message[]) => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });
    setLoading(false);

    if (!response.ok) {
      throw new Error("Failed to send messages.");
    }

    return (await response.json()).messages as Message[];
  };

  return { loading, sendMessages };
}
