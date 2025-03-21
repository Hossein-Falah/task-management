import { MulterFile } from "src/common/utils/multer.util";
import { TaskDto, UpdateTaskDto } from "../dto/task.dto"
import { TaskEntity } from "../entities/task.entity";
import { PaginationDto } from "src/common/dto/pagination.dto";

export interface ITaskService {
    createTask(taskDto: TaskDto, attchment: MulterFile): Promise<{ message: string }>
    findAll(paginationDto: PaginationDto): Promise<{ tasks: TaskEntity[], pagination: PaginationDto }>;
    findOne(id: string): Promise<TaskEntity | null>;
    update(id: string, taskDto: UpdateTaskDto): Promise<{ message: string }>;
    remove(id: string): Promise<{ message: string }>;
}