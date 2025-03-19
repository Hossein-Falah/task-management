import { LoginDto, RefreshDto, RegisterDto } from "../dto/auth.dto"

export interface IAuthService {
    register(registerDto: RegisterDto): Promise<void>
    login(loginDto: LoginDto): Promise<void>
    logout(): Promise<void>
    refreshToken(refreshDto: RefreshDto): Promise<void>
}