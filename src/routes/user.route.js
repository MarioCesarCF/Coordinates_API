import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/user.middleware.js";

const route = Router();

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validId, validUser, userController.findById);
route.patch("/:id", validId, validUser, userController.update);
route.delete("/:id", validId, validUser, userController.excludes);

export default route;