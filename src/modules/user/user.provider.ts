import { Provider } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";

import { TokenService } from "../auth/services/token.service";
import { UserRepository } from "./repository/user.repository";
import { USER_REPOSITORY, USER_SERVICE } from "./constants/token.constant";
import { JWT_SERVICE, TOKEN_SERVICE } from "../auth/constants/token.constant";

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
        provide: TOKEN_SERVICE,
        useClass: TokenService
    },
    {
        provide: JWT_SERVICE,
        useClass: JwtService
    }
]