import { DeepPartial, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { IUserRepository } from "../interfaces/user-repository.interface";
import { UserEntity } from "../entities/user.entity";
import { Roles } from "src/common/enum/role.enum";
import { AuthMessage } from "src/common/enum/message.enum";

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

    async findById(id: string): Promise<UserEntity | null> {
        return this.userModel.findOne({
            where: { id }
        })
    }

    async createUser({ email, phone, username, password }: UserEntity): Promise<void> {
        const count = await this.userModel.count();

        const role = count === 0 ? Roles.Admin : Roles.User;
        
        const user = this.userModel.create({ 
            email, phone, 
            username, password,
            role
        });
        await this.userModel.save(user);
    }

    async findAllUser(): Promise<UserEntity[]> {
        return this.userModel.find();
    }

    async updateRole(id: string, role: string): Promise<void> {
        await this.userModel.update(id, { role });
    }

    async removeUser(id:string): Promise<void> {
        const user = await this.findById(id);
        if(!user) throw new NotFoundException(AuthMessage.USER_NOT_FOUND);
        await this.userModel.delete(id);
    }

    async updateUserForAdmin(id: string, updateObject: DeepPartial<UserEntity>): Promise<void> {
        await this.userModel.update(id, updateObject);
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return this.userModel.save(user);
    }
}