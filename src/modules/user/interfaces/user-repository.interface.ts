import { DeepPartial } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { RegisterDto } from "src/modules/auth/dto/auth.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

export interface IUserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    findByPhone(phone: string): Promise<UserEntity | null>;
    findByUsername(username: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    createUser(registerDto:RegisterDto): Promise<void>;
    findAllUser(paginationDto: PaginationDto): Promise<{ users: UserEntity[], pagination: PaginationDto }>;
    updateRole(id:string, role:string): Promise<void>;
    save(user: UserEntity): Promise<UserEntity>;
    removeUser(id:string): Promise<void>;
    updateUserForAdmin(id:string, updateObject: DeepPartial<UserEntity>): Promise<void>;
}
