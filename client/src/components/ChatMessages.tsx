import { useEffect, useRef } from "react";
import { List } from "@mui/material";
import { ChatMessage } from "./ChatMessage";
import type { Message } from "../types/message";

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <List sx={{ maxHeight: "70vh", overflowY: "auto", paddingRight: 1 }}>
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.message}
          picture={msg.user.avatar}
          username={msg.user.displayName}
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
};
