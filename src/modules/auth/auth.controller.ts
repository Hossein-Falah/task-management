import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LoginDto, RefreshDto, RegisterDto } from './dto/auth.dto';
import { AUTH_SERVICE } from './constants/token.constant';
import { IAuthService } from './interfaces/auth-service.interface';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enum/swagger.consumes.enum';


@Controller('auth')
@ApiTags("Auth 🔒")
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: IAuthService) {}

  @Post("/register")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
  
  @Post("/login")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post("/refresh-token")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  refreshToken(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshToken(refreshDto)
  }
}
