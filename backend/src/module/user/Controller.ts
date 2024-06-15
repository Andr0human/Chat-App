import { Request, Response } from 'express';
import { serverConfig } from '../../config';
import { SystemResponse } from '../../lib/response-handler';

import logger from '../../lib/logger';
import UserService from './Services';
import { IUser, IUserLoginRequest } from './entities';

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getByEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { emailId } = req.params;
      const user: IUser | null = await this.userService.getByEmail(emailId);

      if (!user) {
        return new SystemResponse(
          res,
          'User not found!',
          req.params
        ).notFound();
      }

      return new SystemResponse(res, 'User found!', user).ok();
    } catch (error: unknown) {
      logger.error('error in getByEmail API', error);

      return new SystemResponse(
        res,
        'error retrieving user by email!',
        error
      ).internalServerError();
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      // PAGINATION
      const page: number = parseInt((req.query.page as string) ?? '1', 10);
      const limit: number = parseInt((req.query.limit as string) ?? '10', 10);

      const userList: IUser[] | null = await this.userService.getAll(
        page,
        limit
      );
      return new SystemResponse(res, 'users list found!', userList).ok();
    } catch (error: unknown) {
      logger.error('error in getAll API', error);

      return new SystemResponse(
        res,
        'error retrieving all users!',
        error
      ).internalServerError();
    }
  };

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newUser: IUser = req.body;

      // Check for existing user
      const existingUser: IUser | null = await this.userService.getByEmail(
        newUser.email
      );

      if (existingUser) {
        return new SystemResponse(
          res,
          'User already exists!',
          newUser
        ).conflict();
      }

      await this.userService.create(newUser);
      return new SystemResponse(res, 'new user added!', newUser).created();
    } catch (error: any) {
      logger.error('error in register API', error);

      return new SystemResponse(
        res,
        'error creating new user!',
        error.message
      ).internalServerError();
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: IUserLoginRequest = req.body;

      // User exist check
      const existingUser: IUser | null = await this.userService.getByEmail(
        user.email
      );

      if (!existingUser) {
        return new SystemResponse(
          res,
          'no user found for current email!',
          user
        ).notFound();
      }

      // Correct password check
      const comparePassword: boolean = await UserService.verifyPassword(
        existingUser,
        user
      );
      if (!comparePassword) {
        return new SystemResponse(
          res,
          'Invalid credentials!',
          user
        ).unauthorized();
      }

      const token: string = await UserService.generateLoginToken(
        existingUser,
        serverConfig.jwtSecret
      );

      return new SystemResponse(res, 'user login successfully!', {
        token,
        existingUser,
      }).ok();
    } catch (error: any) {
      return new SystemResponse(
        res,
        'error logging existing user!',
        error.message
      ).internalServerError();
    }
  };

  getByToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.body;
      const fields: string = '_id email';
      const user: IUser | null = await this.userService.getById(userId, fields);

      if (!user) {
        return new SystemResponse(
          res,
          'User not found!',
          req.headers
        ).notFound();
      }

      return new SystemResponse(res, 'User found!', user).ok();
    } catch (error: unknown) {
      logger.error('error in getByToken API', error);

      return new SystemResponse(
        res,
        'error retrieving user by token!',
        error
      ).internalServerError();
    }
  };

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
      const fields: string = '-__v';
      const user: IUser | null = await this.userService.getById(userId, fields);

      if (!user) {
        return new SystemResponse(res, 'No user found for the provided ID!', {
          userId,
        }).notFound();
      }

      return new SystemResponse(res, 'User found successfully!', user).ok();
    } catch (error: unknown) {
      logger.error('error in getById', error);

      return new SystemResponse(
        res,
        'Error retrieving user by userId.',
        error
      ).internalServerError();
    }
  };

  updateById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
      const newUser: IUser = req.body;

      await this.userService.updateById(userId, newUser);
      return new SystemResponse(
        res,
        `user with id:${userId} updated!`,
        newUser
      ).ok();
    } catch (error: any) {
      return new SystemResponse(
        res,
        'error updating user!',
        error
      ).internalServerError();
    }
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
      await this.userService.deleteById(userId);

      logger.info(`user with id:${userId} deleted!`);

      return new SystemResponse(res, 'User deleted successfully!', {
        userId,
      }).ok();
    } catch (error: unknown) {
      logger.error('error in deleteById API', error);

      return new SystemResponse(
        res,
        'Error deleting user by id!',
        error
      ).internalServerError();
    }
  };
}

export default UserController;
