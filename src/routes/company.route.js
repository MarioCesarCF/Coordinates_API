import { Router } from "express";
const router = Router();

import companyController from "../controllers/company.controller.js";
 
router.get("/companies", companyController.show);
router.post("/companies", companyController.create);
router.delete("/companies/:id", companyController.excludes);
router.get("/companies/name/:name", companyController.findByName);
router.get("/companies/doc/:cnpj_cpf", companyController.findByCnpjCpf);
router.get("/companies/city/:city", companyController.findByCity);

export default router;
