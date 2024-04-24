import { pubsub } from '../..';
import { MongoConection } from '../../infrastructure';
import { UserRepo, GameRepo, GameEntity } from '../../repositories';

interface CreateGameParams {
  player1Email: string;
  player2Email: string;
  gameState: string;
}
interface CreateGameResult {
  player1Email: string;
  player2Email: string;
  gameId: string;
  status: string;
}
interface GetGameParams {
  email: string;
  gameId: string;
}

interface IGameController {
  createGame: (params: CreateGameParams) => Promise<void>;
  getGame: (params: GetGameParams) => Promise<GameEntity | null>;
}

const mongoConection = MongoConection.default.db;
const gameRepo = new GameRepo(mongoConection);
const userRepo = new UserRepo(mongoConection);

export class GameController implements IGameController {
  public async createGame(params: CreateGameParams): Promise<void> {
    const { player1Email, player2Email, gameState } = params;

    const player1 = await userRepo.getUser({ email: player1Email });
    const player2 = await userRepo.getUser({ email: player2Email });

    if (!player1 || !player2) {
      throw new Error('Challenger or challenged player not found.');
    }

    const existingGame = await gameRepo.getGame({
      player1Email: player1.email,
      player2Email: player2.email,
    });

    if (existingGame?.length) {
      const game = existingGame[0];
      pubsub?.publish('CHALLENGE', {
        checkGame: {
          gameId: game._id.toString(),
          player1Id: game.player1Id,
          player2Id: game.player2Id,
          player1Email: game.player1Email,
          player2Email: game.player2Email,
          status: game.status,
          gameState: game.gameState,
          playerTurn: game.player1Id,
          createDate: game.create_date,
          updateDate: game.update_date,
        },
      });
      return;
    }

    const response = await gameRepo.createGame({ player1, player2, gameState });

    if (!response?.id) {
      throw new Error('Problem creating game');
    }

    pubsub?.publish('CHALLENGE', {
      checkGame: {
        gameId: response.id.toString(),
        player1Id: player1?._id?.toString(),
        player2Id: player2?._id?.toString(),
        player1Email: player1?.email,
        player2Email: player2?.email,
        status: 'STARTED',
        gameState: '',
        playerTurn: player1?._id?.toString() || '',
        createDate: Date.now().toString(),
        updateDate: Date.now().toString(),
      },
    });
  }

  public async getGame(params: GetGameParams): Promise<any> {
    const { gameId, email } = params;

    const game = await gameRepo.getGame({ gameId, player1Email: email });

    if (!game?.length) return null;

    const gameData = game[0];

    return {
      _id: gameData?._id,
      player1Id: gameData?.player1Id,
      player2Id: gameData?.player2Id,
      player1Email: gameData?.player1Email,
      player2Email: gameData?.player2Email,
      status: gameData?.status,
      gameState: gameData?.gameState,
      playerTurn: gameData?.playerTurn,
      createDate: gameData?.create_date?.toString(),
      updateDate: gameData?.update_date?.toString(),
    };
  }

  public async checkChallenge(params: any): Promise<GameEntity | null> {
    return null;
  }
}
