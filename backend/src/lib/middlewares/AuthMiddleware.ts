import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { serverConfig } from '../../config';
import logger from '../logger';
import { SystemResponse } from '../response-handler';

class AuthMiddleware {
  verifyToken: string;

  constructor() {
    this.verifyToken = serverConfig.jwtSecret;
  }

  authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    try {
      jwt.verify(token ?? '', this.verifyToken ?? '');

      next();
    } catch (error: unknown) {
      logger.error('error in authenticate middleware!', error);
      new SystemResponse(
        res,
        'user authentication failed!',
        error
      ).unauthorized();
    }
  };

  static extractUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const token: string = req.headers.authorization?.split(' ')[1] ?? '';
    const decoded: JwtPayload = jwt.decode(token) as JwtPayload;

    req.body.userId = decoded.userId;
    next();
  };
}

export default AuthMiddleware;
