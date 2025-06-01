import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/game", authenticateToken, GameController.createGame);
router.patch("/game/accept", authenticateToken, GameController.acceptGameChallenge);
router.patch("/game/cancel", authenticateToken, GameController.cancelGameChallenge);
router.patch("/game/update", authenticateToken, GameController.updateGameState);
router.get("/games", authenticateToken, GameController.getGamesForPlayer);
router.get("/game/:id", authenticateToken, GameController.getGameById);

export default router;
