import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/users", authenticateToken, UserController.getUser);
router.get("/users/active", authenticateToken, UserController.getActiveUsers);

export default router;
