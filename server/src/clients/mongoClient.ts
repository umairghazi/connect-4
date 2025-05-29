import type { Db } from "mongodb";
import { MongoClient } from "mongodb";
import { env } from "../config/env";

const { mongoUri, dbName } = env.db;

export class Database {
  private readonly _client: Promise<MongoClient>;
  private readonly _db: Promise<Db>;

  constructor() {
    this._client = this.connect();
    this._db = this.getDb();
  }

  private async connect(): Promise<MongoClient> {
    const client = new MongoClient(mongoUri);
    console.log("Connecting to MongoDB database...");
    const connection = await client.connect();
    console.log("Connected to MongoDB database");
    return connection;
  }

  private async getDb(): Promise<Db> {
    const client = await this._client;
    return client.db(dbName);
  }

  get db(): Promise<Db> {
    return this._db;
  }
}

const MongoConnector = new Database();

export { MongoConnector };
