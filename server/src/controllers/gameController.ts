import type { Request, Response } from "express";
import { MongoConnector } from "../clients/mongoClient";
import { mapGameEntityToDTO } from "../interfaces/GameMapper";
import { GameRepo } from "../repositories/gameRepo";
import { SOCKET_EVENTS } from "../socket/events";
import { checkWinCondition } from "../utils/gameUtils";

const db = MongoConnector.db;
const gameRepo = new GameRepo(db);

export class GameController {
  public static async createGame(req: Request, res: Response): Promise<void> {
    const { startedBy, playerIds } = req.body;
    const io = req.app.get("io");

    if (!startedBy || !Array.isArray(playerIds) || playerIds.length < 2) {
      res.status(400).json({ error: "StartedBy and at least two playerIds are required to create a game." });
      return;
    }

    try {
      const result = await gameRepo.createGame({
        playerIds,
        startedBy,
      });

      if (!result?.id) throw new Error("Insert failed");

      const game = await gameRepo.getGameById(result.id.toString());
      if (!game) {
        res.status(404).json({ error: "Game not found after creation" });
        return;
      }
      const gameDTO = mapGameEntityToDTO(game);
      io.emit(SOCKET_EVENTS.GAME_NEW, gameDTO);
      res.status(201).json(gameDTO);
    } catch (err) {
      console.error("Failed to create game:", err);
      res.status(500).json({ error: "Failed to create game" });
    }
  }

  public static async acceptGameChallenge(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { playerIds } = req.body;
    const io = req.app.get("io");

    if (!id || !Array.isArray(playerIds) || playerIds.length < 2) {
      res.status(400).json({ error: "Game ID and playerIds are required to accept challenge." });
      return;
    }

    try {
      const updatedGame = await gameRepo.acceptChallenge(id, playerIds);
      if (!updatedGame) {
        res.status(404).json({ error: "Game not found or could not be updated" });
        return;
      }
      const updatedGameDTO = mapGameEntityToDTO(updatedGame);
      for (const playerId of playerIds) {
        io.to(`user:${playerId}`).emit(SOCKET_EVENTS.GAME_NEW, updatedGameDTO);
      }
      res.status(200).json(updatedGame);
    } catch (err) {
      console.error("Error accepting game challenge:", err);
      res.status(500).json({ error: "Failed to accept challenge" });
    }
  }

  public static async cancelGameChallenge(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: "Game ID is required to cancel challenge." });
      return;
    }

    try {
      const result = await gameRepo.cancelChallenge(id);
      res.status(200).json(result);
    } catch (err) {
      console.error("Error canceling challenge:", err);
      res.status(500).json({ error: "Failed to cancel challenge" });
    }
  }

  public static async updateGameState(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updateParams = req.body;
    const io = req.app.get("io");

    if (!id) {
      res.status(400).json({ error: "Game ID is required to update state." });
      return;
    }

    try {
      const isWin = checkWinCondition(updateParams.boardData, updateParams.colorToCheck);

      if (isWin) {
        updateParams.gameStatus = "FINISHED";
        updateParams.winnerId = updateParams.playerIds[Number(updateParams.currentTurnIndex)];
      } else {
        updateParams.gameStatus = "IN_PROGRESS";
      }

      const updated = await gameRepo.updateGameState(updateParams);
      if (!updated) {
        res.status(404).json({ error: "Game not found or could not be updated" });
        return;
      }

      const game = await gameRepo.getGameById(id);
      if (!game) {
        res.status(404).json({ error: "Game not found after update" });
        return;
      }

      const gameDTO = mapGameEntityToDTO(game);
      io.to(`game:${id}`).emit("game-updated", gameDTO);
      res.status(200).json(gameDTO);
    } catch (err) {
      console.error("Error updating game state:", err);
      res.status(500).json({ error: "Failed to update game state" });
    }
  }

  public static async getGamesForPlayer(req: Request, res: Response): Promise<void> {
    const { playerId } = req.query;

    if (!playerId || typeof playerId !== "string") {
      res.status(400).json({ error: "playerId is required as query param" });
      return;
    }

    try {
      const games = await gameRepo.getGamesForPlayer(playerId);
      res.status(200).json(games);
    } catch (err) {
      console.error("Error fetching games for player:", err);
      res.status(500).json({ error: "Failed to fetch games" });
    }
  }

  public static async getGameById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Game ID is required" });
      return;
    }

    try {
      const game = await gameRepo.getGameById(id);
      if (!game) {
        res.status(404).json({ error: "Game not found" });
        return;
      }

      const gameDTO = mapGameEntityToDTO(game);
      res.status(200).json(gameDTO);
    } catch (err) {
      console.error("Error fetching game by ID:", err);
      res.status(500).json({ error: "Failed to fetch game" });
    }
  }
}
