import { RegisterDto } from "src/modules/auth/dto/auth.dto";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    findByPhone(phone: string): Promise<UserEntity | null>;
    findByUsername(username: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    createUser(registerDto:RegisterDto): Promise<void>;
}
