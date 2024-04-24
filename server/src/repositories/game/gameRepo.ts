import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo, CreateResult } from '../../infrastructure';
// import { UserEntity } from '../user';

interface CreateGameRepoOptions {
  player1: any;
  player2: any;
  gameState: string;
}

interface GetGameRepoOptions {
  player1Email?: string;
  player2Email?: string;
  gameId?: string;
}

export interface GameEntity {
  _id: ObjectId;
  player1Id: ObjectId;
  player2Id: ObjectId;
  player1Email: string;
  player2Email: string;
  status: string;
  gameState: string;
  playerTurn: string;
  create_date: Date;
  update_date: Date;
}

export interface IGameRepo {
  createGame(options: CreateGameRepoOptions): Promise<CreateResult>;
}

export class GameRepo extends BaseMongoRepo implements IGameRepo {
  constructor(db: Promise<Db>) {
    super(db, 'game-data');
  }

  public async createGame(options: CreateGameRepoOptions): Promise<CreateResult> {
    const { player1, player2, gameState } = options;

    const response = await super.create({
      player1Id: player1._id,
      player2Id: player2._id,
      player1Email: player1.email,
      player2Email: player2.email,
      status: 'STARTED',
      gameState,
      playerTurn: player1?._id?.toString(),
      create_date: new Date(),
      update_date: new Date(),
    });

    return response;
  }

  private _getGameQuery(options: GetGameRepoOptions) {
    const { player1Email, player2Email, gameId } = options;

    return options
      ? {
          ...(player1Email && { player1Email }),
          ...(player2Email && { player2Email }),
          ...(gameId && { _id: new ObjectId(gameId) }),
        }
      : {};
  }

  public async getGame(options: GetGameRepoOptions): Promise<GameEntity[] | null> {
    const stages = [{ $match: this._getGameQuery(options) }];

    return super.executeAggregate(stages);
  }
}
