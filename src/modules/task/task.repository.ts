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

    public async findById(id:string, userId:string): Promise<TaskEntity | null> {
        return this.taskModel.findOne({ where: { id, userId } });
    }

    public async findByTitle(title: string): Promise<TaskEntity | null> {
        return this.taskModel.findOne({ where: { title } });
    }

    public async createTask({ title, description, attchment, userId }: ITaskValues): Promise<void> {
        const task = this.taskModel.create({ title, description, attchmentUrl: attchment, userId });
        await this.taskModel.save(task);
    }

    public async findAll(id:string): Promise<TaskEntity[]> {
        return this.taskModel.find({ 
            where: { userId: id }
        });
    }
}