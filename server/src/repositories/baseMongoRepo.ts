/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Db, Collection, FindCursor, AggregationCursor } from "mongodb";
import { ObjectId } from "mongodb";
import type { ListOptions, PaginationOptions } from "../interfaces/ListOptions";

interface UpdateOperator {
  $pull?: any;
  $push?: any;
  $inc?: any;
}

export interface CreateResult {
  id: ObjectId | null;
}

export interface UpdateResult {
  count: number;
}

export class BaseMongoRepo {
  protected db: Promise<Db>;
  protected collection: Promise<Collection>;

  constructor(db: Promise<Db>, collectionName: string) {
    this.db = db;
    this.collection = this._getCollection(db, collectionName);
  }

  private async _getCollection(db: Promise<Db>, collectionName: string): Promise<Collection> {
    const database = await db;
    return database.collection(collectionName);
  }

  async getById<T>(id: string): Promise<T | null> {
    const collection = await this.collection;
    return collection.findOne({ _id: new ObjectId(id) }) as T | null;
  }

  async getByIds<T>(ids: string[]): Promise<T[]> {
    const collection = await this.collection;
    const objectIds = ids.map((id) => new ObjectId(id));
    return collection.find({ _id: { $in: objectIds } }).toArray() as unknown as T[];
  }

  async getOne<T>(query: object): Promise<T | null> {
    const collection = await this.collection;
    return collection.findOne(query) as T | null;
  }

  async getCount(query: object): Promise<number> {
    const collection = await this.collection;
    return collection.countDocuments(query);
  }

  async getList<T>(query: object, options: PaginationOptions): Promise<T[]> {
    const collection = await this.collection;
    const cursor = collection.find(query);
    return this._handlePagination(cursor, options) as Promise<T[]>;
  }

  async getAggregateList<T>(pipeline: any[], options: PaginationOptions): Promise<T[]> {
    const collection = await this.collection;
    const cursor = collection.aggregate(pipeline);
    return this._handlePagination(cursor, options) as Promise<T[]>;
  }

  async executeQuery<T>(query: object): Promise<T[]> {
    const collection = await this.collection;
    return collection.find(query).toArray() as unknown as T[];
  }

  async executeAggregate<T>(pipeline: object[]): Promise<T[]> {
    const collection = await this.collection;
    return collection.aggregate(pipeline).toArray() as unknown as T[];
  }

  async executeAggregateStream<T>(pipeline: object[]): Promise<AggregationCursor<T>> {
    const collection = await this.collection;
    return collection.aggregate(pipeline) as AggregationCursor<T>;
  }

  async create(doc: object): Promise<CreateResult> {
    const collection = await this.collection;

    if (!doc) throw new Error("Missing document");

    const now = new Date().toISOString();
    const result = await collection.insertOne({
      ...doc,
      create_date: now,
      update_date: now,
    });

    return { id: result.insertedId || null };
  }

  async updateById<T>(id: string, update: object): Promise<T | null> {
    const collection = await this.collection;
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (result.modifiedCount === 0) {
      throw new Error("No record updated");
    }

    return this.getById<T>(id);
  }

  async updateOne(query: object, update: object): Promise<UpdateResult> {
    if (!query || !update) throw new Error("Missing required params");

    const collection = await this.collection;

    const result = await collection.updateOne(query, {
      $set: { ...update, update_date: new Date().toISOString() },
    });

    return { count: result.modifiedCount || 0 };
  }

  async updateMany<T>(query: object, update: T, operator?: UpdateOperator): Promise<UpdateResult> {
    if (!query || (!update && !operator)) {
      throw new Error("Missing required params");
    }

    const collection = await this.collection;

    const result = await collection.updateMany(query, {
      $set: { ...update, update_date: new Date().toISOString() },
      ...operator,
    });

    return { count: result.modifiedCount || 0 };
  }

  async deleteMany(query: object): Promise<UpdateResult> {
    if (!query) throw new Error("Missing required params");

    const collection = await this.collection;

    const result = await collection.deleteMany(query);
    return { count: result.deletedCount || 0 };
  }

  private async _handlePagination<T>(cursor: FindCursor<T> | AggregationCursor<T>, options: ListOptions): Promise<T[]> {
    const { page = 1, limit = 10 } = options;
    return cursor
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray();
  }
}
