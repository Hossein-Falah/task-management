import { Request } from 'express';
import { DeepPartial } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { USER_REPOSITORY } from './constants/token.constant';
import { IUserRepository } from './interfaces/user-repository.interface';
import { AuthMessage, BadRequestMessage, UserMessage } from 'src/common/enum/message.enum';
import { ChangeInformationUserDto, ChangeRoleDto, UpdateUserByAdminDto } from './dto/user.dto';
import { hashPassword } from 'src/common/utils/hash.util';
import { MulterFile } from 'src/common/utils/multer.util';

@Injectable({ scope: Scope.REQUEST })
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(REQUEST) private request: Request,
    private configService: ConfigService
  ) { }

  public async checkExistUser(email: string, phone: string, username: string): Promise<UserEntity | null> {
    let user: UserEntity | null;

    if (email) {
      user = await this.userRepository.findByEmail(email);
    } else if (phone) {
      user = await this.userRepository.findByPhone(phone);
    } else if (username) {
      user = await this.userRepository.findByUsername(username);
    } else {
      throw new BadRequestException(BadRequestMessage.InValid)
    }

    return user;
  }

  public async createUser(email: string, phone: string, username: string, password: string): Promise<void> {
    await this.userRepository.createUser({ email, phone, username, password });
  }

  public async ensureUserExist(username: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new BadRequestException(AuthMessage.USER_NOT_FOUND);
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestException(AuthMessage.USER_NOT_FOUND);
    return user;
  }

  public async findUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException(AuthMessage.USER_NOT_FOUND);
    return user;
  }

  public async getUsersForAdmin(): Promise<UserEntity[]> {
    return this.userRepository.findAllUser();
  }

  public async changeRole(id: string, changeRoleDto: ChangeRoleDto): Promise<{ message: string }> {
    const { role } = changeRoleDto;

    const user = await this.findUserById(id);

    if (user.role === role) throw new BadRequestException(UserMessage.USER_ROLE_ALREADY_CHANGED);

    await this.userRepository.updateRole(id, role);

    return {
      message: UserMessage.USER_ROLE_CHANGED,
    }
  }

  public async changeInformationUser(changeInformationUserDto: ChangeInformationUserDto): Promise<{ message: string }> {
    const { id } = this.request.user;

    const { phone, email, password } = changeInformationUserDto;

    const user = await this.findUserById(id);

    if (phone) {
      const existingPhone = await this.userRepository.findByPhone(phone);
      if (existingPhone && existingPhone.id !== id) {
        throw new BadRequestException(UserMessage.USER_PHONE_ALREADY_EXIST);
      }
      user.phone = phone;
    };

    if (email) {
      const existingEmail = await this.userRepository.findByEmail(email);
      if (existingEmail && existingEmail.id !== id) {
        throw new BadRequestException(UserMessage.USER_EMAIL_ALREADY_EXIST);
      }
      user.email = email;
    };

    if (password) {
      const hashedPassword = hashPassword(password);
      user.password = hashedPassword;
    }

    this.userRepository.save(user);

    return {
      message: UserMessage.USER_INFORMATION_CHANGED,
    }
  }

  public async deleteUser(id: string): Promise<{ message: string }> {
    await this.userRepository.removeUser(id);

    return {
      message: UserMessage.USER_DELETED
    }
  }

  public async updateUserByAdmin(id: string, updateUserByAdminDto: UpdateUserByAdminDto): Promise<{ message: string }> {
    const { username, email, phone, role, password } = updateUserByAdminDto;

    const user = await this.findUserById(id);

    const hashedPassword = password ? hashPassword(password) : user.password;

    const updateObject: DeepPartial<UserEntity> = {
      username: username || user.username,
      email: email || user.email,
      phone: phone || user.phone,
      role: role || user.role,
      password: hashedPassword
    };

    await this.userRepository.updateUserForAdmin(id, updateObject);

    return {
      message: UserMessage.USER_UPDATED
    }
  }

  public async uploadProfile(image: MulterFile): Promise<{ message: string }> {
    const { id } = this.request.user;

    let user = await this.findUserById(id);


    if (image) {
      const normalizePath = image.path.replace(/\\/g, "/");

      const fileName = normalizePath.split("/").pop();

      const generateShortLink = `${this.configService.get<string>("APP_URL")}/uploads/user_profile/${fileName}`;

      user.profile_image = generateShortLink;

      user = await this.userRepository.save(user);
    }

    return {
      message: UserMessage.USER_PROFILE_UPLOADED
    }
  }
}