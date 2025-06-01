import type { Db } from "mongodb";
import { ObjectId } from "mongodb";
import type { GameDTO } from "../interfaces/GameDTO";
import type { GameEntity } from "../interfaces/GameEntity";
import { mapGameDTOToEntity } from "../interfaces/GameMapper";
import type { CreateResult } from "./baseMongoRepo";
import { BaseMongoRepo } from "./baseMongoRepo";

export class GameRepo extends BaseMongoRepo {
  constructor(db: Promise<Db>) {
    super(db, "game-data");
  }

  async createGame(params: Partial<GameDTO>): Promise<CreateResult> {
    const gameEntity = mapGameDTOToEntity(params);
    const game: GameEntity = {
      ...gameEntity,
      gameStatus: "CHALLENGED",
      whoseTurn: null,
      winnerId: null,
      boardData: "",
      createDate: new Date(),
      updateDate: new Date(),
    };

    return this.create(game);
  }

  // Accept a challenge
  async acceptChallenge(params: Partial<GameDTO>): Promise<GameEntity | null> {
    const gameEntity = mapGameDTOToEntity(params);
    const { _id, player1Id, player2Id } = gameEntity;
    if (!_id) throw new Error("Game ID is required to accept challenge");
    return this.updateById<GameEntity>(_id, {
      gameStatus: "IN_PROGRESS",
      whoseTurn: new ObjectId(player1Id),
      player1Id: new ObjectId(player1Id),
      player2Id: new ObjectId(player2Id),
    });
  }

  async cancelChallenge(gameId: string): Promise<GameEntity | null> {
    return this.updateById<GameEntity>(gameId, {
      gameStatus: "FINISHED",
      whoseTurn: null,
      winnerId: null,
    });
  }

  async updateGameState(params: Partial<GameEntity>): Promise<GameEntity | null> {
    const { _id, whoseTurn, boardData, gameStatus, winnerId } = params;

    if (!_id) {
      throw new Error("Game ID is required to update game state");
    }

    const update: Partial<GameEntity> = {};

    if (whoseTurn) update.whoseTurn = new ObjectId(whoseTurn);
    if (boardData !== undefined) update.boardData = boardData;
    if (gameStatus) update.gameStatus = gameStatus;
    if (winnerId !== undefined) update.winnerId = winnerId ? new ObjectId(winnerId) : null;

    return this.updateById<GameEntity>(_id.toString(), update);
  }

  // Get games for a player (in lobby or active)
  async getGamesForPlayer(playerId: string): Promise<GameEntity[]> {
    return this.executeQuery<GameEntity>({
      $or: [{ player1Id: new ObjectId(playerId) }, { player2Id: new ObjectId(playerId) }],
      gameStatus: { $in: ["CHALLENGED", "IN_PROGRESS"] },
    });
  }

  // Get one game by ID
  async getGameById(gameId: string): Promise<GameEntity | null> {
    return this.getById<GameEntity>(gameId);
  }
}
