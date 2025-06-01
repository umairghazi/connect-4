import { useEffect, useState } from "react";
import { getMessages } from "../api/message";
import { socket } from "../clients/socket";
import type { Message } from "../types/message";

export function useChat(userId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

  useEffect(() => {
    const msgListener = (msg: Message) => setMessages((prev) => [...prev, msg]);
    socket.on("new-message", msgListener);
    return () => {
      socket.off("new-message", msgListener);
    };
  }, []);

  const sendMessage = () => {
    if (!chatText.trim() || !userId) return;
    socket.emit("send-message", { userId, message: chatText });
    setChatText("");
  };

  return {
    messages,
    chatText,
    setChatText,
    sendMessage,
  };
}
