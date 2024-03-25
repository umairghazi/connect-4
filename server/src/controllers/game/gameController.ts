import { pubsub } from '../..';
import { MongoConection } from '../../infrastructure';
import { UserRepo } from '../../repositories';
import { Challenge, GameRepo } from '../../repositories/game/gameRepo';

interface CreateChallengeParams {
  player1Email: string;
  player2Email: string;
}
interface CreateChallengeResult {
  player1Email: string;
  player2Email: string;
  gameId: string;
  status: string;
}
interface GetChallengeParams {
  email: string;
}

interface IGameController {
  createChallenge: (params: CreateChallengeParams) => Promise<CreateChallengeResult>;
  getChallenge: (params: GetChallengeParams) => Promise<Challenge | null>;
}

const mongoConection = MongoConection.default.db;
const gameRepo = new GameRepo(mongoConection);
const userRepo = new UserRepo(mongoConection);

export class GameController implements IGameController {
  public async createChallenge(params: CreateChallengeParams): Promise<any> {
    const { player1Email, player2Email } = params;

    const player1 = await userRepo.getUser({ email: player1Email });
    const player2 = await userRepo.getUser({ email: player2Email });

    if (!player1 || !player2) {
      throw new Error('Challenger or challenged player not found.');
    }

    const existingChallenge = await gameRepo.getChallenge({ player1, player2 });

    if (existingChallenge) {
      pubsub?.publish('CHALLENGE', {
        checkChallenge: {
          gameId: existingChallenge._id.toString(),
          player1Id: existingChallenge.player1Id,
          player2Id: existingChallenge.player2Id,
          player1Email: existingChallenge.player1Email,
          player2Email: existingChallenge.player2Email,
          status: existingChallenge.status,
          createDate: existingChallenge.create_date,
          updateDate: existingChallenge.update_date,
        },
      });
      return;
    }

    const response = await gameRepo.createChallenge({ player1, player2 });

    if (!response?.id) {
      throw new Error('Problem creating game');
    }

    pubsub?.publish('CHALLENGE', {
      checkChallenge: {
        gameId: response.id.toString(),
        player1Id: player1?._id?.toString(),
        player2Id: player2?._id?.toString(),
        player1Email: player1?.email,
        player2Email: player2?.email,
        status: 'STARTED',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
      },
    });
  }

  public async getChallenge(params: GetChallengeParams): Promise<any> {
    const { email } = params;
    const challenge = await gameRepo.getChallengeForPlayer({ email });
    if (!challenge) return null;
    return {
      gameId: challenge?._id?.toString(),
      player1Id: challenge?.player1Id?.toString(),
      player2Id: challenge?.player2Id?.toString(),
      player1Email: challenge?.player1Email,
      player2Email: challenge?.player2Email,
      status: challenge?.status,
      createDate: challenge?.create_date?.toString(),
      updateDate: challenge?.update_date?.toString(),
    };
  }
}
