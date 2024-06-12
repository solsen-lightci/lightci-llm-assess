import { useState } from "react";
import { Message } from "./App";

export default function useAPI() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Message[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const sendMessages = async (messages: Message[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Failed to send messages.");
      }

      const data = await response.json();
      setResponse(data.messages);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, error, sendMessages };
}
