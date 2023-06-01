import { Router } from "express";
import LoginController from "../controllers/auth.controller.js";

const router = Router();

const loginController = new LoginController();

router.post("/", loginController.login);

export default router;
