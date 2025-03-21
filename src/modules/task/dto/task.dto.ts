import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { TaskMessage } from "src/common/enum/message.enum";

export class TaskDto {
    @ApiProperty({
        description: "Title of the task",
        example: "Task 1",
        required: true,
        type: String
    })
    @IsNotEmpty({ message: TaskMessage.TITLE_REQUIRED })
    @MinLength(5, { message: TaskMessage.TITLE_MIN_LENGTH })
    title:string;
    @ApiProperty({
        description: "Description of the task",
        example: "Description of the task",
        required: false,
        type: String
    })
    @IsOptional()
    @MinLength(5, { message: TaskMessage.DESCRIPTION_MIN_LENGTH })
    description:string;
    @ApiProperty({
        description: "Attachment URL of the task",
        example: "https://example.com/attachment.jpg",
        required: false,
        type: String,
        format: "binary"
    })
    attchment:string;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}