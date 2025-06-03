import { useEffect, useState } from "react";
import { getMessages } from "../api/message";
import { useSocket } from "./useSocket";
import type { Message } from "../types/message";
import { useAuth } from "./useAuth";

export interface UseChatParams {
  userId?: string;
  gameId?: string;
  chatType?: "lobby" | "game";
}

export function useChat({ userId, gameId, chatType }: UseChatParams) {
  const { user } = useAuth();
  const { onLobbyMessage, onGameMessage, sendMessage } = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    if (chatType === "game" && gameId) {
      getMessages(gameId).then(setMessages);
    } else if (chatType === "lobby") {
      getMessages().then(setMessages);
    }
  }, [chatType, gameId]);

  useEffect(() => {
    const listener = (msg: Message) => setMessages((prev) => [...prev, msg]);
    const unsubscribe = chatType === "game" ? onGameMessage(listener) : onLobbyMessage(listener);
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [chatType, onGameMessage, onLobbyMessage]);

  const handleSend = () => {
    if (!chatText.trim() || !userId) return;
    sendMessage({ user: user!, message: chatText, gameId, timestamp: Date.now(), id: crypto.randomUUID() });
    setChatText("");
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") handleSend();
  };

  return {
    messages,
    chatText,
    setChatText,
    sendMessage: handleSend,
    handleKeyDown,
  };
}
