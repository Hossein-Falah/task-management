import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto, RefreshDto, RegisterDto } from '../dto/auth.dto';
import { IAuthService } from '../interfaces/auth-service.interface';
import { IUserService } from 'src/modules/user/interfaces/user-service.interface';
import { USER_SERVICE } from 'src/modules/user/constants/token.constant';
import { AuthMessage, RegisterMessage } from 'src/common/enum/message.enum';
import { hashPassword } from 'src/common/utils/hash.util';
import { RegisterResponse } from '../types/auth.type';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private userService: IUserService
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    const { email, phone, username, password } = registerDto;

    const user = await this.userService.checkExistUser(email, phone, username);

    if (user) throw new BadRequestException(AuthMessage.USER_EXIST);

    
    const hashedPassword = hashPassword(password);

    await this.userService.createUser(email, phone, username, hashedPassword);

    return {
      message: RegisterMessage.USER_CREATED
    }
  } 

  async login(loginDto: LoginDto): Promise<void> {
    return
  }
  
  async logout(): Promise<void> {
    return
  }
  
  async refreshToken(refreshDto: RefreshDto): Promise<void> {
    return
  }
}
