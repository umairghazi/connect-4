import type { Server } from "socket.io";

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send-message", (msg) => {
      io.emit("message", msg); // broadcast to all
    });

    socket.on("new-game", (game) => {
      io.emit("new-game", game);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
