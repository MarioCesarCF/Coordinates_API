import { Router } from "express";
const router = Router();

import {
  show,
  create,
  excludes,
  findByName,
  findByCnpj,
  findByCity,
} from "../controllers/company.controller.js";

router.get("/companies", show);
router.post("/companies", create);
router.delete("/companies/:id", excludes);
router.get("/companies/name/:name", findByName);
router.get("/companies/cnpj/:cnpj", findByCnpj);
router.get("/companies/city/:city", findByCity);

export default router;
