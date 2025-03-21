import { MulterFile } from "src/common/utils/multer.util";
import { ChangeInformationUserDto, ChangeRoleDto, UpdateUserByAdminDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginationDto } from "src/common/dto/pagination.dto";

export interface IUserService {
    checkExistUser(email: string, phone: string, username: string): Promise<UserEntity | null>;
    createUser(email: string, phone: string, username: string, password: string): Promise<void>;
    ensureUserExist(username: string): Promise<UserEntity>;
    findUserByEmail(email: string): Promise<UserEntity>;
    findUserById(id: string): Promise<UserEntity>;
    getUsersForAdmin(paginationDto: PaginationDto): Promise<{ users: UserEntity[], pagination: PaginationDto }>;
    changeRole(id:string, changeRoleDto: ChangeRoleDto): Promise<{message:string}>;
    changeInformationUser(changeInformationUserDto: ChangeInformationUserDto): Promise<{message:string}>;
    deleteUser(id:string): Promise<{message:string}>;
    updateUserByAdmin(id:string, updateUserByAdminDto: UpdateUserByAdminDto): Promise<{message:string}>;
    uploadProfile(image: MulterFile): Promise<{message:string}>;
}