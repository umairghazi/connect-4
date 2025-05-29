import dotenv from "dotenv";

dotenv.config();

export const env = {
  server: {
    host: process.env.HOST ?? "localhost",
    port: process.env.PORT ? Number(process.env.PORT) : 4000,
  },
  db: {
    mongoUri: process.env.MONGODB_URI ?? "",
    dbName: process.env.DB_NAME ?? "",
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "c4-new-secret",
  },
};
