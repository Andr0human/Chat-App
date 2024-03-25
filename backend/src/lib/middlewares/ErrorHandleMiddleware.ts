import { type NextFunction, type Request, type Response } from 'express';
import logger from '../logger';
import SystemResponse from '../response-handler/SystemResponse';

class ErrorHandlerMiddlerware {
    static notFound = (req: Request, res: Response): void => {
        logger.error('api not found', {});
        new SystemResponse(res, '404 not found!', {}).notFound();
    };
}

export default ErrorHandlerMiddlerware;
