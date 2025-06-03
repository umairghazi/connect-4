import type { Server } from "socket.io";
import { ChatController } from "../controllers/chatController";
import { UserController } from "../controllers/userController";
import type { UserDTO } from "../interfaces/UserDTO";
import { SOCKET_EVENTS } from "./events";

export interface UserRegisterEvent {
  userId: string;
}

export interface ChatMessageEvent {
  user: UserDTO;
  message: string;
  gameId?: string;
  timestamp?: string;
  id?: string;
}

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    // USER EVENTS
    socket.on(SOCKET_EVENTS.USER_REGISTER, async (evt: UserRegisterEvent) => {
      const { userId } = evt;
      socket.data.userId = userId;
      socket.join(`user:${userId}`);
      console.log("User registered:", userId);

      await UserController.handleSocketSetUserStatus(userId, true);
      const activeUsers = await UserController.handleSocketGetActiveUsers();
      io.emit(SOCKET_EVENTS.USER_ACTIVE_USERS, activeUsers);
      console.log("Active users updated after registration");
    });

    socket.on(SOCKET_EVENTS.USER_GET_ACTIVE_USERS, async () => {
      const users = await UserController.handleSocketGetActiveUsers();
      socket.emit(SOCKET_EVENTS.USER_ACTIVE_USERS, users);
      console.log("Active users requested by user");
    });

    socket.on("disconnect", async () => {
      const userId = socket.data.userId;
      console.log("User disconnected:", userId);
      if (userId) {
        await UserController.handleSocketSetUserStatus(userId, false);
        const activeUsers = await UserController.handleSocketGetActiveUsers();
        io.emit(SOCKET_EVENTS.USER_ACTIVE_USERS, activeUsers);
        console.log("Active users updated after disconnect");
      }
    });

    socket.on(SOCKET_EVENTS.CHAT_MESSAGE, async (evt: ChatMessageEvent) => {
      const { user, message, gameId, timestamp, id } = evt;
      try {
        ChatController.handleSocketChatMessage({ userId: user.id!, message, gameId });

        if (gameId) {
          io.to(`game:${gameId}`).emit(SOCKET_EVENTS.CHAT_GAME_NEW_MESSAGE, { user, message, gameId, timestamp, id });
          console.log("Chat message sent to game:", { user, message, gameId, timestamp, id });
        } else {
          io.emit(SOCKET_EVENTS.CHAT_LOBBY_NEW_MESSAGE, { user, message, gameId, timestamp, id });
          console.log("Chat message sent to lobby:", { user, message, gameId, timestamp, id });
        }
      } catch (err) {
        console.error("Error sending chat message:", err);
      }
    });

    // GAME EVENTS
    socket.on(SOCKET_EVENTS.GAME_JOIN, (gameId: string) => {
      socket.join(`game:${gameId}`);
      console.log(`User ${socket.data.userId} joined game ${gameId}`);
    });
  });
}
