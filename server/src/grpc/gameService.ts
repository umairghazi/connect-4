import { sendUnaryData, ServerUnaryCall, ServiceError, UntypedServiceImplementation } from "@grpc/grpc-js";
import { CreateGameRequest, Game, GameListResponse, GameQueryRequest, UpdateGameRequest } from "../generated/game_pb";
import { GameController } from "../controllers/gameController";

export const gameServiceImpl: UntypedServiceImplementation = {
  async getGame(call: ServerUnaryCall<GameQueryRequest, GameListResponse>, callback: sendUnaryData<GameListResponse>) {
    try {
      const gamesData = await GameController.getGame(call.request.toObject());
      const list = new GameListResponse();
      const games = gamesData.map((g: any) => {
        const game = new Game();
        game.setId(g.id);
        game.setPlayer1id(g.player1Id);
        game.setPlayer2id(g.player2Id);
        game.setGamestatus(g.gameStatus);
        game.setWhoseturn(g.whoseTurn);
        game.setCreatedate(g.createDate);
        game.setUpdatedate(g.updateDate);
        game.setBoarddata(g.boardData);
        game.setWinnerid(g.winnerId);
        return game;
      });
      list.setGamesList(games);
      callback(null, list);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  },

  async createGame (call: ServerUnaryCall<CreateGameRequest, Game>, callback: sendUnaryData<Game>) {
    try {
      const g = await GameController.createGame(call.request.toObject());
      const game = new Game();
      game.setId(g.id);
      game.setPlayer1id(g.player1Id);
      game.setPlayer2id(g.player2Id);
      game.setGamestatus(g.gameStatus);
      game.setWhoseturn(g.whoseTurn);
      game.setCreatedate(g.createDate);
      game.setUpdatedate(g.updateDate);
      game.setBoarddata(g.boardData);
      game.setWinnerid(g.winnerId);
      callback(null, game);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  },

  async updateGame (call: ServerUnaryCall<UpdateGameRequest, Game>, callback: sendUnaryData<Game>) {
    try {
      const g = await GameController.updateGame(call.request.toObject());
      const game = new Game();
      game.setId(g.id);
      game.setPlayer1id(g.player1Id);
      game.setPlayer2id(g.player2Id);
      game.setGamestatus(g.gameStatus);
      game.setWhoseturn(g.whoseTurn);
      game.setCreatedate(g.createDate);
      game.setUpdatedate(g.updateDate);
      game.setBoarddata(g.boardData);
      game.setWinnerid(g.winnerId);
      callback(null, game);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  }
};
