import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Create a game
router.post("/games", authenticateToken, GameController.createGame);

// Accept challenge (treated as updating game status)
router.patch("/games/:id/accept", authenticateToken, GameController.acceptGameChallenge);

// Cancel challenge (also a status update)
router.patch("/games/:id/cancel", authenticateToken, GameController.cancelGameChallenge);

// Update game state
router.patch("/games/:id", authenticateToken, GameController.updateGameState);

// Get all games for a player (relation route)
router.get("/players/:playerId/games", authenticateToken, GameController.getGamesForPlayer);

// Get game by ID
router.get("/games/:id", authenticateToken, GameController.getGameById);

export default router;
