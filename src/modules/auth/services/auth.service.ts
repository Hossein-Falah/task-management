import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto, RefreshDto, RegisterDto } from '../dto/auth.dto';
import { IAuthService } from '../interfaces/auth-service.interface';
import { IUserService } from 'src/modules/user/interfaces/user-service.interface';
import { USER_SERVICE } from 'src/modules/user/constants/token.constant';
import { AuthMessage, RegisterMessage } from 'src/common/enum/message.enum';
import { comparePassword, hashPassword } from 'src/common/utils/hash.util';
import { AuthResponse } from '../types/auth.type';
import { TOKEN_SERVICE } from '../constants/token.constant';
import { TokenService } from './token.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(TOKEN_SERVICE) private tokenService: TokenService
  ) { }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, phone, username, password } = registerDto;

    const user = await this.userService.checkExistUser(email, phone, username);

    if (user) throw new BadRequestException(AuthMessage.USER_EXIST);


    const hashedPassword = hashPassword(password);

    await this.userService.createUser(email, phone, username, hashedPassword);

    const accessToken = this.tokenService.generateAccessToken({ email });
    const refreshToken = this.tokenService.generateRefreshToken({ email });

    return {
      message: RegisterMessage.USER_CREATED,
      accessToken,
      refreshToken
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password } = loginDto;

    const user = await this.userService.ensureUserExist(username);

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword) throw new BadRequestException(AuthMessage.USERNAME_OR_PASSWORD_INVALID);

    const accessToken = this.tokenService.generateAccessToken({ email: user.email });
    const refreshToken = this.tokenService.generateRefreshToken({ email: user.email });

    return {
      message: AuthMessage.LOGIN_SUCCESS,
      accessToken,
      refreshToken
    }
  }

  async refreshToken(refreshDto: RefreshDto): Promise<void> {
    return
  }
}
