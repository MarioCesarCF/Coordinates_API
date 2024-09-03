import { Router } from "express";
import EmpreendimentoController from "../controllers/empreendimento.controller.js";
//import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

const empreendimentoController = new EmpreendimentoController();
//const authMiddleware = new AuthMiddleware();

//router.use(authMiddleware.authentication);
 
router.get("/", empreendimentoController.showEmpreendimentos);
router.post("/", empreendimentoController.createEmpreendimento);
router.get("/:id", empreendimentoController.findEmpreendimento);
router.patch("/:id", empreendimentoController.updateEmpreendimento);
router.delete("/:id", empreendimentoController.deleteEmpreendimento);

export default router;