import { ReactEventHandler, useState } from "react";

import useAPI from "./useAPI";
import "./App.css";

export type Message = {
  role: string;
  text: string;
};

const ChatInterface = () => {
  const { loading, sendMessages } = useAPI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange: ReactEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSendAPIMessage = async (newMessages: Message[]) => {
    const messages = await sendMessages(newMessages);
    setMessages(() => messages);

    // HACK: scroll to the bottom of the chat after messages updates
    setTimeout(() => {
      const messageContainer = document.querySelector(".message-container");
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }, 200);
  };

  const handleSubmitMessage = () => {
    if (!loading && inputValue.trim()) {
      const newMessages = [
        ...messages,
        { role: "user", text: inputValue.trim() },
      ];
      setMessages(() => newMessages);
      handleSendAPIMessage(newMessages);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmitMessage();
  };

  return (
    <div className="chat-interface">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={String(index + 1)} className={`message ${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmitMessage} disabled={loading}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
