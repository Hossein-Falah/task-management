import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Roles } from "src/common/enum/role.enum";

export class ChangeRoleDto {
    @ApiProperty({
        description: "The role to change the user to",
        example: "admin",
        enum: Roles
    })
    @IsEnum(Roles)
    role:Roles;
}