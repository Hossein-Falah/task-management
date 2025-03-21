import { TaskDto, UpdateTaskDto } from "../dto/task.dto"
import { TaskEntity } from "../entities/task.entity";

export interface ITaskService {
    create(taskDto: TaskDto): Promise<void>;
    findAll(): Promise<TaskEntity[]>;
    findOne(id: string): Promise<TaskEntity>;
    update(id: string, taskDto: UpdateTaskDto): Promise<void>;
    remove(id: string): Promise<void>;
}