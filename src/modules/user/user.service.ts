import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { USER_REPOSITORY } from './constants/token.constant';
import { IUserRepository } from './interfaces/user-repository.interface';
import { AuthMessage, BadRequestMessage } from 'src/common/enum/message.enum';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository
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

  public async ensureUserExist(username:string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new BadRequestException(AuthMessage.USER_NOT_FOUND);
    return user;
  }

  public async findUserByEmail(email:string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestException(AuthMessage.USER_NOT_FOUND);
    return user;
  }

  public async findUserById(id:string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException(AuthMessage.USER_NOT_FOUND);
    return user;
  }

  async getUsersForAdmin(): Promise<UserEntity[]> {
    return this.userRepository.findAllUser();
  }
}
