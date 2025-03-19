import { Injectable } from '@nestjs/common';
import { LoginDto, RefreshDto, RegisterDto } from '../dto/auth.dto';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(

  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    return
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
