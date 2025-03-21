import { TaskEntity } from "../entities/task.entity";
import { ITaskValues } from "./task.values.interface";

export interface ITaskRepository {
    findById(id:string): Promise<TaskEntity | null>
    findByTitle(title: string): Promise<TaskEntity | null>,
    createTask({ title, description, attchment, userId }: ITaskValues): Promise<void>
}