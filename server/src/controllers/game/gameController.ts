import { pubsub } from '../..';
import { MongoConection, UpdateResult } from '../../infrastructure';
import { IGameDTO, mapGameEntityToDTO } from '../../interface';
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
  boardData: string;
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

    const existingGame = await gameRepo.getGame({
      player1Id,
      player2Id,
      gameStatus: ['CHALLENGED', 'IN_PROGRESS'],
    });

    let game: IGameDTO;

    if (existingGame?.length) {
      game = mapGameEntityToDTO(existingGame[0]);
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

    console.log('updateGameParams', updateGameParams);

    const checkForWin = this._checkWinner(boardData);

    if (checkForWin) {
      updateGameParams.gameStatus = 'COMPLETED';
      updateGameParams.winnerId = whoseTurn;
    }

    const response = await gameRepo.updateGame(updateGameParams);
    return response;
  }

  private _deserializeBoardData(boardData: string) {
    if (!boardData) return;
    return boardData.split('|').map((row, rowIndex) =>
      row.split('-').map((value, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        id: `${rowIndex}-${colIndex}`,
        value,
        isOccupied: !!value,
      })),
    );
  }

  private _checkWinner(boardData: string) {
    if (!boardData?.length) {
      return false;
    }

    const deserializedBoard = this._deserializeBoardData(boardData);

    const rows = deserializedBoard?.length ?? 0;
    const cols = deserializedBoard?.[0]?.length ?? 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Change condition to j < cols
        const color = deserializedBoard?.[i]?.[j]?.value;
        if (
          color &&
          color === deserializedBoard[i]?.[j + 1]?.value &&
          color === deserializedBoard[i]?.[j + 2]?.value &&
          color === deserializedBoard[i]?.[j + 3]?.value
        ) {
          return true;
        }
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= cols - 3; j++) {
        // Adjust loop condition to j <= cols - 3
        const color = deserializedBoard?.[j]?.[i]?.value;
        if (
          color &&
          color === deserializedBoard[j + 1]?.[i]?.value &&
          color === deserializedBoard[j + 2]?.[i]?.value &&
          color === deserializedBoard[j + 3]?.[i]?.value
        ) {
          return true;
        }
      }
    }

    for (let i = 0; i <= rows - 3; i++) {
      // Adjust loop condition to i <= rows - 3
      for (let j = 0; j <= cols - 3; j++) {
        const color = deserializedBoard?.[i]?.[j]?.value;
        if (
          color &&
          color === deserializedBoard[i + 1]?.[j + 1]?.value &&
          color === deserializedBoard[i + 2]?.[j + 2]?.value &&
          color === deserializedBoard[i + 3]?.[j + 3]?.value
        ) {
          return true;
        }
      }
    }

    for (let i = 3; i < rows; i++) {
      for (let j = 0; j <= cols - 3; j++) {
        const color = deserializedBoard?.[i]?.[j]?.value;
        if (
          color &&
          color === deserializedBoard[i - 1]?.[j + 1]?.value &&
          color === deserializedBoard[i - 2]?.[j + 2]?.value &&
          color === deserializedBoard[i - 3]?.[j + 3]?.value
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
