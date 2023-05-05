import { Router } from "express";
import userController from "../controllers/user.controller.js";

const route = Router();

route.post("/", userController.create);
// route.get("/", userController.findAll);
// route.get("/:id", userController.findById);
// route.patch("/:id", userController.update);
// route.delete("/:id", userController.excludes);

export default route;