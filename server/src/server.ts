import http from "http";
import cors from "cors";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import userRoutes from "./routes/userRoutes";
import { registerSocketHandlers } from "./socket/socket";

const app = express();

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", chatRoutes);
app.use("/api", userRoutes);

registerSocketHandlers(io);

server.listen(4500, () => {
  console.log("REST + Socket.IO server running on http://localhost:4500");
});
