import { useEffect, useCallback } from "react";
import { socket, SOCKET_EVENTS } from "../clients/socket";
import type { Message } from "../types/message";
import type { Game } from "../types/game";
import type { UserDTO } from "../types/user";

export function useSocket() {
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const onLobbyMessage = useCallback((cb: (msg: Message) => void) => {
    socket.on(SOCKET_EVENTS.CHAT_LOBBY_NEW_MESSAGE, cb);
    return () => socket.off(SOCKET_EVENTS.CHAT_LOBBY_NEW_MESSAGE, cb);
  }, []);

  const onGameMessage = useCallback((cb: (msg: Message) => void) => {
    socket.on(SOCKET_EVENTS.CHAT_GAME_NEW_MESSAGE, cb);
    return () => socket.off(SOCKET_EVENTS.CHAT_GAME_NEW_MESSAGE, cb);
  }, []);

  const sendMessage = useCallback((payload: {
    user: UserDTO;
    message: string;
    gameId?: string;
    timestamp: number;
    id: string;
  }) => {
    socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, payload);
  }, []);

  const onNewGame = useCallback((cb: (game: Game) => void) => {
    socket.on(SOCKET_EVENTS.GAME_NEW, cb);
    return () => socket.off(SOCKET_EVENTS.GAME_NEW, cb);
  }, []);

  const joinGame = useCallback((gameId: string) => {
    socket.emit(SOCKET_EVENTS.GAME_JOIN, gameId);
  }, []);

  const registerUser = useCallback((userId: string) => {
    socket.emit(SOCKET_EVENTS.USER_REGISTER, { userId });
  }, []);

  const getActiveUsers = useCallback(() => {
    socket.emit(SOCKET_EVENTS.USER_GET_ACTIVE_USERS);
  }, []);

  const onActiveUsers = useCallback((cb: (users: UserDTO[]) => void) => {
    socket.on(SOCKET_EVENTS.USER_ACTIVE_USERS, cb);
    return () => socket.off(SOCKET_EVENTS.USER_ACTIVE_USERS, cb);
  }, []);

  return {
    onLobbyMessage,
    onGameMessage,
    sendMessage,
    onNewGame,
    joinGame,
    registerUser,
    getActiveUsers,
    onActiveUsers,
  };
}
