import { IBase } from '../../../lib/base';

interface IUser extends IBase {
    name: string;
    email: string;
    password: string;
}

export default IUser;
