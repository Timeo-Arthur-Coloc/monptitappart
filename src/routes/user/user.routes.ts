import { Router } from 'express';

import * as userController from "../../controllers/user.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const routes = Router();

routes.post("/register", userController.registerUser);

routes.post("/login", userController.loginUser);

routes.post("/refresh", userController.refreshAccessToken);

routes.get("/me", authenticate, userController.getUserProfile);

routes.get("/", authenticate, userController.getAllUsers);

routes.get("/:id/flatshares", authenticate, userController.getUserFlatshares);

routes.delete("/:id", authenticate, userController.deleteUser);

export default routes;