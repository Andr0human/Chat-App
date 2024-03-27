import { SystemResponse } from "../../lib/response-handler";
import UserService from "./Services";

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = (req: Request, res: Response): any => {
    const newUser: any = req.body;

    const existingUser: boolean = this.userService.getByEmail(newUser.email);

    if (existingUser) {
      // Already exist
      // new SystemResponse();
    }

    // Create new user
  };
}

export default UserController;
