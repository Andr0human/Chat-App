import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUser, IUserLoginRequest } from './entities';
import UserRepository from './repositories/Repository';

class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getById = async (userId: string, fields: string): Promise<IUser | null> => {
    const result: IUser | null = await this.userRepository.getById(
      userId,
      fields
    );
    return result;
  };

  updateById = async (jobId: string, newData: IUser): Promise<IUser | null> => {
    const result: IUser | null = await this.userRepository.update(
      jobId,
      newData
    );
    return result;
  };

  getByEmail = async (email: string): Promise<IUser | null> => {
    const result: IUser | null = await this.userRepository.getByEmail(email);
    return result;
  };

  getAll = async (page: number, limit: number): Promise<IUser[] | null> => {
    const result: IUser[] | null = await this.userRepository.findAll(
      {},
      '-createdBy',
      '-__v',
      page,
      limit
    );
    return result;
  };

  create = async (user: IUser): Promise<IUser | null> => {
    // Hash password before storing in DB
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(user.password, salt);

    const result: IUser | null = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return result;
  };

  deleteById = async (id: string): Promise<void> => {
    await this.userRepository.deleteById(id);
  };

  deleteAll = async (): Promise<void> => {
    await this.userRepository.deleteAll();
  };

  static verifyPassword = async (
    existingUser: IUser,
    currentUser: IUserLoginRequest
  ): Promise<boolean> => {
    const result: boolean = await bcrypt.compare(
      currentUser.password,
      existingUser.password
    );
    return result;
  };

  static generateLoginToken = async (
    existingUser: IUser,
    jwtSecret: string
  ): Promise<string> => {
    const token: string = jwt.sign(
      // eslint-disable-next-line no-underscore-dangle
      { userId: (existingUser as any)?._id },
      jwtSecret,
      { expiresIn: '1d' }
    );
    return token;
  };
}

export default UserService;
