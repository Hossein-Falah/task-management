import { ApiProperty, PartialType } from "@nestjs/swagger";

export class TaskDto {
    @ApiProperty({
        description: "Title of the task",
        example: "Task 1",
        required: true,
        type: String
    })
    title:string;
    @ApiProperty({
        description: "Description of the task",
        example: "Description of the task",
        required: false,
        type: String
    })
    description:string;
    @ApiProperty({
        description: "Attachment URL of the task",
        example: "https://example.com/attachment.jpg",
        required: false,
        type: String,
        format: "binary"
    })
    attchmentUrl:string;
}

export class UpdateTaskDto extends PartialType(TaskDto) {}