import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TokenPayload } from "../types/auth.type";
import { JWT_SERVICE } from "../constants/token.constant";
import { TokenMessage } from "src/common/enum/message.enum";
import { USER_SERVICE } from "src/modules/user/constants/token.constant";
import { IUserService } from "src/modules/user/interfaces/user-service.interface";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Injectable()
export class TokenService {
    constructor(
        @Inject(JWT_SERVICE) private jwtService: JwtService,
        @Inject(USER_SERVICE) private userService: IUserService,
        private configService: ConfigService
    ) { }

    public generateAccessToken(payload: TokenPayload) {
        try {
            return this.jwtService.sign(payload, {
                secret: this.configService.get("JWT_ACCESS_SECRET"),
                expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES_IN")
            })
        } catch (error) {
            throw new BadRequestException(TokenMessage.TOKEN_CREATED_FAILED);
        }
    }

    public generateRefreshToken(payload: TokenPayload) {
        try {
            return this.jwtService.sign(payload, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: this.configService.get("JWT_REFRESH_EXPIRES_IN")
            })
        } catch (error) {
            throw new BadRequestException(TokenMessage.TOKEN_CREATED_FAILED);
        }
    }

    public async validateAccessToken(token: string): Promise<UserEntity> {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get<string>("JWT_ACCESS_SECRET")
            })
                        
            const user = await this.userService.findUserByEmail(decoded.email);

            return user;
        } catch (error) {
            throw new BadRequestException(TokenMessage.TOKEN_INVALID);
        }
    }

    public verifyRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET")
            })
        } catch (error) {
            throw new BadRequestException(TokenMessage.TOKEN_INVALID);
        }
    }
}