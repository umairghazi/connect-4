import type { Request, Response } from "express";
import { MongoConnector } from "../clients/mongoClient";
import type { GameEntity } from "../interfaces/GameEntity";
import { GameRepo } from "../repositories/gameRepo";

const db = MongoConnector.db;
const gameRepo = new GameRepo(db);

export class GameController {
  public static async createGame(req: Request, res: Response): Promise<void> {
    const { player1Id, player2Id } = req.body;

    if (!player1Id || !player2Id) {
      res.status(400).json({ error: "player1Id and player2Id are required" });
      return;
    }

    const result = await gameRepo.createGame({ player1Id, player2Id });
    const game = await gameRepo.getGameById(result.id!.toString());

    res.status(201).json(game);
  }

  public static async acceptGameChallenge(req: Request, res: Response): Promise<void> {
    const { id, player1Id, player2Id } = req.body;

    if (!id || !player1Id || !player2Id) {
      res.status(400).json({ error: "id, player1Id, and player2Id are required" });
      return;
    }

    const updatedGame = await gameRepo.acceptChallenge({ id, player1Id, player2Id });
    res.status(200).json(updatedGame);
  }

  public static async cancelGameChallenge(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: "id is required" });
      return;
    }

    const result = await gameRepo.cancelChallenge(id);
    res.status(200).json(result);
  }

  public static async updateGameState(req: Request, res: Response): Promise<void> {
    const updateParams = req.body;

    if (!updateParams._id) {
      res.status(400).json({ error: "Game ID is required to update state" });
      return;
    }

    const updated = await gameRepo.updateGameState(updateParams);
    res.status(200).json(updated);
  }

  public static async getGamesForPlayer(req: Request, res: Response): Promise<void> {
    const { playerId } = req.query;

    if (!playerId || typeof playerId !== "string") {
      res.status(400).json({ error: "playerId is required as query param" });
      return;
    }

    const games = await gameRepo.getGamesForPlayer(playerId);
    res.status(200).json(games);
  }

  public static async getGameById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Game ID is required" });
      return;
    }

    const game = await gameRepo.getGameById(id);
    if (!game) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    res.status(200).json(game);
  }

  // Optional: handle socket message (if real-time accepted challenges are needed)
  public static async handleSocketNewGameChallenge(data: CreateGameRequest): Promise<GameEntity | null> {
    const result = await gameRepo.createGame({ player1Id: data.player1Id, player2Id: data.player2Id } as any);
    return await gameRepo.getGameById(result.id!.toString());
  }
}
