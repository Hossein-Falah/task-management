import { Controller, Get, Inject } from '@nestjs/common';
import { USER_SERVICE } from './constants/token.constant';
import { IUserService } from './interfaces/user-service.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enum/role.enum';

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
  async getUsersForAdmin() {
    return this.userService.getUsersForAdmin()
  }
}
