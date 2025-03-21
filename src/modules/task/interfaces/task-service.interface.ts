import { MulterFile } from "src/common/utils/multer.util";
import { TaskDto, UpdateTaskDto } from "../dto/task.dto"
import { TaskEntity } from "../entities/task.entity";

export interface ITaskService {
    createTask(taskDto: TaskDto, attchment: MulterFile): Promise<{ message: string }>
    findAll(): Promise<TaskEntity[]>;
    findOne(id: string): Promise<TaskEntity | null>;
    update(id: string, taskDto: UpdateTaskDto): Promise<void>;
    remove(id: string): Promise<void>;
}