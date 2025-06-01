import type { Server } from "socket.io";
import { ChatController } from "../controllers/chatController";
import { UserController } from "../controllers/userController";

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register-user", async (userId: string) => {
      console.log("Registering user with ID:", userId);
      socket.data.userId = userId;
      await UserController.handleSocketSetUserStatus(userId, true); // ✅ Set user active
      const activeUsers = await UserController.handleSocketGetActiveUsers();
      io.emit("active-users", activeUsers); // ✅ broadcast updated list
    });

    socket.on("get-active-users", async () => {
      const userIds = await UserController.handleSocketGetActiveUsers();
      socket.emit("active-users", userIds);
    });

    socket.on("send-message", async ({ userId, message }) => {
      try {
        const messageDTO = await ChatController.handleSocketChatMessage({ userId, message });
        io.emit("new-message", messageDTO);
      } catch (err) {
        console.error("❌ Error handling socket message:", err);
      }
    });

    socket.on("new-game", (game) => {
      io.emit("new-game", game);
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
  });
}
