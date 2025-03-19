import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";
import { RegisterMessage } from "src/common/enum/message.enum";

export class RegisterDto {
    @ApiPropertyOptional({
        description: 'The email of the user',
        example: 'test@gmail.com',
        required: false,
        type: String,
    })
    @IsEmail()
    email:string;
    @ApiPropertyOptional({
        description: 'The phone number of the user',
        example: '09125620000',
        required: false,
        type: String,
    })
    @IsPhoneNumber("IR", { message: RegisterMessage.INVALID_PHONE_NUMBER })
    @MinLength(11, { message: RegisterMessage.PHONE_NUMBER_MIN_LENGTH })
    phone:string;
    @ApiProperty({
        description: 'The username of the user',
        example: 'test',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty({ message: RegisterMessage.USERNAME_REQUIRED })
    @MinLength(5, { message: RegisterMessage.USERNAME_MIN_LENGTH})
    username:string;
    @ApiProperty({
        description: 'The password of the user',
        example: 'test',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty({ message: RegisterMessage.PASSWORD_REQUIRED })
    @MinLength(8, { message: RegisterMessage.PASSWORD_MIN_LENGTH })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, {
        message: RegisterMessage.PASSWORD_INVALID
    })
    password:string;
}

export class LoginDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'test',
        type: String,
    })
    @IsString()
    @IsNotEmpty({ message: RegisterMessage.USERNAME_REQUIRED })
    username:string;
    @ApiProperty({
        description: 'The password of the user',
        example: 'test',
        type: String,
    })
    @IsString()
    @IsNotEmpty({ message: RegisterMessage.PASSWORD_REQUIRED })
    @MinLength(8, { message: RegisterMessage.PASSWORD_MIN_LENGTH })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, {
        message: RegisterMessage.PASSWORD_INVALID
    })
    password:string;
}

export class RefreshDto {
    
}