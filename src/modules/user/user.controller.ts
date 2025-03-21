import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, FileTypeValidator, Get, Inject, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Put, Query, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { USER_SERVICE } from './constants/token.constant';
import { IUserService } from './interfaces/user-service.interface';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enum/role.enum';
import { ChangeInformationUserDto, ChangeRoleDto, UpdateUserByAdminDto, UploadProfileDto } from './dto/user.dto';
import { SwaggerConsumes } from 'src/common/enum/swagger.consumes.enum';
import { UploadFile } from 'src/common/interceptors/upload.interceptor';
import { UploadMessage } from 'src/common/enum/message.enum';
import { MulterFile } from 'src/common/utils/multer.util';
import { MulterExceptionFilter } from 'src/common/exceptions/multer.exception';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('user')
@ApiTags("User 👤")
@AuthDecorator()
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService
  ) { }

  @Get("/users-for-admin")
  @Pagination()
  @CanAccess(Roles.Admin)
  getUsersForAdmin(@Query() paginationDto: PaginationDto) {
    return this.userService.getUsersForAdmin(paginationDto)
  }

  @Patch("/admin/change-role/:id")
  @CanAccess(Roles.Admin)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  changeRole(@Param("id") id: string, @Body() changeRoleDto: ChangeRoleDto) {
    return this.userService.changeRole(id, changeRoleDto)
  }

  @Delete("/admin/delete/:id")
  @CanAccess(Roles.Admin)
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch("/admin/update/:id")
  @CanAccess(Roles.Admin)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  updateUserByAdmin(@Param("id") id:string, @Body() updateUserByAdminDto: UpdateUserByAdminDto) {
    return this.userService.updateUserByAdmin(id, updateUserByAdminDto);
  }

  @Patch("/profile")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  changeInformationUser(@Body() changeInformationUserDto: ChangeInformationUserDto) {
    return this.userService.changeInformationUser(changeInformationUserDto)
  }

  @Put("/profile/upload")
  @UseFilters(new MulterExceptionFilter())
  @ApiConsumes(SwaggerConsumes.Multipart)
  @UseInterceptors(UploadFile("image", "user_profile"))
  uploadProfileImage(
    @UploadedFile() image: MulterFile,
    @Body() uploadProfileDto: UploadProfileDto
  ) {
    return this.userService.uploadProfile(image)
  }
}
