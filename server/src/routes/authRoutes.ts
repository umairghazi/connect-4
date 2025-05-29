import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/auth/register", AuthController.registerUser);
router.post("/auth/login", AuthController.loginUser);
router.get("/auth/logout", AuthController.logoutUser);

export default router;
