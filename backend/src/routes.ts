import express, { Request, Response } from 'express';
import ErrorHandlerMiddlerware from './lib/middlewares/ErrorHandleMiddleware';
import { SystemResponse } from './lib/response-handler';
import { userRouter } from './module';

const router: express.Router = express.Router();

// health check
router.get('/health', (req: Request, res: Response): Response => {
  return new SystemResponse(res, 'Health OK!', {}).ok();
});

router.use('/users', userRouter);

// Handles '404 not found'
router.use(ErrorHandlerMiddlerware.notFound);

export default router;
