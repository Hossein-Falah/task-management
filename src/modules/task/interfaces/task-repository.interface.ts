import { DeepPartial } from "typeorm";
import { TaskEntity } from "../entities/task.entity";
import { ITaskValues } from "./task.values.interface";

export interface ITaskRepository {
    findById(id:string, userId:string): Promise<TaskEntity | null>
    findByTitle(title: string): Promise<TaskEntity | null>,
    createTask({ title, description, attchment, userId }: ITaskValues): Promise<void>
    findAll(id:string): Promise<TaskEntity[]>
    delete(id:string): Promise<void>
    updateInformation(id:string, updateTask: DeepPartial<TaskEntity>): Promise<void>
}