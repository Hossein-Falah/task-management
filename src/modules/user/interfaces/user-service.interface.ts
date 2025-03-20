import { UserEntity } from "../entities/user.entity";

export interface IUserService {
    checkExistUser(email: string, phone: string, username: string): Promise<UserEntity | null>;
    createUser(email: string, phone: string, username: string, password: string): Promise<void>;
    ensureUserExist(username: string): Promise<UserEntity>;
    findUserByEmail(email: string): Promise<UserEntity>;
    findUserById(id: string): Promise<UserEntity>;
    getUsersForAdmin(): Promise<UserEntity[]>;
}