import { Request } from "express";
import { isJWT } from "class-validator";
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthMessage } from "src/common/enum/message.enum";
import { TOKEN_SERVICE } from "../constants/token.constant";
import { TokenService } from "../services/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(TOKEN_SERVICE) private tokenService: TokenService
    ) { }

    async canActivate(context: ExecutionContext) {
        const httpContext = context.switchToHttp();
        const request: Request = httpContext.getRequest<Request>();

        const token = this.extractToken(request);

        request.user = await this.tokenService.validateAccessToken(token as string);

        return true;
    }

    private extractToken(request: Request): string | undefined {
        const { authorization } = request.headers;
        if (!authorization || authorization?.trim() === "") {
            throw new UnauthorizedException(AuthMessage.LOGIN_REQUIRED);
        }

        const [bearer, token] = authorization.split(" ");

        if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
            throw new UnauthorizedException(AuthMessage.LOGIN_REQUIRED);
        }

        return token;
    }
}