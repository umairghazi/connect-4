import { useEffect, useState } from "react";
import { getMessages } from "../api/message";
import { socket } from "../clients/socket";
import type { Message } from "../types/message";

export function useChat(userId?: string, gameId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    getMessages(gameId).then(setMessages);
  }, [gameId]);

  useEffect(() => {
    const msgListener = (msg: Message) => setMessages((prev) => [...prev, msg]);
    socket.on("new-message", msgListener);
    return () => {
      socket.off("new-message", msgListener);
    };
  }, []);

  const sendMessage = () => {
    if (!chatText.trim() || !userId) return;
    socket.emit("send-message", { userId, message: chatText, gameId });
    setChatText("");
  };

   const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") sendMessage();
  };

  return {
    messages,
    chatText,
    setChatText,
    sendMessage,
    handleKeyDown,
  };
}
