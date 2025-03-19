import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { IUserRepository } from "../interfaces/user-repository.interface";
import { UserEntity } from "../entities/user.entity";
import { UserRole } from "src/common/enum/role.status";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity) private userModel: Repository<UserEntity>
    ) { }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userModel.findOne({
            where: {
                email
            }
        })
    }
    async findByPhone(phone: string): Promise<UserEntity | null> {
        return this.userModel.findOne({
            where: {
                phone
            }
        })
    }
    async findByUsername(username: string): Promise<UserEntity | null> {
        return this.userModel.findOne({
            where: {
                username
            }
        })
    }

    async createUser({ email, phone, username, password }: UserEntity): Promise<void> {
        const count = await this.userModel.count();

        const role = count === 0 ? UserRole.Admin : UserRole.User;
        
        const user = this.userModel.create({ 
            email, phone, 
            username, password,
            role
        });
        await this.userModel.save(user);
    }
}