import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.entity";

@Injectable()
export class TaskRepository {
    constructor(
        @InjectRepository(TaskEntity) private taskModel: Repository<TaskEntity>
    ) {}
}