import http from "http";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Server as SocketIOServer } from "socket.io";
import { MongoConnector } from "./clients/mongoClient";
import { config } from "./config/config";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import gameRoutes from "./routes/gameRoutes";
import userRoutes from "./routes/userRoutes";
import { registerSocketHandlers } from "./socket/socket";

const app = express();

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: config.allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

app.use(
  cors({
    origin: config.allowedOrigins,
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});
app.use("/api", authRoutes);
app.use("/api", chatRoutes);
app.use("/api", userRoutes);
app.use("/api", gameRoutes);

registerSocketHandlers(io);

server.listen(config.server.port, () => {
  console.log(`REST + Socket.IO server running on http://localhost:${config.server.port}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await MongoConnector.close();
  console.log("Disconnected from MongoDB");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  await MongoConnector.close();
  console.log("Disconnected from MongoDB");
  process.exit(0);
});
