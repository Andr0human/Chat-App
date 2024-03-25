import express, { type Request, type Response } from "express";
import ErrorHandlerMiddlerware from "./lib/middlewares/ErrorHandleMiddleware";
import SystemResponse from "./lib/response-handler/SystemResponse";

const router: express.Router = express.Router();

// health check
router.get("/health", (req: Request, res: Response): Response => {
  return new SystemResponse(res, "Health OK!", {}).ok();
});

// Handles '404 not found'
router.use(ErrorHandlerMiddlerware.notFound);

export default router;
