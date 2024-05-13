import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo, CreateResult, UpdateResult } from '../../infrastructure';
import { IGameEntity, mapGameDTOToEntity } from '../../interface';
import { isNull, omitBy } from 'lodash';

export interface CreateGameRepoOptions {
  player1Id: string;
  player2Id: string;
}

export interface GetGameRepoOptions {
  player1Id?: string;
  player2Id?: string;
  id?: string;
  gameStatus?: string[];
}

export interface UpdateGameRepoOptions {
  id: string;
  player1Id: string;
  player2Id: string;
  gameStatus: string;
  whoseTurn: string;
  boardData: string;
  winnerId?: string;
}

export interface IGameRepo {
  createGame(options: CreateGameRepoOptions): Promise<CreateResult>;
  getGame(options: GetGameRepoOptions): Promise<IGameEntity[]>;
  updateGame(options: UpdateGameRepoOptions): Promise<UpdateResult>;
}

/**
 * @export
 * @class GameRepo
 * @extends {BaseMongoRepo}
 * @implements {IGameRepo}
 */

export class GameRepo extends BaseMongoRepo implements IGameRepo {
  /**
   *Creates an instance of GameRepo.
   * @param {Promise<Db>} db
   * @memberof GameRepo
   */
  constructor(db: Promise<Db>) {
    super(db, 'game-data');
  }

  /**
   * Create game
   * @param {CreateGameRepoOptions} options
   * @returns {Promise<CreateResult>}
   */
  public async createGame(options: CreateGameRepoOptions): Promise<CreateResult> {
    const { player1Id, player2Id } = options;

    const gameEntity = mapGameDTOToEntity({
      player1Id,
      player2Id,
      whoseTurn: player1Id,
      gameStatus: 'CHALLENGED',
      createDate: Date.now().toString(),
      updateDate: Date.now().toString(),
      boardData: '',
    });

    return super.create(gameEntity);
  }

  /**
   * Get game query
   * @private
   * @param {GetGameRepoOptions} options
   * @returns {Record<string, unknown>[]}
   */
  private _getGameQuery(options: GetGameRepoOptions): Record<string, unknown>[] {
    const { player1Id, player2Id, id, gameStatus } = options;

    const pipeline: Record<string, unknown>[] = [];

    if (options) {
      const playerIds = [];
      if (player1Id) playerIds.push(new ObjectId(player1Id));
      if (player2Id) playerIds.push(new ObjectId(player2Id));

      const matchStage: Record<string, unknown> = {};

      if (playerIds.length > 0) {
        matchStage.$or = [{ player1Id: { $in: playerIds } }, { player2Id: { $in: playerIds } }];
      }

      if (id) {
        matchStage._id = new ObjectId(id);
      }

      if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
      }

      if (gameStatus?.length) {
        pipeline.push({ $match: { gameStatus: { $in: gameStatus } } });
      }

      pipeline.push({
        $lookup: {
          from: 'user-data',
          localField: 'player1Id',
          foreignField: '_id',
          as: 'player1Data',
        },
      });

      pipeline.push({ $unwind: '$player1Data' });

      pipeline.push({
        $lookup: {
          from: 'user-data',
          localField: 'player2Id',
          foreignField: '_id',
          as: 'player2Data',
        },
      });

      pipeline.push({ $unwind: '$player2Data' });
    }

    return pipeline;
  }

  /**
   * Get game
   * @param {GetGameRepoOptions} options
   * @returns {Promise<IGameEntity[]>}
   */
  public async getGame(options: GetGameRepoOptions): Promise<IGameEntity[]> {
    const stages = this._getGameQuery(options);
    return super.executeAggregate(stages);
  }

  /**
   * Update game
   * @param {UpdateGameRepoOptions} options
   * @returns {Promise<UpdateResult>}
   */
  public async updateGame(options: UpdateGameRepoOptions): Promise<UpdateResult> {
    const { id, player1Id, player2Id, gameStatus, whoseTurn, boardData, winnerId } = options;

    const gameEntity = mapGameDTOToEntity(
      omitBy(
        {
          player1Id,
          player2Id,
          gameStatus,
          whoseTurn,
          boardData,
          winnerId,
          updateDate: Date.now().toString(),
        },
        isNull,
      ),
    );

    return super.updateOne({ _id: new ObjectId(id) }, gameEntity);
  }
}
