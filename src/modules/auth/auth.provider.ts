import { Provider } from "@nestjs/common";
import { AUTH_SERVICE } from "./constants/token.constant";
import { AuthService } from "./services/auth.service";

export const providers: Provider[] = [
    {
        provide: AUTH_SERVICE,
        useClass: AuthService
    }
]