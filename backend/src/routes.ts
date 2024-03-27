import express, { type Request, type Response } from "express";
import ErrorHandlerMiddlerware from "./lib/middlewares/ErrorHandleMiddleware";
import SystemResponse from "./lib/response-handler/SystemResponse";
import UserRouter from "./module/user/Router";

const router: express.Router = express.Router();

const userRouter: UserRouter = new UserRouter();

// health check
router.get("/health", (req: Request, res: Response): Response => {
  return new SystemResponse(res, "Health OK!", {}).ok();
});

// router.use('/user', userRouter);

// Handles '404 not found'
router.use(ErrorHandlerMiddlerware.notFound);

export default router;
