import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.entity";
import { ITaskValues } from "./interfaces/task.values.interface";

@Injectable()
export class TaskRepository {
    constructor(
        @InjectRepository(TaskEntity) private taskModel: Repository<TaskEntity>
    ) {}

    public async findById(id:string): Promise<TaskEntity | null> {
        return this.taskModel.findOne({ where: { id } });
    }

    public async findByTitle(title: string): Promise<TaskEntity | null> {
        return this.taskModel.findOne({ where: { title } });
    }

    public async createTask({ title, description, attchment, userId }: ITaskValues): Promise<void> {
        const task = this.taskModel.create({ title, description, attchmentUrl: attchment, userId });
        await this.taskModel.save(task);
    }
}