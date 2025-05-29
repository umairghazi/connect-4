import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/messages", ChatController.getChatMessages);
router.post("/messages", ChatController.postChatMessage);

export default router;
