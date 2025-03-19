import { Provider } from "@nestjs/common";
import { USER_REPOSITORY, USER_SERVICE } from "../user/constants/token.constant";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/repository/user.repository";
import { AUTH_SERVICE } from "./constants/token.constant";
import { AuthService } from "./services/auth.service";

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
    }
]