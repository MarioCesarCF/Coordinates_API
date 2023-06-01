import { Router } from "express";
import CompanyController from "../controllers/company.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

const companyController = new CompanyController();
const authMiddleware = new AuthMiddleware();

router.use(authMiddleware.authentication);
 
router.get("/", companyController.showCompanies);
router.post("/", authMiddleware.authentication, companyController.createCompany);
router.get("/name/:name", companyController.findByName);
router.get("/doc/:document", companyController.findByCnpjCpf);
router.get("/city/:city", companyController.findByCity);
router.patch("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

export default router;
