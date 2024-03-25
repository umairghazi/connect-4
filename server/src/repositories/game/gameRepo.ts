import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo, CreateResult } from '../../infrastructure';
import { UserEntity } from '../user';

interface CreateChallengeRepoOptions {
  player1: UserEntity;
  player2: UserEntity;
}

interface GetChallengeRepoOptions {
  player1: UserEntity;
  player2: UserEntity;
}

interface GetChallengeForPlayerRepoOptions {
  email: string;
}

export interface Challenge {
  _id: ObjectId;
  player1Id: ObjectId;
  player2Id: ObjectId;
  player1Email: string;
  player2Email: string;
  status: string;
  create_date: Date;
  update_date: Date;
}

export interface IGameRepo {
  createChallenge(options: CreateChallengeRepoOptions): Promise<CreateResult>;
}

export class GameRepo extends BaseMongoRepo implements IGameRepo {
  constructor(db: Promise<Db>) {
    super(db, 'game-data');
  }

  public async createChallenge(options: CreateChallengeRepoOptions): Promise<CreateResult> {
    const { player1, player2 } = options;

    const response = await super.create({
      player1Id: player1._id,
      player2Id: player2._id,
      player1Email: player1.email,
      player2Email: player2.email,
      status: 'STARTED',
      create_date: new Date(),
      update_date: new Date(),
    });

    return response;
  }

  public async getChallenge(options: GetChallengeRepoOptions): Promise<Challenge | null> {
    const { player1, player2 } = options;

    const response = await super.getOne<Challenge>({
      player1Id: player1._id,
      player2Id: player2._id,
    });

    return response;
  }

  public async getChallengeForPlayer(
    options: GetChallengeForPlayerRepoOptions,
  ): Promise<Challenge | null> {
    const { email } = options;

    return super.getOne<Challenge>({
      $or: [{ player2Email: email }],
    });
  }
}
