import { Provider } from "@nestjs/common";
import { USER_REPOSITORY, USER_SERVICE } from "./constants/token.constant";
import { UserService } from "./user.service";
import { UserRepository } from "./repository/user.repository";

export const providers: Provider[] = [
    {
        provide: USER_SERVICE,
        useClass: UserService
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    }
]