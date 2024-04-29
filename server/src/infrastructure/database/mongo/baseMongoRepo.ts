import moment from 'moment';
import { Db, Collection, AggregationCursor, ObjectId, FindCursor } from 'mongodb';
import { ListOptions, PaginationOptions } from '../../../interface';

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

interface IBaseMongoRepo {
  getById<T>(id: string): Promise<T | null>;
  getByIds<T>(id: Array<string>): Promise<T[]>;
  getOne<T>(query: any): Promise<T | null>;
  getList<T>(query: any, paginationOptions: PaginationOptions): Promise<T[]>;
  getCount(query: any): Promise<number>;
  executeQuery<T>(query: object): Promise<Array<T[]>>;
  executeAggregate<T>(query: Array<any>): Promise<T[]>;
  executeAggregateStream<T>(query: Array<any>): Promise<AggregationCursor<T>>;
  create(doc: object): Promise<CreateResult>;
  updateById<T>(id: string, update: object): Promise<T | null>;
  updateOne(query: object, update: object): Promise<UpdateResult>;
  updateMany<T>(query: object, update: T, operator?: UpdateOperator): Promise<UpdateResult>;
  deleteMany(query: object): Promise<UpdateResult>;
}

export class BaseMongoRepo implements IBaseMongoRepo {
  private _db: Promise<Db>;
  private _collectionName: string;
  private _collection: Promise<Collection>;

  constructor(db: Promise<Db>, collectionName: string) {
    this._db = db;
    this._collectionName = collectionName;
    this._collection = this._getCollection(db, collectionName);
  }

  // Getters
  get db(): Promise<Db> {
    return this.db;
  }
  get collectionName(): string {
    return this._collectionName;
  }
  get collection(): Promise<Collection> {
    return this._collection;
  }

  private async _getCollection(db: Promise<Db>, collectionName: string): Promise<Collection> {
    const _db = await db;
    return _db.collection(collectionName);
  }

  private async _handlePagination(
    cursor: FindCursor | AggregationCursor,
    listOptions: ListOptions,
  ): Promise<any> {
    const { page, limit } = listOptions;
    if (page && limit) {
      cursor.skip(limit * (page - 1)).limit(limit);
    }
    return cursor.toArray();
  }

  async getById<T>(id: string): Promise<T | null> {
    const collection = await this._collection;
    return collection.findOne({ _id: new ObjectId(id) }) as unknown as T;
  }

  async getByIds<T>(ids: Array<string>): Promise<T[]> {
    const collection = await this._collection;
    const idArray = (ids || []).map((id) => new ObjectId(id));
    return collection.find({ _id: { $in: idArray } }).toArray() as unknown as T[];
  }

  async getOne<T>(query: any): Promise<T | null> {
    const collection = await this._collection;
    return collection.findOne<T>(query);
  }

  async getCount(query: any): Promise<number> {
    const collection = await this._collection;
    return collection.countDocuments(query, {});
  }

  async getList<T>(query: any, listOptions: ListOptions): Promise<T[]> {
    const collection = await this._collection;
    const cursor = collection.find(query);
    return this._handlePagination(cursor, listOptions);
  }

  async getAggregateList<T>(query: any, listOptions: ListOptions): Promise<T[]> {
    const collection = await this._collection;
    const cursor = collection.aggregate(query);
    return this._handlePagination(cursor, listOptions);
  }

  async executeQuery<T>(query: any): Promise<T[]> {
    const collection = await this._collection;
    return collection.find(query).toArray() as unknown as T[];
  }

  async executeAggregate<T>(stages: Array<object>): Promise<Array<T>> {
    const collection = await this._collection;
    return collection.aggregate(stages).toArray() as unknown as T[];
  }

  async executeAggregateStream<T>(stages: Array<object>): Promise<AggregationCursor<T>> {
    const collection = await this._collection;
    return collection.aggregate(stages) as unknown as AggregationCursor<T>;
  }

  async create(doc: object): Promise<CreateResult> {
    const collection = await this._collection;

    if (!doc) {
      return Promise.reject(new Error('Missing required params'));
    }

    const date = moment.utc().toDate();
    const opResult = await collection.insertOne({
      ...doc,
      create_date: date,
      update_date: date,
    });

    return {
      id: (opResult && opResult.insertedId) || null,
    };
  }

  async updateById<T>(id: string, update: object): Promise<T | null> {
    const collection = await this._collection;
    const opResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (!opResult || opResult.upsertedCount === 0) {
      return Promise.reject(new Error('No record updated'));
    }

    return this.getById<T>(id);
  }

  async updateOne(query: object, update: object): Promise<UpdateResult> {
    const collection = await this._collection;

    if (!query || !update) {
      return Promise.reject(new Error('Missing required params'));
    }

    const date = moment.utc().toDate();
    const opResult = await collection.updateOne(query, {
      $set: { ...update, update_date: date },
    });
    return { count: (opResult && opResult.modifiedCount) || 0 };
  }

  async updateMany<T>(query: object, update: T, operator?: UpdateOperator): Promise<UpdateResult> {
    const collection = await this._collection;

    if (!query || (!update && !operator)) {
      return Promise.reject(new Error('Missing required params'));
    }

    const date = moment.utc().toDate();
    const opResult = await collection.updateMany(query, {
      $set: { ...update, update_date: date },
      ...operator,
    });
    return { count: (opResult && opResult.modifiedCount) || 0 };
  }

  async deleteMany<TQuery>(query: TQuery): Promise<UpdateResult> {
    const collection = await this._collection;

    if (!query) {
      return Promise.reject(new Error('Missing required params'));
    }

    const opResult = await collection.deleteMany(query);
    return { count: (opResult && opResult.deletedCount) || 0 };
  }
}
