import { DeepPartial, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.entity";
import { ITaskValues } from "./interfaces/task.values.interface";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationGenerator, PaginationSolver } from "src/common/utils/pagination.util";

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

    public async findAll(id:string, paginationDto: PaginationDto): Promise<{ tasks: TaskEntity[], pagination: PaginationDto }> {
        const { skip, limit, page } = PaginationSolver(paginationDto);
        const [tasks, count] = await this.taskModel.findAndCount({
            where: { userId: id },
            take: limit,
            skip,
            order: {
                createdAt: "DESC"
            }
        });

        return {
            pagination: PaginationGenerator(count, page, limit),
            tasks
        }
    }

    public async delete(id:string): Promise<void> {
        await this.taskModel.delete(id);
    }

    public async updateInformation(id:string, updateTask: DeepPartial<TaskEntity>): Promise<void> {
        await this.taskModel.update(id, updateTask);
    }
}