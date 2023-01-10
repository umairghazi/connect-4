/* eslint-disable no-console */
import { Db, MongoClient } from 'mongodb';

class MongoConnector {
  private _client: Promise<MongoClient>;
  private _db: Promise<Db>;

  constructor(uri: string, dbName: string) {
    this._client = this._createConnection(uri);
    this._db = this._getDB(this._client, dbName);
  }

  get client(): Promise<MongoClient> {
    return this._client;
  }
  get db(): Promise<Db> {
    return this._db;
  }

  private async _createConnection(url: string): Promise<MongoClient> {
    const client = MongoClient.connect(url);

    client
      .then(() => console.log('🚀 Connected to Mongo'))
      .catch((err) => console.error('Error connecting to Mongo' + err));

    return client;
  }

  private async _getDB(client: Promise<MongoClient>, dbName: string): Promise<Db> {
    const mongoClient = await client;
    return mongoClient.db(dbName);
  }
}

export const MongoConection = {
  default: new MongoConnector(process.env.MONGO_URI || '', process.env.MONGO_DB_NAME || ''),
};
