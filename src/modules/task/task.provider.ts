import { Provider } from "@nestjs/common";
import { TASK_REPOSITORY, TASK_SERVICE } from "./constants/token.constant";
import { TaskService } from "./task.service";
import { TaskRepository } from "./task.repository";
import { JWT_SERVICE, TOKEN_SERVICE } from "../auth/constants/token.constant";
import { TokenService } from "../auth/services/token.service";
import { JwtService } from "@nestjs/jwt";
import { USER_REPOSITORY, USER_SERVICE } from "../user/constants/token.constant";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/repository/user.repository";

export const providers: Provider[] = [
    {
        provide: TASK_SERVICE,
        useClass: TaskService
    },
    {
        provide: TASK_REPOSITORY,
        useClass: TaskRepository
    },
    {
        provide: TOKEN_SERVICE,
        useClass: TokenService
    },
    {
        provide: JWT_SERVICE,
        useClass: JwtService
    },
    {
        provide: USER_SERVICE,
        useClass: UserService
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    }
]