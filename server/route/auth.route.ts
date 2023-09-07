import express from "express";
import { AuthController } from "../controller/auth.controller";

const authController = new AuthController();
const router = express.Router();

router.post("/", authController.login);
router.get("/", authController.isAuth, authController.getAuthInfo);

export default router;