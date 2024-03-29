import { Router } from "express";
import CompanyController from "../controllers/company.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

const companyController = new CompanyController();
const authMiddleware = new AuthMiddleware();

router.use(authMiddleware.authentication);
 
router.get("/", companyController.showCompanies);
router.get("/:id", companyController.findCompany);
router.post("/", companyController.createCompany);
router.patch("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

export default router;
