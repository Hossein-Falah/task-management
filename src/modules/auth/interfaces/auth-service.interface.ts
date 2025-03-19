import { LoginDto, RefreshDto, RegisterDto } from "../dto/auth.dto"
import { RegisterResponse } from "../types/auth.type"

export interface IAuthService {
    register(registerDto: RegisterDto): Promise<RegisterResponse>
    login(loginDto: LoginDto): Promise<void>
    logout(): Promise<void>
    refreshToken(refreshDto: RefreshDto): Promise<void>
}