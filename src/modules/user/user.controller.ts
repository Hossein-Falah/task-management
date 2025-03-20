import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { USER_SERVICE } from './constants/token.constant';
import { IUserService } from './interfaces/user-service.interface';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enum/role.enum';
import { ChangeInformationUserDto, ChangeRoleDto } from './dto/user.dto';
import { SwaggerConsumes } from 'src/common/enum/swagger.consumes.enum';

@Controller('user')
@ApiTags("User 👤")
@AuthDecorator()
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService
  ) { }

  @Get("/users-for-admin")
  @CanAccess(Roles.Admin)
  getUsersForAdmin() {
    return this.userService.getUsersForAdmin()
  }

  @Patch("/change-role/:id")
  @CanAccess(Roles.Admin)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  changeRole(@Param("id") id: string, @Body() changeRoleDto: ChangeRoleDto) {
    return this.userService.changeRole(id, changeRoleDto)
  }

  @Patch("/profile")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  changeInformationUser(@Body() changeInformationUserDto: ChangeInformationUserDto) {
    return this.userService.changeInformationUser(changeInformationUserDto)
  }
}
