import { Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { USER_REPOSITORY, USER_SERVICE } from "../user/constants/token.constant";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/repository/user.repository";
import { AUTH_SERVICE, JWT_SERVICE, TOKEN_SERVICE } from "./constants/token.constant";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";

export const providers: Provider[] = [
    {
        provide: USER_SERVICE,
        useClass: UserService
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    },
    {
        provide: AUTH_SERVICE,
        useClass: AuthService
    },
    {
        provide: TOKEN_SERVICE,
        useClass: TokenService
    },
    {
        provide: JWT_SERVICE,
        useClass: JwtService
    }
]