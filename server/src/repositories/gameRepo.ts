import type { Db } from "mongodb";
import { ObjectId } from "mongodb";
import type { GameDTO } from "../interfaces/GameDTO";
import type { GameEntity } from "../interfaces/GameEntity";
import { mapGameDTOToEntity } from "../interfaces/GameMapper";
import { BaseMongoRepo } from "./baseMongoRepo";

export class GameRepo extends BaseMongoRepo {
  constructor(db: Promise<Db>) {
    super(db, "game-data");
  }

  async createGame(params: Partial<GameDTO>): Promise<{ id: ObjectId | null }> {
    const gameEntity = mapGameDTOToEntity(params);
    gameEntity.gameStatus = gameEntity.gameStatus ?? "CHALLENGED";
    return this.create(gameEntity);
  }

  async acceptChallenge(gameId: string, playerIds: string[]): Promise<GameEntity | null> {
    if (!gameId || !playerIds || playerIds.length < 2) {
      throw new Error("Game ID and at least two playerIds are required");
    }

    return this.updateById<GameEntity>(gameId, {
      gameStatus: "IN_PROGRESS",
      // playerIds: playerIds.map((id) => new ObjectId(id)),
      whoseTurn: new ObjectId(playerIds[0]),
      updateDate: new Date(),
    });
  }

  async cancelChallenge(gameId: string): Promise<GameEntity | null> {
    return this.updateById<GameEntity>(gameId, {
      gameStatus: "FINISHED",
      winnerId: null,
    });
  }

  async updateGameState(params: Partial<GameDTO>): Promise<GameEntity | null> {
    const { id, boardData, gameStatus, winnerId, currentTurnIndex } = params;
    if (!id) throw new Error("Game ID is required");

    const update: Partial<GameEntity> = {
      updateDate: new Date(),
    };

    if (boardData !== undefined) update.boardData = boardData;
    if (gameStatus) update.gameStatus = gameStatus;
    if (winnerId !== undefined) update.winnerId = winnerId ? new ObjectId(winnerId) : null;
    if (currentTurnIndex !== undefined) update.currentTurnIndex = currentTurnIndex;

    return this.updateById<GameEntity>(id, update);
  }

  public async getGamesForPlayer(playerId: string): Promise<GameEntity[]> {
    const pipeline = this._getGamesForPlayerStages(playerId);
    return this.executeAggregate<GameEntity>(pipeline);
  }

  public async getGameById(gameId: string): Promise<GameEntity | null> {
    const stages = this._getGameByIdStages(gameId);
    const results = await this.executeAggregate<GameEntity>(stages);
    return results[0] ?? null;
  }

  private _getGameByIdStages(gameId: string): Record<string, unknown>[] {
    return [
      {
        $match: { _id: new ObjectId(gameId) },
      },
      {
        $lookup: {
          from: "user-data",
          localField: "playerIds",
          foreignField: "_id",
          as: "playerData",
        },
      },
      {
        $project: {
          "_id": 1,
          "playerIds": 1,
          "startedBy": 1,
          "currentTurnIndex": 1,
          "winnerId": 1,
          "gameStatus": 1,
          "boardData": 1,
          "createDate": 1,
          "updateDate": 1,
          "playerData._id": 1,
          "playerData.displayName": 1,
          "playerData.avatar": 1,
          "playerData.email": 1,
          "playerData.isActive": 1,
        },
      },
    ];
  }

  private _getGamesForPlayerStages(playerId: string): Record<string, unknown>[] {
    return [
      {
        $match: {
          playerIds: { $in: [new ObjectId(playerId)] },
          gameStatus: { $in: ["CHALLENGED", "IN_PROGRESS"] },
        },
      },
      {
        $lookup: {
          from: "user-data",
          localField: "playerIds",
          foreignField: "_id",
          as: "playerData",
        },
      },
      {
        $project: {
          "_id": 1,
          "playerIds": 1,
          "currentTurnIndex": 1,
          "winnerId": 1,
          "gameStatus": 1,
          "boardData": 1,
          "createDate": 1,
          "updateDate": 1,
          "playerData._id": 1,
          "playerData.displayName": 1,
          "playerData.avatar": 1,
          "playerData.email": 1,
          "playerData.isActive": 1,
        },
      },
    ];
  }
}
