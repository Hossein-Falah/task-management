import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, Matches, MinLength } from "class-validator";
import { AuthMessage, RegisterMessage } from "src/common/enum/message.enum";
import { Roles } from "src/common/enum/role.enum";

export class ChangeRoleDto {
    @ApiProperty({
        description: "The role to change the user to",
        example: "admin",
        enum: Roles
    })
    @IsEnum(Roles)
    role: Roles;
}

export class ChangeInformationUserDto {
    @ApiPropertyOptional({
        description: "The phone number of the user",
        example: "09123456789",
        required: false,
        type: String,
    })
    @IsOptional()
    @IsPhoneNumber("IR", { message: RegisterMessage.INVALID_PHONE_NUMBER })
    @MinLength(11, { message: RegisterMessage.PHONE_NUMBER_MIN_LENGTH })
    phone:string;
    @ApiPropertyOptional({
        description: "The email of the user",
        example: "example@example.com",
        required: false,
        type: String,
    })
    @IsOptional()
    @IsEmail({ }, { message: AuthMessage.INVALID_EMAIL})
    email:string;
    @ApiPropertyOptional({
        description: "The password of the user",
        example: "password",
        required: false,
        type: String,
    })
    @IsOptional()
    @MinLength(8, { message: RegisterMessage.PASSWORD_MIN_LENGTH })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, {
        message: RegisterMessage.PASSWORD_INVALID
    })
    password:string;
}