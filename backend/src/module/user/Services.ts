import IUser from "./entities/IUser";
import UserRepository from "./repositories/Repository";

class UserService {

    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    getByEmail(email: string): boolean {
        return false;
    }

    createUser(newUser: IUser) {
        this.userRepository.createUser();
    }
}


export default UserService;