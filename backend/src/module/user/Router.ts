import express from "express";
import UserController from "./Controller";

class UserRouter {
  public router: express.Router;
  userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
  }

  setupRoutes() {
    this.router.post("/register", this.userController.register as any);
  }
}

export default UserRouter;
