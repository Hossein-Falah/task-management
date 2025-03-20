import { LoginDto, RefreshDto, RegisterDto } from "../dto/auth.dto"
import { AuthResponse } from "../types/auth.type"

export interface IAuthService {
    register(registerDto: RegisterDto): Promise<AuthResponse>
    login(loginDto: LoginDto): Promise<AuthResponse>
    refreshToken(refreshDto: RefreshDto): Promise<AuthResponse>
}