import type { Server } from "socket.io";
import { ChatController } from "../controllers/chatController";
import { UserController } from "../controllers/userController";

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register-user", async (userId: string) => {
      socket.data.userId = userId;

      socket.join(userId);

      await UserController.handleSocketSetUserStatus(userId, true);
      const activeUsers = await UserController.handleSocketGetActiveUsers();
      io.emit("active-users", activeUsers);
    });

    socket.on("get-active-users", async () => {
      const users = await UserController.handleSocketGetActiveUsers();
      socket.emit("active-users", users);
    });

    socket.on("send-message", async ({ userId, message, gameId }) => {
      try {
        const messageDTO = await ChatController.handleSocketChatMessage({ userId, message, gameId });
        io.emit("new-message", messageDTO);
      } catch (err) {
        console.error("❌ Error handling socket message:", err);
      }
    });

    socket.on("game-chat", async ({ gameId, userId, message }) => {
      const savedMessage = await ChatController.handleSocketChatMessage({ userId, gameId, message });
      io.to(`game:${gameId}`).emit("game-chat", savedMessage); // broadcast to all in game room
    });

    socket.on("disconnect", async () => {
      const userId = socket.data.userId;
      console.log("User disconnected:", userId);
      if (userId) {
        await UserController.handleSocketSetUserStatus(userId, false);
        const activeUsers = await UserController.handleSocketGetActiveUsers();
        io.emit("active-users", activeUsers);
      }
    });

    socket.on("join-game", (gameId) => {
      socket.join(`game:${gameId}`);
    });
  });
}
