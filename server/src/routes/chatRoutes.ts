import { Router } from "express";
import { ChatController } from "../controllers/chatController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/messages", authenticateToken, ChatController.getChatMessages);
router.post("/messages", authenticateToken, ChatController.postChatMessage);

export default router;
