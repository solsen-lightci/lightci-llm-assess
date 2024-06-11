import { useState } from "react";
import { Message } from "./App";

// create a fetch hook that calls the POST messages endpoint with the message data. The hook should return a function that accepts a message string and returns a promise that resolves with the response data. The hook should also handle the loading state of the request.
// The hook should be used in the ChatInterface component to send messages to the server.

export default () => {
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
};
