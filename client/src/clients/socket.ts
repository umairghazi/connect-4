import { io } from "socket.io-client";
import { config } from "../config/config";

export const socket = io(config.wsBaseUrl, { withCredentials: true });

export const SOCKET_EVENTS = {
  // User
  USER_REGISTER: "user:register",
  USER_GET_ACTIVE_USERS: "user:get-active-users",
  USER_ACTIVE_USERS: "user:active-users",

  // Chat
  CHAT_MESSAGE: "chat:message",
  CHAT_LOBBY_NEW_MESSAGE: "chat:lobby:new-message",
  CHAT_GAME_NEW_MESSAGE: "chat:game:new-message",

  // Game
  GAME_JOIN: "game:join",
  GAME_NEW: "game:new",

  // Rooms
  JOIN_ROOM: "chat:join-room",
};
