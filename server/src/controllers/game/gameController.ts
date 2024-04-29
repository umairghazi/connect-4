import { pubsub } from '../..';
import { MongoConection, UpdateResult } from '../../infrastructure';
import { ICellDto, IGameDTO, mapGameEntityToDTO } from '../../interface';
import { GameRepo, GetGameRepoOptions, UpdateGameRepoOptions } from '../../repositories';

interface CreateGameParams {
  player1Id: string;
  player2Id: string;
}

interface GetGameParams {
  id?: string;
  player1Id?: string;
  player2Id?: string;
}

interface UpdateGameParams {
  id: string;
  player1Id: string;
  player2Id: string;
  gameStatus: string;
  whoseTurn: string;
  boardData: ICellDto[][];
  winnerId?: string;
}

interface IGameController {
  createGame: (params: CreateGameParams) => Promise<IGameDTO>;
  getGame: (params: GetGameParams) => Promise<IGameDTO[]>;
  updateGame: (params: UpdateGameParams) => Promise<UpdateResult>;
}

const mongoConection = MongoConection.default.db;
const gameRepo = new GameRepo(mongoConection);

/**
 * Game Controller
 * @export
 * @class GameController
 * @implements {IGameController}
 */
export class GameController implements IGameController {
  /**
   * Create Game
   * @param {CreateGameParams} params
   * @returns {Promise<IGameDTO>}
   */
  public async createGame(params: CreateGameParams): Promise<IGameDTO> {
    const { player1Id, player2Id } = params;

    const existingGame = await gameRepo.getGame({ player1Id, player2Id });
    const activeGame = existingGame?.filter(
      (game) => game.gameStatus === 'CHALLENGED' || game.gameStatus === 'IN_PROGRESS',
    );

    let game: IGameDTO;

    if (existingGame?.length) {
      game = mapGameEntityToDTO(activeGame[0]);
    } else {
      const response = await gameRepo.createGame({ player1Id, player2Id });

      if (!response?.id) {
        throw new Error('Problem creating game');
      }

      const gameData = await gameRepo.getGame({ id: response.id.toString() });

      game = mapGameEntityToDTO(gameData[0]);
    }

    return game;
  }

  /**
   * Get Game
   * @param {GetGameParams} params
   * @returns {Promise<IGameDTO[]>}
   */
  public async getGame(params: GetGameParams): Promise<IGameDTO[]> {
    const { player1Id, player2Id, id } = params;

    const getGameParams: GetGameRepoOptions = {
      player1Id,
      player2Id,
      id,
    };

    const gameData = await gameRepo.getGame(getGameParams);

    if (gameData?.length) {
      const gameDto = gameData.map(mapGameEntityToDTO);
      return gameDto;
    }

    return [];
  }

  /**
   * Update Game
   * @param {UpdateGameParams} params
   * @returns {Promise<UpdateResult>}
   */
  public async updateGame(params: UpdateGameParams): Promise<UpdateResult> {
    const { id, player1Id, player2Id, gameStatus, whoseTurn, boardData } = params;

    const updateGameParams: UpdateGameRepoOptions = {
      id,
      player1Id,
      player2Id,
      gameStatus,
      whoseTurn,
      boardData,
    };

    const checkForWin = this._checkWinner(boardData);

    if (checkForWin) {
      updateGameParams.gameStatus = 'COMPLETED';
      updateGameParams.winnerId = whoseTurn;
    }

    const response = await gameRepo.updateGame(updateGameParams);
    return response;
  }

  private _checkWinner(boardData: ICellDto[][]) {
    if (!boardData?.length) {
      return false;
    }

    const rows = boardData.length;
    const cols = boardData[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= cols - 3; j++) {
        console.log('boardData[i][j]', boardData[i][j]);
        const color = boardData[i][j]?.value;
        if (
          color &&
          color === boardData[i][j + 1].value &&
          color === boardData[i][j + 2].value &&
          color === boardData[i][j + 3].value
        ) {
          return true;
        }
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j <= rows - 3; j++) {
        const color = boardData[j][i]?.value;
        if (
          color &&
          color === boardData[j + 1][i].value &&
          color === boardData[j + 2][i].value &&
          color === boardData[j + 3][i].value
        ) {
          return true;
        }
      }
    }

    for (let i = 0; i < rows - 3; i++) {
      for (let j = 0; j < cols - 3; j++) {
        const color = boardData[i][j]?.value;
        if (
          color &&
          color === boardData[i + 1][j + 1].value &&
          color === boardData[i + 2][j + 2].value &&
          color === boardData[i + 3][j + 3].value
        ) {
          return true;
        }
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 3; j++) {
        const color = boardData[i][j]?.value;
        if (
          color &&
          color === boardData[i - 1][j + 1].value &&
          color === boardData[i - 2][j + 2].value &&
          color === boardData[i - 3][j + 3].value
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
