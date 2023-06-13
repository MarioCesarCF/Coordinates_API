import { Router } from "express";
import ClientController from "../controllers/client.controller.js";
import { validId, validClient } from "../middlewares/client.middleware.js";
import CompanyController from "../controllers/company.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

const clientController = new ClientController();
const companyController = new CompanyController();
const authMiddleware = new AuthMiddleware();

router.post("/", clientController.createClient);
router.get("/", clientController.findAllClients);
router.get("/:id", validId, validClient, clientController.findClientById);
router.patch("/:id", validId, validClient, clientController.updateClient);
router.delete("/:id", validId, validClient, clientController.deleteClient);

router.use(authMiddleware.authenticationClient);
router.get("/name/:name", companyController.findByNameClient);


export default router;
