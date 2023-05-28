import { Router } from "express";
import CompanyController from "../controllers/company.controller.js";

const router = Router();

const companyController = new CompanyController();
 
router.get("/", companyController.showCompanies);
router.post("/", companyController.createCompany);
router.get("/name/:name", companyController.findByName);
router.get("/doc/:document", companyController.findByCnpjCpf);
router.get("/city/:city", companyController.findByCity);

// router.delete("/:id", companyController.excludes);

export default router;
