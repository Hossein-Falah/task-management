import { DeepPartial } from "typeorm";
import { TaskEntity } from "../entities/task.entity";
import { ITaskValues } from "./task.values.interface";
import { PaginationDto } from "src/common/dto/pagination.dto";

export interface ITaskRepository {
    findById(id:string, userId:string): Promise<TaskEntity | null>
    findByTitle(title: string): Promise<TaskEntity | null>,
    createTask({ title, description, attchment, userId }: ITaskValues): Promise<void>
    findAll(id:string, paginationDto: PaginationDto): Promise<{ tasks: TaskEntity[], pagination: PaginationDto }>
    delete(id:string): Promise<void>
    updateInformation(id:string, updateTask: DeepPartial<TaskEntity>): Promise<void>
}