import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    host: process.env.HOST ?? "localhost",
    port: process.env.PORT ? Number(process.env.PORT) : 4500,
  },
  db: {
    mongoUri: process.env.MONGODB_URI ?? "",
    dbName: process.env.DB_NAME ?? "",
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
  },
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : ["*"],
};
