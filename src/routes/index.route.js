import { Router } from "express";
const router = Router();

import userRoute from "./user.route.js";
import companyRoute from "./company.route.js";
import authRoute from "./auth.route.js";

router.use("/user", userRoute);
router.use("/company", companyRoute);
router.use("/auth", authRoute);

export default router;