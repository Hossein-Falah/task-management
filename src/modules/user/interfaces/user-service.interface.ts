import { UserEntity } from "../entities/user.entity";

export interface IUserService {
    checkExistUser(email: string, phone: string, username: string): Promise<UserEntity | null>;
    createUser(email: string, phone: string, username: string, password: string): Promise<void>;
    ensureUserExist(username: string): Promise<UserEntity>;
}