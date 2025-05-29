import type { Server } from "socket.io";
import { ChatController } from "../controllers/chatController";

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

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

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
