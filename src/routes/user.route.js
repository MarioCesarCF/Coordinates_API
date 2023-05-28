import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/user.middleware.js";

const route = Router();

const userController = new UserController();

route.post("/", userController.createUser);
route.get("/", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findUserById);
route.patch("/:id", validId, validUser, userController.updateUser);
route.delete("/:id", validId, validUser, userController.deleteUser);

export default route;